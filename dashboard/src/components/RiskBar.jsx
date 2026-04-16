function RiskBar({ label, value, max, color }) {
  const width = `${(value / max) * 100}%`;

  return (
    <div className="mb-4 grid grid-cols-[90px_1fr_50px] items-center gap-3">
      <span className="font-medium text-slate-700">{label}</span>
      <div className="h-4 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
      <span className="text-right font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default RiskBar;