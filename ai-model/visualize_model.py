# ADSI Model Visualization Script

import pandas as pd
import matplotlib.pyplot as plt
import joblib
from sklearn.preprocessing import LabelEncoder

# ---------------------------------------------
# Load Dataset and Model
# ---------------------------------------------

df = pd.read_csv("../dataset/drug_stability_dataset.csv")
model = joblib.load("model.pkl")

# ---------------------------------------------
# Encode Risk Labels for Plotting
# ---------------------------------------------

label_encoder = LabelEncoder()
df["risk_encoded"] = label_encoder.fit_transform(df["risk_label"])

# ---------------------------------------------
# 1. Risk Distribution Chart
# ---------------------------------------------

plt.figure(figsize=(8, 5))
df["risk_label"].value_counts().plot(kind="bar")
plt.title("Drug Degradation Risk Distribution")
plt.xlabel("Risk Category")
plt.ylabel("Count")
plt.tight_layout()
plt.savefig("../figures/risk_distribution.png")
plt.close()

# ---------------------------------------------
# 2. Temperature Exposure vs Risk
# ---------------------------------------------

plt.figure(figsize=(8, 5))
for risk in df["risk_label"].unique():
    subset = df[df["risk_label"] == risk]
    plt.scatter(subset["temperature_exposure"], subset["exposure_hours"], label=risk, alpha=0.6)

plt.title("Temperature Exposure vs Exposure Duration by Risk")
plt.xlabel("Temperature Exposure (°C)")
plt.ylabel("Exposure Hours")
plt.legend()
plt.tight_layout()
plt.savefig("../figures/temperature_vs_risk.png")
plt.close()

# ---------------------------------------------
# 3. Feature Importance
# ---------------------------------------------

features = [
    "temperature_exposure",
    "humidity",
    "exposure_hours",
    "stability_index",
    "recommended_temp"
]

importance = model.feature_importances_

plt.figure(figsize=(8, 5))
plt.bar(features, importance)
plt.title("Feature Importance in Drug Stability Risk Prediction")
plt.xlabel("Features")
plt.ylabel("Importance Score")
plt.xticks(rotation=20)
plt.tight_layout()
plt.savefig("../figures/feature_importance.png")
plt.close()

# ---------------------------------------------
# 4. Humidity vs Exposure Scatter
# ---------------------------------------------

plt.figure(figsize=(8, 5))
plt.scatter(df["humidity"], df["exposure_hours"], alpha=0.5)
plt.title("Humidity vs Exposure Hours")
plt.xlabel("Humidity (%)")
plt.ylabel("Exposure Hours")
plt.tight_layout()
plt.savefig("../figures/humidity_exposure_scatter.png")
plt.close()

print("Visualizations saved successfully in ../figures/")