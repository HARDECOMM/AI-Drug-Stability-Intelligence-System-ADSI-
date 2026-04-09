import requests
import time
import random

URL = "http://127.0.0.1:5000/predict"

drugs = ["Insulin", "Amoxicillin", "Paracetamol", "Aspirin", "Metformin"]
locations = [
    "Lagos Warehouse A",
    "Abuja Transit Hub",
    "Port Harcourt Pharmacy",
    "Kano Cold Room",
    "Enugu Distribution Center"
]

print("Starting ADSI live simulator...")
print("Press Ctrl+C to stop.\n")

while True:
    payload = {
        "drug_name": random.choice(drugs),
        "temperature_exposure": round(random.uniform(20, 45), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "exposure_hours": round(random.uniform(1, 10), 2),
        "location": random.choice(locations),
        "source": "sensor"
    }

    try:
        response = requests.post(URL, json=payload)
        print("Sent:", payload)
        print("Received:", response.json())
        print("-" * 60)
    except Exception as e:
        print("Error sending simulated data:", e)

    time.sleep(5)


# import requests
# import time
# import random

# URL = "http://127.0.0.1:5000/predict"

# drugs = ["Insulin", "Amoxicillin", "Paracetamol", "Aspirin", "Metformin"]
# locations = [
#     "Lagos Warehouse A",
#     "Abuja Transit Hub",
#     "Port Harcourt Pharmacy",
#     "Kano Cold Room",
#     "Enugu Distribution Center"
# ]

# print("Starting ADSI live simulator...")
# print("Press Ctrl+C to stop.\n")

# while True:
#     payload = {
#         "drug_name": random.choice(drugs),
#         "temperature_exposure": round(random.uniform(20, 45), 2),
#         "humidity": round(random.uniform(40, 80), 2),
#         "exposure_hours": round(random.uniform(1, 10), 2),
#         "location": random.choice(locations)
#     }

#     try:
#         response = requests.post(URL, json=payload)
#         print("Sent:", payload)
#         print("Received:", response.json())
#         print("-" * 60)
#     except Exception as e:
#         print("Error sending simulated data:", e)

#     time.sleep(5)