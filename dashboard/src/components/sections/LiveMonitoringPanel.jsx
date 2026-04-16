import {
  Building2,
  Clock3,
  Cpu,
  Droplets,
  FlaskConical,
  MapPin,
  PackageSearch,
  Thermometer,
} from "lucide-react";
import InfoTile from "../InfoTile";

function LiveMonitoringPanel({ liveResult, riskTone, complianceTone, sourceTone }) {
  return (
    <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-indigo-100/30">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Latest Live Monitoring</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current automated stream from live simulator or sensor feed.
          </p>
        </div>
        <div className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs text-slate-600">
          Live Stream
        </div>
      </div>

      {liveResult ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile icon={FlaskConical} label="Drug" value={liveResult.drug_name} />
            <InfoTile icon={MapPin} label="Location" value={liveResult.location} />
            <InfoTile icon={Thermometer} label="Temperature" value={`${liveResult.temperature_exposure} °C`} />
            <InfoTile icon={Droplets} label="Humidity" value={`${liveResult.humidity} %`} />
            <InfoTile icon={Clock3} label="Exposure" value={`${liveResult.exposure_hours} hrs`} />
            <InfoTile icon={Cpu} label="Device ID" value={liveResult.device_id || "N/A"} />
            <InfoTile icon={Building2} label="Facility ID" value={liveResult.facility_id || "N/A"} />
            <InfoTile icon={PackageSearch} label="Batch ID" value={liveResult.batch_id || "N/A"} />
          </div>

          <div className="flex flex-wrap gap-3">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${sourceTone(liveResult.source)}`}>
              {liveResult.source}
            </span>
            <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${riskTone(liveResult.predicted_degradation_risk)}`}>
              {liveResult.predicted_degradation_risk} Risk
            </div>
          </div>

          <div className={`rounded-2xl border px-4 py-3 ${complianceTone(liveResult.compliance_status)}`}>
            <strong>Compliance:</strong> {liveResult.compliance_status}
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
            <strong>Escalation Level:</strong> {liveResult.escalation_level}
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
            <strong>Breach Status:</strong> {liveResult.breach_status}
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
            <strong>Repeated Non-Compliance Count:</strong> {liveResult.repeated_non_compliance_count}
          </div>

          {liveResult.threshold_breaches && liveResult.threshold_breaches.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700">
              <strong>Threshold Breaches:</strong>
              <ul className="mt-2 list-disc pl-5">
                {liveResult.threshold_breaches.map((breach, index) => (
                  <li key={index}>{breach}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-sky-200/70 bg-sky-50/90 px-4 py-3 text-sky-700 shadow-sm shadow-sky-100/30">
            <strong>Alert:</strong> {liveResult.alert}
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-amber-700 shadow-sm shadow-amber-100/30">
            <strong>Recommended Action:</strong> {liveResult.recommended_action}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500">
          No live monitoring data yet. Start the simulator.
        </div>
      )}
    </section>
  );
}

export default LiveMonitoringPanel;