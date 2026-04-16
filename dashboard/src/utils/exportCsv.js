export function exportHistoryToCsv(history) {
  if (!history?.length) return;

  const headers = [
    "timestamp",
    "source",
    "device_id",
    "facility_id",
    "batch_id",
    "drug_name",
    "drug_class",
    "location",
    "temperature_exposure",
    "humidity",
    "exposure_hours",
    "predicted_degradation_risk",
    "compliance_status",
    "urgency",
    "alert",
    "recommended_action",
    "breach_status",
    "escalation_level",
    "repeated_non_compliance_count",
    "threshold_breaches",
  ];

  const rows = history.map((item) =>
    headers
      .map((header) => {
        const value =
          header === "threshold_breaches"
            ? (item[header] || []).join("; ")
            : item[header] ?? "";
        const safe = String(value).replace(/"/g, '""');
        return `"${safe}"`;
      })
      .join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "adsi_monitoring_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}