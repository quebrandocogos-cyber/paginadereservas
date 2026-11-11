import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminBadge, AdminHeading, AdminTable } from '../../components/admin/AdminUI.jsx'
import { ExpenseForm } from '../../components/admin/AdminForms.jsx'
import { expenseCategories } from '../../data/adminMock.js'
import { financialSummary } from '../../utils/adminRules.js'
import { clubClock, formatDate, money } from '../../utils/reservationRules.js'

function MonthlyChart({ finances, month }) {
  const reference = new Date(`${month || clubClock().date.slice(0, 7)}-01T12:00:00Z`)
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(reference)
    date.setUTCMonth(date.getUTCMonth() - 5 + index)
    const key = date.toISOString().slice(0, 7)
    return { key, label: date.toLocaleDateString('es-UY', { month: 'short', year: '2-digit', timeZone: 'UTC' }), ...financialSummary(finances, key) }
  })
  const maximum = Math.max(1, ...months.flatMap((item) => [item.income, item.expense]))
  return <div className="admin-chart" role="img" aria-label={`Evolución de ingresos y gastos de seis meses: ${months.map((item) => `${item.label}, ingresos ${money(item.income)}, gastos ${money(item.expense)}`).join('; ')}`}>
    <div className="admin-chart-bars">{months.map((item) => <div className="admin-chart-month" key={item.key}><div className="admin-chart-values"><strong>{money(item.income)}</strong><small>{money(item.expense)}</small></div><div className="admin-chart-track"><span className="admin-chart-bar" style={{ height: `${item.income / maximum * 100}%` }} /><span className="admin-chart-bar admin-chart-bar--expense" style={{ height: `${item.expense / maximum * 100}%` }} /></div><span>{item.label}</span></div>)}</div>
    <div className="admin-chart-legend"><span>● Ingresos</span><span>● Gastos</span></div>
  </div>
}

export default function AdminBalancePage() {
  const { state, administrators } = useAdmin()
  const [period, setPeriod] = useState(clubClock().date.slice(0, 7))
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [expenseOpen, setExpenseOpen] = useState(false)
  const summary = financialSummary(state.finances, period)
  const rows = state.finances.filter((item) => item.date.startsWith(period) && (!category || item.category === category) && (!type || item.type === type)).slice().sort((a, b) => b.date.localeCompare(a.date))
  const categories = ['Entregas', ...expenseCategories]
  const purchases = state.finances.filter((item) => item.date.startsWith(period) && item.category === 'Compras de stock')
  return <>
    <AdminHeading eyebrow="ECONOMÍA DEL CLUB" title="Balance" description="Ingresos y gastos de ejemplo. Sin pagos, facturación ni integraciones bancarias."><button className="admin-button" onClick={() => setExpenseOpen(true)}>＋ Registrar gasto</button></AdminHeading>
    <div className="admin-filters"><label className="admin-field">Período<input type="month" value={period} onChange={(event) => setPeriod(event.target.value)} /></label><span className="admin-muted">{period ? 'Resumen total del mes seleccionado.' : 'Resumen de todos los períodos.'}</span></div>
    <div className="admin-metrics admin-metrics--three">{[
      { title: 'Ingresos del mes', value: summary.income, note: 'Solo entregas completadas', tone: 'admin-positive' },
      { title: 'Gastos del mes', value: summary.expense, note: 'Incluye compras de inventario', tone: '' },
      { title: 'Resultado del mes', value: summary.result, note: 'Ingresos menos gastos', tone: summary.result >= 0 ? 'admin-positive' : 'admin-negative' },
    ].map((item) => <article className="admin-metric" key={item.title}><span>{period ? item.title : item.title.replace('del mes', 'totales')}</span><strong className={item.tone}>{money(item.value)}</strong><small>{item.note}</small></article>)}</div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Evolución mensual</h2><span className="admin-muted">Seis meses hasta el período seleccionado</span></div><MonthlyChart finances={state.finances} month={period} /></section>
    <div className="admin-finance-notes admin-section"><p className="admin-callout">Las reservas pendientes no representan un ingreso. Los ingresos ficticios se registran únicamente al completar una entrega.</p><p className="admin-callout">Compras de stock del período: <strong>{money(purchases.reduce((sum, item) => sum + item.amount, 0))}</strong>. Ya están incluidas en los gastos. <Link className="admin-inline-link" to="/admin/stock">Registrar compra desde Stock →</Link></p></div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Historial económico</h2><span className="admin-muted">{rows.length} movimientos</span></div><div className="admin-filters"><label className="admin-field">Tipo<select value={type} onChange={(event) => setType(event.target.value)}><option value="">Ingresos y gastos</option><option value="income">Ingresos por entregas</option><option value="expense">Gastos y compras</option></select></label><label className="admin-field">Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas las categorías</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <AdminTable rows={rows} caption="Movimientos económicos ficticios" columns={[
        { key: 'date', label: 'Fecha', render: (item) => formatDate(item.date) },
        { key: 'concept', label: 'Concepto / observaciones', render: (item) => <>{item.concept}<small className="admin-wrap-text">{item.notes}</small>{item.stockMovementId && <small>Vinculado a inventario</small>}</> },
        { key: 'category', label: 'Categoría' },
        { key: 'type', label: 'Tipo', render: (item) => <AdminBadge tone={item.type === 'income' ? '' : 'warning'}>{item.type === 'income' ? 'Ingreso' : 'Gasto'}</AdminBadge> },
        { key: 'amount', label: 'Importe · UYU', render: (item) => <strong className={item.type === 'income' ? 'admin-positive' : ''}>{item.type === 'income' ? '+' : '−'}{money(item.amount)}</strong> },
        { key: 'adminId', label: 'Responsable', render: (item) => administrators.find((admin) => admin.id === item.adminId)?.name },
      ]} />
    </section>
    {expenseOpen && <ExpenseForm onClose={() => setExpenseOpen(false)} />}
  </>
}
