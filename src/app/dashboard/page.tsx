'use client'

import { useState, useRef, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  LayoutDashboard, TrendingUp, Lightbulb, User,
  Upload, BookOpen, Brain, Music, Palette, Star,
  AlertCircle, Camera, ChevronRight, Award, Sparkles, X
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Paleta personalizada (pasteles)
 * Menta · Lila · Mantequilla · Cielo
 */
const C = {
  mint: '#CFE6E2',
  lilac: '#DBCAEA',
  butter: '#FFE8AB',
  sky: '#ABD4FF',
  /** Tonos más profundos para bordes, gradientes y gráficas */
  mintDark: '#8ebfb4',
  lilacDark: '#a884c4',
  butterDark: '#c9a83a',
  skyDark: '#6b9bd6',
} as const

const ACCENT = {
  navActive: 'bg-gradient-to-br from-[#ABD4FF] to-[#6b9bd6]',
  navLabel: 'text-[#1e3a4a] font-semibold',
  brandIcon: 'bg-gradient-to-br from-[#ABD4FF] to-[#6b9bd6]',
  brandBadge: 'border-[#6b9bd6] bg-[#ABD4FF] text-slate-900',
} as const

const evolucion = [
  { trimestre: 'T1', superado: 35, progreso: 8, atencion: 2 },
  { trimestre: 'T2', superado: 40, progreso: 7, atencion: 1 },
]

const fortalezas = [
  { icon: BookOpen, label: 'Expresión oral',        desc: 'Vocabulario rico, estructura correcta, buena memoria', color: 'text-slate-900', bg: 'bg-[#ABD4FF]', border: 'border-[#6b9bd6]' },
  { icon: Brain,    label: 'Matemáticas y lógica',  desc: 'Números 1-6, conceptos espaciales, sumas gráficas',   color: 'text-slate-900', bg: 'bg-[#CFE6E2]', border: 'border-[#8ebfb4]' },
  { icon: Music,    label: 'Música',                desc: 'Brilla con ritmo y movimiento',                        color: 'text-slate-900', bg: 'bg-[#DBCAEA]', border: 'border-[#a884c4]' },
  { icon: Star,     label: 'Inglés avanzado',       desc: 'Todo verde · evaluación 3 estrellas',                 color: 'text-slate-900', bg: 'bg-[#FFE8AB]', border: 'border-[#c9a83a]' },
  { icon: Palette,  label: 'Creatividad artística', desc: 'Destacado en Reinarte y producciones plásticas',      color: 'text-slate-900', bg: 'bg-[#CFE6E2]', border: 'border-[#8ebfb4]' },
]

const recomendaciones = [
  { area: 'Lectura',           accion: 'Usa lectura compartida en voz alta — es muy social y aprende mejor así',              prioridad: 'alta' },
  { area: 'Gestión emocional', accion: 'Practica respiración 5 min cuando se frustra. Necesita apoyo adulto en conflictos',   prioridad: 'alta' },
  { area: 'Autonomía',         accion: 'Mejoró de T1 a T2 — refuerza hábitos de vestirse y organización',                    prioridad: 'media' },
  { area: 'Trabajo en grupo',  accion: 'Juegos cooperativos en casa para practicar ceder y negociar',                         prioridad: 'media' },
]

type Tab = 'resumen' | 'evolucion' | 'recomendaciones' | 'perfil'

const PROFILE_PHOTO_KEY = 'educai.dashboard.profilePhoto'

const RESUMEN_METRICS = { superado: 40, progreso: 7, apoyo: 1 } as const

type MetricSheet = null | 'superado' | 'progreso' | 'apoyo' | 'todos'

type MetricCapsuleKind = 'superado' | 'progreso' | 'apoyo' | 'empty'

type BoletinItem = { id: string; label: string; estado: Exclude<MetricCapsuleKind, 'empty'> }

/** Ítems del boletín (demo): 40 + 7 + 1 = 48, alineado con las métricas del resumen. */
const BOLETIN_ITEMS: BoletinItem[] = (() => {
  const areas = [
    ['Autonomía', ['Higiene y autocuidado', 'Vestuario y taquilla', 'Rutina comedor', 'Orden del material', 'Normas de convivencia']],
    ['Lenguaje oral', ['Vocabulario espontáneo', 'Estructura de frases', 'Escucha activa', 'Narra experiencias', 'Conciencia sonora']],
    ['Lectura', ['Interés por el libro', 'Seguimiento de lectura compartida', 'Cuidado del libro', 'Identificación de personajes', 'Predicción simple']],
    ['Matemáticas', ['Conteo 1-10', 'Correspondencia cantidad-número', 'Clasificación', 'Seriación', 'Formas en el entorno']],
    ['Exploración', ['Curiosidad por experimentar', 'Descripción de observaciones', 'Cuidado del material', 'Hipótesis sencillas', 'Registro con pictos']],
    ['Música', ['Ritmo y pulso', 'Canciones del repertorio', 'Instrumentos de aula', 'Expresión corporal', 'Silencio y escucha']],
    ['Plástica', ['Uso del color', 'Trazos y pinzas', 'Collage y texturas', 'Modelado', 'Exposición oral de su obra']],
    ['Psicomotricidad', ['Equilibrio', 'Lateralidad', 'Coordinación ojo-mano', 'Saltos y desplazamientos', 'Relajación']],
    ['Inglés', ['Saludos y rutinas', 'Comprensión oral', 'Vocabulario temático', 'Canciones en inglés', 'Instrucciones sencillas']],
    ['Convivencia', ['Juego cooperativo', 'Resolución verbal de conflictos', 'Empatía básica', 'Turnos en el juego', 'Pedir ayuda']],
  ] as const

  const superado: BoletinItem[] = []
  let n = 0
  for (const [area, subs] of areas) {
    for (const label of subs) {
      if (superado.length >= RESUMEN_METRICS.superado) break
      superado.push({
        id: `ok-${n++}`,
        estado: 'superado',
        label: `${area}: ${label}`,
      })
    }
    if (superado.length >= RESUMEN_METRICS.superado) break
  }
  while (superado.length < RESUMEN_METRICS.superado) {
    superado.push({
      id: `ok-${n++}`,
      estado: 'superado',
      label: `Área curricular · consolidación ${superado.length + 1}`,
    })
  }

  const progreso: BoletinItem[] = [
    { id: 'pg-1', estado: 'progreso', label: 'Lectura: lectura independiente breve (1–2 min)' },
    { id: 'pg-2', estado: 'progreso', label: 'Lectura: identificación de letras en contexto' },
    { id: 'pg-3', estado: 'progreso', label: 'Gestión emocional: tolerancia a la frustración' },
    { id: 'pg-4', estado: 'progreso', label: 'Autonomía: vestirse solo en prendas sencillas' },
    { id: 'pg-5', estado: 'progreso', label: 'Trabajo en grupo: negociar materiales en juego' },
    { id: 'pg-6', estado: 'progreso', label: 'Matemáticas: resolución oral de problemas sencillos' },
    { id: 'pg-7', estado: 'progreso', label: 'Inglés: producción oral de frases con apoyo visual' },
  ]

  const apoyo: BoletinItem[] = [
    {
      id: 'ap-1',
      estado: 'apoyo',
      label: 'Lectura: lectura autónoma de textos cortos (requiere refuerzo en casa)',
    },
  ]

  return [...superado, ...progreso, ...apoyo]
})()

const TOTAL_BOLETIN_ITEMS = BOLETIN_ITEMS.length

/** Reparto entero de nSlots proporcional a tres cantidades (restos mayores). */
function allocateProportionalSlots(
  counts: readonly [number, number, number],
  nSlots: number
): [number, number, number] {
  const total = counts[0] + counts[1] + counts[2]
  if (total === 0 || nSlots <= 0) return [0, 0, 0]
  const exact = counts.map((c) => (c / total) * nSlots)
  const base = exact.map((x) => Math.floor(x))
  let remainder = nSlots - base[0] - base[1] - base[2]
  const order = exact
    .map((x, i) => ({ i, r: x - Math.floor(x) }))
    .sort((a, b) => (b.r !== a.r ? b.r - a.r : a.i - b.i))
  const out: [number, number, number] = [base[0], base[1], base[2]]
  let k = 0
  while (remainder > 0) {
    out[order[k % order.length].i]++
    remainder--
    k++
  }
  if (counts[2] > 0 && out[2] === 0) {
    out[2] = 1
    if (out[0] >= out[1] && out[0] > 0) out[0]--
    else if (out[1] > 0) out[1]--
    else if (out[0] > 0) out[0]--
  }
  return out
}

function buildMetricCapsuleRow(
  superado: number,
  progreso: number,
  apoyo: number,
  nSlots = 24
): MetricCapsuleKind[] {
  const [a, b, c] = allocateProportionalSlots(
    [superado, progreso, apoyo],
    nSlots
  )
  const empty = Math.max(0, nSlots - a - b - c)
  const row: MetricCapsuleKind[] = []
  for (let i = 0; i < a; i++) row.push('superado')
  for (let i = 0; i < b; i++) row.push('progreso')
  for (let i = 0; i < c; i++) row.push('apoyo')
  for (let i = 0; i < empty; i++) row.push('empty')
  return row
}

const METRIC_CAPSULE_ROW: MetricCapsuleKind[] = buildMetricCapsuleRow(
  RESUMEN_METRICS.superado,
  RESUMEN_METRICS.progreso,
  RESUMEN_METRICS.apoyo,
  TOTAL_BOLETIN_ITEMS
)

function downscaleToJpegDataUrl(
  dataUrl: string,
  maxDim: number,
  quality: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      let w = img.width
      let h = img.height
      const scale = Math.min(1, maxDim / Math.max(w, h))
      w = Math.round(w * scale)
      h = Math.round(h * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(dataUrl)
        return
      }
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

async function persistProfilePhoto(rawDataUrl: string): Promise<string> {
  const attempts = [
    () => downscaleToJpegDataUrl(rawDataUrl, 960, 0.85),
    () => downscaleToJpegDataUrl(rawDataUrl, 640, 0.78),
    () => downscaleToJpegDataUrl(rawDataUrl, 400, 0.72),
  ]
  for (const get of attempts) {
    const dataUrl = await get()
    try {
      localStorage.setItem(PROFILE_PHOTO_KEY, dataUrl)
      return dataUrl
    } catch {
      /* QuotaExceeded u otro: probar más compacto */
    }
  }
  return rawDataUrl
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('resumen')
  const [photo, setPhoto] = useState<string | null>(null)
  const [metricSheet, setMetricSheet] = useState<MetricSheet>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pdfRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_PHOTO_KEY)
      if (saved?.startsWith('data:image')) setPhoto(saved)
    } catch {
      /* modo privado / deshabilitado */
    }
  }, [])

  useEffect(() => {
    if (!metricSheet) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMetricSheet(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [metricSheet])

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const input = e.target
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const raw = reader.result as string
      void persistProfilePhoto(raw).then(setPhoto)
    }
    reader.readAsDataURL(file)
    input.value = ''
  }

  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const file = input.files?.[0]
    input.value = ''
    if (!file) return
    /* TODO: subir / analizar PDF del boletín */
  }

  return (
    <div
      className="relative mx-auto flex min-h-screen max-w-md flex-col bg-gradient-to-b from-[#CFE6E2]/50 via-white to-[#DBCAEA]/40"
    >

      {/* Header */}
      <header className="sticky top-0 z-10 border-b-2 border-[#ABD4FF]/70 bg-white px-5 pb-4 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${ACCENT.brandIcon} rounded-xl p-1.5 text-white`}>
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">EducAI</span>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${ACCENT.brandBadge}`}>
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
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="mb-5 flex items-center gap-4">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#ABD4FF]"
                >
                  {photo
                    ? <img src={photo} alt="Domenico Fabricio" className="w-full h-full object-cover" />
                    : <span className="text-lg font-bold leading-tight text-slate-900">DF</span>
                  }
                  <div className="absolute bottom-0 right-0 rounded-tl-lg bg-gradient-to-br from-[#6b9bd6] to-[#4a7fc0] p-1 text-white">
                    <Camera className="h-3 w-3" />
                  </div>
                </button>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-900 truncate">Domenico Fabricio</h2>
                  <p className="text-xs text-slate-600">4 años · 2º EI · Arenales Reinado</p>
                  <p className="mt-0.5 text-xs text-slate-600">Tutora: Alicia Martín</p>
                </div>
              </div>

              {/* Barra métricas — cápsulas (estilo pastel / referencia UI) */}
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-slate-700">
                    Resumen por áreas
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-600">
                    Cada cápsula = 1 ítem · {TOTAL_BOLETIN_ITEMS} evaluados en total
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMetricSheet('todos')}
                  className="shrink-0 rounded-full bg-[#1e3a4a] px-2.5 py-1.5 text-left text-[10px] font-bold text-white transition-transform active:scale-95"
                >
                  {TOTAL_BOLETIN_ITEMS} ítems
                </button>
              </div>
              <div
                className="mb-4 rounded-2xl border-2 border-[#6b9bd6]/50 bg-[#ABD4FF]/25 p-2.5 sm:p-3"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgb(171 212 255 / 0.45) 1px, transparent 0)',
                  backgroundSize: '14px 14px',
                }}
              >
                <div className="flex h-10 items-end gap-[2px] sm:h-11 sm:gap-1">
                  {METRIC_CAPSULE_ROW.map((kind, i) => (
                    <div
                      key={i}
                      title={
                        kind === 'superado'
                          ? 'Superado'
                          : kind === 'progreso'
                            ? 'En progreso'
                            : kind === 'apoyo'
                              ? 'Con apoyo'
                              : 'Sin clasificar'
                      }
                      className={cn(
                        'min-h-[2.35rem] flex-1 rounded-full transition-transform duration-200 sm:min-h-[2.65rem]',
                        kind === 'superado' && 'bg-[#ABD4FF]',
                        kind === 'progreso' && 'bg-[#CFE6E2]',
                        kind === 'apoyo' && 'bg-[#DBCAEA]',
                        kind === 'empty' &&
                          'border border-dashed border-slate-400/90 bg-white'
                      )}
                    />
                  ))}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ABD4FF] px-2.5 py-1 text-[10px] font-bold text-slate-900 ring-1 ring-[#6b9bd6]/60">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#4a7fc0]" />
                    Superado {RESUMEN_METRICS.superado}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CFE6E2] px-2.5 py-1 text-[10px] font-bold text-slate-900 ring-1 ring-[#8ebfb4]/80">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#5a8f82]" />
                    Progreso {RESUMEN_METRICS.progreso}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBCAEA] px-2.5 py-1 text-[10px] font-bold text-slate-900 ring-1 ring-[#a884c4]/80">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#7d5a9e]" />
                    Apoyo {RESUMEN_METRICS.apoyo}
                  </span>
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMetricSheet('superado')}
                  className="rounded-2xl bg-[#ABD4FF]/50 py-3 text-center transition-transform active:scale-[0.98]"
                >
                  <div className="text-2xl font-bold text-slate-900">
                    {RESUMEN_METRICS.superado}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-slate-800">
                    ✅ Superado
                  </div>
                  <div className="mt-1 text-[9px] font-semibold text-slate-700">
                    Ver ítems
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMetricSheet('progreso')}
                  className="rounded-2xl bg-[#CFE6E2] py-3 text-center transition-transform active:scale-[0.98]"
                >
                  <div className="text-2xl font-bold text-slate-900">
                    {RESUMEN_METRICS.progreso}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-slate-800">
                    ⚠️ En progreso
                  </div>
                  <div className="mt-1 text-[9px] font-semibold text-slate-800">
                    Ver ítems
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMetricSheet('apoyo')}
                  className="rounded-2xl bg-[#DBCAEA] py-3 text-center transition-transform active:scale-[0.98]"
                >
                  <div className="text-2xl font-bold text-slate-900">
                    {RESUMEN_METRICS.apoyo}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-slate-800">
                    🎯 Con apoyo
                  </div>
                  <div className="mt-1 text-[9px] font-semibold text-slate-800">
                    Ver ítems
                  </div>
                </button>
              </div>
            </div>

            {/* Nota tutora */}
            <div className="rounded-3xl border-2 border-[#c9a83a] bg-gradient-to-br from-[#FFE8AB] to-[#ABD4FF]/40 p-4">
              <div className="mb-2 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#6b9bd6]" />
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-800">Tutora · 2º Trimestre</p>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-800">
                &ldquo;Dome progresa adecuadamente en todas las áreas. Destaca en expresión oral con vocabulario rico y buena memoria. Cada vez más maduro e independiente.&rdquo;
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <input
                ref={pdfRef}
                type="file"
                accept="application/pdf"
                onChange={handlePdf}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => pdfRef.current?.click()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#6b9bd6] bg-[#ABD4FF] px-4 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-[#8fc4ff] active:bg-[#7eb8f0] sm:w-auto"
              >
                <Upload className="h-4 w-4 shrink-0 text-slate-800" />
                Añadir PDF del boletín
              </button>
            </div>

            {/* Fortalezas */}
            <div>
              <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wide text-slate-700">✨ Fortalezas</p>
              <div className="space-y-2">
                {fortalezas.map(f => (
                  <div key={f.label} className={`${f.bg} ${f.border} border rounded-2xl p-4 flex items-center gap-3`}>
                    <div className={`${f.color} flex-shrink-0 rounded-xl border border-white/80 bg-white p-2`}>
                      <f.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{f.label}</p>
                      <p className="truncate text-xs font-medium text-slate-700">{f.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* EVOLUCIÓN */}
        {tab === 'evolucion' && (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="mb-1 font-bold text-slate-900">Evolución T1 → T2</h3>
              <p className="mb-5 text-xs font-medium text-slate-600">+5 áreas superadas · redujo de 2 a 1 con apoyo</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={evolucion} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ABD4FF" strokeOpacity={0.45} />
                  <XAxis dataKey="trimestre" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '16px',
                      border: `2px solid ${C.skyDark}`,
                      fontSize: '12px',
                      color: '#0f172a',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#334155' }} />
                  <Line type="monotone" dataKey="superado" stroke="#4a7fc0" name="Superado" strokeWidth={2.5} dot={{ r: 5, fill: '#4a7fc0' }} />
                  <Line type="monotone" dataKey="progreso" stroke="#5a8f85" name="En progreso" strokeWidth={2.5} dot={{ r: 5, fill: '#5a8f85' }} />
                  <Line type="monotone" dataKey="atencion" stroke="#8b6ba8" name="Con apoyo" strokeWidth={2.5} dot={{ r: 5, fill: '#8b6ba8' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {([
                { icon: TrendingUp, val: '+5',  label: 'más superadas',   iconWrap: 'bg-[#ABD4FF] text-slate-900' },
                { icon: Award,      val: '3⭐', label: 'Inglés avanzado',  iconWrap: 'bg-[#CFE6E2] text-slate-900' },
                { icon: TrendingUp, val: '-1',  label: 'área con apoyo',  iconWrap: 'bg-[#DBCAEA] text-slate-900' },
              ] as const).map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
                >
                  <div
                    className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${s.iconWrap}`}
                  >
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="text-xl font-bold text-slate-900">{s.val}</p>
                  <p className="mt-0.5 text-[10px] font-medium leading-tight text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border-2 border-[#8ebfb4] bg-gradient-to-br from-[#CFE6E2] to-[#ABD4FF]/35 p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-800">Patrón detectado</p>
              <p className="text-sm font-medium leading-relaxed text-slate-800">
                Domenico aprende mejor cuando algo le <strong className="text-[#4a7fc0]">motiva intrínsecamente</strong>. Conecta los ejercicios con sus intereses para mejores resultados.
              </p>
            </div>
          </>
        )}

        {/* RECOMENDACIONES */}
        {tab === 'recomendaciones' && (
          <>
            <div className="rounded-3xl border-2 border-[#c9a83a] bg-gradient-to-br from-[#FFE8AB] to-[#DBCAEA]/50 p-4">
              <p className="text-sm font-medium leading-relaxed text-slate-800">
                <strong className="text-[#6b4f80]">💡 Clave:</strong> Dome aprende mejor cuando algo le motiva. Conecta siempre los ejercicios con sus intereses.
              </p>
            </div>

            <div className="space-y-3">
              {recomendaciones.map(r => (
                <div key={r.area} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 rounded-xl p-2 ${r.prioridad === 'alta' ? 'bg-[#ABD4FF]' : 'bg-[#CFE6E2]'}`}
                    >
                      <AlertCircle className={`h-4 w-4 ${r.prioridad === 'alta' ? 'text-slate-900' : 'text-slate-900'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{r.area}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${r.prioridad === 'alta' ? 'bg-[#ABD4FF] text-slate-900' : 'bg-[#CFE6E2] text-slate-900'}`}
                        >
                          {r.prioridad === 'alta' ? 'Prioritario' : 'Recomendado'}
                        </span>
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-slate-700">{r.accion}</p>
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
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6">
              <div className="relative">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-[#ABD4FF]"
                >
                  {photo
                    ? <img src={photo} alt="Domenico Fabricio" className="h-full w-full object-cover" />
                    : <span className="text-4xl font-bold tracking-tight text-slate-900">DF</span>
                  }
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 rounded-xl bg-gradient-to-br from-[#6b9bd6] to-[#4a7fc0] p-2 text-white"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <div className="text-center">
                <p className="text-xl font-bold text-slate-900">Domenico Fabricio</p>
                <p className="text-sm font-medium text-slate-600">4 años · 2º Educación Infantil</p>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="rounded-xl border-2 border-[#6b9bd6] bg-[#ABD4FF] px-5 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-[#8fc4ff]"
              >
                Cambiar foto
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">Información escolar</p>
              <div className="space-y-3">
                {[
                  { label: 'Colegio',        value: 'Arenales Reinado' },
                  { label: 'Tutora',         value: 'Alicia Martín Castellote' },
                  { label: 'Curso',          value: '2025 – 2026' },
                  { label: 'Último boletín', value: '2º Trimestre · Mar 2026' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-slate-100 py-2 last:border-0">
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border-2 border-slate-200 bg-white p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">Resumen del curso</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { label: 'Boletines analizados', value: '2',    valueClass: 'text-slate-900', card: 'border-[#6b9bd6] bg-[#ABD4FF]' },
                  { label: 'Áreas superadas (T2)', value: '40',   valueClass: 'text-slate-900', card: 'border-[#8ebfb4] bg-[#CFE6E2]' },
                  { label: 'Inglés',               value: '3 ⭐', valueClass: 'text-slate-900', card: 'border-[#a884c4] bg-[#DBCAEA]' },
                  { label: 'Mejora T1→T2',         value: '+5',   valueClass: 'text-slate-900', card: 'border-[#c9a83a] bg-[#FFE8AB]' },
                ] as const).map((s) => (
                  <div
                    key={s.label}
                    className={cn('rounded-2xl border-2 p-3 text-center', s.card)}
                  >
                    <p className={cn('text-2xl font-bold', s.valueClass)}>{s.value}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-tight text-slate-800">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-md border-t-2 border-[#ABD4FF] bg-white">
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
                className="flex flex-1 flex-col items-center gap-1 py-2 transition-all"
              >
                <div
                  className={cn(
                    'rounded-xl p-1.5 transition-all',
                    active ? `${ACCENT.navActive} text-white` : ''
                  )}
                >
                  <item.icon className={`h-5 w-5 ${active ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium',
                    active ? ACCENT.navLabel : 'text-slate-600'
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {metricSheet && (
        <>
          <button
            type="button"
            aria-label="Cerrar listado"
            className="fixed inset-0 z-[70] bg-slate-900/45 backdrop-blur-[2px]"
            onClick={() => setMetricSheet(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="metric-sheet-title"
            className="fixed inset-x-0 bottom-0 z-[80] mx-auto flex max-h-[85vh] max-w-md flex-col rounded-t-3xl border border-slate-200/90 bg-white shadow-[0_-12px_40px_rgba(15,23,42,0.18)]"
          >
            <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-slate-200" aria-hidden />
            <div className="flex shrink-0 items-start justify-between gap-2 border-b border-slate-100 px-4 pb-3 pt-2">
              <h3
                id="metric-sheet-title"
                className="min-w-0 flex-1 text-base font-bold leading-snug text-slate-900"
              >
                {metricSheet === 'todos' && 'Todos los ítems del boletín'}
                {metricSheet === 'superado' &&
                  `Superado (${RESUMEN_METRICS.superado} ítems)`}
                {metricSheet === 'progreso' &&
                  `En progreso (${RESUMEN_METRICS.progreso} ítems)`}
                {metricSheet === 'apoyo' &&
                  `Con apoyo (${RESUMEN_METRICS.apoyo} ítem${RESUMEN_METRICS.apoyo === 1 ? '' : 's'})`}
              </h3>
              <button
                type="button"
                onClick={() => setMetricSheet(null)}
                className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition-colors hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 pb-10">
              {metricSheet === 'todos' ? (
                <div className="space-y-6">
                  {(
                    [
                      {
                        key: 'superado' as const,
                        title: 'Superado',
                        emoji: '✅',
                        ring: 'ring-[#6b9bd6]',
                        badge: 'bg-[#ABD4FF] text-slate-900',
                      },
                      {
                        key: 'progreso' as const,
                        title: 'En progreso',
                        emoji: '⚠️',
                        ring: 'ring-[#8ebfb4]',
                        badge: 'bg-[#CFE6E2] text-slate-900',
                      },
                      {
                        key: 'apoyo' as const,
                        title: 'Con apoyo',
                        emoji: '🎯',
                        ring: 'ring-[#a884c4]',
                        badge: 'bg-[#DBCAEA] text-slate-900',
                      },
                    ] as const
                  ).map((section) => {
                    const list = BOLETIN_ITEMS.filter((i) => i.estado === section.key)
                    return (
                      <section key={section.key}>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-700">
                            {section.emoji} {section.title}
                          </p>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[10px] font-bold ring-1',
                              section.badge,
                              section.ring
                            )}
                          >
                            {list.length}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {list.map((item) => (
                            <li
                              key={item.id}
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium leading-snug text-slate-900"
                            >
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )
                  })}
                </div>
              ) : (
                <ul className="space-y-2">
                  {BOLETIN_ITEMS.filter((i) => i.estado === metricSheet).map(
                    (item) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium leading-snug text-slate-900"
                      >
                        {item.label}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
