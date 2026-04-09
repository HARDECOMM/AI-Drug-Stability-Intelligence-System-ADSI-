# from flask import Flask, request, jsonify
# import pandas as pd
# import joblib
# from pathlib import Path

# app = Flask(__name__)

# # ---------------------------------------------
# # Paths
# # ---------------------------------------------
# BASE_DIR = Path(__file__).resolve().parent.parent
# MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
# DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"

# # ---------------------------------------------
# # Load model and drug metadata
# # ---------------------------------------------
# model = joblib.load(MODEL_PATH)
# drug_data = pd.read_csv(DRUG_METADATA_PATH)

# # ---------------------------------------------
# # Home route
# # ---------------------------------------------
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "message": "ADSI Prediction API is running",
#         "available_endpoints": [
#             "/drugs",
#             "/predict"
#         ]
#     })

# # ---------------------------------------------
# # List available drugs
# # ---------------------------------------------
# @app.route("/drugs", methods=["GET"])
# def get_drugs():
#     drugs = drug_data["drug_name"].tolist()
#     return jsonify({
#         "available_drugs": drugs
#     })

# # ---------------------------------------------
# # Prediction endpoint
# # ---------------------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"error": "No JSON payload received"}), 400

#         required_fields = ["drug_name", "temperature_exposure", "humidity", "exposure_hours"]

#         for field in required_fields:
#             if field not in data:
#                 return jsonify({"error": f"Missing field: {field}"}), 400

#         drug_name = data["drug_name"]
#         temperature = float(data["temperature_exposure"])
#         humidity = float(data["humidity"])
#         exposure_hours = float(data["exposure_hours"])

#         drug_info = drug_data[drug_data["drug_name"].str.lower() == drug_name.lower()]

#         if drug_info.empty:
#             return jsonify({"error": "Drug not found in metadata"}), 404

#         stability_index = float(drug_info.iloc[0]["stability_index"])
#         recommended_temp = float(drug_info.iloc[0]["recommended_temp"])
#         drug_class = drug_info.iloc[0]["drug_class"]

#         input_data = pd.DataFrame([{
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "stability_index": stability_index,
#             "recommended_temp": recommended_temp
#         }])

#         prediction = model.predict(input_data)[0]

#         return jsonify({
#             "drug_name": drug_name,
#             "drug_class": drug_class,
#             "recommended_temp": recommended_temp,
#             "stability_index": stability_index,
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "predicted_degradation_risk": prediction
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ---------------------------------------------
# # Run server
# # ---------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import joblib
# from pathlib import Path

# app = Flask(__name__)
# CORS(app)

# BASE_DIR = Path(__file__).resolve().parent.parent
# MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
# DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"

# model = joblib.load(MODEL_PATH)
# drug_data = pd.read_csv(DRUG_METADATA_PATH)

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "message": "ADSI Prediction API is running",
#         "available_endpoints": ["/drugs", "/predict"]
#     })

# @app.route("/drugs", methods=["GET"])
# def get_drugs():
#     drugs = drug_data["drug_name"].tolist()
#     return jsonify({"available_drugs": drugs})

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"error": "No JSON payload received"}), 400

#         required_fields = ["drug_name", "temperature_exposure", "humidity", "exposure_hours"]

#         for field in required_fields:
#             if field not in data:
#                 return jsonify({"error": f"Missing field: {field}"}), 400

#         drug_name = data["drug_name"]
#         temperature = float(data["temperature_exposure"])
#         humidity = float(data["humidity"])
#         exposure_hours = float(data["exposure_hours"])

#         drug_info = drug_data[drug_data["drug_name"].str.lower() == drug_name.lower()]

#         if drug_info.empty:
#             return jsonify({"error": "Drug not found in metadata"}), 404

#         stability_index = float(drug_info.iloc[0]["stability_index"])
#         recommended_temp = float(drug_info.iloc[0]["recommended_temp"])
#         drug_class = drug_info.iloc[0]["drug_class"]

#         input_data = pd.DataFrame([{
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "stability_index": stability_index,
#             "recommended_temp": recommended_temp
#         }])

#         prediction = model.predict(input_data)[0]

#         return jsonify({
#             "drug_name": drug_name,
#             "drug_class": drug_class,
#             "recommended_temp": recommended_temp,
#             "stability_index": stability_index,
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "predicted_degradation_risk": prediction
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import joblib
# from pathlib import Path
# import json

# app = Flask(__name__)
# CORS(app)

# # ---------------------------------------------
# # Paths
# # ---------------------------------------------
# BASE_DIR = Path(__file__).resolve().parent.parent
# MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
# DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"
# LATEST_STATE_PATH = BASE_DIR / "backend" / "latest_state.json"

# # ---------------------------------------------
# # Load model and metadata
# # ---------------------------------------------
# model = joblib.load(MODEL_PATH)
# drug_data = pd.read_csv(DRUG_METADATA_PATH)

# # ---------------------------------------------
# # Helper: save latest state
# # ---------------------------------------------
# def save_latest_state(payload):
#     with open(LATEST_STATE_PATH, "w", encoding="utf-8") as f:
#         json.dump(payload, f, indent=2)

# # ---------------------------------------------
# # Home route
# # ---------------------------------------------
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "message": "ADSI Prediction API is running",
#         "available_endpoints": [
#             "/drugs",
#             "/predict",
#             "/latest"
#         ]
#     })

# # ---------------------------------------------
# # Drug list route
# # ---------------------------------------------
# @app.route("/drugs", methods=["GET"])
# def get_drugs():
#     return jsonify({
#         "available_drugs": drug_data["drug_name"].tolist()
#     })

# # ---------------------------------------------
# # Latest live state
# # ---------------------------------------------
# @app.route("/latest", methods=["GET"])
# def get_latest():
#     if not LATEST_STATE_PATH.exists():
#         return jsonify({"message": "No live prediction yet"}), 404

#     with open(LATEST_STATE_PATH, "r", encoding="utf-8") as f:
#         payload = json.load(f)

#     return jsonify(payload)

# # ---------------------------------------------
# # Predict route
# # ---------------------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"error": "No JSON payload received"}), 400

#         required_fields = [
#             "drug_name",
#             "temperature_exposure",
#             "humidity",
#             "exposure_hours"
#         ]

#         for field in required_fields:
#             if field not in data:
#                 return jsonify({"error": f"Missing field: {field}"}), 400

#         drug_name = data["drug_name"]
#         temperature = float(data["temperature_exposure"])
#         humidity = float(data["humidity"])
#         exposure_hours = float(data["exposure_hours"])
#         location = data.get("location", "Unknown Location")

#         drug_info = drug_data[drug_data["drug_name"].str.lower() == drug_name.lower()]

#         if drug_info.empty:
#             return jsonify({"error": "Drug not found in metadata"}), 404

#         stability_index = float(drug_info.iloc[0]["stability_index"])
#         recommended_temp = float(drug_info.iloc[0]["recommended_temp"])
#         drug_class = drug_info.iloc[0]["drug_class"]

#         input_data = pd.DataFrame([{
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "stability_index": stability_index,
#             "recommended_temp": recommended_temp
#         }])

#         prediction = model.predict(input_data)[0]

#         if prediction == "High":
#             alert = "CRITICAL: Drug at risk of degradation"
#         elif prediction == "Moderate":
#             alert = "WARNING: Monitor storage conditions"
#         else:
#             alert = "SAFE: Conditions are acceptable"

#         response_payload = {
#             "drug_name": drug_name,
#             "drug_class": drug_class,
#             "recommended_temp": recommended_temp,
#             "stability_index": stability_index,
#             "temperature_exposure": temperature,
#             "humidity": humidity,
#             "exposure_hours": exposure_hours,
#             "location": location,
#             "predicted_degradation_risk": prediction,
#             "alert": alert
#         }

#         save_latest_state(response_payload)

#         return jsonify(response_payload)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ---------------------------------------------
# # Run server
# # ---------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from pathlib import Path
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ---------------------------------------------
# Paths
# ---------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "ai-model" / "model.pkl"
DRUG_METADATA_PATH = BASE_DIR / "dataset" / "drug_metadata.csv"
LATEST_STATE_PATH = BASE_DIR / "backend" / "latest_state.json"
HISTORY_PATH = BASE_DIR / "backend" / "history.json"

# ---------------------------------------------
# Load model and metadata
# ---------------------------------------------
model = joblib.load(MODEL_PATH)
drug_data = pd.read_csv(DRUG_METADATA_PATH)

# ---------------------------------------------
# Helpers
# ---------------------------------------------
def save_latest_state(payload):
    with open(LATEST_STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

def append_history(payload):
    history = []

    if HISTORY_PATH.exists():
        try:
            with open(HISTORY_PATH, "r", encoding="utf-8") as f:
                history = json.load(f)
        except Exception:
            history = []

    history.insert(0, payload)
    history = history[:50]  # keep only latest 50 records

    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

# ---------------------------------------------
# Routes
# ---------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "ADSI Prediction API is running",
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
    if not HISTORY_PATH.exists():
        return jsonify({"history": []})

    with open(HISTORY_PATH, "r", encoding="utf-8") as f:
        history = json.load(f)

    return jsonify({"history": history})

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

        if prediction == "High":
            alert = "CRITICAL: Drug at risk of degradation"
        elif prediction == "Moderate":
            alert = "WARNING: Monitor storage conditions"
        else:
            alert = "SAFE: Conditions are acceptable"

        response_payload = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "source": source,
            "drug_name": drug_name,
            "drug_class": drug_class,
            "recommended_temp": recommended_temp,
            "stability_index": stability_index,
            "temperature_exposure": temperature,
            "humidity": humidity,
            "exposure_hours": exposure_hours,
            "location": location,
            "predicted_degradation_risk": prediction,
            "alert": alert
        }

        save_latest_state(response_payload)
        append_history(response_payload)

        return jsonify(response_payload)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)