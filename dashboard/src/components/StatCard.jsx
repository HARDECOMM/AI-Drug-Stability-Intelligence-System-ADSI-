function StatCard({ icon: Icon, label, value, accent = "" }) {
  return (
    <div className={`rounded-3xl glass-card p-4 shadow-lg shadow-sky-100/40 hover:shadow-xl hover:scale-[1.01] ${accent}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-2">
          <Icon className="h-4 w-4 text-slate-700" />
        </div>
        <span className="text-sm text-slate-600">{label}</span>
      </div>
      <div className="text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default StatCard;