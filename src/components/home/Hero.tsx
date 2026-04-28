'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full">
            🚀 Nuevo: Análisis automático con IA
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Entiende el boletín
            <br />
            <span className="text-orange-500">
              de tu hijo en 2 minutos
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sube el PDF del boletín y obtén análisis visual + recomendaciones personalizadas.
            Sin tecnicismos. Sin sorpresas.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-base font-medium h-12 px-8 rounded-lg transition-colors"
          >
            Comienza ahora
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#como-funciona"
            className="flex items-center justify-center text-gray-900 border border-gray-300 hover:border-gray-400 text-base font-medium h-12 px-8 rounded-lg transition-colors"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600 mb-16">
          {[
            'Privacidad 100% garantizada',
            'Análisis en segundos',
            'Desde €10/mes',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Demo Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wide">Ejemplo real de análisis</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-1">40</div>
              <div className="text-sm font-semibold text-green-700">✅ Superado</div>
              <div className="text-xs text-green-600 mt-1">áreas consolidadas</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
              <div className="text-3xl font-bold text-yellow-600 mb-1">7</div>
              <div className="text-sm font-semibold text-yellow-700">⚠️ En progreso</div>
              <div className="text-xs text-yellow-600 mt-1">áreas en desarrollo</div>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <div className="text-3xl font-bold text-red-500 mb-1">1</div>
              <div className="text-sm font-semibold text-red-700">🎯 Necesita apoyo</div>
              <div className="text-xs text-red-600 mt-1">área con atención</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm font-semibold text-blue-900 mb-2">💡 Recomendaciones personalizadas:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Como es muy social, usa <strong>lectura compartida</strong> en voz alta</li>
              <li>✓ Practica <strong>respiración</strong> cuando se frustra (5 min diarios)</li>
              <li>✓ <strong>Juegos cooperativos</strong> para trabajar las emociones</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
