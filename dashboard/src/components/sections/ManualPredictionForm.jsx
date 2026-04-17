import Field from "../Field";

function ManualPredictionForm({
  drugs,
  drugName,
  setDrugName,
  temperature,
  setTemperature,
  humidity,
  setHumidity,
  exposureHours,
  setExposureHours,
  location,
  setLocation,
  handleSubmit,
  loadingPrediction,
  error,
}) {
  return (
    <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/30 print:hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Manual Risk Prediction</h2>
          <p className="mt-1 text-sm text-slate-500">
            Test a pharmacy or warehouse condition manually.
          </p>
          <p className="mt-1 text-xs text-slate-500">Selected drug: {drugName || "None"}</p>
        </div>
        <div className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs text-slate-600">
          Operator Input
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field label="Drug Name">
          <select
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100/80"
          >
            {drugs.map((drug, index) => (
              <option key={index} value={drug}>
                {drug}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Temperature Exposure (°C)">
            <input
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100/80"
            />
          </Field>

          <Field label="Humidity (%)">
            <input
              type="number"
              step="0.1"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100/80"
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Exposure Hours">
            <input
              type="number"
              step="0.1"
              value={exposureHours}
              onChange={(e) => setExposureHours(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100/80"
            />
          </Field>

          <Field label="Location">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lagos Warehouse A"
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100/80"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={loadingPrediction}
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 px-5 py-3.5 font-medium text-white shadow-xl shadow-teal-200/40 hover:scale-[1.01] disabled:opacity-60"
        >
          {loadingPrediction ? "Predicting..." : "Predict Risk"}
        </button>

        {error && (
          <div className="rounded-2xl border border-red-200/70 bg-red-50/90 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}

export default ManualPredictionForm;