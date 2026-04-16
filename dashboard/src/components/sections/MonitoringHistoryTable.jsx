function MonitoringHistoryTable({ history, sourceTone, riskTone }) {
  return (
    <section className="mt-6 rounded-3xl glass-strong p-6 shadow-xl shadow-indigo-100/20">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Recent Monitoring History</h2>
        <p className="mt-1 text-sm text-slate-500">
          Latest risk events across manual and sensor-origin monitoring.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Drug</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Temp</th>
                <th className="px-4 py-2">Humidity</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((item, index) => (
                <tr key={index} className="bg-white/65 text-sm text-slate-700">
                  <td className="rounded-l-2xl px-4 py-3">
                    {item.timestamp ? item.timestamp.replace("T", " ").replace("Z", "") : "-"}
                  </td>
                  <td className="px-4 py-3">{item.drug_name}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${sourceTone(item.source)}`}>
                      {item.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.temperature_exposure}</td>
                  <td className="px-4 py-3">{item.humidity}</td>
                  <td className="px-4 py-3">{item.exposure_hours}</td>
                  <td className="rounded-r-2xl px-4 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${riskTone(item.predicted_degradation_risk)}`}>
                      {item.predicted_degradation_risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No monitoring history yet.
        </div>
      )}
    </section>
  );
}

export default MonitoringHistoryTable;