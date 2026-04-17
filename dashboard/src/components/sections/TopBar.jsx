import { Activity, Download, Printer } from "lucide-react";

function TopBar({ onExportCsv, onPrint }) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between print:mb-4">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 print:hidden">
          <Activity className="h-3.5 w-3.5" />
          Real-time pharmaceutical monitoring
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl print:text-3xl">
          ADSI Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base print:mt-1 print:max-w-none">
          AI Drug Stability Intelligence System for live risk detection,
          compliance monitoring, decision support, and reporting.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          onClick={onExportCsv}
          className="inline-flex items-center gap-2 rounded-2xl glass-card px-4 py-3 text-sm font-medium text-slate-700 shadow-lg shadow-teal-100/30 hover:scale-[1.01]"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>

        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-teal-200/40 hover:scale-[1.01]"
        >
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </button>
      </div>
    </div>
  );
}

export default TopBar;