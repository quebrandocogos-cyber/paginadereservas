import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createServer } from 'vite'

test('las vistas del socio renderizan con las rutas y el estado compartido', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: Layout } = await server.ssrLoadModule('/src/components/member/MemberLayout.jsx')
    const { default: Home } = await server.ssrLoadModule('/src/pages/ReservasPage.jsx')
    const { default: Profile } = await server.ssrLoadModule('/src/pages/MemberProfilePage.jsx')
    const { default: Information } = await server.ssrLoadModule('/src/pages/MemberInformationPage.jsx')
    function render(path) {
      return renderToString(h(MemoryRouter, { initialEntries: [path] },
        h(Routes, null, h(Route, { path: '/reservas', element: h(Layout) },
          h(Route, { index: true, element: h(Home) }),
          h(Route, { path: 'perfil', element: h(Profile) }),
          h(Route, { path: 'informacion/:slug', element: h(Information) }),
        )),
      ))
    }
    const home = render('/reservas')
    assert.match(home, /Nuestras variedades/)
    assert.match(home, /Mi reserva actual/)
    assert.match(home, /Sin stock/)
    assert.match(home, /Entrega completada/)
    assert.match(home, /ircca.gub.uy/)
    const profile = render('/reservas/perfil')
    assert.match(profile, /Alex Demo/)
    assert.match(profile, /Cambiar contraseña/)
    assert.match(profile, /Consumo mensual/)
    assert.match(render('/reservas/informacion/estatutos'), /Documento oficial pendiente/)
    assert.match(render('/reservas/informacion/preguntas-frecuentes'), /¿Cómo reservo/)
    assert.match(render('/reservas/informacion/terminos'), /sin carácter legal definitivo/)
    assert.match(render('/reservas/informacion/desconocida'), /Contenido no disponible/)
  } finally {
    await server.close()
  }
})
