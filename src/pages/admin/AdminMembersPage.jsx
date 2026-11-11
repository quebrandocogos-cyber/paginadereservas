import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminAvatar, AdminBadge, AdminHeading, AdminTable, matchesSearch } from '../../components/admin/AdminUI.jsx'
import { MemberEditor } from '../../components/admin/AdminForms.jsx'
import { memberStatuses } from '../../utils/adminRules.js'

export default function AdminMembersPage() {
  const { state } = useAdmin()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [editor, setEditor] = useState(null)
  const rows = state.members.filter((member) => matchesSearch(member, query) && (!status || member.status === status))
  const columns = [
    { key: 'number', label: 'N.º de socio' },
    { key: 'fullName', label: 'Nombre completo', render: (member) => <Link className="admin-person admin-inline-link" to={`/admin/socios/${member.id}`}><AdminAvatar member={member} />{member.fullName}</Link> },
    { key: 'username', label: 'Usuario' }, { key: 'phone', label: 'Teléfono' },
    { key: 'status', label: 'Estado', render: (member) => <AdminBadge tone={member.status === 'active' ? '' : member.status === 'suspended' ? 'warning' : 'muted'}>{memberStatuses[member.status]}</AdminBadge> },
    { key: 'actions', label: 'Acciones', render: (member) => <div className="admin-inline-actions"><Link className="admin-inline-link" to={`/admin/socios/${member.id}`}>Ver ficha</Link><button className="admin-text-button" onClick={() => setEditor(member)}>Editar</button></div> },
  ]
  return <>
    <AdminHeading eyebrow="NUESTRA COMUNIDAD" title="Socios" description="Datos, estados y actividad de los socios de ejemplo."><button className="admin-button" onClick={() => setEditor({})}>＋ Nuevo socio</button></AdminHeading>
    <section className="admin-panel"><div className="admin-filters"><label className="admin-field admin-search-field">Buscar socio<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre, usuario, número o teléfono" /></label><label className="admin-field">Estado<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos los estados</option>{Object.entries(memberStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><span className="admin-muted">{rows.length} de {state.members.length} socios</span></div><AdminTable columns={columns} rows={rows} caption="Socios del club, datos ficticios" /></section>
    {editor && <MemberEditor member={editor.id ? editor : null} onClose={() => setEditor(null)} />}
  </>
}
