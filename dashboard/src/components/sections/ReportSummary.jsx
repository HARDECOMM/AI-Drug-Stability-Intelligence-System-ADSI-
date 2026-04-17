import { FileText, RefreshCw, Server } from "lucide-react";
import SummaryBox from "../SummaryBox";

function ReportSummary({ apiStatus, lastRefresh, liveResult }) {
  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-3 print:mb-4">
        <div className="rounded-2xl glass-card px-4 py-3 shadow-lg shadow-teal-100/20">
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <Server className="h-3.5 w-3.5" />
            Backend
          </div>
          <div className={apiStatus === "online" ? "text-emerald-600" : "text-red-600"}>
            {apiStatus}
          </div>
        </div>

        <div className="rounded-2xl glass-card px-4 py-3 shadow-lg shadow-teal-100/20">
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <RefreshCw className="h-3.5 w-3.5" />
            Last refresh
          </div>
          <div className="text-slate-900">{lastRefresh || "Waiting..."}</div>
        </div>

        <div className="rounded-2xl glass-card px-4 py-3 shadow-lg shadow-teal-100/20">
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <FileText className="h-3.5 w-3.5" />
            Report Mode
          </div>
          <div className="text-slate-900">Operational Monitoring</div>
        </div>
      </div>

      <section className="mb-6 rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/25 print:shadow-none">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-slate-900">Operational Report Summary</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryBox label="Latest Drug" value={liveResult?.drug_name || "N/A"} />
          <SummaryBox label="Latest Location" value={liveResult?.location || "N/A"} />
          <SummaryBox label="Latest Batch ID" value={liveResult?.batch_id || "N/A"} />
          <SummaryBox label="Latest Compliance" value={liveResult?.compliance_status || "N/A"} />
        </div>
      </section>
    </>
  );
}

export default ReportSummary;