function RiskBar({ label, value, max, color }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-800">{value}</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default RiskBar;