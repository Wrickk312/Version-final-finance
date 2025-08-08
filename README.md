# OCT CFO — Demo funcional (Next.js)

Demo sin backend real (usa `localStorage`), lista para correr localmente y desplegar en Vercel. 
Más adelante puedes conectar Supabase u otro proveedor para auth, DB y storage.

## Requisitos
- Node 18+

## Arranque

```bash
npm i
npm run dev
# abre http://localhost:3000
```

## Qué incluye
- Landing con pricing y políticas
- Login simulado (email + empresa) y área protegida
- Tabs: Dashboard, P&L, Impuestos, Ingresos, Gastos, Conciliación, Repositorio, Configuración
- Uploader drag&drop con OCR mock (nombres de archivo tipo `202504_PROVEEDOR_servicios.pdf`)
- Modo oscuro/claro (oscuro por defecto)
