'use client'

import { useState, useRef } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  LayoutDashboard, TrendingUp, Lightbulb, User,
  Upload, BookOpen, Brain, Music, Palette, Star,
  AlertCircle, Camera, ChevronRight, Award
} from 'lucide-react'

const evolucion = [
  { trimestre: 'T1', superado: 35, progreso: 8, atencion: 2 },
  { trimestre: 'T2', superado: 40, progreso: 7, atencion: 1 },
]

const fortalezas = [
  { icon: BookOpen, label: 'Expresión oral',        desc: 'Vocabulario rico, estructura correcta, buena memoria', color: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-100' },
  { icon: Brain,    label: 'Matemáticas y lógica',  desc: 'Números 1-6, conceptos espaciales, sumas gráficas',   color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100' },
  { icon: Music,    label: 'Música',                desc: 'Brilla con ritmo y movimiento',                        color: 'text-pink-500',   bg: 'bg-pink-50',   border: 'border-pink-100' },
  { icon: Star,     label: 'Inglés avanzado',       desc: 'Todo verde · evaluación 3 estrellas',                 color: 'text-amber-500',  bg: 'bg-amber-50',  border: 'border-amber-100' },
  { icon: Palette,  label: 'Creatividad artística', desc: 'Destacado en Reinarte y producciones plásticas',      color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
]

const recomendaciones = [
  { area: 'Lectura',           accion: 'Usa lectura compartida en voz alta — es muy social y aprende mejor así',              prioridad: 'alta' },
  { area: 'Gestión emocional', accion: 'Practica respiración 5 min cuando se frustra. Necesita apoyo adulto en conflictos',   prioridad: 'alta' },
  { area: 'Autonomía',         accion: 'Mejoró de T1 a T2 — refuerza hábitos de vestirse y organización',                    prioridad: 'media' },
  { area: 'Trabajo en grupo',  accion: 'Juegos cooperativos en casa para practicar ceder y negociar',                         prioridad: 'media' },
]

type Tab = 'resumen' | 'evolucion' | 'recomendaciones' | 'perfil'

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('resumen')
  const [photo, setPhoto] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-1.5 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900 text-lg">EducAI</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">Curso 2025-26</span>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">

        {/* RESUMEN */}
        {tab === 'resumen' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="relative w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-orange-200"
                >
                  {photo
                    ? <img src={photo} alt="Domenico" className="w-full h-full object-cover" />
                    : <span className="text-2xl font-bold text-orange-500">D</span>
                  }
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Domenico</h2>
                  <p className="text-xs text-gray-500">4 años · 2º EI · Arenales Reinado</p>
                  <p className="text-xs text-gray-400 mt-0.5">Tutora: Alicia Martín</p>
                </div>
              </div>
              <div className="flex gap-0.5 h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-green-500 rounded-l-full" style={{ width: '83%' }} />
                <div className="bg-amber-400" style={{ width: '15%' }} />
                <div className="bg-red-400 rounded-r-full" style={{ width: '2%' }} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: 40, label: 'Superado',    emoji: '✅', color: 'text-green-600', bg: 'bg-green-50' },
                  { n: 7,  label: 'En progreso', emoji: '⚠️', color: 'text-amber-600', bg: 'bg-amber-50' },
                  { n: 1,  label: 'Con apoyo',   emoji: '🎯', color: 'text-red-500',   bg: 'bg-red-50' },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} rounded-xl py-3 text-center`}>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.n}</div>
                    <div className="text-[10px] font-medium text-gray-500 mt-0.5">{s.emoji} {s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide mb-1.5">Tutora · 2º Trimestre</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                &ldquo;Dome progresa adecuadamente en todas las áreas. Destaca en expresión oral con vocabulario rico y buena memoria. Cada vez más interesado en la lectura y más maduro e independiente.&rdquo;
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">🌟 Fortalezas</p>
              <div className="space-y-2">
                {fortalezas.map(f => (
                  <div key={f.label} className={`${f.bg} ${f.border} border rounded-2xl p-4 flex items-center gap-3`}>
                    <f.icon className={`w-5 h-5 ${f.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{f.label}</p>
                      <p className="text-xs text-gray-500 truncate">{f.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-white border-2 border-dashed border-orange-200 rounded-2xl p-5 flex flex-col items-center gap-2">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Upload className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Subir 3er trimestre</p>
              <p className="text-xs text-gray-400">Toca para seleccionar el PDF</p>
            </button>
          </>
        )}

        {/* EVOLUCIÓN */}
        {tab === 'evolucion' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-1">Evolución T1 → T2</h3>
              <p className="text-xs text-gray-500 mb-5">+5 áreas superadas · redujo de 2 a 1 con apoyo</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={evolucion} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="trimestre" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="superado" stroke="#22c55e" name="Superado" strokeWidth={2.5} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="progreso" stroke="#f59e0b" name="En progreso" strokeWidth={2.5} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="atencion" stroke="#ef4444" name="Con apoyo" strokeWidth={2.5} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TrendingUp, val: '+5',  label: 'más superadas',  color: 'text-green-600', bg: 'bg-green-50' },
                { icon: Award,      val: '3⭐', label: 'Inglés avanzado', color: 'text-amber-600', bg: 'bg-amber-50' },
                { icon: TrendingUp, val: '-1',  label: 'área con apoyo', color: 'text-blue-600',  bg: 'bg-blue-50' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                  <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">Patrón detectado</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Domenico aprende mejor cuando algo le <strong>motiva intrínsecamente</strong>. Conecta los ejercicios con sus intereses para mejores resultados.
              </p>
            </div>
          </>
        )}

        {/* RECOMENDACIONES */}
        {tab === 'recomendaciones' && (
          <>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
              <p className="text-sm text-orange-800 leading-relaxed">
                <strong>💡 Clave:</strong> Dome aprende mejor cuando algo le motiva. Conecta siempre los ejercicios con sus intereses.
              </p>
            </div>
            <div className="space-y-3">
              {recomendaciones.map(r => (
                <div key={r.area} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${r.prioridad === 'alta' ? 'text-orange-500' : 'text-blue-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{r.area}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.prioridad === 'alta' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {r.prioridad === 'alta' ? 'Prioritario' : 'Recomendado'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.accion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PERFIL */}
        {tab === 'perfil' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center gap-4">
              <button
                onClick={() => fileRef.current?.click()}
                className="relative w-28 h-28 rounded-3xl bg-orange-100 flex items-center justify-center overflow-hidden border-4 border-orange-200"
              >
                {photo
                  ? <img src={photo} alt="Foto" className="w-full h-full object-cover" />
                  : <span className="text-5xl font-bold text-orange-400">D</span>
                }
                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-tl-xl rounded-br-2xl">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <div className="text-center">
                <p className="font-bold text-xl text-gray-900">Domenico</p>
                <p className="text-sm text-gray-500">4 años · 2º Educación Infantil</p>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="text-sm text-orange-500 font-semibold border border-orange-200 px-4 py-2 rounded-xl"
              >
                Cambiar foto
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Información escolar</p>
              <div className="space-y-3">
                {[
                  { label: 'Colegio',        value: 'Arenales Reinado' },
                  { label: 'Tutora',         value: 'Alicia Martín Castellote' },
                  { label: 'Curso',          value: '2025 – 2026' },
                  { label: 'Último boletín', value: '2º Trimestre · Mar 2026' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Resumen del curso</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Boletines analizados', value: '2',   color: 'text-orange-500' },
                  { label: 'Áreas superadas (T2)', value: '40',  color: 'text-green-600' },
                  { label: 'Inglés',               value: '3 ⭐', color: 'text-amber-500' },
                  { label: 'Mejora T1→T2',         value: '+5',  color: 'text-blue-600' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100">
        <div className="flex">
          {([
            { id: 'resumen',         icon: LayoutDashboard, label: 'Resumen' },
            { id: 'evolucion',       icon: TrendingUp,      label: 'Evolución' },
            { id: 'recomendaciones', icon: Lightbulb,       label: 'Consejos' },
            { id: 'perfil',          icon: User,            label: 'Perfil' },
          ] as { id: Tab; icon: React.ElementType; label: string }[]).map(item => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
              >
                <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-orange-500' : ''}`}>
                  <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <span className={`text-[10px] font-medium ${active ? 'text-orange-500' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

    </div>
  )
}
