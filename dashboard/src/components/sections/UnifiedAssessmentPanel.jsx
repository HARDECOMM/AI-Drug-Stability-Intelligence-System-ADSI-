function UnifiedAssessmentPanel({
  unifiedResult,
  riskTone,
  complianceTone,
  sourceTone,
}) {
  return (
    <section className="mt-6 rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/25 print:hidden">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Unified Monitoring Assessment
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Combined evaluation output from either manual input or incoming sensor data.
          </p>
        </div>

        {unifiedResult?.source && (
          <span
            className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${sourceTone(
              unifiedResult.source
            )}`}
          >
            {unifiedResult.source}
          </span>
        )}
      </div>

      {unifiedResult ? (
        <>
          {/* Top summary grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/20">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Drug
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {unifiedResult.drug_name}
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/20">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Location
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {unifiedResult.location}
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/20">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Urgency
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {unifiedResult.urgency || "N/A"}
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 shadow-sm shadow-teal-100/20">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Drug Class
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {unifiedResult.drug_class || "N/A"}
              </div>
            </div>
          </div>

          {/* Risk and compliance */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div
              className={`rounded-2xl px-4 py-4 text-sm font-semibold ${riskTone(
                unifiedResult.predicted_degradation_risk
              )}`}
            >
              {unifiedResult.predicted_degradation_risk} Risk
            </div>

            <div
              className={`rounded-2xl border px-4 py-4 ${complianceTone(
                unifiedResult.compliance_status
              )}`}
            >
              <strong>Compliance:</strong> {unifiedResult.compliance_status}
            </div>
          </div>

          {/* Detail grid */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 text-slate-700">
              <strong>Escalation Level:</strong> {unifiedResult.escalation_level}
            </div>

            <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 text-slate-700">
              <strong>Breach Status:</strong> {unifiedResult.breach_status}
            </div>

            <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 text-slate-700 md:col-span-2">
              <strong>Repeated Non-Compliance Count:</strong>{" "}
              {unifiedResult.repeated_non_compliance_count}
            </div>
          </div>

          {unifiedResult.threshold_breaches &&
            unifiedResult.threshold_breaches.length > 0 && (
              <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-4 text-amber-700 shadow-sm shadow-amber-100/30">
                <strong>Threshold Breaches:</strong>
                <ul className="mt-2 list-disc pl-5">
                  {unifiedResult.threshold_breaches.map((breach, index) => (
                    <li key={index}>{breach}</li>
                  ))}
                </ul>
              </div>
            )}

          <div className="mt-5 rounded-2xl border border-teal-200/70 bg-teal-50/90 px-4 py-4 text-teal-700 shadow-sm shadow-teal-100/30">
            <strong>Alert:</strong> {unifiedResult.alert}
          </div>

          <div className="mt-4 rounded-2xl border border-white/50 bg-white/70 px-4 py-4 text-slate-700">
            <strong>Recommended Action:</strong> {unifiedResult.recommended_action}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No manual or sensor assessment available yet.
        </div>
      )}
    </section>
  );
}

export default UnifiedAssessmentPanel;