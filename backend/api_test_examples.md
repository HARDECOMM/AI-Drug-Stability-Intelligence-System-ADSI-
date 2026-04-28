# ADSI API Test Examples

> **Document Version**: 1.0
> **Date**: April 2026

---

## 1. Setup

### Start the API Server

```bash
cd backend
python app.py
```

The server will start on `http://localhost:5000`

---

## 2. Test Endpoints

### 2.1 Test Home Route

**Request:**
```
GET http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "ADSI Prediction API is running",
  "system_name": "AI Drug Stability Intelligence System",
  "status": "online",
  "available_endpoints": ["/drugs", "/predict", "/latest", "/history"]
}
```

---

### 2.2 Test Get Drug List

**Request:**
```
GET http://localhost:5000/drugs
```

**Expected Response:**
```json
{
  "available_drugs": [
    "Insulin",
    "Amoxicillin",
    "Azithromycin",
    "Metformin",
    "Paracetamol",
    "Artemether",
    "Ciprofloxacin"
  ]
}
```

---

### 2.3 Test Get Latest Prediction

**Request:**
```
GET http://localhost:5000/latest
```

**Expected Response (if data exists):**
```json
{
  "risk_level": "High",
  "risk_score": 2,
  "compliance": "Non-Compliant",
  "alert": "CRITICAL: Drug at risk of degradation",
  "recommendation": "Quarantine batch and investigate storage breach",
  "timestamp": "2026-04-28T10:30:00Z",
  "drug_name": "Insulin",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3
}
```

**Expected Response (if no data):**
```json
{
  "message": "No live prediction yet"
}
```

---

### 2.4 Test Get Prediction History

**Request:**
```
GET http://localhost:5000/history
```

**Expected Response:**
```json
{
  "history": [
    {
      "risk_level": "High",
      "drug_name": "Insulin",
      "timestamp": "2026-04-28T10:30:00Z"
    },
    {
      "risk_level": "Low",
      "drug_name": "Amoxicillin",
      "timestamp": "2026-04-28T09:45:00Z"
    }
  ]
}
```

---

## 3. Test Prediction Endpoint

### 3.1 Low Risk Example

**Request:**
```
POST http://localhost:5000/predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "drug_name": "Paracetamol",
  "temperature_exposure": 25,
  "humidity": 45,
  "exposure_hours": 2,
  "location": "Abuja",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001"
}
```

**Expected Response:**
```json
{
  "risk_level": "Low",
  "risk_score": 0,
  "compliance": "Compliant",
  "alert": "Drug storage conditions within acceptable limits",
  "recommendation": "Continue normal storage procedures",
  "urgency": "Normal operations",
  "timestamp": "2026-04-28T10:35:00Z",
  "drug_name": "Paracetamol",
  "drug_class": "Analgesic",
  "temperature_exposure": 25,
  "humidity": 45,
  "exposure_hours": 2,
  "location": "Abuja",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001",
  "stability_index": 8.5,
  "recommended_temp": 25
}
```

---

### 3.2 Moderate Risk Example

**Request:**
```json
{
  "drug_name": "Amoxicillin",
  "temperature_exposure": 30,
  "humidity": 55,
  "exposure_hours": 4,
  "location": "Lagos",
  "facility_id": "FAC-002",
  "batch_id": "BATCH-002"
}
```

**Expected Response:**
```json
{
  "risk_level": "Moderate",
  "risk_score": 1,
  "compliance": "AT RISK",
  "alert": "WARNING: Monitor storage conditions",
  "recommendation": "Inspect storage conditions and continue close monitoring",
  "urgency": "Elevated monitoring recommended",
  "timestamp": "2026-04-28T10:36:00Z",
  "drug_name": "Amoxicillin",
  "drug_class": "Antibiotic",
  "temperature_exposure": 30,
  "humidity": 55,
  "exposure_hours": 4,
  "location": "Lagos",
  "facility_id": "FAC-002",
  "batch_id": "BATCH-002",
  "stability_index": 6.2,
  "recommended_temp": 20
}
```

---

### 3.3 High Risk Example

**Request:**
```json
{
  "drug_name": "Insulin",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001"
}
```

**Expected Response:**
```json
{
  "risk_level": "High",
  "risk_score": 2,
  "compliance": "Non-Compliant",
  "alert": "CRITICAL: Drug at risk of degradation",
  "recommendation": "Quarantine batch and investigate storage breach",
  "urgency": "Immediate attention required",
  "timestamp": "2026-04-28T10:37:00Z",
  "drug_name": "Insulin",
  "drug_class": "Biologic",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001",
  "stability_index": 3.0,
  "recommended_temp": 8
}
```

---

## 4. Test Error Cases

### 4.1 Missing Required Field

**Request:**
```json
{
  "drug_name": "Insulin",
  "temperature_exposure": 35
}
```

**Expected Response:**
```json
{
  "error": "Missing field: humidity"
}
```

**Status Code:** 400

---

### 4.2 Invalid Drug Name

**Request:**
```json
{
  "drug_name": "FakeDrug",
  "temperature_exposure": 25,
  "humidity": 50,
  "exposure_hours": 2
}
```

**Expected Response:**
```json
{
  "error": "Drug not found in metadata"
}
```

**Status Code:** 404

---

## 5. Using cURL

### Test Home
```bash
curl http://localhost:5000/
```

### Test Drugs
```bash
curl http://localhost:5000/drugs
```

### Test Prediction
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d "{\"drug_name\":\"Insulin\",\"temperature_exposure\":35,\"humidity\":60,\"exposure_hours\":3}"
```

---

## 6. Using Python (requests)

```python
import requests

base_url = "http://localhost:5000"

# Test home
response = requests.get(f"{base_url}/")
print(response.json())

# Test prediction
payload = {
    "drug_name": "Insulin",
    "temperature_exposure": 35,
    "humidity": 60,
    "exposure_hours": 3
}
response = requests.post(f"{base_url}/predict", json=payload)
print(response.json())
```

---

*End of API Test Examples*
