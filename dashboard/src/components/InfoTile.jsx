function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/30">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

export default InfoTile;