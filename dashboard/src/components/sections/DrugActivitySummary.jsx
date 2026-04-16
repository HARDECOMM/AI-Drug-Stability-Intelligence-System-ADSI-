import { Database } from "lucide-react";

function DrugActivitySummary({ drugCounts }) {
  return (
    <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-sky-100/20">
      <div className="mb-5 flex items-center gap-2">
        <Database className="h-5 w-5 text-sky-600" />
        <h2 className="text-xl font-semibold text-slate-900">Drug Activity Summary</h2>
      </div>

      <div className="space-y-3">
        {Object.keys(drugCounts).length > 0 ? (
          Object.entries(drugCounts)
            .slice(0, 6)
            .map(([drug, count]) => (
              <div
                key={drug}
                className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/70 px-4 py-3"
              >
                <span className="text-slate-700">{drug}</span>
                <span className="text-lg font-semibold text-slate-900">{count}</span>
              </div>
            ))
        ) : (
          <p className="text-slate-500">No drug activity data yet.</p>
        )}
      </div>
    </section>
  );
}

export default DrugActivitySummary;
