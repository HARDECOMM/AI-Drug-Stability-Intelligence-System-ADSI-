import requests
import time
import random

URL = "https://ai-drug-stability-intelligence-system.onrender.com/predict"  # "http://127.0.0.1:5000/predict"

DRUGS = ["Insulin", "Amoxicillin", "Paracetamol", "Aspirin", "Metformin"]
LOCATIONS = [
    "Lagos Warehouse A",
    "Abuja Transit Hub",
    "Port Harcourt Pharmacy",
    "Kano Cold Room",
    "Enugu Distribution Center",
]
FACILITY_IDS = ["FAC-001", "FAC-002", "FAC-003"]
DEVICE_IDS = ["DEV-101", "DEV-102", "DEV-103", "DEV-104"]


def generate_payload():
    return {
        "drug_name": random.choice(DRUGS),
        "temperature_exposure": round(random.uniform(20, 45), 2),
        "humidity": round(random.uniform(40, 85), 2),
        "exposure_hours": round(random.uniform(1, 10), 2),
        "location": random.choice(LOCATIONS),
        "source": "sensor",
        "facility_id": random.choice(FACILITY_IDS),
        "device_id": random.choice(DEVICE_IDS),
        "batch_id": f"BATCH-{random.randint(1001, 1099)}",
    }


def main():
    print("Starting ADSI live simulator...")
    print("Press Ctrl+C to stop.\n")

    while True:
        payload = generate_payload()

        try:
            response = requests.post(URL, json=payload, timeout=10)
            print("Sent:", payload)
            print("Received:", response.json())
            print("-" * 80)
        except Exception as e:
            print("Error sending simulated data:", e)

        time.sleep(5)


if __name__ == "__main__":
    main()