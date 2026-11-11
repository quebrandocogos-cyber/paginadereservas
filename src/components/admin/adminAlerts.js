import Swal from 'sweetalert2'

export function adminAlert(options) {
  return Swal.fire({ background: '#121d18', color: '#eef5f0', confirmButtonColor: '#29dba0', cancelButtonColor: '#34473e', customClass: { popup: 'admin-alert' }, ...options })
}

export async function confirmSimulation(title, text) {
  const result = await adminAlert({ icon: 'question', title, text: `${text} Acción ficticia, sin cambios en sistemas reales.`, showCancelButton: true, confirmButtonText: 'Confirmar simulación', cancelButtonText: 'Volver' })
  return result.isConfirmed
}
