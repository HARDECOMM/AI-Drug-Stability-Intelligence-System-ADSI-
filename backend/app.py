import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from pathlib import Path
import json
from datetime import datetime

allowed_origins = ["http://localhost:5173"]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": allowed_origins}})

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"
LATEST_STATE_PATH = BASE_DIR / "backend" / "latest_state.json"
HISTORY_PATH = BASE_DIR / "backend" / "history.json"

model = joblib.load(MODEL_PATH)
drug_data = pd.read_csv(DRUG_METADATA_PATH)

def save_latest_state(payload):
    with open(LATEST_STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

def load_history():
    if HISTORY_PATH.exists():
        try:
            with open(HISTORY_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def append_history(payload):
    history = load_history()
    history.insert(0, payload)
    history = history[:100]

    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def count_recent_non_compliance(history, facility_id, batch_id):
    count = 0
    for item in history[:30]:
        same_facility = item.get("facility_id") == facility_id
        same_batch = item.get("batch_id") == batch_id
        at_risk = item.get("compliance_status") in ["AT RISK", "NON-COMPLIANT"]

        if same_facility and same_batch and at_risk:
            count += 1
    return count

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "ADSI Prediction API is running",
        "system_name": "AI Drug Stability Intelligence System",
        "status": "online",
        "available_endpoints": [
            "/drugs",
            "/predict",
            "/latest",
            "/history"
        ]
    })

@app.route("/drugs", methods=["GET"])
def get_drugs():
    return jsonify({
        "available_drugs": drug_data["drug_name"].tolist()
    })

@app.route("/latest", methods=["GET"])
def get_latest():
    if not LATEST_STATE_PATH.exists():
        return jsonify({"message": "No live prediction yet"}), 404

    with open(LATEST_STATE_PATH, "r", encoding="utf-8") as f:
        payload = json.load(f)

    return jsonify(payload)

@app.route("/history", methods=["GET"])
def get_history():
    return jsonify({"history": load_history()})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON payload received"}), 400

        required_fields = [
            "drug_name",
            "temperature_exposure",
            "humidity",
            "exposure_hours"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        drug_name = data["drug_name"]
        temperature = float(data["temperature_exposure"])
        humidity = float(data["humidity"])
        exposure_hours = float(data["exposure_hours"])
        location = data.get("location", "Unknown Location")
        source = data.get("source", "manual")
        device_id = data.get("device_id", "N/A")
        facility_id = data.get("facility_id", "FAC-001")
        batch_id = data.get("batch_id", "BATCH-UNKNOWN")

        drug_info = drug_data[drug_data["drug_name"].str.lower() == drug_name.lower()]

        if drug_info.empty:
            return jsonify({"error": "Drug not found in metadata"}), 404

        stability_index = float(drug_info.iloc[0]["stability_index"])
        recommended_temp = float(drug_info.iloc[0]["recommended_temp"])
        drug_class = drug_info.iloc[0]["drug_class"]

        input_data = pd.DataFrame([{
            "temperature_exposure": temperature,
            "humidity": humidity,
            "exposure_hours": exposure_hours,
            "stability_index": stability_index,
            "recommended_temp": recommended_temp
        }])

        prediction = model.predict(input_data)[0]

        # Base decision logic
        if prediction == "High":
            alert = "CRITICAL: Drug at risk of degradation"
            recommended_action = "Quarantine batch and investigate storage breach"
            compliance_status = "NON-COMPLIANT"
            urgency = "Immediate attention required"
        elif prediction == "Moderate":
            alert = "WARNING: Monitor storage conditions"
            recommended_action = "Inspect storage conditions and continue close monitoring"
            compliance_status = "AT RISK"
            urgency = "Monitoring required"
        else:
            alert = "SAFE: Conditions are acceptable"
            recommended_action = "Maintain current storage conditions"
            compliance_status = "COMPLIANT"
            urgency = "No immediate action required"

        # Threshold breach logic
        threshold_breaches = []

        if temperature > (recommended_temp + 8):
            threshold_breaches.append("Temperature exceeded critical tolerance")

        if humidity > 75:
            threshold_breaches.append("Humidity exceeded safe range")

        if exposure_hours > 8:
            threshold_breaches.append("Exposure duration exceeded safe monitoring window")

        breach_status = "BREACH DETECTED" if threshold_breaches else "NO BREACH"

        # Repeated non-compliance logic
        history = load_history()
        repeated_non_compliance_count = count_recent_non_compliance(history, facility_id, batch_id)

        if compliance_status == "NON-COMPLIANT" and repeated_non_compliance_count >= 2:
            escalation_level = "ESCALATED CRITICAL"
            alert = "ESCALATED CRITICAL: Repeated non-compliance detected"
            recommended_action = "Quarantine batch, notify supervisor, and trigger compliance investigation"
            urgency = "Immediate escalation required"
        elif compliance_status in ["AT RISK", "NON-COMPLIANT"] and repeated_non_compliance_count >= 1:
            escalation_level = "WARNING"
        else:
            escalation_level = "NORMAL"

        response_payload = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "source": source,
            "device_id": device_id,
            "facility_id": facility_id,
            "batch_id": batch_id,
            "drug_name": drug_name,
            "drug_class": drug_class,
            "recommended_temp": recommended_temp,
            "stability_index": stability_index,
            "temperature_exposure": temperature,
            "humidity": humidity,
            "exposure_hours": exposure_hours,
            "location": location,
            "predicted_degradation_risk": prediction,
            "alert": alert,
            "recommended_action": recommended_action,
            "compliance_status": compliance_status,
            "urgency": urgency,
            "breach_status": breach_status,
            "threshold_breaches": threshold_breaches,
            "repeated_non_compliance_count": repeated_non_compliance_count,
            "escalation_level": escalation_level
        }

        save_latest_state(response_payload)
        append_history(response_payload)

        return jsonify(response_payload)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)