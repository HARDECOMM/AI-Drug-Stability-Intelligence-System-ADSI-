# ADSI Drug Stability Risk Prediction Model

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
import joblib

# ---------------------------------------------
# Step 1: Load Dataset
# ---------------------------------------------

df = pd.read_csv("../dataset/drug_stability_dataset.csv")

print("Dataset Loaded")
print(df.head())

# ---------------------------------------------
# Step 2: Feature Selection
# ---------------------------------------------

features = [
    "temperature_exposure",
    "humidity",
    "exposure_hours",
    "stability_index",
    "recommended_temp"
]

X = df[features]
y = df["risk_label"]

# ---------------------------------------------
# Step 3: Train/Test Split
# ---------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# ---------------------------------------------
# Step 4: Train Model
# ---------------------------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

print("Model training complete.")

# ---------------------------------------------
# Step 5: Evaluate Model
# ---------------------------------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ---------------------------------------------
# Step 6: Save Model
# ---------------------------------------------

joblib.dump(model, "model.pkl")

print("\nModel saved as model.pkl")