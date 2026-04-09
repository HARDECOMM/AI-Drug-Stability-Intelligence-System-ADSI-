import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://127.0.0.1:5000";

function App() {
  const [drugs, setDrugs] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [exposureHours, setExposureHours] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [liveResult, setLiveResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/drugs`)
      .then((response) => {
        const list = response.data.available_drugs || [];
        setDrugs(list);
        if (list.length > 0) setDrugName(list[0]);
      })
      .catch(() => {
        setError("Failed to load drugs from backend.");
      });
  }, []);

  useEffect(() => {
    const fetchMonitoringData = async () => {
      try {
        const latestResponse = await axios.get(`${API_BASE}/latest`);
        setLiveResult(latestResponse.data);
      } catch {}

      try {
        const historyResponse = await axios.get(`${API_BASE}/history`);
        setHistory(historyResponse.data.history || []);
      } catch {}
    };

    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE}/predict`, {
        drug_name: drugName,
        temperature_exposure: parseFloat(temperature),
        humidity: parseFloat(humidity),
        exposure_hours: parseFloat(exposureHours),
        location: location || "Manual Dashboard Input",
        source: "manual"
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Check backend or input values.");
    }
  };

  const getRiskClass = (risk) => {
    if (risk === "High") return "risk-high";
    if (risk === "Moderate") return "risk-moderate";
    return "risk-low";
  };

  const getSourceClass = (source) => {
    return source === "sensor" ? "source-sensor" : "source-manual";
  };

  return (
    <div className="container">
      <h1>ADSI Dashboard</h1>
      <p className="subtitle">AI Drug Stability Intelligence System</p>

      <div className="grid">
        <div className="card">
          <h2>Manual Risk Prediction</h2>

          <form onSubmit={handleSubmit}>
            <label>Drug Name</label>
            <select value={drugName} onChange={(e) => setDrugName(e.target.value)}>
              {drugs.map((drug, index) => (
                <option key={index} value={drug}>
                  {drug}
                </option>
              ))}
            </select>

            <label>Temperature Exposure (°C)</label>
            <input
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
            />

            <label>Humidity (%)</label>
            <input
              type="number"
              step="0.1"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              required
            />

            <label>Exposure Hours</label>
            <input
              type="number"
              step="0.1"
              value={exposureHours}
              onChange={(e) => setExposureHours(e.target.value)}
              required
            />

            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lagos Warehouse A"
            />

            <button type="submit">Predict Risk</button>
          </form>

          {error && <div className="error">{error}</div>}
        </div>

        <div className="card">
          <h2>Latest Live Monitoring</h2>

          {liveResult ? (
            <div className="result-block">
              <p><strong>Drug:</strong> {liveResult.drug_name}</p>
              <p><strong>Location:</strong> {liveResult.location}</p>
              <p><strong>Source:</strong> 
                <span className={`source-badge ${getSourceClass(liveResult.source)}`}>
                  {liveResult.source}
                </span>
              </p>
              <p><strong>Temperature:</strong> {liveResult.temperature_exposure} °C</p>
              <p><strong>Humidity:</strong> {liveResult.humidity} %</p>
              <p><strong>Exposure Hours:</strong> {liveResult.exposure_hours}</p>
              <p><strong>Recommended Temp:</strong> {liveResult.recommended_temp} °C</p>

              <div className={`risk-badge ${getRiskClass(liveResult.predicted_degradation_risk)}`}>
                {liveResult.predicted_degradation_risk} Risk
              </div>

              <div className="alert-box">
                <strong>Alert:</strong> {liveResult.alert}
              </div>
            </div>
          ) : (
            <p>No live monitoring data yet. Start the simulator.</p>
          )}
        </div>
      </div>

      {result && (
        <div className="card result-card">
          <h2>Manual Prediction Result</h2>
          <p><strong>Drug:</strong> {result.drug_name}</p>
          <p><strong>Drug Class:</strong> {result.drug_class}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Source:</strong> 
            <span className={`source-badge ${getSourceClass(result.source)}`}>
              {result.source}
            </span>
          </p>
          <p><strong>Recommended Temp:</strong> {result.recommended_temp} °C</p>
          <p><strong>Stability Index:</strong> {result.stability_index}</p>

          <div className={`risk-badge ${getRiskClass(result.predicted_degradation_risk)}`}>
            {result.predicted_degradation_risk} Risk
          </div>

          <div className="alert-box">
            <strong>Alert:</strong> {result.alert}
          </div>
        </div>
      )}

      <div className="card history-card">
        <h2>Recent Monitoring History</h2>

        {history.length > 0 ? (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Drug</th>
                  <th>Location</th>
                  <th>Source</th>
                  <th>Temp</th>
                  <th>Humidity</th>
                  <th>Hours</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 10).map((item, index) => (
                  <tr key={index}>
                    <td>{item.timestamp ? item.timestamp.replace("T", " ").replace("Z", "") : "-"}</td>
                    <td>{item.drug_name}</td>
                    <td>{item.location}</td>
                    <td>
                      <span className={`source-badge ${getSourceClass(item.source)}`}>
                        {item.source}
                      </span>
                    </td>
                    <td>{item.temperature_exposure}</td>
                    <td>{item.humidity}</td>
                    <td>{item.exposure_hours}</td>
                    <td>
                      <span className={`risk-badge small ${getRiskClass(item.predicted_degradation_risk)}`}>
                        {item.predicted_degradation_risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No monitoring history yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// const API_BASE = "http://127.0.0.1:5000";

// function App() {
//   const [drugs, setDrugs] = useState([]);
//   const [drugName, setDrugName] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [exposureHours, setExposureHours] = useState("");
//   const [location, setLocation] = useState("");
//   const [result, setResult] = useState(null);
//   const [liveResult, setLiveResult] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/drugs`)
//       .then((response) => {
//         const list = response.data.available_drugs || [];
//         setDrugs(list);
//         if (list.length > 0) setDrugName(list[0]);
//       })
//       .catch(() => {
//         setError("Failed to load drugs from backend.");
//       });
//   }, []);

//   useEffect(() => {
//     const fetchLatest = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/latest`);
//         setLiveResult(response.data);
//       } catch {
//         // Ignore until live simulator posts data
//       }
//     };

//     fetchLatest();
//     const interval = setInterval(fetchLatest, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await axios.post(`${API_BASE}/predict`, {
//         drug_name: drugName,
//         temperature_exposure: parseFloat(temperature),
//         humidity: parseFloat(humidity),
//         exposure_hours: parseFloat(exposureHours),
//         location: location || "Manual Dashboard Input"
//       });

//       setResult(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Prediction failed. Check backend or input values.");
//     }
//   };

//   const getRiskClass = (risk) => {
//     if (risk === "High") return "risk-high";
//     if (risk === "Moderate") return "risk-moderate";
//     return "risk-low";
//   };

//   return (
//     <div className="container">
//       <h1>ADSI Dashboard</h1>
//       <p className="subtitle">AI Drug Stability Intelligence System</p>

//       <div className="grid">
//         <div className="card">
//           <h2>Manual Risk Prediction</h2>

//           <form onSubmit={handleSubmit}>
//             <label>Drug Name</label>
//             <select value={drugName} onChange={(e) => setDrugName(e.target.value)}>
//               {drugs.map((drug, index) => (
//                 <option key={index} value={drug}>
//                   {drug}
//                 </option>
//               ))}
//             </select>

//             <label>Temperature Exposure (°C)</label>
//             <input
//               type="number"
//               step="0.1"
//               value={temperature}
//               onChange={(e) => setTemperature(e.target.value)}
//               required
//             />

//             <label>Humidity (%)</label>
//             <input
//               type="number"
//               step="0.1"
//               value={humidity}
//               onChange={(e) => setHumidity(e.target.value)}
//               required
//             />

//             <label>Exposure Hours</label>
//             <input
//               type="number"
//               step="0.1"
//               value={exposureHours}
//               onChange={(e) => setExposureHours(e.target.value)}
//               required
//             />

//             <label>Location</label>
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="e.g. Lagos Warehouse A"
//             />

//             <button type="submit">Predict Risk</button>
//           </form>

//           {error && <div className="error">{error}</div>}
//         </div>

//         <div className="card">
//           <h2>Latest Live Monitoring</h2>

//           {liveResult ? (
//             <div className="result-block">
//               <p><strong>Drug:</strong> {liveResult.drug_name}</p>
//               <p><strong>Location:</strong> {liveResult.location}</p>
//               <p><strong>Temperature:</strong> {liveResult.temperature_exposure} °C</p>
//               <p><strong>Humidity:</strong> {liveResult.humidity} %</p>
//               <p><strong>Exposure Hours:</strong> {liveResult.exposure_hours}</p>
//               <p><strong>Recommended Temp:</strong> {liveResult.recommended_temp} °C</p>

//               <div className={`risk-badge ${getRiskClass(liveResult.predicted_degradation_risk)}`}>
//                 {liveResult.predicted_degradation_risk} Risk
//               </div>

//               <div className="alert-box">
//                 <strong>Alert:</strong> {liveResult.alert}
//               </div>
//             </div>
//           ) : (
//             <p>No live monitoring data yet. Start the simulator.</p>
//           )}
//         </div>
//       </div>

//       {result && (
//         <div className="card result-card">
//           <h2>Manual Prediction Result</h2>
//           <p><strong>Drug:</strong> {result.drug_name}</p>
//           <p><strong>Drug Class:</strong> {result.drug_class}</p>
//           <p><strong>Location:</strong> {result.location}</p>
//           <p><strong>Recommended Temp:</strong> {result.recommended_temp} °C</p>
//           <p><strong>Stability Index:</strong> {result.stability_index}</p>

//           <div className={`risk-badge ${getRiskClass(result.predicted_degradation_risk)}`}>
//             {result.predicted_degradation_risk} Risk
//           </div>

//           <div className="alert-box">
//             <strong>Alert:</strong> {result.alert}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [drugs, setDrugs] = useState([]);
//   const [drugName, setDrugName] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [exposureHours, setExposureHours] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/drugs")
//       .then((response) => {
//         setDrugs(response.data.available_drugs);
//         if (response.data.available_drugs.length > 0) {
//           setDrugName(response.data.available_drugs[0]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load drugs from backend.");
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", {
//         drug_name: drugName,
//         temperature_exposure: parseFloat(temperature),
//         humidity: parseFloat(humidity),
//         exposure_hours: parseFloat(exposureHours),
//       });

//       setResult(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Prediction failed. Check backend or input values.");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>ADSI Dashboard</h1>
//       <p>AI Drug Stability Intelligence System</p>

//       <form onSubmit={handleSubmit} className="form-card">
//         <label>Drug Name</label>
//         <select value={drugName} onChange={(e) => setDrugName(e.target.value)}>
//           {drugs.map((drug, index) => (
//             <option key={index} value={drug}>
//               {drug}
//             </option>
//           ))}
//         </select>

//         <label>Temperature Exposure (°C)</label>
//         <input
//           type="number"
//           step="0.1"
//           value={temperature}
//           onChange={(e) => setTemperature(e.target.value)}
//           required
//         />

//         <label>Humidity (%)</label>
//         <input
//           type="number"
//           step="0.1"
//           value={humidity}
//           onChange={(e) => setHumidity(e.target.value)}
//           required
//         />

//         <label>Exposure Hours</label>
//         <input
//           type="number"
//           step="0.1"
//           value={exposureHours}
//           onChange={(e) => setExposureHours(e.target.value)}
//           required
//         />

//         <button type="submit">Predict Risk</button>
//       </form>

//       {error && <div className="error">{error}</div>}

//       {result && (
//         <div className="result-card">
//           <h2>Prediction Result</h2>
//           <p><strong>Drug:</strong> {result.drug_name}</p>
//           <p><strong>Drug Class:</strong> {result.drug_class}</p>
//           <p><strong>Recommended Temp:</strong> {result.recommended_temp} °C</p>
//           <p><strong>Stability Index:</strong> {result.stability_index}</p>
//           <p><strong>Predicted Risk:</strong> {result.predicted_degradation_risk}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;