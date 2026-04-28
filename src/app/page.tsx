import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/home/Hero'
import { ArrowRight, Upload, Brain, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Cómo funciona</h2>
          <p className="text-center text-gray-600 mb-12">Tres pasos. Menos de 2 minutos.</p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Upload, step: '1', title: 'Sube el PDF', desc: 'Arrastra o selecciona el boletín escolar de tu hijo', color: 'bg-orange-500' },
              { icon: Brain, step: '2', title: 'IA analiza', desc: 'Procesamos el documento y extraemos todos los datos en segundos', color: 'bg-blue-500' },
              { icon: BarChart3, step: '3', title: 'Obtén respuestas', desc: 'Fortalezas, áreas de mejora, evolución trimestral y recomendaciones', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className={`${item.color} text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Paso {item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Precio simple</h2>
          <p className="text-gray-600 mb-12">Sin sorpresas. Sin contratos largos.</p>

          <div className="bg-white rounded-2xl border-2 border-orange-500 p-8 shadow-lg max-w-sm mx-auto">
            <div className="text-4xl font-bold text-gray-900 mb-1">€10<span className="text-lg font-normal text-gray-500">/mes</span></div>
            <p className="text-gray-600 mb-6">Por familia. Todos los hijos incluidos.</p>
            <ul className="text-left space-y-3 mb-8 text-sm text-gray-700">
              {[
                'Análisis ilimitados de boletines',
                'Comparativa trimestral',
                'Recomendaciones personalizadas',
                'Historial completo del curso',
                'Cancela cuando quieras',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Empezar ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>© 2026 EducAI · Hecho con ❤️ para familias</p>
      </footer>
    </div>
  )
}
