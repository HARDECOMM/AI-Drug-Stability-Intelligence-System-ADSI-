# ADSI Risk Prediction Script with Drug List

import joblib
import pandas as pd

# ---------------------------------------------
# Load Model
# ---------------------------------------------

model = joblib.load("model.pkl")

# ---------------------------------------------
# Load Drug Metadata
# ---------------------------------------------

drug_data = pd.read_csv("../dataset/drug_metadata.csv")

print("\nADSI Drug Stability Risk Predictor")
print("-----------------------------------")

# ---------------------------------------------
# Display Available Drugs
# ---------------------------------------------

print("\nAvailable drugs:\n")

for i, drug in enumerate(drug_data["drug_name"], start=1):
    print(f"{i}. {drug}")

# ---------------------------------------------
# User Select Drug
# ---------------------------------------------

choice = int(input("\nSelect drug number: "))

if choice < 1 or choice > len(drug_data):
    print("Invalid selection.")
    exit()

selected_drug = drug_data.iloc[choice - 1]

drug_name = selected_drug["drug_name"]
stability_index = selected_drug["stability_index"]
recommended_temp = selected_drug["recommended_temp"]

# ---------------------------------------------
# Environmental Inputs
# ---------------------------------------------

temperature = float(input("Enter temperature exposure (°C): "))
humidity = float(input("Enter humidity (%): "))
exposure_hours = float(input("Enter exposure duration (hours): "))

# ---------------------------------------------
# Prepare Model Input
# ---------------------------------------------

input_data = pd.DataFrame([{
    "temperature_exposure": temperature,
    "humidity": humidity,
    "exposure_hours": exposure_hours,
    "stability_index": stability_index,
    "recommended_temp": recommended_temp
}])

# ---------------------------------------------
# Predict Risk
# ---------------------------------------------

prediction = model.predict(input_data)

print("\nDrug Selected:", drug_name)
print("Recommended Storage Temp:", recommended_temp)
print("Stability Index:", stability_index)

print("\nPredicted Degradation Risk:", prediction[0])


# # # ADSI Risk Prediction Script

# # import joblib
# # import pandas as pd

# # # ---------------------------------------------
# # # Step 1: Load Trained Model
# # # ---------------------------------------------

# # model = joblib.load("model.pkl")

# # print("ADSI Drug Stability Risk Predictor")
# # print("-----------------------------------")

# # # ---------------------------------------------
# # # Step 2: Get Environmental Inputs
# # # ---------------------------------------------

# # temperature = float(input("Enter temperature exposure (°C): "))
# # humidity = float(input("Enter humidity (%): "))
# # exposure_hours = float(input("Enter exposure duration (hours): "))
# # stability_index = float(input("Enter drug stability index: "))
# # recommended_temp = float(input("Enter recommended storage temp (°C): "))

# # # ---------------------------------------------
# # # Step 3: Create Input DataFrame
# # # ---------------------------------------------

# # input_data = pd.DataFrame([{
# #     "temperature_exposure": temperature,
# #     "humidity": humidity,
# #     "exposure_hours": exposure_hours,
# #     "stability_index": stability_index,
# #     "recommended_temp": recommended_temp
# # }])

# # # ---------------------------------------------
# # # Step 4: Predict Risk
# # # ---------------------------------------------

# # prediction = model.predict(input_data)

# # print("\nPredicted Drug Degradation Risk:", prediction[0])



# # ADSI Risk Prediction Script with Drug Lookup

# import joblib
# import pandas as pd

# # ---------------------------------------------
# # Load Model
# # ---------------------------------------------

# model = joblib.load("model.pkl")

# # ---------------------------------------------
# # Load Drug Metadata
# # ---------------------------------------------

# drug_data = pd.read_csv("../dataset/drug_metadata.csv")

# print("ADSI Drug Stability Risk Predictor")
# print("-----------------------------------")

# # ---------------------------------------------
# # User Inputs
# # ---------------------------------------------

# drug_name = input("Enter drug name: ")
# temperature = float(input("Enter temperature exposure (°C): "))
# humidity = float(input("Enter humidity (%): "))
# exposure_hours = float(input("Enter exposure duration (hours): "))

# # ---------------------------------------------
# # Lookup Drug Information
# # ---------------------------------------------

# drug_info = drug_data[drug_data["drug_name"].str.lower() == drug_name.lower()]

# if drug_info.empty:
#     print("Drug not found in database.")
#     exit()

# stability_index = drug_info.iloc[0]["stability_index"]
# recommended_temp = drug_info.iloc[0]["recommended_temp"]

# # ---------------------------------------------
# # Prepare Input for Model
# # ---------------------------------------------

# input_data = pd.DataFrame([{
#     "temperature_exposure": temperature,
#     "humidity": humidity,
#     "exposure_hours": exposure_hours,
#     "stability_index": stability_index,
#     "recommended_temp": recommended_temp
# }])

# # ---------------------------------------------
# # Predict Risk
# # ---------------------------------------------

# prediction = model.predict(input_data)

# print("\nDrug:", drug_name)
# print("Recommended Temp:", recommended_temp)
# print("Stability Index:", stability_index)

# print("\nPredicted Degradation Risk:", prediction[0])