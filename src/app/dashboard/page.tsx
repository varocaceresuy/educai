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
    <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
    <Legend wrapperStyle={{ fontSize: '11px' }} />
    <Line type="monotone" dataKey="superado" stroke="#6366f1" name="Superado" strokeWidth={2.5} dot={{ r: 5, fill: '#6366f1' }} />
    <Line type="monotone" dataKey="progreso" stroke="#f59e0b" name="En progreso" strokeWidth={2.5} dot={{ r: 5, fill: '#f59e0b' }} />
    <Line type="monotone" dataKey="atencion" stroke="#f87171" name="Con apoyo" strokeWidth={2.5} dot={{ r: 5, fill: '#f87171' }} />
  </LineChart>
</ResponsiveContainer>
</div>

<div className="grid grid-cols-3 gap-3">
{[
  { icon: TrendingUp, val: '+5',  label: 'más superadas',  from: 'from-indigo-500', to: 'to-violet-500' },
  { icon: Award,      val: '3⭐', label: 'Inglés avanzado', from: 'from-blue-400',   to: 'to-indigo-500' },
  { icon: TrendingUp, val: '-1',  label: 'área con apoyo', from: 'from-violet-500', to: 'to-purple-600' },
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
</>
)}