function SummaryBox({ label, value }) {
  return (
    <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/30">
      <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default SummaryBox;