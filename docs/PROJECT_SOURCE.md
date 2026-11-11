# Quebrando Cogos — Código fuente completo

Instantánea del 10 de noviembre de 2026 (America/Montevideo). Ver PROJECT_AUDIT.md para arquitectura, evidencia y limitaciones.

Contiene 46 archivos propios íntegros, sin recortes ni sustituciones. No contiene valores de .env, contraseñas, tokens o claves. Los identificadores de campos de autenticación permanecen como parte del código. No se leyó .env.

Exclusiones explícitas: package-lock.json (generado), node_modules, dist, .git, cachés, compilados, imágenes binarias de public y estos documentos. No existe src/context ni carpeta supabase con migraciones/funciones/configuración backend. No existe .env.example. Los assets public/logoclub.png y public/fondopantalla.png se referencian pero no se incrustan.

Los SHA-256 corresponden a los bytes originales, incluidas terminaciones de línea; los bloques conservan el texto completo. No se agrega numeración dentro del código para facilitar su copia.

## Inventario

| Ruta | Líneas | SHA-256 original |
| --- | ---: | --- |
| `.gitignore` | 27 | `01aaf5773e0b354f9f831412fe649637a1db170138487b83a143ebc9e023f952` |
| `README.md` | 15 | `ed3bbcfc4ab14c62d85a632f013489083cda56744c9ba5f7006b6c4721dc6c78` |
| `index.html` | 12 | `2b4382597d7a9f350e7bab7f4e6a22066a81228bd93a32eac3ccd93dfbf6c5c7` |
| `package.json` | 22 | `a1abe79a221fd88c82fa58b2c1f109f684cba67343742f94426b81fcd857aaad` |
| `src/App.jsx` | 8 | `78a2047c4a9e43292593df1d2bd9e663737dcae7c29ae9ea658198acb15898d6` |
| `src/Style/Admin.css` | 274 | `83e615b08ee901dc4ba809e2a782f9cc145ccaefc0703c9a6d3e13fde8654f78` |
| `src/Style/Login.css` | 292 | `87bb7bbfe13e2397fcc5d75ebdd1a83601ead225ba7ad243f794810d87579065` |
| `src/Style/Member.css` | 264 | `e1a94d57eafe75a9b21abf5a3ab0e255381a38193585fed3c4bf9cd94eadace3` |
| `src/components/LoginForm.jsx` | 133 | `7e4ac4d87e6ef757ed0cfd486df2826f02e88b25a0ffa9538c45cc7696f6284b` |
| `src/components/admin/AdminForms.jsx` | 117 | `ec43131e39c77f8db37b225296bb9d7742447a5e7645ef1b637ea09a8fd818a4` |
| `src/components/admin/AdminLayout.jsx` | 45 | `829c9f8609aaa5a55a9f2d13e854acfad0592663b8f10d8676338778fa6943cc` |
| `src/components/admin/AdminPhotoInput.jsx` | 25 | `e043709b850ba327207a571564bc8acf17b8257f2dce81dbcac0ad8ddc130d07` |
| `src/components/admin/AdminProvider.jsx` | 28 | `a3841152930d2828dad243f34e4c26c30b3a795657ca07407a98cc52ab6e157f` |
| `src/components/admin/AdminReservations.jsx` | 40 | `b6a4d5b03017d73a80ad1dde213a0ff52cb29531b05a8cdadccd9851b9945fe3` |
| `src/components/admin/AdminUI.jsx` | 58 | `3549ff9c96610b7b2c673562af8cfc7826ddee20bad55bd61d5500dca4f55f9b` |
| `src/components/admin/adminAlerts.js` | 10 | `b632709b1a090cd6aedf923c4ec085458ead23304817eff6182a8a6fb0623891` |
| `src/components/member/ConsumptionIndicators.jsx` | 24 | `95303dd5aef780e5f28794dd14cc950d1169a425d0fab20350f8a7bdde33815b` |
| `src/components/member/MemberLayout.jsx` | 53 | `b8fdcc36e4bed10ef55d1012f25b68c656c800cd17e56680952cd90ee4816712` |
| `src/components/member/MemberProvider.jsx` | 90 | `13f9002b883691e5465e400b6d49c75a41515bfbea5c5f247d58bf97db10bcd0` |
| `src/components/member/MemberReservations.jsx` | 38 | `f59296454cadf0bf5b6e61005beffbd33a0d6c0c6796df2f4140f84e11dda396` |
| `src/components/member/ReservationDetails.jsx` | 13 | `2e8f46789b36bb2793b3a1f0cb8ea75a2cde93c2ed0d1d739d353daade21f019` |
| `src/components/member/ReservationModal.jsx` | 133 | `aeae7733e82dc0fddd24aeed5079e2881b5a74b18d1fea3e5fe1e4eb10803c2b` |
| `src/components/member/VarietyCard.jsx` | 24 | `cd4642bf38c484b05441691c6e08a799d763684982ba2a2198b0dff2d05ed435` |
| `src/components/member/memberAlerts.js` | 32 | `efff16654259421961f154091852e55bb51c4eaeec204aac5feaa157aa7a76d7` |
| `src/data/adminMock.js` | 62 | `004e19636a67e8c84b1fb83d0a3ea9c61521c70fb684085ca06dded1533092e2` |
| `src/data/memberMock.js` | 76 | `a67b1cbebff09fabc47589c6963ae042499d46550e6096a86162ec1b5f4e87be` |
| `src/index.css` | 3 | `90dd7eced66ff1325074b5fbd398fbe5286bb7504a3333e86cfc92e7a55a6017` |
| `src/main.jsx` | 15 | `0508234ffbd1812d9692bb742c4c1f78d7432bfdf7b3f051067502a0d82bba83` |
| `src/pages/AdminPage.jsx` | 45 | `4d89292c0721f5b02ea0592217ee39ce247fa7beb2f4be7b481b3ecdded8947b` |
| `src/pages/LoginPage.jsx` | 26 | `ff35b26da46dbf651e062aee7480e3b819c917c41fa7f7c96a1dac1f9e8ca3a6` |
| `src/pages/MemberInformationPage.jsx` | 14 | `838b730f3ce5f814300d941d0834909f3e554ecc428289e48c76d407d2f1a131` |
| `src/pages/MemberProfilePage.jsx` | 32 | `f7c34742e6b0d144d8c1cbc091a28a9b23f806b9121903034d4d0d3c383a22bd` |
| `src/pages/ReservasPage.jsx` | 32 | `36c04838757d8d46b4093704853154f2d63a1873102a1f296ce9ad32842cd373` |
| `src/pages/admin/AdminBalancePage.jsx` | 57 | `761e3e41da8dfc1e9288aaef1472a2e907c60da79fe86898a6b2ac69a66551ce` |
| `src/pages/admin/AdminMemberDetailPage.jsx` | 44 | `30e59ff24cf4400a7266e6cee478094f85c4cd39327a09d32b8bbe03c425b5f5` |
| `src/pages/admin/AdminMembersPage.jsx` | 26 | `8620febac54b6517ff51fee090601c02b9f1fe56144eb6bbafcb0c07149ccba5` |
| `src/pages/admin/AdminSettingsPage.jsx` | 46 | `4ad050cbff9519ecff3de1ebabf0bc3f79d907afe5ef4e94f61d195a80d1ead0` |
| `src/pages/admin/AdminStockPage.jsx` | 41 | `5845d2217fe461aec506b5de640c17570dbb95a7a44c80f5eec9dc1c1dcfbe3b` |
| `src/router/AppRouter.jsx` | 49 | `006ac12b21d99a87b076913a94b6ec09165736f045a73aec26ce4bfe2fef237a` |
| `src/services/authService.js` | 30 | `85fecacbf2b457d6475be979fcbf72d941b03e4a2afaa14eda5532edc609701f` |
| `src/services/supabaseClient.js` | 6 | `78a4ed3a3491f887652b3f2078a6901637ddd7c9ea22ad7ffac17cb7fbad2c13` |
| `src/utils/adminRules.js` | 121 | `bf4d957c321443b83c25758f16c4b461f2f5cfacb45014f61c18d3df112678f5` |
| `src/utils/reservationRules.js` | 69 | `3205f45a8f0ea531a1fd911ca8eec5bb6344304740620c8da008b66e1ced2c42` |
| `tests/memberRendering.test.js` | 41 | `8afacb3c6b9564d128c6c2fcb0969e803774085058d1bc8769f71de91b30ef48` |
| `tests/reservationRules.test.js` | 79 | `0feabb3cbbdb42260e8928b24dab2a3309f1c0a52b2aafef47c3013fe071ff29` |
| `vite.config.js` | 7 | `e1eefd0ed1639c88d1213884ef760516884db9e168190e223fee6b063ad3e088` |

## .gitignore

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env
.env.local
.env.*.local
```

## README.md

```markdown
﻿# Quebrando Cogos

Proyecto React con Vite y JavaScript. Estilos con CSS tradicional.

## Desarrollo

npm install
npm run dev

## Compilación

npm run build
npm run preview

Dependencias: React, React DOM, React Router DOM, SweetAlert2 y Supabase JS.
```

## index.html

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quebrando Cogos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## package.json

```json
{
  "name": "quebrandocogos",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.119.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.5",
    "sweetalert2": "^11.26.25"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.1.2",
    "vite": "^8.3.6"
  }
}
```

## src/App.jsx

```jsx
﻿
import AppRouter from './router/AppRouter.jsx'

function App() {
  return <AppRouter />
}

export default App
```

## src/Style/Admin.css

```css
.admin-app {
  --admin-green: #29dba0;
  --admin-muted: #a4b4aa;
  --admin-border: #d6f3e414;
  --admin-panel: #131e18;
  color: #edf5f0;
  color-scheme: dark;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
}

.admin-shell { min-height: 100vh; background: radial-gradient(ellipse at 100% 0%, #183d2933, transparent 40%), #0b120e; }
.admin-app h1, .admin-app h2, .admin-app h3, .admin-app p { margin-top: 0; }
.admin-app h1, .admin-app h2, .admin-app h3 { line-height: 1.25; }
.admin-app h1 { margin-bottom: 12px; font-size: clamp(28px, 3vw, 38px); font-weight: 650; letter-spacing: -0.04em; }
.admin-app h2 { margin-bottom: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.admin-app h3 { font-size: 16px; margin-bottom: 8px; }
.admin-app a { color: inherit; text-decoration: none; }
.admin-app button, .admin-app input, .admin-app select, .admin-app textarea { font: inherit; }
.admin-app button { cursor: pointer; }
.admin-app button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-app img { max-width: 100%; }
.admin-app :focus-visible { outline: 2px solid var(--admin-green); outline-offset: 4px; }
.admin-app .admin-muted { color: var(--admin-muted); font-size: 12px; }
.admin-app .admin-eyebrow { color: var(--admin-green); font-size: 9px; letter-spacing: 0.18em; font-weight: 600; margin-bottom: 12px; }
.admin-app .admin-positive { color: #63e5b8; }
.admin-app .admin-negative { color: #f0a995; }
.admin-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* Navegación y contenedor administrativo. */
.admin-sidebar { position: fixed; inset: 0 auto 0 0; z-index: 20; display: flex; flex-direction: column; width: 240px; padding: 28px 18px 20px; border-right: 1px solid var(--admin-border); background: #0d1711; overflow-y: auto; }
.admin-brand { display: flex; align-items: center; gap: 8px; padding: 0 4px; }
.admin-brand img { width: 52px; height: 52px; object-fit: contain; }
.admin-brand > span { font-size: 10px; font-weight: 700; letter-spacing: 0.03em; }
.admin-brand small { display: block; font-size: 7px; color: var(--admin-muted); letter-spacing: 0.2em; margin-top: 4px; }
.admin-nav-caption { font-size: 8px; letter-spacing: 0.14em; color: #8b9f91; margin: 45px 12px 16px; }
.admin-navigation { display: grid; gap: 7px; }
.admin-navigation a, .admin-settings-link { display: flex; align-items: center; gap: 13px; padding: 12px 15px; border: 1px solid transparent; border-radius: 9px; color: #a6baad; font-size: 13px; }
.admin-navigation a svg, .admin-settings-link svg { width: 19px; height: 19px; flex-shrink: 0; }
.admin-navigation a:hover, .admin-settings-link:hover { background: #182a1e; color: #e5f5ea; }
.admin-navigation a.active, .admin-settings-link.active { background: #29dba014; border-color: #29dba026; color: var(--admin-green); }
.admin-sidebar-bottom { margin-top: auto; padding-top: 45px; }
.admin-settings-link { margin-bottom: 16px; }
.admin-identity { display: flex; align-items: center; gap: 11px; padding: 18px 6px; border-top: 1px solid var(--admin-border); }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { font-size: 12px; }
.admin-identity small { color: var(--admin-muted); font-size: 10px; }
.admin-avatar { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 34px; width: 34px; height: 34px; object-fit: cover; border-radius: 50%; background: #254535; color: #9df2c9; border: 1px solid #29dba030; font-size: 11px; font-weight: 600; }
.admin-avatar--large { width: 90px; height: 90px; flex-basis: 90px; font-size: 26px; }
.admin-switcher { display: grid; gap: 7px; color: var(--admin-muted); font-size: 9px; }
.admin-switcher select { min-width: 0; width: 100%; padding: 8px; border: 1px solid var(--admin-border); border-radius: 6px; background: #131f17; color: #cde1d2; font-size: 11px; }
.admin-permissions-note { display: block; color: #94aa9b; font-size: 9px; margin-top: 10px; }
.admin-workspace { min-width: 0; margin-left: 240px; }
.admin-topbar { display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 78px; padding: 18px 34px; border-bottom: 1px solid var(--admin-border); color: var(--admin-muted); font-size: 11px; background: #0c1510aa; }
.admin-topbar > div { display: flex; align-items: center; gap: 16px; }
.admin-topbar strong { color: #e0eee4; font-weight: 500; }
.admin-topbar span > span { padding: 0 10px; color: #516c5b; }
.admin-topbar-date { font-size: 10px; }
.admin-menu-toggle { display: none; width: 36px; height: 36px; border: 1px solid var(--admin-border); border-radius: 7px; color: #e6f2e9; background: #1b3022; font-size: 19px; }
.admin-menu-backdrop { display: none; }
.admin-demo { padding: 12px 34px; border-bottom: 1px solid var(--admin-border); font-size: 10px; color: #a6c3af; background: #14271a44; }
.admin-demo > span { display: inline-block; width: 5px; height: 5px; margin-right: 6px; border-radius: 50%; background: var(--admin-green); }
.admin-notice { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 15px 20px; margin: 20px 34px 0; border: 1px solid #29dba038; border-radius: 9px; background: #1b3928; font-size: 12px; }
.admin-notice button { background: none; border: none; color: #c4e0ce; font-size: 22px; }
.admin-main { max-width: 1600px; min-height: calc(100vh - 200px); padding: 34px; margin: auto; }
.admin-footer { padding: 20px 34px; border-top: 1px solid var(--admin-border); color: #94a99a; font-size: 10px; }
.admin-page-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin: 0 0 30px; }
.admin-page-heading > div:first-child { min-width: 0; }
.admin-page-heading .admin-muted { margin-bottom: 0; }
.admin-section { margin-top: 28px; }
.admin-stack { display: grid; gap: 22px; align-content: start; min-width: 0; }
.admin-panel { min-width: 0; padding: 24px; background: var(--admin-panel); border: 1px solid var(--admin-border); border-radius: 15px; }
.admin-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
.admin-panel-heading .admin-eyebrow { margin-bottom: 7px; }
.admin-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.admin-metrics--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.admin-metric { padding: 22px; border: 1px solid var(--admin-border); border-radius: 13px; background: linear-gradient(125deg, #1a2e20, #121d17 80%); }
.admin-metric > div { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.admin-metric span { color: #b5c8bb; font-size: 11px; }
.admin-metric svg { color: var(--admin-green); width: 20px; height: 20px; }
.admin-metric > strong { display: block; margin: 18px 0 8px; font-size: clamp(23px, 2.5vw, 34px); font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; overflow-wrap: anywhere; }
.admin-metric > small { display: block; color: var(--admin-muted); font-size: 10px; }
.admin-dashboard-grid { display: grid; grid-template-columns: minmax(0, 2.5fr) minmax(240px, 1fr); gap: 22px; margin-top: 28px; align-items: start; }
.admin-stock-alert { display: flex; align-items: center; justify-content: space-between; gap: 14px; border-top: 1px solid var(--admin-border); padding: 14px 0 0; font-size: 12px; }
.admin-stock-alert small { display: block; color: var(--admin-muted); font-size: 10px; }
.admin-stock-alert strong { color: #efc691; font-size: 14px; white-space: nowrap; }
.admin-delivery-summary > strong { font-size: 36px; line-height: 1.25; }
.admin-delivery-summary strong small { font-size: 12px; color: var(--admin-muted); font-weight: 400; }
.admin-delivery-summary > p:not(.admin-eyebrow) { font-size: 14px; color: #86e4b4; margin-bottom: 8px; }

/* Tablas, formularios y componentes compartidos. */
.admin-app .admin-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 40px; padding: 10px 16px; border: 1px solid transparent; border-radius: 8px; background: var(--admin-green); color: #05281a; font-size: 11px; font-weight: 650; cursor: pointer; transition: background 160ms ease; text-align: center; }
.admin-app .admin-button:hover { background: #6ee7bb; }
.admin-app .admin-button--secondary { border-color: #bddbc52b; background: #223328; color: #d8e8dc; }
.admin-app .admin-button--secondary:hover { background: #2d4836; }
.admin-inline-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.admin-app .admin-inline-link, .admin-text-button { border: none; padding: 0; background: none; color: var(--admin-green); font-size: 11px; cursor: pointer; }
.admin-inline-link:hover, .admin-text-button:hover { text-decoration: underline; }
.admin-badge { display: inline-flex; align-items: center; width: max-content; padding: 4px 9px; border: 1px solid #29dba033; border-radius: 5px; background: #1c3e2b; color: #7be7b4; font-size: 9px; white-space: nowrap; }
.admin-badge--warning { background: #3b3020; color: #edca91; border-color: #e2b95f26; }
.admin-badge--muted { background: #2b3430; color: #b9c6bd; border-color: #b9c6bd20; }
.admin-table-scroll { overflow-x: auto; width: 100%; }
.admin-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 11px; white-space: nowrap; }
.admin-table th { color: #a6bcae; font-size: 9px; font-weight: 500; padding: 0 18px 14px 0; }
.admin-table td { padding: 16px 18px 16px 0; border-top: 1px solid var(--admin-border); }
.admin-table th:last-child, .admin-table td:last-child { padding-right: 0; }
.admin-table td small { display: block; margin-top: 3px; color: #94aa9b; font-size: 9px; }
.admin-table .admin-wrap-text { max-width: 260px; white-space: normal; }
.admin-table .admin-empty { color: var(--admin-muted); text-align: center; padding: 30px; }
.admin-field { display: grid; gap: 8px; color: #ccded1; font-size: 11px; min-width: 0; }
.admin-field input, .admin-field select, .admin-field textarea { width: 100%; min-width: 0; min-height: 42px; border: 1px solid #b8d8c32b; border-radius: 7px; background: #0e1912; color: #edf5f0; padding: 10px 12px; font-size: 14px; }
.admin-field textarea { resize: vertical; }
.admin-field input::placeholder { color: #8ba492; font-size: 12px; }
.admin-field input[readonly] { background: #1d2a21; color: #b2cbb9; }
.admin-filters { display: flex; align-items: flex-end; flex-wrap: wrap; gap: 18px; margin-bottom: 26px; }
.admin-filters > .admin-field { min-width: 160px; }
.admin-filters > .admin-muted { margin-bottom: 10px; }
.admin-search-field { flex: 1; }
.admin-person { display: flex; align-items: center; gap: 12px; min-width: 0; }
.admin-person p { color: var(--admin-muted); font-size: 12px; margin-bottom: 5px; overflow-wrap: anywhere; }
.admin-search-results { display: grid; gap: 8px; margin-top: 14px; }
.admin-search-results button { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px; border: 1px solid var(--admin-border); border-radius: 9px; background: #182a1f; color: #dcebe1; text-align: left; }
.admin-search-results button > span:last-child { margin-left: auto; color: var(--admin-green); }
.admin-search-results strong { display: block; font-size: 12px; }
.admin-search-results small { display: block; color: var(--admin-muted); font-size: 10px; }
.admin-quick-member { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 1fr); gap: 24px; margin-top: 24px; }
.admin-consumption-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.admin-quick-member .admin-consumption-grid { grid-template-columns: 1fr; }
.admin-consumption { display: flex; align-items: center; gap: 22px; border: 1px solid var(--admin-border); border-radius: 13px; background: #15251b; padding: 24px; }
.admin-consumption h3 { font-size: 15px; }
.admin-consumption p { font-size: 12px; margin-bottom: 6px; color: var(--admin-muted); }
.admin-consumption p strong { color: var(--admin-green); }
.admin-consumption > div > small { font-size: 9px; color: var(--admin-muted); }
.admin-ring { display: grid; place-items: center; flex: 0 0 100px; width: 100px; height: 100px; border-radius: 50%; background: conic-gradient(var(--admin-green) var(--progress), #2a4634 0); }
.admin-ring > span { display: grid; align-content: center; text-align: center; width: 86px; height: 86px; border-radius: 50%; background: #15251b; }
.admin-ring strong { font-size: 25px; line-height: 1.2; }
.admin-ring small { color: var(--admin-muted); font-size: 10px; font-weight: 400; }
.admin-profile-top { display: flex; align-items: center; gap: 24px; border-bottom: 1px solid var(--admin-border); padding-bottom: 26px; }
.admin-profile-top h2 { font-size: 24px; }
.admin-profile-top p { margin: 10px 0; }
.admin-status-control { margin-left: auto; min-width: 150px; }
.admin-photo-zoom { display: grid; gap: 8px; justify-items: center; padding: 0; border: none; background: none; }
.admin-photo-zoom small { color: var(--admin-green); font-size: 10px; }
.admin-details-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 25px; margin: 28px 0 0; }
.admin-details-grid dt { font-size: 10px; color: var(--admin-muted); margin-bottom: 8px; }
.admin-details-grid dd { font-size: 13px; margin: 0; overflow-wrap: anywhere; }
.admin-avatar-preview { display: grid; justify-items: center; gap: 24px; text-align: center; }
.admin-expanded-photo { display: block; max-height: 65vh; width: 100%; object-fit: contain; border-radius: 12px; }
.admin-form { display: grid; gap: 20px; }
.admin-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.admin-span-2 { grid-column: span 2; }
.admin-form-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px; padding-top: 20px; border-top: 1px solid var(--admin-border); }
.admin-error { color: #ffb6a2; font-size: 12px; margin: 0; }
.admin-error:empty { display: none; }
.admin-callout { border: 1px solid #29dba025; border-left: 2px solid var(--admin-green); border-radius: 8px; background: #1a342344; padding: 15px 18px; color: #b8d0c1; font-size: 12px; }
.admin-callout--warning { border-left-color: #e6bb78; background: #312b1b66; color: #e3cba6; }
.admin-checkbox { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: #c7dbce; }
.admin-checkbox input { accent-color: var(--admin-green); width: 16px; height: 16px; }
.admin-modal { width: min(580px, calc(100% - 32px)); max-height: calc(100svh - 40px); padding: 28px; border: 1px solid #29dba040; border-radius: 18px; background: #131f18; box-shadow: 0 30px 100px #0009; overflow-y: auto; }
.admin-modal--wide { width: min(760px, calc(100% - 32px)); }
.admin-modal::backdrop { background: #020a06cc; backdrop-filter: blur(5px); }
.admin-modal-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; margin-bottom: 26px; }
.admin-modal-heading h2 { font-size: 22px; }
.admin-close { width: 32px; height: 32px; flex-shrink: 0; border: 1px solid var(--admin-border); border-radius: 50%; background: #284031; color: #cfe3d5; font-size: 22px !important; line-height: 1; }
.admin-modal .admin-details-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 24px; }
.admin-label { display: block; color: #c7dbce; font-size: 11px; margin-bottom: 12px; }
.admin-photo-controls { display: flex; align-items: center; gap: 18px; margin-bottom: 12px; }
.admin-photo-controls > img, .admin-photo-placeholder { width: 100px; height: 100px; border: 1px dashed #69887266; border-radius: 12px; object-fit: cover; }
.admin-photo-placeholder { display: grid; place-items: center; color: #92b39f; font-size: 30px; flex-shrink: 0; }
.admin-photo-controls > div { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.admin-photo-input > small { display: block; }
.admin-file-input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.admin-photo-controls label:has(+ input:focus-visible) { outline: 2px solid var(--admin-green); outline-offset: 4px; }

/* Stock, economía y configuración. */
.admin-varieties { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.admin-stock-photo { display: block; width: 100%; height: 195px; border-radius: 10px; object-fit: cover; margin-bottom: 20px; }
.admin-stock-placeholder { display: grid; place-items: center; background: #1c3324; color: #a7bdae; font-size: 12px; }
.admin-stock-card .admin-panel-heading { margin-bottom: 14px; }
.admin-stock-card > p { min-height: 3.2em; }
.admin-tags { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; padding: 0; margin: 0 0 20px; }
.admin-tags li { font-size: 9px; color: #b8ccbe; border: 1px solid var(--admin-border); border-radius: 4px; padding: 3px 7px; }
.admin-stock-numbers { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--admin-border); padding-top: 18px; margin: 20px 0; }
.admin-stock-numbers small { color: var(--admin-muted); font-size: 10px; display: block; }
.admin-stock-numbers strong { font-size: 24px; font-weight: 500; }
.admin-finance-notes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.admin-finance-notes p { margin-bottom: 0; }
.admin-chart { padding-top: 18px; }
.admin-chart-bars { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 20px; }
.admin-chart-month { display: flex; flex-direction: column; align-items: center; gap: 10px; min-width: 0; }
.admin-chart-values { text-align: center; font-size: 10px; }
.admin-chart-values strong { display: block; color: #6de9b6; font-weight: 500; }
.admin-chart-values small { color: #e7bf8b; font-size: 9px; }
.admin-chart-track { width: 100%; max-width: 72px; height: 150px; display: flex; align-items: flex-end; justify-content: center; gap: 6px; border-bottom: 1px solid #76978233; }
.admin-chart-bar { display: block; width: 20px; min-height: 2px; border-radius: 4px 4px 0 0; background: linear-gradient(var(--admin-green), #17724d); }
.admin-chart-bar--expense { background: linear-gradient(#cfad80, #6e5a3d); }
.admin-chart-month > span { color: var(--admin-muted); font-size: 10px; }
.admin-chart-legend { display: flex; justify-content: center; gap: 24px; padding-top: 24px; font-size: 10px; }
.admin-chart-legend span:first-child { color: #6de9b6; }
.admin-chart-legend span:last-child { color: #e7bf8b; }
.admin-settings-form { display: grid; gap: 28px; max-width: 980px; }
.admin-settings-form fieldset { margin: 0; }
.admin-settings-form legend { color: #d8ecdf; font-size: 15px; font-weight: 600; padding: 0 10px; }
.admin-day-options { display: flex; flex-wrap: wrap; gap: 18px; margin-bottom: 24px; }
.admin-alert { font-family: 'Segoe UI', Arial, sans-serif; border: 1px solid #29dba038; border-radius: 16px; }
.admin-alert .swal2-title { font-size: 24px; }
.admin-alert .swal2-html-container { font-size: 14px; }
.admin-alert .swal2-confirm { color: #062b1b; font-weight: 600; }

@media (min-width: 1600px) { .admin-metric > strong { font-size: 36px; } }
@media (max-width: 1200px) {
  .admin-sidebar { width: 216px; padding-right: 14px; padding-left: 14px; }
  .admin-workspace { margin-left: 216px; }
  .admin-brand img { width: 44px; height: 44px; }
  .admin-brand > span { font-size: 9px; }
  .admin-main { padding: 28px; }
  .admin-dashboard-grid { grid-template-columns: 1fr; }
  .admin-dashboard-grid > .admin-stack { grid-template-columns: 1fr 1fr; }
  .admin-metrics { gap: 12px; }
  .admin-metric { padding: 18px; }
  .admin-quick-member { grid-template-columns: 1fr; }
  .admin-quick-member .admin-consumption-grid { max-width: 480px; }
  .admin-consumption { gap: 14px; padding: 18px; }
}
@media (max-width: 960px) {
  .admin-sidebar { width: 240px; transform: translateX(-100%); visibility: hidden; }
  .admin-sidebar.is-open { transform: translateX(0); visibility: visible; }
  .admin-workspace { margin-left: 0; }
  .admin-menu-toggle { display: block; }
  .admin-menu-backdrop { display: block; position: fixed; inset: 0; z-index: 19; border: 0; background: #010905cc; }
  .admin-main { padding: 26px; }
  .admin-topbar { padding: 18px 26px; }
  .admin-demo { padding: 12px 26px; }
  .admin-page-heading { align-items: flex-start; }
}
@media (max-width: 680px) {
  .admin-main { padding: 24px 16px; }
  .admin-topbar { padding: 14px 16px; min-height: 65px; }
  .admin-topbar-date { display: none; }
  .admin-topbar span > span { padding: 0 5px; }
  .admin-demo { padding: 12px 16px; font-size: 9px; }
  .admin-notice { margin: 16px 16px 0; font-size: 11px; }
  .admin-page-heading { flex-direction: column; gap: 20px; margin-bottom: 24px; }
  .admin-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .admin-metrics--three { grid-template-columns: 1fr; }
  .admin-metric { padding: 16px; }
  .admin-metric span { font-size: 10px; }
  .admin-metric svg { width: 16px; height: 16px; }
  .admin-metric > strong { font-size: 30px; margin-top: 14px; }
  .admin-panel { padding: 20px 16px; }
  .admin-panel-heading { gap: 10px; flex-wrap: wrap; }
  .admin-dashboard-grid > .admin-stack, .admin-consumption-grid, .admin-varieties, .admin-finance-notes { grid-template-columns: 1fr; }
  .admin-profile-top { flex-wrap: wrap; gap: 18px; }
  .admin-status-control { margin-left: 0; width: 100%; }
  .admin-details-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .admin-form-grid { grid-template-columns: 1fr; }
  .admin-span-2 { grid-column: auto; }
  .admin-filters > .admin-field { flex: 1 1 100%; }
  .admin-chart-bars { gap: 6px; }
  .admin-chart-track { height: 115px; gap: 3px; }
  .admin-chart-bar { width: 14px; }
  .admin-chart-values { font-size: 8px; }
  .admin-chart-values small, .admin-chart-month > span { font-size: 8px; }
  .admin-chart-month { gap: 7px; }
  .admin-modal { padding: 22px 18px; }
  .admin-photo-controls { align-items: flex-start; }
  .admin-photo-controls > img, .admin-photo-placeholder { width: 75px; height: 90px; }
  .admin-photo-controls .admin-button { font-size: 10px; padding: 8px 11px; }
  .admin-stock-photo { height: 210px; }
  .admin-footer { padding: 18px 16px; }
  .admin-person .admin-avatar--large { width: 65px; height: 65px; flex-basis: 65px; }
}
@media (prefers-reduced-motion: reduce) { .admin-app *, .admin-alert * { transition: none !important; animation: none !important; } }
```

## src/Style/Login.css

```css

.login-page {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 60px 24px;
  overflow: hidden;

  background-color: #001309;
  background-image: url('/fondopantalla.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-card {
  position: relative;
  width: 100%;
  max-width: 580px;
  padding: 30px 55px 45px;

  border: 2px solid #39ff72;
  border-radius: 38px;

  background: linear-gradient(
    145deg,
    rgba(0, 65, 35, 0.75),
    rgba(0, 18, 12, 0.88)
  );

  box-shadow:
    0 0 12px rgba(57, 255, 114, 0.7),
    0 0 45px rgba(57, 255, 114, 0.25),
    inset 0 0 35px rgba(57, 255, 114, 0.08);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.login-logo {
  display: block;
  width: 240px;
  height: 240px;
  object-fit: contain;
  margin: -85px auto 10px;
  filter: drop-shadow(0 0 12px rgba(57, 255, 114, 0.3));
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;

  margin: 0;
  color: #ffffff;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.35);
}

.login-header h1::before,
.login-header h1::after {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #5cff65
  );
  box-shadow: 0 0 10px #39ff72;
}

.login-header h1::after {
  transform: rotate(180deg);
}

.login-form {
  display: grid;
  gap: 25px;
}

.login-field {
  display: grid;
  gap: 10px;
}

.login-field label {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.login-field input {
  width: 100%;
  min-width: 0;
  min-height: 65px;
  padding: 15px 22px;

  border: 1px solid #0fc96b;
  border-radius: 20px;
  outline: none;

  background: linear-gradient(
    110deg,
    rgba(0, 75, 45, 0.85),
    rgba(0, 110, 65, 0.65)
  );

  color: #ffffff;
  font-size: 17px;

  box-shadow: inset 0 0 15px rgba(0, 255, 120, 0.08);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.login-field input::placeholder {
  color: #b5d5c2;
  font-size: 16px;
}

.login-field input:focus {
  border-color: #61ff87;
  box-shadow:
    0 0 12px rgba(57, 255, 114, 0.4),
    inset 0 0 12px rgba(57, 255, 114, 0.1);
}

.login-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 100%;
  min-height: 70px;
  margin-top: 12px;
  padding: 15px 25px;

  border: 2px solid #b6ff6a;
  border-radius: 50px;

  background: linear-gradient(
    180deg,
    #9cff43 0%,
    #39f522 55%,
    #00c92c 100%
  );

  box-shadow:
    0 0 12px rgba(90, 255, 60, 0.7),
    0 0 30px rgba(57, 255, 114, 0.35),
    inset 0 2px 5px rgba(255, 255, 255, 0.4);

  color: #001b09;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.login-submit span {
  font-size: 22px;
}

.login-submit:hover {
  transform: translateY(-2px);
  box-shadow:
    0 0 20px rgba(90, 255, 60, 0.9),
    0 0 45px rgba(57, 255, 114, 0.5);
}

.login-submit:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 5px;
}

@media (max-width: 600px) {
  .login-page {
    padding: 75px 18px 30px;
  }

  .login-card {
    max-width: 420px;
    padding: 25px 25px 35px;
    border-radius: 28px;
  }

  .login-logo {
  display: block;
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto 10px;
  filter: drop-shadow(0 0 12px rgba(57, 255, 114, 0.3));
}

  .login-header h1 {
    font-size: 28px;
    gap: 12px;
  }

  .login-field label {
    font-size: 16px;
  }

  .login-field input {
    min-height: 55px;
    font-size: 16px;
  }

  .login-submit {
    min-height: 60px;
    font-size: 21px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-field input,
  .login-submit {
    transition: none;
  }
}
.login-logo {
  width: 170px;
  height: 170px;
  margin-top: 0;
}


.login-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.login-input-wrapper > svg {
  position: absolute;
  left: 18px;
  width: 25px;
  height: 25px;
  color: #ffffff;
  pointer-events: none;
}

.login-input-wrapper input {
  padding-left: 58px;
  padding-right: 55px;
}

.login-password-toggle {
  position: absolute;
  right: 15px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 5px;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
}

.login-password-toggle svg {
  width: 25px;
  height: 25px;
}

.login-password-toggle:hover {
  color: #8cff80;
}

.login-password-toggle:focus-visible {
  outline: 2px solid #8cff80;
  border-radius: 8px;
}
```

## src/Style/Member.css

```css
.member-app {
  --member-green: #29dba0;
  --member-muted: #a0b2a9;
  --member-border: #d4f7e612;
  color: #edf5f0;
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.6;
  color-scheme: dark;
}

.member-app:not(dialog) {
  min-height: 100vh;
  background: radial-gradient(ellipse at 90% 8%, #14332855, transparent 32%), #0a100d;
}

.member-app h1, .member-app h2, .member-app h3, .member-app h4,
.member-app p { margin-top: 0; }
.member-app h1, .member-app h2, .member-app h3, .member-app h4 { line-height: 1.25; }
.member-app h1 { font-size: clamp(30px, 3.5vw, 46px); letter-spacing: -0.045em; margin-bottom: 16px; }
.member-app h2 { font-size: clamp(23px, 2.3vw, 30px); letter-spacing: -0.025em; margin-bottom: 0; }
.member-app h3 { font-size: 18px; margin-bottom: 12px; }
.member-app h4 { margin-bottom: 8px; }
.member-app a { color: inherit; text-decoration: none; }
.member-app a:hover { color: var(--member-green); }
.member-app button, .member-app a, .member-app input, .member-app select { -webkit-tap-highlight-color: transparent; }
.member-app :focus-visible { outline: 2px solid var(--member-green); outline-offset: 4px; }
.member-app button { cursor: pointer; }
.member-app button:disabled { cursor: not-allowed; opacity: 0.45; }
.member-app img { max-width: 100%; }
.member-app .member-eyebrow { color: var(--member-green); font-size: 10px; font-weight: 600; letter-spacing: 0.18em; margin-bottom: 12px; text-transform: uppercase; }
.member-app .member-muted { color: var(--member-muted); font-size: 13px; }
.member-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.member-navbar { border-bottom: 1px solid var(--member-border); background: #0b130fe6; }
.member-navbar-inner { max-width: 1264px; margin: auto; padding: 18px 32px; display: flex; align-items: center; gap: 38px; }
.member-brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.member-brand img { width: 55px; height: 55px; object-fit: contain; }
.member-brand > span { font-size: 12px; font-weight: 700; letter-spacing: 0.04em; }
.member-brand small { display: block; font-size: 8px; color: var(--member-muted); letter-spacing: 0.23em; margin-top: 3px; }
.member-main-nav { display: flex; gap: 26px; font-size: 13px; }
.member-main-nav a { padding: 8px 0; color: var(--member-muted); }
.member-main-nav a.active { color: var(--member-green); }
.member-account { display: flex; align-items: center; gap: 14px; margin-left: auto; font-size: 13px; }
.member-avatar { display: block; width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #29dba04d; background: #234336; }
.member-avatar-link { position: relative; }
.member-avatar-label { position: absolute; width: max-content; top: calc(100% + 8px); left: 50%; transform: translateX(-50%); padding: 3px 8px; border-radius: 5px; background: #23392e; font-size: 11px; opacity: 0; pointer-events: none; }
.member-avatar-link:hover .member-avatar-label, .member-avatar-link:focus-visible .member-avatar-label { opacity: 1; }
.member-logout { background: none; border: 0; border-left: 1px solid var(--member-border); color: #c7d4cc; padding: 2px 0 2px 15px; font-size: 11px; }
.member-logout small { display: block; font-size: 9px; }
.member-demo { max-width: 1200px; margin: 20px auto 0; padding: 0 32px; font-size: 11px; color: #9bb3a7; text-align: center; }
.member-demo > span { display: inline-block; width: 5px; height: 5px; margin: 0 5px 2px 0; background: var(--member-green); border-radius: 50%; }
.member-main { max-width: 1264px; margin: auto; padding: 0 32px 72px; }
.member-welcome { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 54px 0 20px; }
.member-welcome h1 span { color: var(--member-green); }
.member-welcome p:not(.member-eyebrow) { font-size: 14px; color: var(--member-muted); max-width: 560px; margin-bottom: 0; }
.member-member-number { padding: 12px 16px; border: 1px solid var(--member-border); border-radius: 10px; font-size: 9px; color: var(--member-muted); letter-spacing: 0.12em; white-space: nowrap; }
.member-member-number strong { display: block; color: #edf5f0; font-size: 14px; margin-top: 3px; }
.member-section { margin-top: 48px; scroll-margin-top: 24px; }
.member-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
.member-section-heading .member-eyebrow { margin-bottom: 8px; }

.member-variety-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; }
.member-variety-card { overflow: hidden; border: 1px solid var(--member-border); border-radius: 20px; background: #131d17; }
.member-variety-image { position: relative; height: 260px; background: #18281e; overflow: hidden; }
.member-variety-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 55%, #08120bbf); pointer-events: none; }
.member-variety-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 250ms ease; }
.member-variety-card:hover .member-variety-image img { transform: scale(1.025); }
.member-badge { display: inline-flex; align-items: center; width: fit-content; gap: 5px; border: 1px solid #29dba033; border-radius: 6px; padding: 4px 9px; font-size: 10px; color: #73e7be; background: #14352a; white-space: nowrap; }
.member-variety-image > .member-badge { position: absolute; top: 18px; left: 18px; z-index: 1; }
.member-badge--muted { color: #d6ded9; background: #202a26; border-color: #8a9b9140; }
.member-badge--cancelled { color: #e9b9a2; border-color: #d69b6533; background: #35271f; }
.member-photo-credit { position: absolute; bottom: 10px; left: 18px; z-index: 1; color: #fff; text-shadow: 0 1px 4px #000; font-size: 9px; }
.member-variety-body { padding: 26px; }
.member-variety-body h3 { font-size: 27px; letter-spacing: -0.025em; }
.member-description { color: var(--member-muted); font-size: 13px; min-height: 3.2em; margin-bottom: 20px; }
.member-tags { padding: 0; margin: 0 0 26px; display: flex; flex-wrap: wrap; gap: 7px; list-style: none; }
.member-tags li { border: 1px solid #c5e7d51a; border-radius: 5px; padding: 4px 8px; color: #b4c4ba; font-size: 10px; }
.member-variety-bottom { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--member-border); padding-top: 20px; }
.member-variety-bottom strong { display: block; font-size: 24px; line-height: 1.3; }
.member-variety-bottom strong small { font-size: 12px; font-weight: 400; color: var(--member-muted); }
.member-variety-bottom div > span { display: block; font-size: 10px; color: var(--member-muted); margin-top: 5px; }
.member-app .member-button { display: inline-flex; justify-content: center; align-items: center; gap: 18px; min-height: 43px; padding: 10px 20px; border: 1px solid transparent; border-radius: 9px; background: var(--member-green); color: #052419; font-size: 12px; font-weight: 700; transition: background 160ms ease, border-color 160ms ease; }
.member-app .member-button:hover:not(:disabled) { background: #64e8bc; }
.member-app .member-button--secondary { background: #1d2b23; color: #d4e0d9; border-color: #a5c6b529; }
.member-app .member-button--secondary:hover:not(:disabled) { background: #2b4034; }
.member-app .member-button--danger { background: transparent; color: #e9b1a7; border-color: #e9b1a733; }
.member-app .member-button--danger:hover:not(:disabled) { background: #462a24; }

.member-information-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.member-info-card { border-top: 1px solid #29dba04d; padding: 24px 18px 14px; background: linear-gradient(#14261b66, transparent); border-radius: 0 0 12px 12px; }
.member-info-card > span { display: block; color: var(--member-green); font-size: 11px; margin-bottom: 20px; }
.member-info-card h3 { font-size: 15px; }
.member-info-card p { font-size: 12px; color: var(--member-muted); margin-bottom: 0; }
.member-consumption-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.member-consumption { display: flex; align-items: center; gap: 26px; border: 1px solid var(--member-border); border-radius: 16px; padding: 28px; background: #111c16; }
.member-ring { display: grid; place-items: center; flex: 0 0 108px; width: 108px; height: 108px; border-radius: 50%; background: conic-gradient(var(--member-green) var(--progress), #263c30 0); }
.member-ring > span { display: grid; align-content: center; text-align: center; width: 94px; height: 94px; border-radius: 50%; background: #111c16; }
.member-ring strong { font-size: 26px; line-height: 1.1; }
.member-ring small { font-size: 11px; color: var(--member-muted); font-weight: 400; }
.member-consumption .member-eyebrow { margin-bottom: 7px; }
.member-consumption h3 { font-size: 17px; margin-bottom: 8px; }
.member-consumption p:last-child { font-size: 12px; margin-bottom: 0; color: var(--member-muted); }
.member-consumption p strong { color: var(--member-green); }
.member-panel { border: 1px solid var(--member-border); border-radius: 16px; background: #111b15; padding: 28px; }
.member-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 22px; }
.member-panel-heading h3 { margin: 0; }
.member-empty { display: flex; align-items: center; gap: 22px; padding: 10px 0; }
.member-empty > span { display: grid; place-items: center; width: 60px; height: 60px; border: 1px solid #29dba033; border-radius: 14px; color: var(--member-green); font-size: 26px; flex-shrink: 0; background: #173324; }
.member-empty h4 { font-size: 17px; }
.member-empty p { color: var(--member-muted); font-size: 13px; margin-bottom: 10px; }
.member-empty a { color: var(--member-green); font-size: 12px; }
.member-reservation-details { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px; margin: 24px 0; }
.member-app dt { font-size: 11px; color: var(--member-muted); margin-bottom: 7px; }
.member-app dd { font-size: 14px; margin: 0; overflow-wrap: anywhere; }
.member-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.member-history { margin-top: 20px; }
.member-table-wrap { overflow-x: auto; }
.member-history table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; white-space: nowrap; }
.member-history th { color: var(--member-muted); font-size: 10px; font-weight: 500; padding: 0 20px 14px 0; }
.member-history td { border-top: 1px solid var(--member-border); padding: 16px 20px 16px 0; }
.member-history td small { display: block; color: var(--member-muted); font-size: 9px; }
.member-history > p { margin: 16px 0 0; }
.member-back { display: inline-block; margin-top: 36px; font-size: 13px; color: var(--member-green) !important; }
.member-page-heading { margin: 30px 0; }
.member-profile-heading { display: flex; align-items: center; gap: 22px; padding-bottom: 26px; border-bottom: 1px solid var(--member-border); }
.member-profile-heading .member-avatar { width: 84px; height: 84px; }
.member-profile-heading h2 { margin-bottom: 12px; }
.member-profile-details { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin: 28px 0 0; }
.member-password-section { margin-top: 40px; }
.member-password-section > p { margin-top: 14px; }
.member-password-section fieldset { max-width: 480px; display: grid; gap: 18px; border: none; padding: 0; margin: 24px 0 0; }
.member-document { margin-bottom: 20px; }
.member-document p { color: var(--member-muted); max-width: 760px; font-size: 14px; margin: 16px 0 0; }
.member-footer { max-width: 1200px; margin: auto; border-top: 1px solid var(--member-border); padding: 32px 0 24px; display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
.member-footer strong { font-size: 13px; }
.member-footer p { font-size: 11px; color: var(--member-muted); margin: 5px 0 0; }
.member-footer nav { display: flex; flex-wrap: wrap; gap: 24px; margin-left: auto; font-size: 11px; color: var(--member-muted); }
.member-footer > small { flex-basis: 100%; border-top: 1px solid var(--member-border); padding-top: 18px; color: var(--member-muted); font-size: 10px; }

.member-modal { width: min(590px, calc(100% - 32px)); max-height: calc(100svh - 40px); padding: 30px; border: 1px solid #29dba040; border-radius: 20px; background: #111c16; color: #edf5f0; box-shadow: 0 35px 100px #0009; overflow-y: auto; }
.member-modal::backdrop { background: #010704c9; backdrop-filter: blur(6px); }
.member-modal-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.member-modal-heading .member-eyebrow { margin-bottom: 8px; }
.member-close { width: 36px; height: 36px; border-radius: 50%; background: #23352a; color: #c7d9cc; border: 1px solid var(--member-border); font-size: 25px; line-height: 1; flex-shrink: 0; }
.member-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); list-style: none; padding: 0; margin: 30px 0; gap: 8px; }
.member-steps li { color: #a0b2a9; border-top: 2px solid #34473b; padding-top: 12px; }
.member-steps li.is-current { color: var(--member-green); border-color: var(--member-green); }
.member-steps span { display: block; font-size: 13px; }
.member-steps small { display: block; font-size: 10px; }
.member-step-title { outline: none; }
.member-step-content { display: grid; gap: 18px; }
.member-step-content > p { margin-bottom: 0; }
.member-field { display: grid; gap: 9px; font-size: 12px; color: #c3d5ca; }
.member-field input, .member-field select { width: 100%; min-width: 0; min-height: 46px; border: 1px solid #a7c9b633; border-radius: 8px; background: #0b140e; color: #f0f8f2; font: inherit; font-size: 16px; padding: 10px 12px; }
.member-field input:disabled { opacity: 0.5; }
.member-choice { display: flex; gap: 18px; padding: 16px; border-radius: 12px; background: #1b2a20; }
.member-choice img { width: 100px; height: 110px; object-fit: cover; border-radius: 8px; }
.member-choice h4 { font-size: 16px; }
.member-choice p { font-size: 12px; color: var(--member-muted); margin-bottom: 8px; }
.member-choice strong { font-size: 12px; color: var(--member-green); }
.member-quantity-info { background: #0b140e; border-radius: 12px; padding: 18px; }
.member-quantity-info p { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 12px; color: var(--member-muted); margin-bottom: 12px; }
.member-quantity-info strong { color: #e5f0e8; white-space: nowrap; }
.member-quantity-info .member-total { border-top: 1px dashed #a7c9b633; padding-top: 14px; margin-bottom: 0; }
.member-total strong { color: var(--member-green); font-size: 20px; }
.member-slot-fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }
.member-slot-fieldset legend { font-size: 12px; margin-bottom: 12px; }
.member-slots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.member-slot { position: relative; cursor: pointer; }
.member-slot input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; }
.member-slot > span { display: grid; text-align: center; padding: 12px 6px; border: 1px solid #a7c9b633; border-radius: 9px; background: #0d1811; }
.member-slot strong { font-size: 13px; }
.member-slot small { font-size: 9px; color: var(--member-muted); }
.member-slot input:checked + span { border-color: var(--member-green); background: #1d4030; }
.member-slot input:focus-visible + span { outline: 2px solid var(--member-green); outline-offset: 3px; }
.member-slot.is-disabled { opacity: 0.4; cursor: not-allowed; }
.member-modal .member-reservation-details { grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; padding: 20px; border-radius: 12px; background: #0b140e; }
.member-app .member-callout { padding: 14px 16px; border-left: 2px solid var(--member-green); background: #29dba00a; color: #b4cbbd; font-size: 12px; }
.member-error { color: #ffb6a5; font-size: 12px; margin: 16px 0; min-height: 1em; }
.member-modal-actions { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid var(--member-border); padding-top: 20px; }
.member-alert { border: 1px solid #29dba033; border-radius: 18px; font-family: 'Segoe UI', Arial, sans-serif; }
.member-alert .swal2-title { font-size: 25px; }
.member-alert .swal2-confirm { color: #052419; font-weight: 600; }
.member-ticket { text-align: left; border-top: 1px dashed #a7c9b640; border-bottom: 1px dashed #a7c9b640; padding: 15px 0; }
.member-ticket p { display: flex; justify-content: space-between; gap: 14px; margin: 0 0 14px; font-size: 13px; }
.member-ticket p span { color: #a0b2a9; }
.member-ticket p strong { text-align: right; }
.member-ticket small { display: block; font-size: 10px; color: #a0b2a9; line-height: 1.6; margin-top: 20px; }

@media (max-width: 1100px) {
  .member-navbar-inner { gap: 24px; }
  .member-main-nav { gap: 16px; }
  .member-brand > span { font-size: 10px; }
  .member-account { gap: 10px; }
  .member-information-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .member-footer { margin: 0 32px; }
}

@media (max-width: 820px) {
  .member-navbar-inner { flex-wrap: wrap; gap: 16px; padding: 16px 24px; }
  .member-main-nav { order: 3; flex-basis: 100%; border-top: 1px solid var(--member-border); padding-top: 6px; }
  .member-main { padding: 0 24px 50px; }
  .member-welcome { padding-top: 36px; }
  .member-variety-image { height: 210px; }
  .member-variety-body { padding: 20px; }
  .member-variety-bottom { align-items: flex-start; flex-direction: column; }
  .member-variety-bottom .member-button { width: 100%; }
  .member-consumption { padding: 22px; gap: 18px; }
  .member-consumption-grid { grid-template-columns: 1fr; }
  .member-reservation-details { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .member-footer { margin: 0 24px; }
  .member-footer nav { margin-left: 0; }
}

@media (max-width: 600px) {
  .member-navbar-inner { padding: 14px 18px; }
  .member-brand { gap: 5px; }
  .member-brand img { width: 42px; height: 42px; }
  .member-brand > span { font-size: 9px; }
  .member-brand small { font-size: 7px; }
  .member-account { font-size: 11px; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
  .member-account > span { display: none; }
  .member-logout { font-size: 9px; padding-left: 8px; }
  .member-logout small { font-size: 8px; }
  .member-avatar { width: 34px; height: 34px; }
  .member-main { padding-right: 18px; padding-left: 18px; }
  .member-demo { padding: 0 18px; font-size: 10px; }
  .member-welcome { align-items: flex-start; flex-direction: column; gap: 20px; }
  .member-member-number { padding: 8px 12px; }
  .member-member-number strong { display: inline; margin-left: 8px; }
  .member-section { margin-top: 36px; }
  .member-section-heading { flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 20px; }
  .member-variety-grid { grid-template-columns: 1fr; gap: 20px; }
  .member-variety-image { height: 230px; }
  .member-variety-bottom { flex-direction: row; align-items: center; }
  .member-variety-bottom .member-button { width: auto; }
  .member-information-grid { grid-template-columns: 1fr; gap: 12px; }
  .member-info-card { padding: 20px; }
  .member-info-card > span { margin-bottom: 12px; }
  .member-panel { padding: 20px; }
  .member-panel-heading { align-items: flex-start; flex-direction: column; }
  .member-empty { align-items: flex-start; gap: 14px; }
  .member-empty > span { width: 42px; height: 42px; }
  .member-reservation-details, .member-profile-details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .member-actions { flex-direction: column; }
  .member-modal { padding: 22px 18px; }
  .member-choice { gap: 12px; padding: 12px; }
  .member-choice img { width: 75px; height: 95px; }
  .member-modal-actions .member-button { padding: 10px 14px; font-size: 11px; }
  .member-footer { margin: 0 18px; }
  .member-footer nav { gap: 16px; }
}

@media (max-width: 360px) {
  .member-brand > span { display: none; }
  .member-slots { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .member-consumption { padding: 16px; gap: 14px; }
  .member-ring { flex-basis: 92px; width: 92px; height: 92px; }
  .member-ring > span { width: 78px; height: 78px; }
}

@media (prefers-reduced-motion: reduce) {
  .member-app *, .member-alert * { transition: none !important; animation: none !important; }
}
```

## src/components/LoginForm.jsx

```jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginWithUsername } from '../services/authService'

function LoginForm() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim() || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Ingresá tu usuario y contraseña.',
        confirmButtonColor: '#29dba0',
      })
      return
    }

    setLoading(true)

    try {
      const profile = await loginWithUsername(username, password)

      if (profile.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/reservas', { replace: true })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo ingresar',
        text: error.message || 'Verificá tus credenciales.',
        confirmButtonColor: '#29dba0',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-field">
        <label htmlFor="username">Usuario</label>

        <div className="login-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
          </svg>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="login-field">
        <label htmlFor="password">Contraseña</label>

        <div className="login-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>

          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            required
          />

          <button
            type="button"
            className="login-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" aria-hidden="true">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" aria-hidden="true">
                <path d="M3 3l18 18" />
                <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a16 16 0 0 1-3.1 3.7M6.2 6.2C3.5 8.1 2 12 2 12s4 7 10 7a10 10 0 0 0 4.3-.9" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        className="login-submit"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}

export default LoginForm
```

## src/components/admin/AdminForms.jsx

```jsx
import { useRef, useState } from 'react'
import { useAdmin } from './AdminProvider.jsx'
import { AdminModal } from './AdminUI.jsx'
import AdminPhotoInput from './AdminPhotoInput.jsx'
import { memberStatuses, nextMemberNumber, stockFor } from '../../utils/adminRules.js'
import { clubClock } from '../../utils/reservationRules.js'
import { expenseCategories } from '../../data/adminMock.js'

function FormActions({ error, onClose, label = 'Guardar simulación' }) {
  return <><p className="admin-error" role="alert">{error}</p><div className="admin-form-actions"><button type="button" className="admin-button admin-button--secondary" onClick={onClose}>Cancelar</button><button type="submit" className="admin-button">{label}</button></div></>
}

export function MemberEditor({ member, onClose }) {
  const { state, execute } = useAdmin()
  const password = useRef(null)
  const [draft, setDraft] = useState(member || { fullName: '', username: '', email: '', phone: '', address: '', status: 'active', photo: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('save-member', draft, member ? 'Datos del socio actualizados de forma simulada.' : 'Socio de ejemplo agregado. No se creó una cuenta ni se almacenó la contraseña.')
    if (message) { setError(message); return }
    if (password.current) password.current.value = ''
    onClose()
  }
  return <AdminModal title={member ? 'Editar socio' : 'Nuevo socio'} onClose={onClose} wide>
    <p className="admin-callout">{member ? 'Los cambios afectan únicamente esta demostración.' : 'Alta ficticia. No crea credenciales reales. El cambio obligatorio de contraseña en el primer ingreso quedará pendiente de la autenticación real.'}</p>
    <form onSubmit={submit} className="admin-form">
      <div className="admin-form-grid">
        <label className="admin-field">Nombre completo<input required maxLength={100} value={draft.fullName} onChange={(event) => update('fullName', event.target.value)} /></label>
        <label className="admin-field">Usuario<input required maxLength={50} autoComplete="off" value={draft.username} onChange={(event) => update('username', event.target.value)} /></label>
        <label className="admin-field">Correo electrónico<input required type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label className="admin-field">Teléfono<input required type="tel" value={draft.phone} onChange={(event) => update('phone', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Dirección<input required value={draft.address} onChange={(event) => update('address', event.target.value)} /></label>
        <label className="admin-field">Número de socio<input readOnly value={member?.number ?? nextMemberNumber(state.members)} /></label>
        <label className="admin-field">Estado{!member && ' inicial'}<select value={draft.status} onChange={(event) => update('status', event.target.value)}>{Object.entries(memberStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        {!member && <label className="admin-field admin-span-2">Contraseña temporal · no se almacena<input ref={password} required type="password" minLength={8} autoComplete="new-password" placeholder="Mínimo 8 caracteres; solo para probar el formulario" /></label>}
      </div>
      <AdminPhotoInput value={draft.photo} onChange={(value) => update('photo', value)} />
      <FormActions error={error} onClose={onClose} label={member ? 'Guardar cambios simulados' : 'Agregar socio ficticio'} />
    </form>
  </AdminModal>
}

export function VarietyEditor({ variety, onClose }) {
  const { execute } = useAdmin()
  const [draft, setDraft] = useState(variety ? { ...variety, characteristics: variety.characteristics.join(', ') } : { name: '', description: '', characteristics: '', price: '', image: '', published: true })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('save-variety', { ...draft, price: Number(draft.price), characteristics: draft.characteristics.split(',') }, 'Variedad guardada de forma simulada. El stock se administra con movimientos.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title={variety ? 'Editar variedad' : 'Agregar variedad'} onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Nombre<input required maxLength={80} value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
      <label className="admin-field">Descripción<textarea required rows={3} value={draft.description} onChange={(event) => update('description', event.target.value)} /></label>
      <label className="admin-field">Características · separadas por comas<input value={draft.characteristics} onChange={(event) => update('characteristics', event.target.value)} placeholder="Híbrida, Aroma cítrico, Cultivo interior" /></label>
      <label className="admin-field">Precio por gramo · UYU<input type="number" required min="0.01" step="0.01" value={draft.price} onChange={(event) => update('price', event.target.value)} /></label>
      <label className="admin-checkbox"><input type="checkbox" checked={draft.published} onChange={(event) => update('published', event.target.checked)} />Variedad activa / publicada</label>
      <AdminPhotoInput label="Fotografía de la variedad" value={draft.image} onChange={(value) => update('image', value)} />
      {!variety && <p className="admin-muted">La variedad comienza con 0 g. Agregá inventario desde Registrar movimiento.</p>}
      <FormActions error={error} onClose={onClose} />
    </form>
  </AdminModal>
}

export function StockMovementForm({ initialVarietyId, onClose }) {
  const { state, execute } = useAdmin()
  const [draft, setDraft] = useState({ varietyId: initialVarietyId || state.varieties[0]?.id || '', type: 'entry', quantity: '', reason: '', date: clubClock().date, cost: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('stock-movement', { ...draft, quantity: Number(draft.quantity), cost: Number(draft.cost) }, 'Movimiento de inventario simulado registrado.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title="Registrar movimiento de inventario" onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Variedad<select required value={draft.varietyId} onChange={(event) => update('varietyId', event.target.value)}>{state.varieties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <p className="admin-muted">Stock actual: {stockFor(state, draft.varietyId)} g</p>
      <label className="admin-field">Tipo<select value={draft.type} onChange={(event) => { update('type', event.target.value); update('quantity', '') }}><option value="entry">Entrada de stock</option><option value="adjustment">Ajuste de inventario</option><option value="purchase">Compra / adquisición</option></select></label>
      <label className="admin-field">Cantidad en gramos{draft.type === 'adjustment' && ' · positiva o negativa'}<input type="number" required step="0.01" min={draft.type === 'adjustment' ? undefined : '0.01'} value={draft.quantity} onChange={(event) => update('quantity', event.target.value)} /></label>
      <label className="admin-field">Fecha<input type="date" required max={clubClock().date} value={draft.date} onChange={(event) => update('date', event.target.value)} /></label>
      <label className="admin-field">Motivo<input required maxLength={180} value={draft.reason} onChange={(event) => update('reason', event.target.value)} /></label>
      {draft.type === 'purchase' && <><label className="admin-field">Importe total de la compra · UYU<input type="number" required min="0.01" step="0.01" value={draft.cost} onChange={(event) => update('cost', event.target.value)} /></label><p className="admin-callout">Se registrará un único gasto en Balance, vinculado a este movimiento. No lo registres nuevamente como gasto.</p></>}
      <FormActions error={error} onClose={onClose} />
    </form>
  </AdminModal>
}

export function ExpenseForm({ onClose }) {
  const { execute } = useAdmin()
  const [draft, setDraft] = useState({ date: clubClock().date, concept: '', category: 'Operación', amount: '', notes: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('expense', { ...draft, amount: Number(draft.amount) }, 'Gasto ficticio registrado. No se realizó ningún pago.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title="Registrar gasto ficticio" onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Fecha<input type="date" required max={clubClock().date} value={draft.date} onChange={(event) => update('date', event.target.value)} /></label>
      <label className="admin-field">Concepto<input required maxLength={160} value={draft.concept} onChange={(event) => update('concept', event.target.value)} /></label>
      <label className="admin-field">Categoría<select value={draft.category} onChange={(event) => update('category', event.target.value)}>{expenseCategories.filter((item) => item !== 'Compras de stock').map((category) => <option key={category}>{category}</option>)}</select></label>
      <label className="admin-field">Importe · UYU<input type="number" required min="0.01" step="0.01" value={draft.amount} onChange={(event) => update('amount', event.target.value)} /></label>
      <label className="admin-field">Observaciones<textarea rows={3} value={draft.notes} onChange={(event) => update('notes', event.target.value)} /></label>
      <p className="admin-muted">Las compras de inventario se registran desde Stock para evitar duplicaciones.</p>
      <FormActions error={error} onClose={onClose} label="Registrar gasto simulado" />
    </form>
  </AdminModal>
}
```

## src/components/admin/AdminLayout.jsx

```jsx
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import AdminProvider, { useAdmin } from './AdminProvider.jsx'
import { AdminAvatar, AdminIcon } from './AdminUI.jsx'
import { clubClock, formatDate } from '../../utils/reservationRules.js'
import '../../Style/Admin.css'

const navigation = [
  { to: '/admin', name: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/socios', name: 'Socios', icon: 'members' },
  { to: '/admin/stock', name: 'Stock', icon: 'stock' },
  { to: '/admin/balance', name: 'Balance', icon: 'balance' },
]

function AdminShell() {
  const { administrator, administrators, setAdminId, notice, clearNotice } = useAdmin()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const section = pathname.includes('configuracion') ? 'Configuración' : navigation.slice().reverse().find((item) => pathname.startsWith(item.to))?.name
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0) }, [pathname])

  return <div className="admin-app admin-shell">
    {menuOpen && <button className="admin-menu-backdrop" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
    <aside className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`} id="admin-sidebar" aria-label="Administración">
      <Link to="/admin" className="admin-brand"><img src="/logoclub.png" alt="" /><span>QUEBRANDO COGOS<small>ADMINISTRACIÓN</small></span></Link>
      <p className="admin-nav-caption">ESPACIO DE GESTIÓN</p>
      <nav className="admin-navigation" aria-label="Menú principal administrativo">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)}><AdminIcon name={item.icon} />{item.name}</NavLink>)}</nav>
      <div className="admin-sidebar-bottom">
        <NavLink className="admin-settings-link" to="/admin/configuracion" onClick={() => setMenuOpen(false)}><AdminIcon name="settings" />Configuración</NavLink>
        <div className="admin-identity"><AdminAvatar member={administrator} /><div><strong>{administrator.name}</strong><small>{administrator.role}</small></div></div>
        <label className="admin-switcher">Administrador de ejemplo<select value={administrator.id} onChange={(event) => setAdminId(event.target.value)}>{administrators.map((admin) => <option key={admin.id} value={admin.id}>{admin.name}</option>)}</select></label>
        <small className="admin-permissions-note">Los tres administradores tienen los mismos permisos.</small>
      </div>
    </aside>
    <div className="admin-workspace">
      <header className="admin-topbar"><div><button className="admin-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="admin-sidebar" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>☰</button><span>Administración <span aria-hidden="true">/</span> <strong>{section}</strong></span></div><span className="admin-topbar-date">{formatDate(clubClock().date)} · Uruguay</span></header>
      <div className="admin-demo"><span /> Modo demostración · Datos ficticios en memoria. Al recargar se reinician. No modifica el área del socio.</div>
      {notice && <div className="admin-notice" role="status"><span>{notice}</span><button onClick={clearNotice} aria-label="Cerrar aviso">×</button></div>}
      <main className="admin-main"><Outlet /></main>
      <footer className="admin-footer">Quebrando Cogos · Gestión interna de demostración · Sin operaciones reales ni procesamiento de pagos.</footer>
    </div>
  </div>
}

export default function AdminLayout() { return <AdminProvider><AdminShell /></AdminProvider> }
```

## src/components/admin/AdminPhotoInput.jsx

```jsx
import { useEffect, useId, useRef, useState } from 'react'

export default function AdminPhotoInput({ value, onChange, label = 'Fotografía' }) {
  const id = useId()
  const reader = useRef(null)
  const [error, setError] = useState('')
  useEffect(() => () => { reader.current?.abort() }, [])

  function selectPhoto(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Elegí una imagen JPG, PNG o WebP de hasta 5 MB.'); return
    }
    reader.current?.abort()
    const fileReader = new FileReader()
    reader.current = fileReader
    fileReader.onload = () => { onChange(String(fileReader.result)); setError('') }
    fileReader.onerror = () => setError('No pudimos leer la imagen. Probá con otra.')
    fileReader.readAsDataURL(file)
  }

  return <div className="admin-photo-input"><span className="admin-label">{label}</span><div className="admin-photo-controls">{value ? <img src={value} alt="Vista previa de la fotografía seleccionada" /> : <span className="admin-photo-placeholder" aria-hidden="true">＋</span>}<div><label className="admin-button admin-button--secondary" htmlFor={`${id}-camera`}>{value ? 'Repetir foto' : 'Tomar foto'}</label><input className="admin-file-input" id={`${id}-camera`} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={selectPhoto} /><label className="admin-button admin-button--secondary" htmlFor={`${id}-gallery`}>{value ? 'Reemplazar imagen' : 'Elegir de galería'}</label><input className="admin-file-input" id={`${id}-gallery`} type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />{value && <button type="button" className="admin-text-button" onClick={() => { reader.current?.abort(); onChange('') }}>Quitar imagen</button>}</div></div><small className="admin-muted">Imagen local y temporal. JPG, PNG o WebP, hasta 5 MB. En móviles compatibles, “Tomar foto” abre la cámara; en otros equipos se abre el selector de archivos.</small>{error && <p className="admin-error" role="alert">{error}</p>}</div>
}
```

## src/components/admin/AdminProvider.jsx

```jsx
import { createContext, useContext, useRef, useState } from 'react'
import { createAdminMock, mockAdministrators } from '../../data/adminMock.js'
import { applyAdminAction } from '../../utils/adminRules.js'

const AdminContext = createContext(null)
export function useAdmin() { return useContext(AdminContext) }

export default function AdminProvider({ children }) {
  const [state, setState] = useState(createAdminMock)
  const currentState = useRef(state)
  const [adminId, setAdminId] = useState(mockAdministrators[0].id)
  const [notice, setNotice] = useState('')
  const administrator = mockAdministrators.find((item) => item.id === adminId)

  function execute(type, payload, message = 'Cambio guardado en la demostración.') {
    try {
      const next = applyAdminAction(currentState.current, { type, payload, adminId, id: crypto.randomUUID() })
      currentState.current = next
      setState(next)
      setNotice(`${message} Solo durante esta sesión; no se modificó Supabase.`)
      return ''
    } catch (error) {
      return error.message
    }
  }

  return <AdminContext.Provider value={{ state, administrator, administrators: mockAdministrators, setAdminId, execute, notice, clearNotice: () => setNotice('') }}>{children}</AdminContext.Provider>
}
```

## src/components/admin/AdminReservations.jsx

```jsx
import { Link } from 'react-router-dom'
import { useAdmin } from './AdminProvider.jsx'
import { AdminBadge, AdminModal, AdminTable } from './AdminUI.jsx'
import { adminAlert, confirmSimulation } from './adminAlerts.js'
import { reservationStatuses } from '../../utils/adminRules.js'
import { formatDate, money } from '../../utils/reservationRules.js'

export function ReservationTable({ reservations, onSelect, showMember = true }) {
  const { state } = useAdmin()
  const columns = [
    { key: 'date', label: 'Fecha / hora', render: (item) => <>{formatDate(item.date)}<small>{item.time} h · {item.id}</small></> },
    ...showMember ? [{ key: 'memberId', label: 'Socio', render: (item) => <Link className="admin-inline-link" to={`/admin/socios/${item.memberId}`}>{state.members.find((member) => member.id === item.memberId)?.fullName || 'Socio no disponible'}</Link> }] : [],
    { key: 'varietyName', label: 'Variedad' }, { key: 'grams', label: 'Cantidad', render: (item) => `${item.grams} g` },
    { key: 'status', label: 'Estado', render: (item) => <AdminBadge tone={item.status === 'cancelled' ? 'muted' : item.status === 'confirmed' ? 'warning' : ''}>{reservationStatuses[item.status]}</AdminBadge> },
    { key: 'actions', label: 'Acciones', render: (item) => <button className="admin-text-button" onClick={() => onSelect(item)}>Ver detalle →</button> },
  ]
  return <AdminTable caption="Reservas y entregas de demostración" columns={columns} rows={reservations} />
}

export function ReservationDialog({ reservationId, onClose }) {
  const { state, execute } = useAdmin()
  const reservation = state.reservations.find((item) => item.id === reservationId)
  const member = state.members.find((item) => item.id === reservation?.memberId)
  if (!reservation) return null
  async function complete() {
    onClose()
    if (!await confirmSimulation('¿Simular la entrega?', `La reserva ${reservation.id} pasará a completada, descontará stock y registrará consumo e ingreso ficticio.`)) return
    const error = execute('complete-delivery', { reservationId }, 'Entrega simulada: consumo, stock e ingreso actualizados una sola vez.')
    if (error) adminAlert({ icon: 'warning', title: 'No se pudo simular la entrega', text: error })
  }
  return <AdminModal title={`Reserva ${reservation.id}`} onClose={onClose}>
    <AdminBadge tone={reservation.status === 'confirmed' ? 'warning' : reservation.status === 'cancelled' ? 'muted' : ''}>{reservationStatuses[reservation.status]}</AdminBadge>
    <dl className="admin-details-grid">
      {[['Socio', member?.fullName], ['Número de socio', member?.number], ['Variedad', reservation.varietyName], ['Cantidad', `${reservation.grams} g`], ['Retiro previsto', `${formatDate(reservation.date)} · ${reservation.time} h`], ['Importe de ejemplo', money(reservation.grams * reservation.price)]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      {reservation.deliveredAt && <div><dt>Entrega realizada</dt><dd>{formatDate(reservation.deliveredAt)}</dd></div>}
    </dl>
    <p className="admin-callout">Una reserva pendiente no representa consumo ni ingreso. Toda operación de esta vista es ficticia y no procesa pagos.</p>
    <div className="admin-form-actions"><Link className="admin-button admin-button--secondary" to={`/admin/socios/${member?.id}`} onClick={onClose}>Ver ficha del socio</Link>{reservation.status === 'confirmed' && <button className="admin-button" onClick={complete}>Simular entrega</button>}</div>
  </AdminModal>
}
```

## src/components/admin/AdminUI.jsx

```jsx
import { useEffect, useRef } from 'react'
import { consumptionFor, clubClock } from '../../utils/reservationRules.js'

export function AdminIcon({ name }) {
  const paths = {
    dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    members: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    stock: 'M12 3 3 8v9l9 5 9-5V8z M3 8l9 5 9-5 M12 13v9 M8 5l9 5',
    balance: 'M3 20h18 M6 16V9 M12 16V4 M18 16v-5',
    settings: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.dashboard} /></svg>
}

export function AdminAvatar({ member, large = false }) {
  const initials = member.initials || member.fullName?.split(' ').map((word) => word[0]).slice(0, 2).join('') || 'QC'
  return member.photo
    ? <img className={`admin-avatar ${large ? 'admin-avatar--large' : ''}`} src={member.photo} alt={`Fotografía de ${member.fullName || member.name}`} />
    : <span className={`admin-avatar ${large ? 'admin-avatar--large' : ''}`} role="img" aria-label={`Avatar de ${member.fullName || member.name}`}>{initials}</span>
}

export function AdminHeading({ eyebrow, title, description, children }) {
  return <div className="admin-page-heading"><div><p className="admin-eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="admin-muted">{description}</p>}</div>{children}</div>
}

export function AdminBadge({ tone = '', children }) {
  return <span className={`admin-badge ${tone ? `admin-badge--${tone}` : ''}`}>{children}</span>
}

export function AdminTable({ columns, rows, caption, empty = 'No hay registros para estos filtros.' }) {
  return <div className="admin-table-scroll"><table className="admin-table"><caption className="admin-sr-only">{caption}</caption><thead><tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}{rows.length === 0 && <tr><td colSpan={columns.length} className="admin-empty">{empty}</td></tr>}</tbody></table></div>
}

export function AdminModal({ title, onClose, children, wide = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    const previous = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = previous }
  }, [])
  return <dialog className={`admin-app admin-modal ${wide ? 'admin-modal--wide' : ''}`} ref={ref} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose() }}><div className="admin-modal-heading"><h2>{title}</h2><button type="button" className="admin-close" onClick={onClose} aria-label="Cerrar ventana">×</button></div>{children}</dialog>
}

export function AdminConsumption({ reservations, limits, monthlyOnly = false }) {
  const consumption = consumptionFor(reservations, clubClock().date, limits)
  const rings = [
    { title: 'Consumo mensual', value: consumption.monthly, limit: limits.monthly, remaining: consumption.monthlyRemaining },
    ...monthlyOnly ? [] : [{ title: 'Consumo anual', value: consumption.annual, limit: limits.annual, remaining: consumption.annualRemaining }],
  ]
  return <div className="admin-consumption-grid">{rings.map((ring) => <article className="admin-consumption" key={ring.title}><div className="admin-ring" style={{ '--progress': `${Math.min(100, ring.value / ring.limit * 100)}%` }} role="img" aria-label={`${ring.title}: ${ring.value} de ${ring.limit} gramos`}><span><strong>{ring.value}<small> g</small></strong><small>de {ring.limit} g</small></span></div><div><h3>{ring.title}</h3><p><strong>{ring.remaining} g</strong> disponibles</p><small>Solo entregas completadas</small></div></article>)}</div>
}

export function matchesSearch(member, query) {
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return normalize(`${member.fullName} ${member.username} ${member.number} ${member.phone}`).includes(normalize(query.trim()))
}
```

## src/components/admin/adminAlerts.js

```javascript
import Swal from 'sweetalert2'

export function adminAlert(options) {
  return Swal.fire({ background: '#121d18', color: '#eef5f0', confirmButtonColor: '#29dba0', cancelButtonColor: '#34473e', customClass: { popup: 'admin-alert' }, ...options })
}

export async function confirmSimulation(title, text) {
  const result = await adminAlert({ icon: 'question', title, text: `${text} Acción ficticia, sin cambios en sistemas reales.`, showCancelButton: true, confirmButtonText: 'Confirmar simulación', cancelButtonText: 'Volver' })
  return result.isConfirmed
}
```

## src/components/member/ConsumptionIndicators.jsx

```jsx
import { useMember } from './MemberProvider.jsx'

function ConsumptionRing({ title, consumed, limit, remaining, period }) {
  const percentage = Math.min(100, Math.max(0, consumed / limit * 100))
  return (
    <article className="member-consumption">
      <div className="member-ring" style={{ '--progress': `${percentage}%` }} role="img" aria-label={`${title}: ${consumed} de ${limit} gramos, ${remaining} disponibles`}>
        <span><strong>{consumed}<small> g</small></strong><small>de {limit} g</small></span>
      </div>
      <div><p className="member-eyebrow">{period}</p><h3>{title}</h3><p><strong>{remaining} g</strong> disponibles</p></div>
    </article>
  )
}

export default function ConsumptionIndicators() {
  const { consumption, config } = useMember()
  const date = new Date()
  return (
    <div className="member-consumption-grid">
      <ConsumptionRing title="Consumo mensual" consumed={consumption.monthly} limit={config.limits.monthly} remaining={consumption.monthlyRemaining} period={date.toLocaleDateString('es-UY', { month: 'long', timeZone: 'America/Montevideo' })} />
      <ConsumptionRing title="Consumo anual" consumed={consumption.annual} limit={config.limits.annual} remaining={consumption.annualRemaining} period={date.toLocaleDateString('es-UY', { year: 'numeric', timeZone: 'America/Montevideo' })} />
    </div>
  )
}
```

## src/components/member/MemberLayout.jsx

```jsx
import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import MemberProvider, { useMember } from './MemberProvider.jsx'
import '../../Style/Member.css'

function MemberShell() {
  const { member } = useMember()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="member-app">
      <header className="member-navbar">
        <div className="member-navbar-inner">
          <Link className="member-brand" to="/reservas" aria-label="Quebrando Cogos, inicio">
            <img src="/logoclub.png" alt="" /><span>QUEBRANDO COGOS<small>CLUB CANNÁBICO</small></span>
          </Link>
          <nav className="member-main-nav" aria-label="Navegación del socio">
            <NavLink to="/reservas" end>Variedades</NavLink>
            <Link to="/reservas#mis-reservas">Mis reservas</Link>
          </nav>
          <div className="member-account">
            <span>Hola, <strong>{member.firstName}</strong></span>
            <Link className="member-avatar-link" to="/reservas/perfil" aria-label="Mi perfil">
              <img src={member.photo} alt="" className="member-avatar" /><span className="member-avatar-label">Mi perfil</span>
            </Link>
            <button className="member-logout" disabled title="Cerrar sesión estará disponible en una próxima etapa">Cerrar sesión <small>(próximamente)</small></button>
          </div>
        </div>
      </header>
      <div className="member-demo"><span /> Modo demostración · Datos ficticios. Los cambios se conservan solo mientras navegás en esta sesión.</div>
      <main className="member-main"><Outlet /></main>
      <footer className="member-footer">
        <div><strong>Quebrando Cogos</strong><p>Un club. Una comunidad.</p></div>
        <nav aria-label="Información del club">
          <a href="https://ircca.gub.uy/" target="_blank" rel="noreferrer">IRCCA ↗</a>
          <Link to="/reservas/informacion/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link to="/reservas/informacion/estatutos">Estatutos</Link>
          <Link to="/reservas/informacion/terminos">Términos y condiciones</Link>
        </nav>
        <small>Prototipo privado · Contenido del club pendiente de validación.</small>
      </footer>
    </div>
  )
}

export default function MemberLayout() {
  return <MemberProvider><MemberShell /></MemberProvider>
}
```

## src/components/member/MemberProvider.jsx

```jsx
import { createContext, useContext, useRef, useState } from 'react'
import { mockConfig, mockMember, mockOccupancy, mockReservations, mockVarieties } from '../../data/memberMock.js'
import { clubClock, consumptionFor, validateReservation } from '../../utils/reservationRules.js'
import ReservationModal from './ReservationModal.jsx'
import { memberAlert, showReservationTicket } from './memberAlerts.js'

const MemberContext = createContext(null)

export function useMember() {
  return useContext(MemberContext)
}

export default function MemberProvider({ children }) {
  const [reservations, setReservations] = useState(mockReservations)
  const [wizard, setWizard] = useState(null)
  const nextNumber = useRef(109)
  const active = reservations.find((item) => item.status === 'confirmed')
  const consumption = consumptionFor(reservations, clubClock().date, mockConfig.limits)
  const varieties = mockVarieties.map((item) => ({
    ...item, stock: item.stock - (active?.varietyId === item.id ? active.grams : 0),
  }))

  function editReservation() {
    if (active) setWizard({ editing: active, varietyId: active.varietyId })
  }

  async function reserve(varietyId) {
    if (active) {
      const result = await memberAlert({
        icon: 'info', title: 'Ya tenés una reserva activa',
        text: 'Podés editar tu reserva actual o cancelarla antes de crear otra.',
        showCancelButton: true, confirmButtonText: 'Editar mi reserva', cancelButtonText: 'Volver',
      })
      if (result.isConfirmed) editReservation()
      return
    }
    setWizard({ editing: null, varietyId })
  }

  function saveReservation(draft) {
    const error = validateReservation(draft, {
      varieties: mockVarieties, reservations, ...mockConfig,
      occupancy: mockOccupancy, editingId: wizard.editing?.id,
    })
    if (error) return error
    const variety = mockVarieties.find((item) => item.id === draft.varietyId)
    const reservation = {
      ...draft, id: wizard.editing?.id ?? `QC-${String(nextNumber.current++).padStart(4, '0')}`,
      varietyName: variety.name, price: variety.price, status: 'confirmed',
    }
    setReservations((previous) => wizard.editing
      ? previous.map((item) => item.id === reservation.id ? reservation : item)
      : [reservation, ...previous])
    setWizard(null)
    showReservationTicket(reservation, wizard.editing ? 'Reserva actualizada' : 'Reserva confirmada')
    return ''
  }

  async function cancelReservation() {
    if (!active) return
    const result = await memberAlert({
      icon: 'warning', title: '¿Cancelar tu reserva?',
      text: `La reserva ${active.id} quedará en tu historial como cancelada.`,
      showCancelButton: true, confirmButtonText: 'Sí, cancelar reserva', cancelButtonText: 'Conservar reserva',
    })
    if (result.isConfirmed) {
      setReservations((previous) => previous.map((item) => item.id === active.id ? { ...item, status: 'cancelled' } : item))
      memberAlert({ icon: 'success', title: 'Reserva cancelada', text: 'Ya podés crear una nueva reserva.', confirmButtonText: 'Entendido' })
    }
  }

  return (
    <MemberContext.Provider value={{ member: mockMember, config: mockConfig, varieties, reservations, active, consumption, reserve, editReservation, cancelReservation }}>
      {children}
      {wizard && (
        <ReservationModal
          key={wizard.editing?.id ?? wizard.varietyId}
          editing={wizard.editing}
          initialVarietyId={wizard.varietyId}
          varieties={mockVarieties}
          reservations={reservations}
          config={mockConfig}
          occupancy={mockOccupancy}
          onClose={() => setWizard(null)}
          onSave={saveReservation}
        />
      )}
    </MemberContext.Provider>
  )
}
```

## src/components/member/MemberReservations.jsx

```jsx
import { useMember } from './MemberProvider.jsx'
import { formatDate, money } from '../../utils/reservationRules.js'
import ReservationDetails from './ReservationDetails.jsx'
import { showReservationTicket } from './memberAlerts.js'

export default function MemberReservations() {
  const { active, reservations, editReservation, cancelReservation } = useMember()
  const history = reservations.filter((item) => item.status !== 'confirmed')
  return (
    <section id="mis-reservas" className="member-section">
      <div className="member-section-heading"><div><p className="member-eyebrow">A TU MEDIDA</p><h2>Mis reservas</h2></div><span className="member-muted">Todo en un mismo lugar.</span></div>
      <article className="member-panel member-current-reservation">
        <div className="member-panel-heading"><h3>Mi reserva actual</h3>{active && <span className="member-badge">Confirmada · {active.id}</span>}</div>
        {active ? <>
          <ReservationDetails reservation={active} />
          <p className="member-muted">Retiro pendiente. Una reserva confirmada no equivale a una entrega realizada.</p>
          <div className="member-actions">
            <button className="member-button" onClick={() => showReservationTicket(active)}>Ver ticket</button>
            <button className="member-button member-button--secondary" onClick={editReservation}>Editar reserva</button>
            <button className="member-button member-button--danger" onClick={cancelReservation}>Cancelar reserva</button>
          </div>
        </> : <div className="member-empty"><span aria-hidden="true">↗</span><div><h4>Tu próxima visita empieza acá</h4><p>No tenés una reserva activa. Elegí una variedad del catálogo para coordinar tu retiro.</p><a href="#variedades">Explorar variedades →</a></div></div>}
      </article>
      <article className="member-panel member-history">
        <div className="member-panel-heading"><h3>Historial</h3><span className="member-muted">{history.length} registros</span></div>
        <div className="member-table-wrap"><table>
          <caption className="member-sr-only">Reservas anteriores del socio</caption>
          <thead><tr><th>Fecha</th><th>Variedad</th><th>Cantidad</th><th>Importe estimado</th><th>Estado</th></tr></thead>
          <tbody>{history.map((item) => <tr key={item.id}>
            <td>{formatDate(item.date)}<small>{item.id}</small></td><td>{item.varietyName}</td><td>{item.grams} g</td><td>{money(item.grams * item.price)}</td>
            <td><span className={`member-badge ${item.status === 'cancelled' ? 'member-badge--cancelled' : ''}`}>{item.status === 'completed' ? 'Entrega completada' : 'Cancelada'}</span></td>
          </tr>)}</tbody>
        </table></div>
        <p className="member-muted">Solo las entregas completadas se incluyen en tus indicadores de consumo.</p>
      </article>
    </section>
  )
}
```

## src/components/member/ReservationDetails.jsx

```jsx
import { formatDate, money } from '../../utils/reservationRules.js'

export default function ReservationDetails({ reservation }) {
  return (
    <dl className="member-reservation-details">
      <div><dt>Variedad</dt><dd>{reservation.varietyName}</dd></div>
      <div><dt>Cantidad</dt><dd>{reservation.grams} g</dd></div>
      <div><dt>Fecha de retiro</dt><dd>{formatDate(reservation.date)}</dd></div>
      <div><dt>Horario</dt><dd>{reservation.time} h</dd></div>
      <div><dt>Importe estimado</dt><dd>{money(reservation.grams * reservation.price)}</dd></div>
    </dl>
  )
}
```

## src/components/member/ReservationModal.jsx

```jsx
import { useEffect, useRef, useState } from 'react'
import { availableSlots, clubClock, consumptionFor, money, validateReservation } from '../../utils/reservationRules.js'
import ReservationDetails from './ReservationDetails.jsx'

const steps = ['Variedad', 'Cantidad', 'Fecha y horario', 'Confirmación']

export default function ReservationModal({ editing, initialVarietyId, varieties, reservations, config, occupancy, onClose, onSave }) {
  const dialog = useRef(null)
  const heading = useRef(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState({
    varietyId: editing?.varietyId ?? initialVarietyId,
    grams: editing?.grams ?? 1, date: editing?.date ?? '', time: editing?.time ?? '',
  })
  const variety = varieties.find((item) => item.id === draft.varietyId)
  const clock = clubClock()
  const balance = consumptionFor(reservations, clock.date, config.limits)
  const pickupBalance = consumptionFor(reservations, draft.date || clock.date, config.limits)
  const available = Math.min(balance.available, pickupBalance.available)
  const maximum = Math.min(available, variety?.stock ?? 0)
  const slots = availableSlots(draft.date, config.schedule, occupancy, clock)

  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => { heading.current?.focus() }, [step])

  function update(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value, ...(field === 'date' ? { time: '' } : {}) }))
    setError('')
  }

  function validateStep() {
    if (!variety || variety.stock <= 0) return 'Elegí una variedad con stock.'
    if (step >= 1 && (!Number.isInteger(draft.grams) || draft.grams < 1 || draft.grams > maximum)) {
      return `Elegí una cantidad entera entre 1 y ${maximum} g. Si tu saldo es cero, no podés reservar.`
    }
    if (step >= 2) return validateReservation(draft, {
      varieties, reservations, ...config, occupancy, editingId: editing?.id, clock: clubClock(),
    })
    return ''
  }

  function handleSubmit(event) {
    event.preventDefault()
    const message = validateStep()
    if (message) { setError(message); return }
    if (step < 3) { setStep(step + 1); return }
    dialog.current.close()
    const saveError = onSave(draft)
    if (saveError) { dialog.current.showModal(); setError(saveError) }
  }

  return (
    <dialog ref={dialog} className="member-modal member-app" aria-labelledby="reservation-title" onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div className="member-modal-heading">
        <div><p className="member-eyebrow">{editing ? `EDITAR ${editing.id}` : 'TU PRÓXIMA VISITA'}</p><h2 id="reservation-title">{editing ? 'Editar reserva' : 'Nueva reserva'}</h2></div>
        <button type="button" className="member-close" onClick={onClose} aria-label="Cerrar ventana de reserva">×</button>
      </div>
      <ol className="member-steps" aria-label="Pasos de la reserva">{steps.map((label, index) => (
        <li key={label} className={index <= step ? 'is-current' : ''} aria-current={step === index ? 'step' : undefined}><span>{index + 1}</span><small>{label}</small></li>
      ))}</ol>
      <form onSubmit={handleSubmit} noValidate>
        <h3 ref={heading} tabIndex={-1} className="member-step-title">{steps[step]}</h3>
        {step === 0 && (
          <div className="member-step-content">
            <p className="member-muted">Elegí la variedad que querés reservar.</p>
            <label className="member-field">Variedad
              <select value={draft.varietyId} onChange={(event) => update('varietyId', event.target.value)}>
                {varieties.map((item) => <option key={item.id} value={item.id} disabled={item.stock <= 0}>{item.name}{item.stock <= 0 ? ' · Sin stock' : ''}</option>)}
              </select>
            </label>
            {variety && <div className="member-choice"><img src={variety.image} alt="" /><div><h4>{variety.name}</h4><p>{variety.description}</p><strong>{money(variety.price)} / g</strong></div></div>}
          </div>
        )}
        {step === 1 && (
          <div className="member-step-content">
            <label className="member-field">Cantidad en gramos
              <input type="number" min="1" max={maximum} step="1" inputMode="numeric" value={draft.grams} onChange={(event) => update('grams', event.target.value === '' ? '' : Number(event.target.value))} aria-describedby="quantity-balance reservation-error" />
            </label>
            <div className="member-quantity-info" id="quantity-balance">
              <p>Saldo disponible del socio <strong>{available} g</strong></p>
              <p>Stock de {variety.name} <strong>{variety.stock} g</strong></p>
              <p>Precio por gramo <strong>{money(variety.price)}</strong></p>
              <p>Cantidad solicitada <strong>{draft.grams || 0} g</strong></p>
              <p className="member-total">Total estimado <strong>{money((Number(draft.grams) || 0) * variety.price)}</strong></p>
            </div>
            <p className="member-muted">El saldo se calcula con las entregas completadas. La reserva no registra consumo ni procesa pagos.</p>
          </div>
        )}
        {step === 2 && (
          <div className="member-step-content">
            <p className="member-muted">{config.hoursLabel}. Turnos de una hora, hasta {config.schedule.capacity} socios por turno. Hora de Uruguay.</p>
            <label className="member-field">Fecha de retiro
              <input type="date" min={clock.date} value={draft.date} onChange={(event) => update('date', event.target.value)} aria-describedby="reservation-error" />
            </label>
            <fieldset className="member-slot-fieldset"><legend>Horarios disponibles</legend>
              {draft.date && slots.length === 0 && <p className="member-muted">No hay turnos para esta fecha. Elegí un día de lunes a sábado, sin fechas pasadas.</p>}
              {!draft.date && <p className="member-muted">Elegí una fecha para ver los turnos.</p>}
              <div className="member-slots">{slots.map((slot) => (
                <label key={slot.time} className={`member-slot ${slot.past || !slot.remaining ? 'is-disabled' : ''}`}>
                  <input type="radio" name="pickup-time" value={slot.time} checked={draft.time === slot.time} disabled={slot.past || !slot.remaining} onChange={() => update('time', slot.time)} />
                  <span><strong>{slot.time}</strong><small>{slot.past ? 'Finalizado' : slot.remaining ? `${slot.remaining} cupos` : 'Completo'}</small></span>
                </label>
              ))}</div>
            </fieldset>
          </div>
        )}
        {step === 3 && (
          <div className="member-step-content">
            <p className="member-muted">Revisá los datos de tu retiro antes de {editing ? 'guardar los cambios' : 'confirmar'}.</p>
            <ReservationDetails reservation={{ ...draft, varietyName: variety.name, price: variety.price }} />
            <p className="member-callout">Reserva ficticia. El importe es estimado y no se realiza ningún pago.</p>
          </div>
        )}
        <p id="reservation-error" className="member-error" role="alert">{error}</p>
        <div className="member-modal-actions">
          <button type="button" className="member-button member-button--secondary" onClick={() => { if (step === 0) onClose(); else { setStep(step - 1); setError('') } }}>{step === 0 ? 'Cancelar' : 'Anterior'}</button>
          <button type="submit" className="member-button">{step < 3 ? 'Continuar →' : editing ? 'Guardar cambios' : 'Confirmar reserva'}</button>
        </div>
      </form>
    </dialog>
  )
}
```

## src/components/member/VarietyCard.jsx

```jsx
import { money } from '../../utils/reservationRules.js'

export default function VarietyCard({ variety, onReserve }) {
  const available = variety.stock > 0
  return (
    <article className="member-variety-card">
      <div className="member-variety-image">
        <img src={variety.image} alt={`Fotografía ilustrativa de flores de ${variety.name}`} loading="lazy" />
        <span className={`member-badge ${available ? '' : 'member-badge--muted'}`}>{available ? '● Disponible' : 'Sin stock'}</span>
        <small className="member-photo-credit">Foto ilustrativa · {variety.imageCredit}</small>
      </div>
      <div className="member-variety-body">
        <p className="member-eyebrow">{variety.category}</p>
        <h3>{variety.name}</h3>
        <p className="member-description">{variety.description}</p>
        <ul className="member-tags">{variety.characteristics.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="member-variety-bottom">
          <div><strong>{money(variety.price)}<small> / g</small></strong><span>{available ? `${variety.stock} g en stock` : 'Próxima disponibilidad a confirmar'}</span></div>
          <button className="member-button" disabled={!available} onClick={() => onReserve(variety.id)}>Reservar <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>
  )
}
```

## src/components/member/memberAlerts.js

```javascript
import Swal from 'sweetalert2'
import { formatDate, money } from '../../utils/reservationRules.js'

export function memberAlert(options) {
  return Swal.fire({
    background: '#121c18', color: '#eef5f1', confirmButtonColor: '#29dba0',
    cancelButtonColor: '#34473e', customClass: { popup: 'member-alert' }, ...options,
  })
}

export function showReservationTicket(reservation, title = 'Reserva confirmada') {
  const ticket = document.createElement('div')
  ticket.className = 'member-ticket'
  const rows = [
    ['Número de reserva', reservation.id], ['Variedad', reservation.varietyName],
    ['Cantidad', `${reservation.grams} g`], ['Importe estimado', money(reservation.price * reservation.grams)],
    ['Fecha de retiro', formatDate(reservation.date)], ['Horario', `${reservation.time} h`],
  ]
  rows.forEach(([label, value]) => {
    const row = document.createElement('p')
    const name = document.createElement('span')
    const content = document.createElement('strong')
    name.textContent = label
    content.textContent = value
    row.append(name, content)
    ticket.append(row)
  })
  const note = document.createElement('small')
  note.textContent = 'Ticket de demostración · No acredita una entrega ni un pago.'
  ticket.append(note)
  return memberAlert({ title, html: ticket, confirmButtonText: 'Entendido' })
}
```

## src/data/adminMock.js

```javascript
import { mockConfig, mockVarieties, informationPages } from './memberMock.js'
import { clubClock, shiftDate } from '../utils/reservationRules.js'

const today = clubClock().date
const firstDay = `${today.slice(0, 7)}-01`

export const mockAdministrators = [
  { id: 'admin-1', name: 'Mar Demo', initials: 'MD', role: 'Administrador' },
  { id: 'admin-2', name: 'Sol Demo', initials: 'SD', role: 'Administrador' },
  { id: 'admin-3', name: 'Leo Demo', initials: 'LD', role: 'Administrador' },
]

const members = ['Alex', 'Dani', 'Cris', 'Sam', 'Fran', 'Val'].map((name, index) => ({
  id: `member-${index + 1}`, number: `QC-${String(index + 42).padStart(4, '0')}`,
  fullName: `${name} Demo`, username: `${name.toLowerCase()}.demo`,
  email: `${name.toLowerCase()}@example.com`, phone: `Teléfono de ejemplo ${index + 1}`,
  address: 'Dirección de ejemplo, Montevideo', joinedAt: '2025-03-10',
  status: index === 4 ? 'suspended' : index === 5 ? 'inactive' : 'active', photo: '',
}))

const varieties = mockVarieties.map((item, index) => ({ ...item, stock: index === 0 ? 85 : 18, published: true }))

const reservations = [
  { id: 'ADM-0101', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 8, price: 180, date: today, time: '11:00', status: 'confirmed' },
  { id: 'ADM-0102', memberId: 'member-2', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 5, price: 200, date: today, time: '14:00', status: 'confirmed' },
  { id: 'ADM-0103', memberId: 'member-3', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 4, price: 180, date: today, time: '10:00', status: 'completed', deliveredAt: today },
  { id: 'ADM-0090', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 10, price: 180, date: firstDay, time: '12:00', status: 'completed', deliveredAt: firstDay },
  { id: 'ADM-0080', memberId: 'member-2', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 12, price: 200, date: shiftDate(firstDay, -5), time: '11:00', status: 'completed', deliveredAt: shiftDate(firstDay, -5) },
  { id: 'ADM-0070', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 5, price: 180, date: shiftDate(firstDay, -8), time: '16:00', status: 'cancelled' },
]

const completed = reservations.filter((item) => item.status === 'completed')
const stockMovements = [
  ...varieties.map((item) => ({
    id: `opening-${item.id}`, varietyId: item.id, date: shiftDate(firstDay, -20), type: 'entry',
    quantity: item.stock + completed.filter((record) => record.varietyId === item.id).reduce((sum, record) => sum + record.grams, 0),
    reason: 'Saldo inicial de demostración', adminId: 'admin-1',
  })),
  ...completed.map((item) => ({ id: `stock-${item.id}`, varietyId: item.varietyId, date: item.deliveredAt, type: 'delivery', quantity: -item.grams, reason: `Entrega ${item.id}`, adminId: 'admin-2', reservationId: item.id })),
]

export const expenseCategories = ['Operación', 'Servicios', 'Mantenimiento', 'Compras de stock', 'Otros']

export function createAdminMock() {
  return structuredClone({
    members, varieties, reservations, stockMovements,
    finances: [
      ...completed.map((item) => ({ id: `income-${item.id}`, type: 'income', date: item.deliveredAt, concept: `Entrega ${item.id}`, category: 'Entregas', amount: item.grams * item.price, notes: 'Ingreso ficticio de una entrega completada.', reservationId: item.id, adminId: 'admin-2' })),
      { id: 'expense-1', type: 'expense', date: firstDay, concept: 'Servicios del espacio · ejemplo', category: 'Servicios', amount: 800, notes: 'Dato ficticio.', adminId: 'admin-1' },
      { id: 'expense-2', type: 'expense', date: shiftDate(firstDay, -5), concept: 'Mantenimiento · ejemplo', category: 'Mantenimiento', amount: 450, notes: 'Dato ficticio.', adminId: 'admin-3' },
    ],
    config: {
      clubName: 'Quebrando Cogos', description: 'Un club. Una comunidad. Información de demostración.',
      email: 'club@example.com', address: 'Dirección del club pendiente de confirmar',
      limits: mockConfig.limits, days: mockConfig.schedule.days, opening: '10:00', closing: '18:00', capacity: 4,
      lowStock: 20, faq: informationPages['preguntas-frecuentes'].sections.map((item) => `${item.title}\n${item.text}`).join('\n\n'),
      statutes: 'Documento de ejemplo. Estatutos oficiales pendientes de incorporación y validación por el club.',
      terms: 'Contenido de ejemplo sin carácter legal. Términos oficiales pendientes de validación.',
      communications: 'Bienvenidos al espacio del club. Esta comunicación es un ejemplo.',
    },
  })
}
```

## src/data/memberMock.js

```javascript
import { clubClock, shiftDate } from '../utils/reservationRules.js'

const today = clubClock().date
const monthStart = `${today.slice(0, 7)}-01`

// Todo este archivo contiene ejemplos. No representa datos reales del club.
export const mockMember = {
  firstName: 'Alex', fullName: 'Alex Demo', username: 'alex.demo', number: 'QC-0042',
  email: 'alex@example.com', phone: 'Teléfono de ejemplo', address: 'Dirección de ejemplo, Montevideo',
  joinedAt: '2025-03-10',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
}

export const mockConfig = {
  limits: { monthly: 40, annual: 480 },
  schedule: {
    days: [1, 2, 3, 4, 5, 6], capacity: 4,
    hours: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  },
  hoursLabel: 'Lunes a sábado · 10:00 a 18:00',
}

export const mockVarieties = [
  {
    id: 'verde-lima', name: 'Verde Lima', category: 'Selección del club · 01',
    description: 'Notas cítricas y un perfil herbal fresco. Una selección de flores cultivadas con cuidado, de principio a fin.',
    characteristics: ['Híbrida', 'Aroma cítrico', 'Cultivo interior'], price: 180, stock: 85,
    image: 'https://images.pexels.com/photos/3047447/pexels-photo-3047447.jpeg?auto=compress&cs=tinysrgb&w=1000',
    imageCredit: 'Yash Lucid / Pexels',
  },
  {
    id: 'noche-violeta', name: 'Noche Violeta', category: 'Selección del club · 02',
    description: 'Flores compactas de matices profundos, con notas terrosas y un delicado aroma dulce.',
    characteristics: ['Híbrida', 'Aroma terroso', 'Cultivo interior'], price: 200, stock: 0,
    image: 'https://images.pexels.com/photos/19826140/pexels-photo-19826140.jpeg?auto=compress&cs=tinysrgb&w=1000',
    imageCredit: 'Terrance Barksdale / Pexels',
  },
]

// Ocupación de otros socios: permite probar turnos completos y cupos parciales.
export const mockOccupancy = Object.fromEntries(Array.from({ length: 90 }, (_, index) => [
  shiftDate(today, index), { '10:00': 4, '11:00': 2, '12:00': 1, '15:00': 3 },
]))

export const mockReservations = [
  { id: 'QC-0108', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 8, price: 180, date: monthStart, time: '11:00', status: 'completed', deliveredAt: monthStart },
  { id: 'QC-0092', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 10, price: 200, date: shiftDate(monthStart, -8), time: '14:00', status: 'completed', deliveredAt: shiftDate(monthStart, -8) },
  { id: 'QC-0084', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 5, price: 180, date: shiftDate(monthStart, -16), time: '12:00', status: 'cancelled' },
]

export const clubInformation = [
  { number: '01', title: 'Nos encontramos en el club', text: mockConfig.hoursLabel },
  { number: '02', title: 'Un turno, una reserva', text: 'Elegí tu variedad, los gramos y un horario de retiro. Podés mantener una reserva activa y editarla antes de retirar.' },
  { number: '03', title: 'Tu retiro, sin vueltas', text: 'Acercate en el horario elegido con tu identificación y el número de reserva. El importe es estimado; esta aplicación no procesa pagos.' },
  { number: '04', title: 'Novedades de la comunidad', text: 'Este espacio reunirá las comunicaciones del club. Por ahora, todo el contenido mostrado es de demostración.' },
]

export const informationPages = {
  'preguntas-frecuentes': {
    title: 'Preguntas frecuentes', intro: 'Contenido de ejemplo para explorar la interfaz. Pendiente de validación por el club.',
    sections: [
      { title: '¿Cómo reservo?', text: 'Desde Nuestras variedades, elegí Reservar y completá los cuatro pasos. En esta demostración, las reservas duran solo durante la sesión de la página.' },
      { title: '¿Puedo modificar mi reserva?', text: 'Sí. Usá Editar reserva en Mi reserva actual. También podés cancelarla y luego crear otra.' },
      { title: '¿Cuándo se registra el consumo?', text: 'Solo cuando una entrega está completada. Una reserva confirmada o cancelada no suma consumo.' },
      { title: '¿Se puede pagar desde la aplicación?', text: 'No. Los importes se muestran como estimaciones y no se procesan pagos.' },
    ],
  },
  estatutos: {
    title: 'Estatutos del club', intro: 'Documento oficial pendiente de incorporación.',
    sections: [{ title: 'Espacio reservado', text: 'Esta vista es un ejemplo visual. No contiene estatutos aprobados ni establece obligaciones. El club incorporará aquí su documentación oficial.' }],
  },
  terminos: {
    title: 'Términos y condiciones', intro: 'Contenido de demostración, sin carácter legal definitivo.',
    sections: [{ title: 'Documento pendiente', text: 'Los términos oficiales deberán ser proporcionados y validados por el club antes de publicar esta aplicación. Esta pantalla no constituye un acuerdo legal.' }],
  },
}
```

## src/index.css

```css
﻿* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #030705; color: #eef5ee; }
button, input { font: inherit; }
```

## src/main.jsx

```jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

## src/pages/AdminPage.jsx

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../components/admin/AdminProvider.jsx'
import { AdminAvatar, AdminBadge, AdminConsumption, AdminHeading, AdminIcon, matchesSearch } from '../components/admin/AdminUI.jsx'
import { ReservationDialog, ReservationTable } from '../components/admin/AdminReservations.jsx'
import { clubClock } from '../utils/reservationRules.js'
import { stockFor } from '../utils/adminRules.js'

function AdminPage() {
  const { state } = useAdmin()
  const [query, setQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)
  const [reservationId, setReservationId] = useState(null)
  const today = clubClock().date
  const daily = state.reservations.filter((item) => item.date === today)
  const delivered = state.reservations.filter((item) => item.status === 'completed' && item.deliveredAt === today)
  const lowStock = state.varieties.filter((item) => stockFor(state, item.id) <= state.config.lowStock)
  const results = query.trim() ? state.members.filter((item) => matchesSearch(item, query)).slice(0, 6) : []
  const selected = state.members.find((item) => item.id === selectedMember)
  const metrics = [
    { title: 'Socios registrados', value: state.members.length, note: `${state.members.filter((item) => item.status === 'active').length} activos`, icon: 'members' },
    { title: 'Reservas del día', value: daily.length, note: 'Programadas para hoy', icon: 'dashboard' },
    { title: 'Entregas pendientes', value: state.reservations.filter((item) => item.status === 'confirmed').length, note: 'Reservas sin entregar', icon: 'stock' },
    { title: 'Variedades disponibles', value: state.varieties.filter((item) => item.published && stockFor(state, item.id) > 0).length, note: 'Publicadas y con stock', icon: 'stock' },
  ]
  return <>
    <AdminHeading eyebrow="EL CLUB, EN PERSPECTIVA" title="Dashboard" description="Una mirada a la actividad de hoy y a lo que viene." />
    <div className="admin-metrics">{metrics.map((metric) => <article className="admin-metric" key={metric.title}><div><span>{metric.title}</span><AdminIcon name={metric.icon} /></div><strong>{metric.value}</strong><small>{metric.note}</small></article>)}</div>
    <div className="admin-dashboard-grid">
      <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">AGENDA DE HOY</p><h2>Reservas del día</h2></div><AdminBadge>{daily.length} reservas</AdminBadge></div><ReservationTable reservations={daily} onSelect={(item) => setReservationId(item.id)} /></section>
      <aside className="admin-stack">
        <section className="admin-panel"><div className="admin-panel-heading"><h2>Stock bajo</h2><AdminBadge tone="warning">{lowStock.length}</AdminBadge></div>{lowStock.length ? lowStock.map((item) => <Link className="admin-stock-alert" key={item.id} to="/admin/stock"><span>{item.name}<small>Umbral: {state.config.lowStock} g</small></span><strong>{stockFor(state, item.id)} g ↗</strong></Link>) : <p className="admin-muted">Todas las variedades superan el umbral de alerta.</p>}</section>
        <section className="admin-panel admin-delivery-summary"><p className="admin-eyebrow">ENTREGAS REALIZADAS HOY</p><strong>{delivered.length}<small> entregas</small></strong><p>{delivered.reduce((sum, item) => sum + item.grams, 0)} g entregados</p><small className="admin-muted">Solo operaciones completadas de demostración.</small></section>
      </aside>
    </div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><div><p className="admin-eyebrow">ACCESO RÁPIDO</p><h2>Encontrá un socio</h2></div><Link className="admin-inline-link" to="/admin/socios">Ver todos →</Link></div>
      <label className="admin-field">Buscar por nombre, usuario o número<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelectedMember(null) }} placeholder="Por ejemplo, Alex o QC-0042" /></label>
      {query.trim() && !selected && <div className="admin-search-results">{results.map((member) => <button key={member.id} onClick={() => setSelectedMember(member.id)}><AdminAvatar member={member} /><span><strong>{member.fullName}</strong><small>{member.number} · {member.username}</small></span><span aria-hidden="true">↗</span></button>)}{!results.length && <p className="admin-muted">No encontramos socios con esa búsqueda.</p>}</div>}
      {selected && <div className="admin-quick-member"><div className="admin-person"><AdminAvatar member={selected} large /><div><h3>{selected.fullName}</h3><p>{selected.number} · {selected.username}</p><p>{selected.email} · {selected.phone}</p><Link className="admin-inline-link" to={`/admin/socios/${selected.id}`}>Abrir ficha completa →</Link></div></div><AdminConsumption reservations={state.reservations.filter((item) => item.memberId === selected.id)} limits={state.config.limits} monthlyOnly /></div>}
    </section>
    {reservationId && <ReservationDialog reservationId={reservationId} onClose={() => setReservationId(null)} />}
  </>
}

export default AdminPage
```

## src/pages/LoginPage.jsx

```jsx
import LoginForm from '../components/LoginForm.jsx'
import '../Style/Login.css'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">

        <img
          className="login-logo"
          src="/logoclub.png"
          alt="Quebrando Cogos, club cannábico"
        />

        <header className="login-header">
          <h1 id="login-title">LOGIN</h1>
        </header>

        <LoginForm />

      </section>
    </main>
  )
}

export default LoginPage
```

## src/pages/MemberInformationPage.jsx

```jsx
import { Link, useParams } from 'react-router-dom'
import { informationPages } from '../data/memberMock.js'

export default function MemberInformationPage() {
  const { slug } = useParams()
  const page = Object.hasOwn(informationPages, slug) ? informationPages[slug] : null
  return (
    <>
      <Link className="member-back" to="/reservas">← Volver al club</Link>
      <header className="member-page-heading"><p className="member-eyebrow">INFORMACIÓN DEL CLUB</p><h1>{page?.title ?? 'Contenido no disponible'}</h1><p className="member-callout">{page?.intro ?? 'No encontramos esta sección.'}</p></header>
      {page?.sections.map((section) => <section className="member-panel member-document" key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    </>
  )
}
```

## src/pages/MemberProfilePage.jsx

```jsx
import { Link } from 'react-router-dom'
import { useMember } from '../components/member/MemberProvider.jsx'
import ConsumptionIndicators from '../components/member/ConsumptionIndicators.jsx'
import { formatDate } from '../utils/reservationRules.js'

export default function MemberProfilePage() {
  const { member } = useMember()
  const details = [
    ['Nombre completo', member.fullName], ['Nombre de usuario', member.username], ['Número de socio', member.number],
    ['Correo electrónico', member.email], ['Teléfono', member.phone], ['Dirección', member.address], ['Fecha de ingreso', formatDate(member.joinedAt)],
  ]
  return (
    <>
      <Link className="member-back" to="/reservas">← Volver al club</Link>
      <header className="member-page-heading"><p className="member-eyebrow">TU ESPACIO PERSONAL</p><h1>Mi perfil</h1><p className="member-muted">Información de un socio ficticio para explorar la interfaz.</p></header>
      <section className="member-panel member-profile">
        <div className="member-profile-heading"><img className="member-avatar" src={member.photo} alt="Fotografía ilustrativa del perfil de demostración" /><div><h2>{member.fullName}</h2><span className="member-badge">Socio {member.number}</span></div></div>
        <dl className="member-profile-details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="member-section"><div className="member-section-heading"><h2>Mis indicadores de consumo</h2></div><ConsumptionIndicators /></section>
      <section className="member-panel member-password-section">
        <h2>Cambiar contraseña</h2><p className="member-muted">Vista previa. El cambio de credenciales todavía no está habilitado.</p>
        <fieldset disabled><legend className="member-sr-only">Cambio de contraseña no disponible</legend>
          <label className="member-field">Contraseña actual<input type="password" autoComplete="current-password" placeholder="No disponible en esta demostración" /></label>
          <label className="member-field">Nueva contraseña<input type="password" autoComplete="new-password" /></label>
          <label className="member-field">Confirmar nueva contraseña<input type="password" autoComplete="new-password" /></label>
          <button type="button" className="member-button">Guardar contraseña</button>
        </fieldset>
      </section>
    </>
  )
}
```

## src/pages/ReservasPage.jsx

```jsx
import { useMember } from '../components/member/MemberProvider.jsx'
import VarietyCard from '../components/member/VarietyCard.jsx'
import ConsumptionIndicators from '../components/member/ConsumptionIndicators.jsx'
import MemberReservations from '../components/member/MemberReservations.jsx'
import { clubInformation } from '../data/memberMock.js'

function ReservasPage() {
  const { member, varieties, reserve } = useMember()
  return (
    <>
      <section className="member-welcome">
        <div><p className="member-eyebrow">TU CLUB, MÁS CERCA</p><h1>Bienvenido a tu espacio<span>.</span></h1><p>Hola, {member.firstName}. Descubrí nuestras variedades y prepará tu próxima visita.</p></div>
        <span className="member-member-number">SOCIO <strong>{member.number}</strong></span>
      </section>
      <section id="variedades" className="member-section">
        <div className="member-section-heading"><div><p className="member-eyebrow">CULTIVADAS CON DEDICACIÓN</p><h2>Nuestras variedades</h2></div><span className="member-muted">Selección del club · Datos de ejemplo</span></div>
        <div className="member-variety-grid">{varieties.map((variety) => <VarietyCard key={variety.id} variety={variety} onReserve={reserve} />)}</div>
      </section>
      <section className="member-section">
        <div className="member-section-heading"><div><p className="member-eyebrow">CONECTADOS CON EL CLUB</p><h2>Información del club</h2></div></div>
        <div className="member-information-grid">{clubInformation.map((item) => <article className="member-info-card" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <section className="member-section" aria-labelledby="consumption-heading">
        <div className="member-section-heading"><div><p className="member-eyebrow">TUS ENTREGAS, EN PERSPECTIVA</p><h2 id="consumption-heading">Mi consumo</h2></div><span className="member-muted">Solo entregas completadas</span></div>
        <ConsumptionIndicators />
      </section>
      <MemberReservations />
    </>
  )
}

export default ReservasPage
```

## src/pages/admin/AdminBalancePage.jsx

```jsx
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
```

## src/pages/admin/AdminMemberDetailPage.jsx

```jsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminAvatar, AdminBadge, AdminConsumption, AdminHeading, AdminModal } from '../../components/admin/AdminUI.jsx'
import { MemberEditor } from '../../components/admin/AdminForms.jsx'
import { ReservationDialog, ReservationTable } from '../../components/admin/AdminReservations.jsx'
import { adminAlert, confirmSimulation } from '../../components/admin/adminAlerts.js'
import { memberStatuses } from '../../utils/adminRules.js'
import { formatDate } from '../../utils/reservationRules.js'

export default function AdminMemberDetailPage() {
  const { memberId } = useParams()
  const { state, execute } = useAdmin()
  const [editing, setEditing] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [reservationId, setReservationId] = useState(null)
  const member = state.members.find((item) => item.id === memberId)
  if (!member) return <><AdminHeading eyebrow="SOCIOS" title="Socio no encontrado" /><Link className="admin-inline-link" to="/admin/socios">← Volver a socios</Link></>
  const records = state.reservations.filter((item) => item.memberId === memberId)

  async function changeStatus(status) {
    if (!await confirmSimulation('¿Cambiar el estado del socio?', `${member.fullName} pasará a ${memberStatuses[status].toLowerCase()}.`)) return
    const error = execute('member-status', { memberId, status }, 'Estado del socio cambiado de forma simulada.')
    if (error) adminAlert({ icon: 'error', title: 'No se pudo cambiar el estado', text: error })
  }
  async function resetAccess() {
    if (!await confirmSimulation('¿Simular el restablecimiento de acceso?', 'No se generarán contraseñas, correos ni cambios reales de credenciales.')) return
    adminAlert({ icon: 'info', title: 'Restablecimiento simulado', text: 'Vista de demostración. No se generó ni se cambió ninguna contraseña.', confirmButtonText: 'Entendido' })
  }

  return <>
    <Link className="admin-inline-link" to="/admin/socios">← Volver a socios</Link>
    <AdminHeading eyebrow={`FICHA DEL SOCIO · ${member.number}`} title={member.fullName} description="Datos personales y actividad de demostración."><div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={resetAccess}>Restablecer acceso</button><button className="admin-button" onClick={() => setEditing(true)}>Editar datos</button></div></AdminHeading>
    <section className="admin-panel"><div className="admin-profile-top"><button className="admin-photo-zoom" onClick={() => setPhotoOpen(true)} aria-label="Ampliar fotografía del socio"><AdminAvatar member={member} large /><small>Ampliar ↗</small></button><div><h2>{member.fullName}</h2><p className="admin-muted">{member.number} · Desde {formatDate(member.joinedAt)}</p><AdminBadge tone={member.status === 'active' ? '' : 'warning'}>{memberStatuses[member.status]}</AdminBadge></div><label className="admin-field admin-status-control">Cambiar estado<select value={member.status} onChange={(event) => changeStatus(event.target.value)}>{Object.entries(memberStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      <dl className="admin-details-grid">{[['Nombre completo', member.fullName], ['Usuario', member.username], ['Número de socio', member.number], ['Correo', member.email], ['Teléfono', member.phone], ['Dirección', member.address]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
    <section className="admin-section"><AdminConsumption reservations={records} limits={state.config.limits} /><p className="admin-muted">Indicadores calculados a partir de entregas completadas; no se editan manualmente.</p></section>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Reserva actual</h2></div><ReservationTable reservations={records.filter((item) => item.status === 'confirmed')} onSelect={(item) => setReservationId(item.id)} showMember={false} /></section>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Historial de reservas y entregas</h2></div><ReservationTable reservations={records.filter((item) => item.status !== 'confirmed')} onSelect={(item) => setReservationId(item.id)} showMember={false} /></section>
    {editing && <MemberEditor member={member} onClose={() => setEditing(false)} />}
    {photoOpen && <AdminModal title={`Fotografía · ${member.fullName}`} onClose={() => setPhotoOpen(false)}>{member.photo ? <img className="admin-expanded-photo" src={member.photo} alt={`Fotografía de ${member.fullName}`} /> : <div className="admin-avatar-preview"><AdminAvatar member={member} large /><p className="admin-muted">Socio de ejemplo sin fotografía. Podés agregar una desde Editar datos.</p></div>}</AdminModal>}
    {reservationId && <ReservationDialog reservationId={reservationId} onClose={() => setReservationId(null)} />}
  </>
}
```

## src/pages/admin/AdminMembersPage.jsx

```jsx
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
```

## src/pages/admin/AdminSettingsPage.jsx

```jsx
import { useState } from 'react'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminHeading } from '../../components/admin/AdminUI.jsx'

const days = [[1, 'Lunes'], [2, 'Martes'], [3, 'Miércoles'], [4, 'Jueves'], [5, 'Viernes'], [6, 'Sábado'], [0, 'Domingo']]

export default function AdminSettingsPage() {
  const { state, execute } = useAdmin()
  const [draft, setDraft] = useState(() => structuredClone(state.config))
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('settings', draft, 'Configuración de ejemplo actualizada solo en el panel administrativo. No se publicó en el área del socio.')
    setError(message)
  }
  return <>
    <AdminHeading eyebrow="PREFERENCIAS DEL CLUB" title="Configuración" description="Mismos permisos para todos los administradores de demostración." />
    <p className="admin-callout">Configuración ficticia. Los valores se usan en este panel; la sincronización con el área del socio queda pendiente de Supabase. Los documentos no tienen carácter legal definitivo.</p>
    <form className="admin-settings-form" onSubmit={submit}>
      <fieldset className="admin-panel"><legend>Información general del club</legend><div className="admin-form-grid">
        <label className="admin-field">Nombre del club<input required value={draft.clubName} onChange={(event) => update('clubName', event.target.value)} /></label>
        <label className="admin-field">Correo de contacto<input type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Dirección<input value={draft.address} onChange={(event) => update('address', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Descripción<textarea rows={3} value={draft.description} onChange={(event) => update('description', event.target.value)} /></label>
      </div></fieldset>
      <fieldset className="admin-panel"><legend>Horarios de atención y cupos</legend><div className="admin-day-options">{days.map(([value, label]) => <label className="admin-checkbox" key={value}><input type="checkbox" checked={draft.days.includes(value)} onChange={(event) => update('days', event.target.checked ? [...draft.days, value] : draft.days.filter((day) => day !== value))} />{label}</label>)}</div><div className="admin-form-grid">
        <label className="admin-field">Apertura<input type="time" required step="3600" value={draft.opening} onChange={(event) => update('opening', event.target.value)} /></label>
        <label className="admin-field">Cierre<input type="time" required step="3600" value={draft.closing} onChange={(event) => update('closing', event.target.value)} /></label>
        <label className="admin-field">Socios por turno de una hora<input type="number" required min="1" step="1" value={draft.capacity} onChange={(event) => update('capacity', Number(event.target.value))} /></label>
      </div></fieldset>
      <fieldset className="admin-panel"><legend>Límites de consumo e inventario</legend><p className="admin-muted">Valores de ejemplo configurables. No modifican entregas ya registradas ni representan asesoramiento normativo.</p><div className="admin-form-grid">
        <label className="admin-field">Límite mensual · g<input type="number" required min="1" value={draft.limits.monthly} onChange={(event) => update('limits', { ...draft.limits, monthly: Number(event.target.value) })} /></label>
        <label className="admin-field">Límite anual · g<input type="number" required min="1" value={draft.limits.annual} onChange={(event) => update('limits', { ...draft.limits, annual: Number(event.target.value) })} /></label>
        <label className="admin-field">Alerta de stock bajo · g<input type="number" required min="0" value={draft.lowStock} onChange={(event) => update('lowStock', Number(event.target.value))} /></label>
      </div></fieldset>
      {[
        ['faq', 'Preguntas frecuentes', 'Contenido de ejemplo, pendiente de validación del club.'],
        ['statutes', 'Estatutos', 'Borrador visual. Incorporar únicamente los estatutos oficiales validados.'],
        ['terms', 'Términos y condiciones', 'Texto de ejemplo sin carácter legal definitivo.'],
        ['communications', 'Comunicaciones para socios', 'Preparado para una publicación futura; por ahora no se envía ni publica.'],
      ].map(([key, title, note]) => <fieldset className="admin-panel" key={key}><legend>{title}</legend><p className="admin-muted">{note}</p><label className="admin-field">Contenido de demostración<textarea rows={5} value={draft[key]} onChange={(event) => update(key, event.target.value)} /></label></fieldset>)}
      <p className="admin-error" role="alert">{error}</p><div className="admin-form-actions"><button type="button" className="admin-button admin-button--secondary" onClick={() => { setDraft(structuredClone(state.config)); setError('') }}>Descartar cambios sin guardar</button><button className="admin-button" type="submit">Guardar configuración simulada</button></div>
    </form>
  </>
}
```

## src/pages/admin/AdminStockPage.jsx

```jsx
import { useState } from 'react'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminBadge, AdminHeading, AdminTable } from '../../components/admin/AdminUI.jsx'
import { StockMovementForm, VarietyEditor } from '../../components/admin/AdminForms.jsx'
import { stockFor } from '../../utils/adminRules.js'
import { formatDate, money } from '../../utils/reservationRules.js'

const movementLabels = { entry: 'Entrada', adjustment: 'Ajuste', purchase: 'Compra', delivery: 'Entrega' }

export default function AdminStockPage() {
  const { state, execute, administrators } = useAdmin()
  const [editor, setEditor] = useState(null)
  const [movement, setMovement] = useState(null)
  const [varietyFilter, setVarietyFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const movements = state.stockMovements.filter((item) => (!varietyFilter || item.varietyId === varietyFilter) && (!typeFilter || item.type === typeFilter)).slice().sort((a, b) => b.date.localeCompare(a.date))
  const lowStock = state.varieties.filter((item) => stockFor(state, item.id) <= state.config.lowStock)
  return <>
    <AdminHeading eyebrow="VARIEDADES E INVENTARIO" title="Stock" description="Cada gramo tiene un movimiento. Inventario ficticio de la sesión."><div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={() => setMovement({})}>Registrar movimiento</button><button className="admin-button" onClick={() => setEditor({})}>＋ Agregar variedad</button></div></AdminHeading>
    {lowStock.length > 0 && <p className="admin-callout admin-callout--warning">Stock bajo: {lowStock.map((item) => `${item.name} (${stockFor(state, item.id)} g)`).join(' · ')}. Umbral de alerta: {state.config.lowStock} g.</p>}
    <div className="admin-varieties">{state.varieties.map((variety) => <article className="admin-panel admin-stock-card" key={variety.id}>
      {variety.image ? <img className="admin-stock-photo" src={variety.image} alt={`Fotografía ilustrativa de ${variety.name}`} /> : <div className="admin-stock-photo admin-stock-placeholder">Sin fotografía</div>}
      <div className="admin-panel-heading"><h2>{variety.name}</h2><AdminBadge tone={variety.published ? '' : 'muted'}>{variety.published ? 'Publicada' : 'Inactiva'}</AdminBadge></div>
      <p className="admin-muted">{variety.description}</p><ul className="admin-tags">{variety.characteristics.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
      <div className="admin-stock-numbers"><div><small>Stock actual</small><strong>{stockFor(state, variety.id)} g</strong></div><div><small>Precio por gramo</small><strong>{money(variety.price)}</strong></div></div>
      <div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={() => setEditor(variety)}>Editar variedad</button><button className="admin-text-button" onClick={() => execute('toggle-variety', { varietyId: variety.id }, 'Publicación de la variedad cambiada en la demostración.')}>{variety.published ? 'Desactivar' : 'Activar'}</button><button className="admin-text-button" onClick={() => setMovement({ varietyId: variety.id })}>Mover stock →</button></div>
    </article>)}</div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Historial de movimientos</h2><span className="admin-muted">Entradas, ajustes, compras y entregas</span></div>
      <div className="admin-filters"><label className="admin-field">Variedad<select value={varietyFilter} onChange={(event) => setVarietyFilter(event.target.value)}><option value="">Todas las variedades</option>{state.varieties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="admin-field">Tipo<select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="">Todos los movimientos</option>{Object.entries(movementLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      <AdminTable caption="Movimientos de inventario ficticios" rows={movements} columns={[
        { key: 'date', label: 'Fecha', render: (item) => formatDate(item.date) },
        { key: 'varietyId', label: 'Variedad', render: (item) => state.varieties.find((variety) => variety.id === item.varietyId)?.name },
        { key: 'type', label: 'Tipo', render: (item) => movementLabels[item.type] },
        { key: 'quantity', label: 'Cantidad', render: (item) => <span className={item.quantity > 0 ? 'admin-positive' : 'admin-negative'}>{item.quantity > 0 ? '+' : ''}{Number(item.quantity.toFixed(2))} g</span> },
        { key: 'reason', label: 'Motivo' }, { key: 'adminId', label: 'Responsable', render: (item) => administrators.find((admin) => admin.id === item.adminId)?.name },
      ]} />
    </section>
    {editor && <VarietyEditor variety={editor.id ? editor : null} onClose={() => setEditor(null)} />}
    {movement && <StockMovementForm initialVarietyId={movement.varietyId} onClose={() => setMovement(null)} />}
  </>
}
```

## src/router/AppRouter.jsx

```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage.jsx'

const AdminLayout = lazy(() => import('../components/admin/AdminLayout.jsx'))
const AdminPage = lazy(() => import('../pages/AdminPage.jsx'))
const AdminMembersPage = lazy(() => import('../pages/admin/AdminMembersPage.jsx'))
const AdminMemberDetailPage = lazy(() => import('../pages/admin/AdminMemberDetailPage.jsx'))
const AdminStockPage = lazy(() => import('../pages/admin/AdminStockPage.jsx'))
const AdminBalancePage = lazy(() => import('../pages/admin/AdminBalancePage.jsx'))
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage.jsx'))

const MemberLayout = lazy(() => import('../components/member/MemberLayout.jsx'))
const ReservasPage = lazy(() => import('../pages/ReservasPage.jsx'))
const MemberProfilePage = lazy(() => import('../pages/MemberProfilePage.jsx'))
const MemberInformationPage = lazy(() => import('../pages/MemberInformationPage.jsx'))

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/reservas" element={
        <Suspense fallback={<p role="status">Cargando el espacio del socio…</p>}>
          <MemberLayout />
        </Suspense>
      }>
        <Route index element={<ReservasPage />} />
        <Route path="perfil" element={<MemberProfilePage />} />
        <Route path="informacion/:slug" element={<MemberInformationPage />} />
      </Route>
      <Route path="/admin" element={
        <Suspense fallback={<p role="status">Cargando el panel administrativo…</p>}>
          <AdminLayout />
        </Suspense>
      }>
        <Route index element={<AdminPage />} />
        <Route path="socios" element={<AdminMembersPage />} />
        <Route path="socios/:memberId" element={<AdminMemberDetailPage />} />
        <Route path="stock" element={<AdminStockPage />} />
        <Route path="balance" element={<AdminBalancePage />} />
        <Route path="configuracion" element={<AdminSettingsPage />} />
        <Route path="*" element={<p>Sección no encontrada. Usá el menú para volver al panel.</p>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
```

## src/services/authService.js

```javascript
import { supabase } from "./supabaseClient";

export async function loginWithUsername(username, password) {
  const { data, error } = await supabase.functions.invoke(
    "login-with-username",
    {
      body: {
        username: username.trim().toLowerCase(),
        password,
      },
    }
  );

  if (error || !data?.session) {
    throw new Error(
      data?.error || "No se pudo iniciar sesión"
    );
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });

  if (sessionError) {
    throw new Error("No se pudo establecer la sesión");
  }

  return data.profile;
}
```

## src/services/supabaseClient.js

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## src/utils/adminRules.js

```javascript
import { clubClock, consumptionFor } from './reservationRules.js'

export const memberStatuses = { active: 'Activo', suspended: 'Suspendido', inactive: 'Inactivo' }
export const reservationStatuses = { confirmed: 'Pendiente de entrega', completed: 'Entrega completada', cancelled: 'Cancelada' }

function requireValue(condition, message) {
  if (!condition) throw new Error(message)
}

function validDate(date) {
  const parsed = new Date(`${date}T12:00:00Z`)
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
}

function positiveAmount(value) { return Number.isFinite(value) && value > 0 }

export function nextMemberNumber(members) {
  return `QC-${String(Math.max(0, ...members.map((item) => Number(item.number.replace('QC-', '')) || 0)) + 1).padStart(4, '0')}`
}

export function stockFor(state, varietyId) {
  return state.stockMovements.filter((item) => item.varietyId === varietyId).reduce((sum, item) => sum + item.quantity, 0)
}

export function financialSummary(finances, period) {
  const rows = finances.filter((item) => item.date.startsWith(period))
  const income = rows.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expense = rows.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  return { income, expense, result: income - expense }
}

// Transiciones puras y atómicas: ninguna acción llama al backend ni guarda datos en disco.
export function applyAdminAction(state, action, clock = clubClock()) {
  const { payload = {}, id, adminId } = action
  switch (action.type) {
    case 'save-member': {
      const editing = state.members.find((item) => item.id === payload.id)
      const fullName = String(payload.fullName ?? '').trim()
      const username = String(payload.username ?? '').trim().toLowerCase()
      const email = String(payload.email ?? '').trim().toLowerCase()
      requireValue(fullName && username && /^\S+@\S+\.\S+$/.test(email), 'Completá nombre, usuario y un correo válido.')
      requireValue(/^[a-z0-9._-]+$/.test(username), 'El usuario solo admite letras sin tildes, números, punto, guion y guion bajo.')
      requireValue(payload.phone?.trim() && payload.address?.trim(), 'Completá teléfono y dirección.')
      requireValue(Object.hasOwn(memberStatuses, payload.status), 'Seleccioná un estado válido.')
      requireValue(!state.members.some((item) => item.id !== editing?.id && (item.username === username || item.email.toLowerCase() === email)), 'El usuario o correo ya está en uso en la demostración.')
      // Lista explícita de campos: nunca se copia una contraseña al estado.
      const member = {
        id: editing?.id ?? id, number: editing?.number ?? nextMemberNumber(state.members),
        joinedAt: editing?.joinedAt ?? clock.date, fullName, username, email,
        phone: payload.phone.trim(), address: payload.address.trim(), status: payload.status, photo: payload.photo || '',
      }
      return { ...state, members: editing ? state.members.map((item) => item.id === member.id ? member : item) : [...state.members, member] }
    }
    case 'member-status': {
      requireValue(state.members.some((item) => item.id === payload.memberId), 'No se encontró el socio.')
      requireValue(Object.hasOwn(memberStatuses, payload.status), 'El estado no es válido.')
      return { ...state, members: state.members.map((item) => item.id === payload.memberId ? { ...item, status: payload.status } : item) }
    }
    case 'save-variety': {
      const editing = state.varieties.find((item) => item.id === payload.id)
      requireValue(payload.name?.trim() && payload.description?.trim(), 'Completá nombre y descripción.')
      requireValue(positiveAmount(payload.price), 'Ingresá un precio mayor a cero.')
      requireValue(!state.varieties.some((item) => item.id !== editing?.id && item.name.toLowerCase() === payload.name.trim().toLowerCase()), 'Ya existe una variedad con ese nombre.')
      const variety = {
        id: editing?.id ?? id, name: payload.name.trim(), description: payload.description.trim(),
        characteristics: payload.characteristics.map((item) => item.trim()).filter(Boolean),
        price: payload.price, image: payload.image || '', published: Boolean(payload.published),
      }
      return { ...state, varieties: editing ? state.varieties.map((item) => item.id === editing.id ? variety : item) : [...state.varieties, variety] }
    }
    case 'toggle-variety':
      return { ...state, varieties: state.varieties.map((item) => item.id === payload.varietyId ? { ...item, published: !item.published } : item) }
    case 'stock-movement': {
      requireValue(state.varieties.some((item) => item.id === payload.varietyId), 'Elegí una variedad existente.')
      requireValue(['entry', 'adjustment', 'purchase'].includes(payload.type), 'El tipo de movimiento no es válido.')
      requireValue(Number.isFinite(payload.quantity) && payload.quantity !== 0, 'Ingresá una cantidad diferente de cero.')
      requireValue(payload.type === 'adjustment' || payload.quantity > 0, 'Las entradas y compras deben ser positivas.')
      requireValue(stockFor(state, payload.varietyId) + payload.quantity >= 0, 'El movimiento dejaría el stock por debajo de cero.')
      requireValue(payload.reason?.trim(), 'Indicá el motivo del movimiento.')
      requireValue(validDate(payload.date) && payload.date <= clock.date, 'Ingresá una fecha válida, sin fechas futuras.')
      if (payload.type === 'purchase') requireValue(positiveAmount(payload.cost), 'Ingresá el importe total de la compra.')
      const movement = { id, varietyId: payload.varietyId, date: payload.date, type: payload.type, quantity: payload.quantity, reason: payload.reason.trim(), adminId }
      const finance = { id: `cost-${id}`, type: 'expense', date: payload.date, concept: payload.reason.trim(), category: 'Compras de stock', amount: payload.cost, notes: 'Compra ficticia asociada a un único movimiento de inventario.', stockMovementId: id, adminId }
      return { ...state, stockMovements: [...state.stockMovements, movement], finances: payload.type === 'purchase' ? [...state.finances, finance] : state.finances }
    }
    case 'complete-delivery': {
      const reservation = state.reservations.find((item) => item.id === payload.reservationId)
      requireValue(reservation?.status === 'confirmed', 'Esta reserva ya no está pendiente de entrega.')
      requireValue(reservation.date <= clock.date, 'No se puede entregar una reserva de una fecha futura.')
      const member = state.members.find((item) => item.id === reservation.memberId)
      requireValue(member?.status === 'active', 'El socio debe estar activo para simular una entrega.')
      requireValue(stockFor(state, reservation.varietyId) >= reservation.grams, 'No hay stock suficiente para la entrega.')
      const consumption = consumptionFor(state.reservations.filter((item) => item.memberId === member.id), clock.date, state.config.limits)
      requireValue(reservation.grams <= consumption.available, 'La entrega superaría el límite de consumo del socio.')
      const movement = { id: `stock-${reservation.id}`, varietyId: reservation.varietyId, date: clock.date, type: 'delivery', quantity: -reservation.grams, reason: `Entrega ${reservation.id}`, adminId, reservationId: reservation.id }
      const income = { id: `income-${reservation.id}`, type: 'income', date: clock.date, concept: `Entrega ${reservation.id}`, category: 'Entregas', amount: reservation.grams * reservation.price, notes: 'Ingreso simulado; no se procesó un pago.', adminId, reservationId: reservation.id }
      return {
        ...state,
        reservations: state.reservations.map((item) => item.id === reservation.id ? { ...item, status: 'completed', deliveredAt: clock.date } : item),
        stockMovements: [...state.stockMovements, movement], finances: [...state.finances, income],
      }
    }
    case 'expense': {
      requireValue(validDate(payload.date) && payload.date <= clock.date, 'Elegí una fecha válida, sin fechas futuras.')
      requireValue(payload.concept?.trim() && payload.category, 'Completá concepto y categoría.')
      requireValue(payload.category !== 'Compras de stock', 'Registrá las compras desde Stock para vincular inventario y gasto una sola vez.')
      requireValue(positiveAmount(payload.amount), 'Ingresá un importe mayor a cero.')
      return { ...state, finances: [...state.finances, { id, type: 'expense', date: payload.date, concept: payload.concept.trim(), category: payload.category, amount: payload.amount, notes: payload.notes?.trim() || '', adminId }] }
    }
    case 'settings': {
      requireValue(payload.clubName?.trim(), 'Ingresá el nombre del club.')
      requireValue(payload.days.length > 0 && payload.days.every((day) => Number.isInteger(day) && day >= 0 && day <= 6), 'Seleccioná al menos un día de atención.')
      requireValue(/^\d{2}:00$/.test(payload.opening) && /^\d{2}:00$/.test(payload.closing) && payload.opening < payload.closing && payload.closing <= '23:00', 'El cierre debe ser posterior a la apertura, en horas enteras.')
      requireValue(Number.isInteger(payload.capacity) && payload.capacity > 0, 'Los cupos deben ser un entero positivo.')
      requireValue(positiveAmount(payload.limits.monthly) && positiveAmount(payload.limits.annual) && payload.limits.annual >= payload.limits.monthly, 'Revisá los límites: deben ser positivos y el anual no puede ser menor al mensual.')
      requireValue(Number.isFinite(payload.lowStock) && payload.lowStock >= 0, 'El umbral de stock no puede ser negativo.')
      return { ...state, config: { ...payload } }
    }
    default: throw new Error('Acción de demostración no reconocida.')
  }
}
```

## src/utils/reservationRules.js

```javascript
export const CLUB_TIME_ZONE = 'America/Montevideo'

export function clubClock(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: CLUB_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(({ type, value }) => [type, value]))
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` }
}

export function shiftDate(date, days) {
  const value = new Date(`${date}T12:00:00Z`)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('es-UY', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T12:00:00Z`))
}

export function money(value) {
  return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(value)
}

export function consumptionFor(reservations, date, limits) {
  const completed = reservations.filter((item) => item.status === 'completed' && item.deliveredAt <= date)
  const sum = (prefix) => completed.filter((item) => item.deliveredAt.startsWith(prefix))
    .reduce((total, item) => total + item.grams, 0)
  const monthly = sum(date.slice(0, 7))
  const annual = sum(date.slice(0, 4))
  return {
    monthly, annual,
    monthlyRemaining: Math.max(0, limits.monthly - monthly),
    annualRemaining: Math.max(0, limits.annual - annual),
    available: Math.max(0, Math.min(limits.monthly - monthly, limits.annual - annual)),
  }
}

export function availableSlots(date, schedule, occupancy, clock = clubClock()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < clock.date) return []
  const parsed = new Date(`${date}T12:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return []
  const day = parsed.getUTCDay()
  if (!schedule.days.includes(day)) return []
  return schedule.hours.map((time) => ({
    time,
    remaining: Math.max(0, schedule.capacity - (occupancy[date]?.[time] ?? 0)),
    past: date === clock.date && time <= clock.time,
  }))
}

export function validateReservation(draft, { varieties, reservations, limits, schedule, occupancy, editingId, clock = clubClock() }) {
  if (reservations.some((item) => item.status === 'confirmed' && item.id !== editingId)) {
    return 'Ya tenés una reserva activa. Podés editarla desde Mi reserva actual.'
  }
  const variety = varieties.find((item) => item.id === draft.varietyId)
  if (!variety || variety.stock <= 0) return 'Elegí una variedad con stock.'
  if (!Number.isInteger(draft.grams) || draft.grams <= 0) return 'Ingresá una cantidad entera mayor a cero.'
  if (draft.grams > variety.stock) return 'La cantidad supera el stock disponible.'
  const todayBalance = consumptionFor(reservations, clock.date, limits)
  const pickupBalance = consumptionFor(reservations, draft.date || clock.date, limits)
  if (draft.grams > Math.min(todayBalance.available, pickupBalance.available)) {
    return 'La cantidad supera tu saldo mensual o anual disponible.'
  }
  const slot = availableSlots(draft.date, schedule, occupancy, clock).find((item) => item.time === draft.time)
  if (!slot || slot.past || slot.remaining <= 0) return 'Elegí una fecha y un turno con disponibilidad.'
  return ''
}
```

## tests/memberRendering.test.js

```javascript
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
```

## tests/reservationRules.test.js

```javascript
import test from 'node:test'
import assert from 'node:assert/strict'
import { availableSlots, clubClock, consumptionFor, validateReservation } from '../src/utils/reservationRules.js'

const limits = { monthly: 40, annual: 480 }
const schedule = { days: [1, 2, 3, 4, 5, 6], hours: ['10:00', '11:00', '17:00'], capacity: 4 }
const clock = { date: '2026-11-10', time: '10:30' }
const varieties = [{ id: 'available', stock: 50 }, { id: 'empty', stock: 0 }]
const occupancy = { '2026-11-11': { '10:00': 4, '11:00': 3 } }
const reservations = [
  { id: 'one', status: 'completed', grams: 8, deliveredAt: '2026-11-02' },
  { id: 'two', status: 'completed', grams: 10, deliveredAt: '2026-10-10' },
  { id: 'three', status: 'completed', grams: 15, deliveredAt: '2025-12-01' },
  { id: 'four', status: 'cancelled', grams: 20 },
]
const draft = { varietyId: 'available', grams: 5, date: '2026-11-11', time: '11:00' }
const options = { varieties, reservations, limits, schedule, occupancy, clock }

test('el reloj usa la fecha y hora de Uruguay al cruzar medianoche UTC', () => {
  assert.deepEqual(clubClock(new Date('2026-11-11T01:00:00Z')), { date: '2026-11-10', time: '22:00' })
})

test('solo las entregas completadas suman consumo en su mes y año', () => {
  const withPending = [...reservations, { status: 'confirmed', grams: 30 }]
  assert.deepEqual(consumptionFor(withPending, clock.date, limits), {
    monthly: 8, annual: 18, monthlyRemaining: 32, annualRemaining: 462, available: 32,
  })
})

test('no acepta fechas pasadas, domingos ni fechas inexistentes', () => {
  for (const date of ['2026-11-09', '2026-11-15', '2026-11-31', 'invalid']) {
    assert.deepEqual(availableSlots(date, schedule, occupancy, clock), [])
  }
})

test('los turnos diferencian cupos llenos y horas finalizadas', () => {
  const tomorrow = availableSlots('2026-11-11', schedule, occupancy, clock)
  assert.equal(tomorrow[0].remaining, 0)
  assert.equal(tomorrow[1].remaining, 1)
  assert.equal(availableSlots(clock.date, schedule, occupancy, clock)[0].past, true)
})

test('permite una reserva con stock, saldo y un turno disponible', () => {
  assert.equal(validateReservation(draft, options), '')
})

test('rechaza cantidades inválidas, falta de stock y exceso de saldo', () => {
  for (const grams of [0, -1, 1.5, NaN, '', 33, 51]) {
    assert.notEqual(validateReservation({ ...draft, grams }, options), '')
  }
  assert.notEqual(validateReservation({ ...draft, varietyId: 'empty' }, options), '')
  assert.notEqual(validateReservation({ ...draft, varietyId: 'unknown' }, options), '')
})

test('rechaza un segundo turno activo, pero permite editar el mismo identificador', () => {
  const withActive = { ...options, reservations: [...reservations, { id: 'active', status: 'confirmed', grams: 5 }] }
  assert.notEqual(validateReservation(draft, withActive), '')
  assert.equal(validateReservation(draft, { ...withActive, editingId: 'active' }), '')
  const cancelled = { ...options, reservations: [...reservations, { id: 'active', status: 'cancelled', grams: 5 }] }
  assert.equal(validateReservation(draft, cancelled), '')
})

test('rechaza turnos completos, finalizados, domingos y horas fuera de atención', () => {
  for (const change of [
    { time: '10:00' }, { time: '18:00' }, { date: '2026-11-15' },
    { date: '2026-11-09' }, { date: clock.date, time: '10:00' },
  ]) {
    assert.notEqual(validateReservation({ ...draft, ...change }, options), '')
  }
})

test('respeta también el límite anual y nunca muestra saldos negativos', () => {
  const annualRecords = [{ status: 'completed', grams: 478, deliveredAt: '2026-01-10' }]
  assert.notEqual(validateReservation(draft, { ...options, reservations: annualRecords }), '')
  const exceeded = consumptionFor([{ status: 'completed', grams: 500, deliveredAt: '2026-11-01' }], clock.date, limits)
  assert.equal(exceeded.available, 0)
  assert.equal(exceeded.monthlyRemaining, 0)
  assert.equal(exceeded.annualRemaining, 0)
})
```

## vite.config.js

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```
