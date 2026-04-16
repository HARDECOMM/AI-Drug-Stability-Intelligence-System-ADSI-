import { Activity, Download, Printer } from "lucide-react";

function TopBar({ onExportCsv, onPrint }) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between print:mb-4">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 print:hidden">
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
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>

        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-sky-200 transition hover:scale-[1.01]"
        >
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </button>
      </div>
    </div>
  );
}

export default TopBar;