function InspectionPriorityPanel({ alerts }) {
  return (
    <section className="mt-6 rounded-3xl glass-strong p-6 shadow-xl shadow-rose-100/20">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Inspection Priority Panel</h2>
        <p className="mt-1 text-sm text-slate-500">
          Highest-priority incidents that should be reviewed first by pharmacy or compliance teams.
        </p>
      </div>

      {alerts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Drug</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Escalation</th>
                <th className="px-4 py-2">Compliance</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((item, index) => (
                <tr key={index} className="bg-white/65 text-sm text-slate-700">
                  <td className="rounded-l-2xl px-4 py-3 font-semibold text-rose-700">
                    {item.priority_score}
                  </td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">{item.drug_name}</td>
                  <td className="px-4 py-3">{item.batch_id}</td>
                  <td className="px-4 py-3">{item.escalation_level}</td>
                  <td className="px-4 py-3">{item.compliance_status}</td>
                  <td className="rounded-r-2xl px-4 py-3">{item.recommended_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No inspection priorities yet.
        </div>
      )}
    </section>
  );
}

export default InspectionPriorityPanel;