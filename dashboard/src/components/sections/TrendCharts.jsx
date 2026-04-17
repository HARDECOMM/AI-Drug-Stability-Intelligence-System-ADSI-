import { LineChart as LineChartIcon } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function TrendCharts({ trendData }) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-2 print:grid-cols-1">
      <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/25">
        <div className="mb-5 flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-slate-900">Temperature Trend</h2>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#14b8a6" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl glass-strong p-6 shadow-xl shadow-teal-100/25">
        <div className="mb-5 flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-slate-900">Humidity Trend</h2>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#0f766e" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default TrendCharts;