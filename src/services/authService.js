import { supabase } from "./supabaseClient";

export async function restoreAccess() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error('No se pudo recuperar la sesión.');
  if (!data.session) return null;
  const result = await supabase.auth.getUser();
  if (result.error || !result.data?.user?.id) throw new Error('No se pudo verificar el usuario autenticado.');
  const id = result.data.user.id;
  if (data.session.user?.id !== id) throw new Error('La sesión no coincide con el usuario autenticado.');
  const { data: profile, error: queryError } = await supabase.from('profiles').select('id, role, status').eq('id', id).maybeSingle();
  if (queryError) throw new Error('No se pudo consultar el perfil.');
  if (!profile || profile.id !== id || profile.status !== 'active' || !['admin', 'member'].includes(profile.role)) throw new Error('El perfil no tiene acceso habilitado.');
  return profile;
}

export async function logout() {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw new Error('No se pudo cerrar la sesión.');
}

export async function loginWithUsername(username, password) {
  const normalized = typeof username === 'string' ? username.trim().toLowerCase() : '';
  if (!normalized || typeof password !== 'string' || !password) throw new Error('Ingresá tu nombre de usuario y contraseña.');
  let response;
  try {
    response = await supabase.functions.invoke('login-with-username', {
      body: { username: normalized, password },
    });
  } catch {
    throw new Error('No se pudo conectar con el servicio de ingreso. Intentá nuevamente.');
  }
  if (response.error) {
    // No mostrar cuerpos remotos: pueden incluir correos, tokens o detalles internos.
    const status = response.error.context?.status;
    if (Number.isInteger(status)) {
      if (status === 429) throw new Error('Demasiados intentos. Esperá antes de volver a ingresar.');
      if (status >= 500) throw new Error(`El servicio login-with-username falló (HTTP ${status}). Se requiere corregir la función en Supabase.`);
      if ([400, 401, 403].includes(status)) throw new Error('No se pudo iniciar sesión. Verificá tus credenciales o consultá al administrador.');
      throw new Error('El servicio de ingreso rechazó la solicitud. Consultá al administrador.');
    }
    throw new Error('No se pudo conectar con el servicio de ingreso. Intentá nuevamente.');
  }
  const session = response.data?.session;
  if (response.data?.error || typeof session?.access_token !== 'string' || !session.access_token || typeof session?.refresh_token !== 'string' || !session.refresh_token) {
    throw new Error('El servicio de ingreso no devolvió una sesión válida. Consultá al administrador.');
  }
  try {
    const { data, error } = await supabase.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token });
    if (error || !data?.session) throw new Error();
    // La autorización proviene del perfil consultado por UUID, no de la respuesta de la función.
    const profile = await restoreAccess();
    if (!profile || profile.id !== data.session.user?.id) throw new Error();
    return profile;
  } catch {
    try { await logout(); }
    catch { throw new Error('No se pudo validar el acceso ni cerrar la sesión local. Intentá cerrar sesión nuevamente.'); }
    throw new Error('No se pudo validar el acceso. La sesión se cerró.');
  }
}

const profileDiagnostics = {
  AUTH_RESPONSE_INVALID: "La respuesta de autenticación no contiene usuario y sesión válidos.",
  AUTH_UUID_MISMATCH: "El usuario autenticado no coincide con el usuario de la sesión.",
  PROFILE_QUERY_FAILED: "Falló la consulta del perfil. Revisá conectividad, esquema y permisos de lectura.",
  PROFILE_PERMISSION_DENIED: "La consulta del perfil fue rechazada por permisos.",
  PROFILE_POLICY_RECURSION: "La consulta del perfil detectó recursión en una política de acceso.",
  PROFILE_SCHEMA_ERROR: "La consulta del perfil no coincide con el esquema disponible.",
  PROFILE_CARDINALITY_ERROR: "La consulta del perfil no pudo resolverse como un único registro.",
  PROFILE_NOT_VISIBLE: "No se encontró un perfil visible para el usuario autenticado. Puede faltar el registro, no coincidir su UUID o estar oculto por RLS.",
  PROFILE_UUID_MISMATCH: "El perfil devuelto no corresponde al UUID autenticado.",
  PROFILE_INACTIVE: "El perfil no tiene el estado active requerido.",
  PROFILE_ROLE_NOT_ALLOWED: "El perfil no tiene un rol permitido (admin o member).",
};

export async function loginWithEmail(email, password) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Ingresá un correo electrónico válido.");
  }
  if (typeof password !== "string" || !password) {
    throw new Error("Ingresá tu contraseña.");
  }

  let result;
  try {
    result = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
  } catch {
    throw new Error("No se pudo conectar con el servicio de inicio de sesión. Intentá nuevamente.");
  }
  if (result.error) {
    throw new Error("No se pudo iniciar sesión. Verificá tu correo y contraseña e intentá nuevamente.");
  }

  let diagnostic = "PROFILE_QUERY_FAILED";
  try {
    const userId = result.data?.user?.id;
    if (!userId || !result.data?.session) {
      diagnostic = "AUTH_RESPONSE_INVALID";
      throw new Error();
    }
    if (result.data.session.user?.id && result.data.session.user.id !== userId) {
      diagnostic = "AUTH_UUID_MISMATCH";
      throw new Error();
    }

    // Contrato esperado: profiles.id corresponde al UUID de auth.users.
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, role, status")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      // Solo códigos conocidos; nunca incorporar message/details/hint del servidor.
      if (error.code === "42501") diagnostic = "PROFILE_PERMISSION_DENIED";
      else if (error.code === "42P17") diagnostic = "PROFILE_POLICY_RECURSION";
      else if (["42703", "42P01", "PGRST204", "PGRST205"].includes(error.code)) diagnostic = "PROFILE_SCHEMA_ERROR";
      else if (error.code === "PGRST116") diagnostic = "PROFILE_CARDINALITY_ERROR";
      throw new Error();
    }
    if (!profile) diagnostic = "PROFILE_NOT_VISIBLE";
    else if (profile.id !== userId) diagnostic = "PROFILE_UUID_MISMATCH";
    else if (profile.status !== "active") diagnostic = "PROFILE_INACTIVE";
    else if (!["admin", "member"].includes(profile.role)) diagnostic = "PROFILE_ROLE_NOT_ALLOWED";
    else return profile;
    throw new Error();
  } catch {
    // No cerrar otras sesiones del usuario. La sesión creada por este login
    // no debe permanecer abierta si no pudimos validar el perfil.
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch {
      const failure = new Error(`[${diagnostic}] ${profileDiagnostics[diagnostic]} No se pudo validar el acceso ni cerrar la sesión local. No continúes en la aplicación; intentá cerrar la sesión nuevamente.`);
      failure.code = diagnostic;
      throw failure;
    }
    const failure = new Error(`[${diagnostic}] ${profileDiagnostics[diagnostic]} La sesión se cerró.`);
    failure.code = diagnostic;
    throw failure;
  }
}
