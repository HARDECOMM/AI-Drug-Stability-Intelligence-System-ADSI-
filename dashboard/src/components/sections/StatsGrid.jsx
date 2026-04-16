import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  FlaskConical,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import StatCard from "../StatCard";

function StatsGrid({ metrics }) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-8 print:mb-4">
      <StatCard icon={Database} label="Recent Events" value={metrics.total} />
      <StatCard icon={ShieldAlert} label="High Risk" value={metrics.high} accent="border-red-100" />
      <StatCard icon={AlertTriangle} label="Moderate Risk" value={metrics.moderate} accent="border-amber-100" />
      <StatCard icon={CheckCircle2} label="Low Risk" value={metrics.low} accent="border-emerald-100" />
      <StatCard icon={Activity} label="Sensor Events" value={metrics.sensor} />
      <StatCard icon={FlaskConical} label="Manual Events" value={metrics.manual} />
      <StatCard icon={ShieldAlert} label="Escalated Critical" value={metrics.escalated} accent="border-rose-200" />
      <StatCard icon={MapPin} label="Active Locations" value={metrics.locationSummary.length} accent="border-sky-100" />
    </div>
  );
}

export default StatsGrid;