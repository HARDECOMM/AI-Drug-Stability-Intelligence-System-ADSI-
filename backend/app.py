from flask import Flask, request, jsonify
import pandas as pd
import joblib
from pathlib import Path

app = Flask(__name__)

# ---------------------------------------------
# Paths
# ---------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"

# ---------------------------------------------
# Load model and drug metadata
# ---------------------------------------------
model = joblib.load(MODEL_PATH)
drug_data = pd.read_csv(DRUG_METADATA_PATH)

# ---------------------------------------------
# Home route
# ---------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "ADSI Prediction API is running",
        "available_endpoints": [
            "/drugs",
            "/predict"
        ]
    })

# ---------------------------------------------
# List available drugs
# ---------------------------------------------
@app.route("/drugs", methods=["GET"])
def get_drugs():
    drugs = drug_data["drug_name"].tolist()
    return jsonify({
        "available_drugs": drugs
    })

# ---------------------------------------------
# Prediction endpoint
# ---------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON payload received"}), 400

        required_fields = ["drug_name", "temperature_exposure", "humidity", "exposure_hours"]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        drug_name = data["drug_name"]
        temperature = float(data["temperature_exposure"])
        humidity = float(data["humidity"])
        exposure_hours = float(data["exposure_hours"])

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

        return jsonify({
            "drug_name": drug_name,
            "drug_class": drug_class,
            "recommended_temp": recommended_temp,
            "stability_index": stability_index,
            "temperature_exposure": temperature,
            "humidity": humidity,
            "exposure_hours": exposure_hours,
            "predicted_degradation_risk": prediction
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------------------------
# Run server
# ---------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)