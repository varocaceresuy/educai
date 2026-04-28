'use client'

import { useState, useRef } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  LayoutDashboard, TrendingUp, Lightbulb, User,
  Upload, BookOpen, Brain, Music, Palette, Star,
  AlertCircle, Camera, ChevronRight, Award, Sparkles
} from 'lucide-react'

const evolucion = [
  { trimestre: 'T1', superado: 35, progreso: 8, atencion: 2 },
  { trimestre: 'T2', superado: 40, progreso: 7, atencion: 1 },
]

const fortalezas = [
  { icon: BookOpen, label: 'Expresión oral',        desc: 'Vocabulario rico, estructura correcta, buena memoria', color: 'text-indigo-500',  bg: 'bg-indigo-50',  border: 'border-indigo-100' },
  { icon: Brain,    label: 'Matemáticas y lógica',  desc: 'Números 1-6, conceptos espaciales, sumas gráficas',   color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100' },
  { icon: Music,    label: 'Música',                desc: 'Brilla con ritmo y movimiento',                        color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
  { icon: Star,     label: 'Inglés avanzado',       desc: 'Todo verde · evaluación 3 estrellas',                 color: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-100' },
  { icon: Palette,  label: 'Creatividad artística', desc: 'Destacado en Reinarte y producciones plásticas',      color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', border: 'border-fuchsia-100' },
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
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-5 pt-10 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-1.5 rounded-xl shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">EducAI</span>
          </div>
          <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium border border-indigo-100">
            Curso 2025–26
          </span>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">

        {/* RESUMEN */}
        {tab === 'resumen' && (
          <>
            {/* Card hijo */}
            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-indigo-200"
                >
                  {photo
                    ? <img src={photo} alt="Domenico" className="w-full h-full object-cover" />
                    : <span className="text-2xl font-bold text-indigo-500">D</span>
                  }
                  <div className="absolute bottom-0 right-0 bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-1 rounded-tl-lg">
                    <Camera className="w-3 h-3" />
                  </div>
                </button>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Domenico</h2>
                  <p className="text-xs text-slate-500">4 años · 2º EI · Arenales Reinado</p>
                  <p className="text-xs text-slate-400 mt-0.5">Tutora: Alicia Martín</p>
                </div>
              </div>

              {/* Barra progreso */}
              <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-l-full" style={{ width: '83%' }} />
                <div className="bg-amber-400" style={{ width: '15%' }} />
                <div className="bg-red-400 rounded-r-full" style={{ width: '2%' }} />
              </div>

              {/* Scores */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl py-3 text-center border border-indigo-100">
                  <div className="text-2xl font-bold text-indigo-600">40</div>
                  <div className="text-[10px] font-medium text-indigo-400 mt-0.5">✅ Superado</div>
                </div>
                <div className="bg-amber-50 rounded-2xl py-3 text-center border border-amber-100">
                  <div className="text-2xl font-bold text-amber-500">7</div>
                  <div className="text-[10px] font-medium text-amber-400 mt-0.5">⚠️ En progreso</div>
                </div>
                <div className="bg-red-50 rounded-2xl py-3 text-center border border-red-100">
                  <div className="text-2xl font-bold text-red-400">1</div>
                  <div className="text-[10px] font-medium text-red-400 mt-0.5">🎯 Con apoyo</div>
                </div>
              </div>
            </div>

            {/* Nota tutora */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wide">Tutora · 2º Trimestre</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                &ldquo;Dome progresa adecuadamente en todas las áreas. Destaca en expresión oral con vocabulario rico y buena memoria. Cada vez más maduro e independiente.&rdquo;
              </p>
            </div>

            {/* Fortalezas */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">✨ Fortalezas</p>
              <div className="space-y-2">
                {fortalezas.map(f => (
                  <div key={f.label} className={`${f.bg} ${f.border} border rounded-2xl p-4 flex items-center gap-3`}>
                    <div className={`${f.color} flex-shrink-0 p-2 bg-white rounded-xl shadow-sm`}>
                      <f.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{f.label}</p>
                      <p className="text-xs text-slate-500 truncate">{f.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Upload */}
            <button className="w-full bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-5 flex flex-col items-center gap-2 hover:bg-indigo-50 transition-colors">
              <div className="bg-gradient-to-br from-indigo-100 to-violet-100 p-3 rounded-2xl">
                <Upload className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Subir 3er trimestre</p>
              <p className="text-xs text-slate-400">Toca para seleccionar el PDF</p>
            </button>
          </>
        )}

        {/* EVOLUCIÓN */}
        {tab === 'evolucion' && (
          <>
            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-1">Evolución T1 → T2</h3>
              <p className="text-xs text-slate-400 mb-5">+5 áreas superadas · redujo de 2 a 1 con apoyo</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={evolucion} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="trimestre" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="superado" stroke="#6366f1" name="Superado" strokeWidth={2.5} dot={{ r: 5, fill: '#6366f1' }} />
                  <Line type="monotone" dataKey="progreso" stroke="#f59e0b" name="En progreso" strokeWidth={2.5} dot={{ r: 5, fill: '#f59e0b' }} />
                  <Line type="monotone" dataKey="atencion" stroke="#f87171" name="Con apoyo" strokeWidth={2.5} dot={{ r: 5, fill: '#f87171' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TrendingUp, val: '+5',  label: 'más superadas',   from: 'from-indigo-500', to: 'to-violet-500' },
                { icon: Award,      val: '3⭐', label: 'Inglés avanzado',  from: 'from-blue-400',   to: 'to-indigo-500' },
                { icon: TrendingUp, val: '-1',  label: 'área con apoyo',  from: 'from-violet-500', to: 'to-purple-600' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm">
                  <div className={`bg-gradient-to-br ${s.from} ${s.to} text-white w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-bold text-slate-800">{s.val}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-4">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-1">Patrón detectado</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Domenico aprende mejor cuando algo le <strong className="text-indigo-600">motiva intrínsecamente</strong>. Conecta los ejercicios con sus intereses para mejores resultados.
              </p>
            </div>
          </>
        )}

        {/* RECOMENDACIONES */}
        {tab === 'recomendaciones' && (
          <>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-3xl p-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-violet-600">💡 Clave:</strong> Dome aprende mejor cuando algo le motiva. Conecta siempre los ejercicios con sus intereses.
              </p>
            </div>

            <div className="space-y-3">
              {recomendaciones.map(r => (
                <div key={r.area} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${r.prioridad === 'alta' ? 'bg-indigo-50' : 'bg-violet-50'}`}>
                      <AlertCircle className={`w-4 h-4 ${r.prioridad === 'alta' ? 'text-indigo-500' : 'text-violet-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-800 text-sm">{r.area}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${r.prioridad === 'alta' ? 'bg-indigo-100 text-indigo-600' : 'bg-violet-100 text-violet-600'}`}>
                          {r.prioridad === 'alta' ? 'Prioritario' : 'Recomendado'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{r.accion}</p>
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
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg"
                >
                  {photo
                    ? <img src={photo} alt="Foto" className="w-full h-full object-cover" />
                    : <span className="text-5xl font-bold text-indigo-400">D</span>
                  }
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-2 rounded-xl shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <div className="text-center">
                <p className="font-bold text-xl text-slate-900">Domenico</p>
                <p className="text-sm text-slate-400">4 años · 2º Educación Infantil</p>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="text-sm text-indigo-600 font-semibold border border-indigo-200 bg-indigo-50 px-5 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Cambiar foto
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Información escolar</p>
              <div className="space-y-3">
                {[
                  { label: 'Colegio',        value: 'Arenales Reinado' },
                  { label: 'Tutora',         value: 'Alicia Martín Castellote' },
                  { label: 'Curso',          value: '2025 – 2026' },
                  { label: 'Último boletín', value: '2º Trimestre · Mar 2026' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-medium text-slate-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Resumen del curso</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Boletines analizados', value: '2',   gradient: 'from-indigo-500 to-violet-500' },
                  { label: 'Áreas superadas (T2)', value: '40',  gradient: 'from-violet-500 to-purple-600' },
                  { label: 'Inglés',               value: '3 ⭐', gradient: 'from-blue-400 to-indigo-500' },
                  { label: 'Mejora T1→T2',         value: '+5',  gradient: 'from-indigo-400 to-violet-500' },
                ].map(s => (
                  <div key={s.label} className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-3 text-center border border-slate-100">
                    <p className={`text-2xl font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 shadow-lg">
        <div className="flex px-2 py-1">
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
                className="flex-1 flex flex-col items-center gap-1 py-2 transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200' : ''}`}>
                  <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <span className={`text-[10px] font-medium ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
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
