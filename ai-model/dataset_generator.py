import pandas as pd
import numpy as np

drugs = [
    ("Insulin", "Biologic", 8, 5),
    ("Amoxicillin", "Antibiotic", 25, 4),
    ("Paracetamol", "Analgesic", 30, 2),
    ("Aspirin", "Analgesic", 25, 3),
    ("Metformin", "Antidiabetic", 25, 2)
]

rows = []

for i in range(1000):

    drug = drugs[np.random.randint(len(drugs))]

    drug_name = drug[0]
    drug_class = drug[1]
    recommended_temp = drug[2]
    stability_index = drug[3]

    temperature = np.random.uniform(20, 45)
    humidity = np.random.uniform(40, 80)
    exposure_hours = np.random.uniform(1, 12)

    temp_diff = temperature - recommended_temp

    risk_score = temp_diff * stability_index * exposure_hours

    if risk_score < 20:
        risk = "Low"
    elif risk_score < 50:
        risk = "Moderate"
    else:
        risk = "High"

    rows.append([
        drug_name,
        drug_class,
        recommended_temp,
        temperature,
        humidity,
        exposure_hours,
        stability_index,
        risk
    ])

df = pd.DataFrame(rows, columns=[
    "drug_name",
    "drug_class",
    "recommended_temp",
    "temperature_exposure",
    "humidity",
    "exposure_hours",
    "stability_index",
    "risk_label"
])

df.to_csv("drug_stability_dataset.csv", index=False)