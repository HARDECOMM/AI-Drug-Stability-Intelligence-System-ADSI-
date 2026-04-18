import { Database } from "lucide-react";

function DrugActivitySummary({ drugCounts }) {
  return (
    <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/20">
      <div className="mb-5 flex items-center gap-2">
        <Database className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-semibold text-slate-900">
          Drug Activity Summary
        </h2>
      </div>

      {Object.keys(drugCounts).length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(drugCounts).map(([drug, count]) => (
            <div
              key={drug}
              className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/70 px-4 py-4 shadow-sm shadow-teal-100/20"
            >
              <span className="font-medium text-slate-700">{drug}</span>
              <span className="text-xl font-semibold text-slate-900">
                {count}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No drug activity data yet.</p>
      )}
    </section>
  );
}

export default DrugActivitySummary;