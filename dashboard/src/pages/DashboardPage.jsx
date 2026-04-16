import React, { useEffect, useMemo, useState } from "react";
import { LineChart as LineChartIcon } from "lucide-react";

import TopBar from "../components/sections/TopBar";
import StatsGrid from "../components/sections/StatsGrid";
import AlertCenter from "../components/sections/AlertCenter";
import ReportSummary from "../components/sections/ReportSummary";
import ManualPredictionForm from "../components/sections/ManualPredictionForm";
import LiveMonitoringPanel from "../components/sections/LiveMonitoringPanel";
import TrendCharts from "../components/sections/TrendCharts";
import LocationRiskOverview from "../components/sections/LocationRiskOverview";
import InspectionPriorityPanel from "../components/sections/InspectionPriorityPanel";
import DrugActivitySummary from "../components/sections/DrugActivitySummary";
import MonitoringHistoryTable from "../components/sections/MonitoringHistoryTable";
import RiskBar from "../components/RiskBar";

import {
  fetchSystemStatus,
  fetchDrugs,
  fetchLatest,
  fetchHistory,
  predictRisk,
} from "../services/api";
import { exportHistoryToCsv } from "../utils/exportCsv";

function DashboardPage() {
  const [drugs, setDrugs] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [exposureHours, setExposureHours] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [liveResult, setLiveResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [apiStatus, setApiStatus] = useState("checking");
  const [lastRefresh, setLastRefresh] = useState("");
  const [error, setError] = useState("");
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      try {
        const status = await fetchSystemStatus();
        setApiStatus(status.status === "online" ? "online" : "offline");
      } catch {
        setApiStatus("offline");
      }

      try {
        const drugsData = await fetchDrugs();
        const list = drugsData.available_drugs || [];
        setDrugs(list);
        if (list.length > 0) setDrugName(list[0]);
      } catch {
        setError("Failed to load drugs from backend.");
      }
    }

    loadInitial();
  }, []);

  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        const latest = await fetchLatest();
        setLiveResult(latest);
      } catch { }

      try {
        const historyData = await fetchHistory();
        setHistory(historyData.history || []);
      } catch { }

      setLastRefresh(new Date().toLocaleTimeString());
    };

    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoadingPrediction(true);

    try {
      const data = await predictRisk({
        drug_name: drugName,
        temperature_exposure: parseFloat(temperature),
        humidity: parseFloat(humidity),
        exposure_hours: parseFloat(exposureHours),
        location: location || "Manual Dashboard Input",
        source: "manual",
        facility_id: "FAC-MANUAL",
        device_id: "MANUAL-ENTRY",
        batch_id: "BATCH-MANUAL",
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Check backend or input values.");
    } finally {
      setLoadingPrediction(false);
    }
  };

  const metrics = useMemo(() => {
    const total = history.length;
    const high = history.filter((x) => x.predicted_degradation_risk === "High").length;
    const moderate = history.filter((x) => x.predicted_degradation_risk === "Moderate").length;
    const low = history.filter((x) => x.predicted_degradation_risk === "Low").length;
    const sensor = history.filter((x) => x.source === "sensor").length;
    const manual = history.filter((x) => x.source === "manual").length;
    const escalated = history.filter((x) => x.escalation_level === "ESCALATED CRITICAL").length;

    const drugCounts = {};
    history.forEach((item) => {
      drugCounts[item.drug_name] = (drugCounts[item.drug_name] || 0) + 1;
    });

    const locationMap = {};
    history.forEach((item) => {
      const key = item.location || "Unknown Location";

      if (!locationMap[key]) {
        locationMap[key] = {
          location: key,
          total: 0,
          high: 0,
          moderate: 0,
          low: 0,
          escalated: 0,
          latestDrug: item.drug_name || "N/A",
          latestFacility: item.facility_id || "N/A",
          latestBatch: item.batch_id || "N/A",
        };
      }

      locationMap[key].total += 1;

      if (item.predicted_degradation_risk === "High") locationMap[key].high += 1;
      if (item.predicted_degradation_risk === "Moderate") locationMap[key].moderate += 1;
      if (item.predicted_degradation_risk === "Low") locationMap[key].low += 1;
      if (item.escalation_level === "ESCALATED CRITICAL") locationMap[key].escalated += 1;
    });

    const locationSummary = Object.values(locationMap).sort((a, b) => {
      if (b.escalated !== a.escalated) return b.escalated - a.escalated;
      if (b.high !== a.high) return b.high - a.high;
      return b.total - a.total;
    });

    const priorityScore = (item) => {
      let score = 0;

      if (item.escalation_level === "ESCALATED CRITICAL") score += 100;
      else if (item.escalation_level === "WARNING") score += 50;

      if (item.compliance_status === "NON-COMPLIANT") score += 40;
      else if (item.compliance_status === "AT RISK") score += 20;

      if (item.predicted_degradation_risk === "High") score += 30;
      else if (item.predicted_degradation_risk === "Moderate") score += 15;

      score += (item.repeated_non_compliance_count || 0) * 5;
      score += (item.threshold_breaches?.length || 0) * 5;

      return score;
    };

    const alertCenter = [...history]
      .map((item) => ({
        ...item,
        priority_score: priorityScore(item),
      }))
      .filter((item) => item.priority_score > 0)
      .sort((a, b) => b.priority_score - a.priority_score)
      .slice(0, 8);

    return {
      total,
      high,
      moderate,
      low,
      sensor,
      manual,
      escalated,
      drugCounts,
      locationSummary,
      alertCenter,
    };
  }, [history]);

  const trendData = useMemo(() => {
    return [...history]
      .slice(0, 12)
      .reverse()
      .map((item, index) => ({
        idx: index + 1,
        time: item.timestamp
          ? item.timestamp.replace("T", " ").replace("Z", "").slice(11, 16)
          : `P${index + 1}`,
        temperature: Number(item.temperature_exposure ?? 0),
        humidity: Number(item.humidity ?? 0),
        riskScore:
          item.predicted_degradation_risk === "High"
            ? 3
            : item.predicted_degradation_risk === "Moderate"
              ? 2
              : 1,
      }));
  }, [history]);

  const maxRiskCount = Math.max(metrics.high, metrics.moderate, metrics.low, 1);

  const riskTone = (risk) => {
    if (risk === "High") return "bg-red-100 text-red-700 ring-1 ring-red-200";
    if (risk === "Moderate") return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  };

  const complianceTone = (status) => {
    if (status === "NON-COMPLIANT") return "border-red-200 bg-red-50 text-red-700";
    if (status === "AT RISK") return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  };

  const sourceTone = (source) =>
    source === "sensor"
      ? "bg-sky-100 text-sky-700 ring-1 ring-sky-200"
      : "bg-violet-100 text-violet-700 ring-1 ring-violet-200";

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-2">
        <TopBar
          onExportCsv={() => exportHistoryToCsv(history)}
          onPrint={() => window.print()}
        />

        <ReportSummary
          apiStatus={apiStatus}
          lastRefresh={lastRefresh}
          liveResult={liveResult}
        />

        <StatsGrid metrics={metrics} />

        <AlertCenter alerts={metrics.alertCenter} riskTone={riskTone} />

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] print:grid-cols-1">
          <div className="space-y-6">
            <ManualPredictionForm
              drugs={drugs}
              drugName={drugName}
              setDrugName={setDrugName}
              temperature={temperature}
              setTemperature={setTemperature}
              humidity={humidity}
              setHumidity={setHumidity}
              exposureHours={exposureHours}
              setExposureHours={setExposureHours}
              location={location}
              setLocation={setLocation}
              handleSubmit={handleSubmit}
              loadingPrediction={loadingPrediction}
              error={error}
            />

            {result && (
              <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-sky-100/25 print:hidden">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Manual Prediction Result</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Decision-ready output for the submitted scenario.
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${sourceTone(result.source)}`}>
                    {result.source}
                  </span>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl glass-card p-4">
                    <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Drug</div>
                    <div className="text-sm font-medium text-slate-900">{result.drug_name}</div>
                  </div>

                  <div className="rounded-2xl glass-card p-4">
                    <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Location</div>
                    <div className="text-sm font-medium text-slate-900">{result.location}</div>
                  </div>

                  <div className="rounded-2xl glass-card p-4">
                    <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Urgency</div>
                    <div className="text-sm font-medium text-slate-900">{result.urgency}</div>
                  </div>

                  <div className="rounded-2xl glass-card p-4">
                    <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Class</div>
                    <div className="text-sm font-medium text-slate-900">{result.drug_class}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${riskTone(result.predicted_degradation_risk)}`}>
                    {result.predicted_degradation_risk} Risk
                  </div>
                  <div className={`rounded-2xl border px-4 py-3 ${complianceTone(result.compliance_status)}`}>
                    <strong>Compliance:</strong> {result.compliance_status}
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
                  <strong>Escalation Level:</strong> {result.escalation_level}
                </div>

                <div className="mt-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
                  <strong>Breach Status:</strong> {result.breach_status}
                </div>

                <div className="mt-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
                  <strong>Repeated Non-Compliance Count:</strong> {result.repeated_non_compliance_count}
                </div>

                {result.threshold_breaches && result.threshold_breaches.length > 0 && (
                  <div className="mt-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-amber-700">
                    <strong>Threshold Breaches:</strong>
                    <ul className="mt-2 list-disc pl-5">
                      {result.threshold_breaches.map((breach, index) => (
                        <li key={index}>{breach}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 rounded-2xl border border-sky-200/70 bg-sky-50/90 px-4 py-3 text-sky-700">
                  <strong>Alert:</strong> {result.alert}
                </div>

                <div className="mt-3 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-slate-700">
                  <strong>Recommended Action:</strong> {result.recommended_action}
                </div>
              </section>
            )}
          </div>

          <LiveMonitoringPanel
            liveResult={liveResult}
            riskTone={riskTone}
            complianceTone={complianceTone}
            sourceTone={sourceTone}
          />
        </div>

        <TrendCharts trendData={trendData} />

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-sky-600" />
            <h2 className="text-xl font-semibold text-slate-900">Risk Distribution</h2>
          </div>

          <RiskBar label="High" value={metrics.high} max={maxRiskCount} color="bg-red-500" />
          <RiskBar label="Moderate" value={metrics.moderate} max={maxRiskCount} color="bg-amber-500" />
          <RiskBar label="Low" value={metrics.low} max={maxRiskCount} color="bg-emerald-500" />
        </section>

        <LocationRiskOverview locationSummary={metrics.locationSummary} />
        <InspectionPriorityPanel alerts={metrics.alertCenter} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr] print:grid-cols-1">
          <DrugActivitySummary drugCounts={metrics.drugCounts} />
        </div>

        <MonitoringHistoryTable
          history={history}
          sourceTone={sourceTone}
          riskTone={riskTone}
        />
      </div>
    </div>
  );
}

export default DashboardPage;