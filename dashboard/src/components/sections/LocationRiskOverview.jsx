function LocationRiskOverview({ locationSummary }) {
  return (
    <section className="mt-6 rounded-3xl glass-strong p-6 shadow-xl shadow-indigo-100/25">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Location Risk Overview</h2>
        <p className="mt-1 text-sm text-slate-500">
          Ranked view of monitored locations by escalation and risk activity.
        </p>
      </div>

      {locationSummary.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {locationSummary.slice(0, 6).map((loc, index) => (
            <div key={index} className="rounded-2xl glass-card p-4 shadow-sm shadow-sky-100/25 hover:shadow-lg hover:scale-[1.01]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{loc.location}</h3>
                <span className="rounded-full bg-gradient-to-r from-sky-100 to-indigo-100 px-3 py-1 text-xs font-medium text-sky-700">
                  {loc.total} events
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>High Risk:</strong> {loc.high}</p>
                <p><strong>Moderate Risk:</strong> {loc.moderate}</p>
                <p><strong>Low Risk:</strong> {loc.low}</p>
                <p><strong>Escalated Critical:</strong> {loc.escalated}</p>
                <p><strong>Latest Drug:</strong> {loc.latestDrug}</p>
                <p><strong>Facility ID:</strong> {loc.latestFacility}</p>
                <p><strong>Batch ID:</strong> {loc.latestBatch}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No location summary available yet.
        </div>
      )}
    </section>
  );
}

export default LocationRiskOverview;