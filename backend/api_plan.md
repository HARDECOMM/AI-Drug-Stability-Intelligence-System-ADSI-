## API Plan

> **Document Version**: 1.0
> **Date**: April 2026

---

## 1. Overview

This document describes the REST API endpoints for the ADSI backend. The API handles environmental data submission, AI prediction, and system state retrieval.

**Base URL:** `http://localhost:5000`

---

## 2. Endpoints

### 2.1 Home

| Property | Value |
|----------|-------|
| **Endpoint** | `/` |
| **Method** | GET |
| **Description** | System health check |

**Response:**
```json
{
  "message": "ADSI Prediction API is running",
  "system_name": "AI Drug Stability Intelligence System",
  "status": "online",
  "available_endpoints": ["/drugs", "/predict", "/latest", "/history"]
}
```

---

### 2.2 Get Available Drugs

| Property | Value |
|----------|-------|
| **Endpoint** | `/drugs` |
| **Method** | GET |
| **Description** | Returns list of supported drugs |

**Response:**
```json
{
  "available_drugs": ["Insulin", "Amoxicillin", "Azithromycin", ...]
}
```

---

### 2.3 Get Latest Prediction

| Property | Value |
|----------|-------|
| **Endpoint** | `/latest` |
| **Method** | GET |
| **Description** | Returns most recent sensor/prediction data |

**Response:**
```json
{
  "risk_level": "High",
  "risk_score": 2,
  "compliance": "Non-Compliant",
  "alert": "Temperature threshold exceeded",
  "recommendation": "Inspect and quarantine batch",
  "timestamp": "2026-04-28T10:30:00Z",
  "drug_name": "Insulin",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001"
}
```

---

### 2.4 Get Prediction History

| Property | Value |
|----------|-------|
| **Endpoint** | `/history` |
| **Method** | GET |
| **Description** | Returns last 100 predictions |

**Response:**
```json
{
  "history": [
    { "risk_level": "High", "drug_name": "Insulin", ... },
    { "risk_level": "Low", "drug_name": "Amoxicillin", ... }
  ]
}
```

---

### 2.5 Submit Prediction Request

| Property | Value |
|----------|-------|
| **Endpoint** | `/predict` |
| **Method** | POST |
| **Description** | Submit environmental data for AI prediction |

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "drug_name": "Insulin",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001",
  "device_id": "SENSOR-001",
  "source": "manual"
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `drug_name` | string | Name of the drug |
| `temperature_exposure` | number | Temperature in Celsius |
| `humidity` | number | Humidity percentage (0-100) |
| `exposure_hours` | number | Hours of exposure |

**Optional Fields:**
| Field | Type | Default |
|-------|------|---------|
| `location` | string | "Unknown Location" |
| `facility_id` | string | "FAC-001" |
| `batch_id` | string | "BATCH-UNKNOWN" |
| `device_id` | string | "N/A" |
| `source` | string | "manual" |

**Success Response (200):**
```json
{
  "risk_level": "High",
  "risk_score": 2,
  "compliance": "Non-Compliant",
  "alert": "CRITICAL: Drug at risk of degradation",
  "recommendation": "Quarantine batch and investigate storage breach",
  "urgency": "Immediate attention required",
  "timestamp": "2026-04-28T10:30:00Z",
  "drug_name": "Insulin",
  "temperature_exposure": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001",
  "stability_index": 0.3,
  "recommended_temp": 25
}
```

**Error Responses:**

| Status Code | Description |
|-------------|-------------|
| 400 | Missing required field |
| 404 | Drug not found in metadata |
| 500 | Internal server error |

---

## 3. Risk Levels

| Risk Level | Score | Compliance Status | Action |
|------------|-------|-------------------|--------|
| **Low** | 0 | Compliant | Continue normal operations |
| **Moderate** | 1 | AT RISK | Monitor storage conditions |
| **High** | 2 | NON-COMPLIANT | Quarantine batch |
| **Critical** | 3 | NON-COMPLIANT | Immediate disposal |

---

## 4. Data Storage

| File | Location | Description |
|------|----------|-------------|
| `latest_state.json` | `/backend/` | Most recent prediction |
| `history.json` | `/backend/` | Last 100 predictions |
| `drug_metadata.csv` | `/dataset/` | Drug stability profiles |

---

## 5. Integration Points

### Frontend → Backend
- React dashboard sends POST requests to `/predict`
- Polls GET `/latest` every 5 seconds
- Fetches GET `/history` for table display

### Simulator → Backend
- Python simulator sends POST requests to `/predict`
- Source field set to "sensor"

---

*End of API Plan*