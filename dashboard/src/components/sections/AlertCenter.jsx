import { AlertTriangle } from "lucide-react";

function AlertCenter({ alerts, riskTone }) {
  return (
    <section className="mb-6 rounded-3xl glass-strong p-6 shadow-xl shadow-amber-100/30">
      <div className="mb-5 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <h2 className="text-xl font-semibold text-slate-900">Alert Center</h2>
      </div>

      {alerts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {alerts.map((item, index) => (
            <div key={index} className="rounded-2xl glass-card p-4 shadow-sm shadow-slate-200/40 hover:shadow-lg hover:scale-[1.01]">
              <div className="mb-3 flex items-center justify-between">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${riskTone(item.predicted_degradation_risk)}`}>
                  {item.predicted_degradation_risk}
                </span>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                  Score {item.priority_score}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Drug:</strong> {item.drug_name}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Batch ID:</strong> {item.batch_id}</p>
                <p><strong>Facility:</strong> {item.facility_id}</p>
                <p><strong>Escalation:</strong> {item.escalation_level}</p>
                <p><strong>Compliance:</strong> {item.compliance_status}</p>
                <p><strong>Alert:</strong> {item.alert}</p>
              </div>

              <div className="mt-3 rounded-2xl bg-white/80 border border-white/50 px-3 py-3 text-sm text-slate-700">
                <strong>Recommended Action:</strong> {item.recommended_action}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No active alerts yet.
        </div>
      )}
    </section>
  );
}

export default AlertCenter;