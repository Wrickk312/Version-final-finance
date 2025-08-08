'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <section className="container py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Tu CFO externo in‑house.
        </h1>
        <p className="mt-4 text-neutral-400 max-w-2xl">
          Software de gestión financiera con dashboards, OCR, IA y conciliación bancaria.
          Hecho para pymes que quieren claridad y control.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="rounded-2xl bg-white text-black px-4 py-2 font-medium">Entrar</Link>
          <a href="#pricing" className="rounded-2xl border border-neutral-700 px-4 py-2">Ver precios</a>
        </div>
      </section>

      <section id="features" className="container py-12 grid md:grid-cols-3 gap-6">
        {[
          ['Dashboard financiero', 'KPIs clave: ingresos mes, YTD, deuda y más.'],
          ['Cuenta de explotación', 'Tabla pivotal por periodos y categorías.'],
          ['OCR avanzado', 'Carga masiva, validaciones IVA/retenciones y alertas.'],
          ['Conciliación bancaria', 'Importa Excel y sugiere matches automáticos.'],
          ['Repositorio tipo drive', 'Árbol por año/mes y nombres estandarizados.'],
          ['Asistente IA', 'Preguntas en lenguaje natural sobre tus datos.']
        ].map(([t,d])=> (
          <div key={t} className="rounded-2xl border border-neutral-800 p-6">
            <div className="text-lg font-semibold">{t}</div>
            <div className="text-neutral-400 mt-2">{d}</div>
          </div>
        ))}
      </section>

      <section className="container py-12">
        <div className="rounded-2xl border border-neutral-800 p-6">
          <div className="text-xl font-semibold">Testimonios</div>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {[
              ['María, COO', '“Por fin cierres mensuales sin dolor.”'],
              ['Javier, CEO', '“De la caja negra a la claridad total.”'],
              ['Laura, CFO', '“El OCR nos ahorra horas cada semana.”'],
            ].map(([n,q])=> (
              <div key={n} className="rounded-xl bg-neutral-900 p-4 text-sm">
                <div className="font-medium">{n}</div>
                <div className="text-neutral-400 mt-1">{q}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="container py-12">
        <div className="text-2xl font-semibold mb-6">Pricing</div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {price:'39€ / mes', bullets:[
              '100 facturas / mes',
              '5 GB almacenamiento',
              'OCT financial dashboard',
              'Soporte por mail'
            ]},
            {price:'59€ / mes', bullets:[
              '250 facturas / mes',
              '25 GB almacenamiento',
              'OCR financial dashboards',
              'Asistencia IA',
              'Soporte prioritario'
            ]},
            {price:'99€ / mes', bullets:[
              '500 facturas / mes',
              '100 GB almacenamiento',
              'OCR + Dashboard + IA',
              'Multiempresa (Pro)',
              'Soporte premium'
            ]},
          ].map(tier => (
            <div key={tier.price} className="rounded-2xl border border-neutral-800 p-6">
              <div className="text-xl font-semibold">{tier.price}</div>
              <ul className="mt-4 space-y-2 text-neutral-300">
                {tier.bullets.map(b=>(<li key={b}>• {b}</li>))}
              </ul>
              <div className="mt-6">
                <Link href="/login" className="rounded-xl bg-white text-black px-4 py-2 font-medium">Probar</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-2xl border border-neutral-800 p-6">
          <div className="text-xl font-semibold mb-2">Contacto</div>
          <form onSubmit={(e)=>{e.preventDefault(); alert('Gracias, te contactaremos por email.')}} className="grid md:grid-cols-3 gap-3">
            <input placeholder="Nombre" className="rounded-xl bg-neutral-900 px-3 py-2" />
            <input type="email" placeholder="Email" className="rounded-xl bg-neutral-900 px-3 py-2" />
            <button className="rounded-xl bg-white text-black px-4 py-2 font-medium">Enviar</button>
          </form>
        </div>
      </section>
    </div>
  )
}
