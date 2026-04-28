## System Architecture

> **Document Version**: 1.0
> **Date**: April 2026

---

## 1. Architecture Overview

ADSI follows a **layered architecture** pattern with four main layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                    (React Dashboard)                         │
├─────────────────────────────────────────────────────────────┤
│                     API LAYER                                 │
│                    (Flask REST API)                          │
├─────────────────────────────────────────────────────────────┤
│                  INTELLIGENCE LAYER                           │
│              (ML Prediction Engine)                          │
├─────────────────────────────────────────────────────────────┤
│                     DATA LAYER                                │
│              (Storage & History)                             │
├─────────────────────────────────────────────────────────────┤
│                   SOURCE LAYER                                │
│     (Sensors / Manual Input / Simulator)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Layer Descriptions

### 2.1 Source Layer

| Component | Description | Technology |
|-----------|-------------|------------|
| **IoT Sensors** | Hardware devices capturing temperature & humidity | DHT22, DS18B20, ESP32 |
| **Manual Input** | Staff-entered inspection data | Web Form |
| **Simulator** | Demo data generator for testing | Python script |

**Data Fields:**
- `temperature` (°C)
- `humidity` (%)
- `exposure_hours` (hours)
- `drug_name` (string)
- `location` (string)
- `facility_id` (string)
- `batch_id` (string)
- `device_id` (string)
- `timestamp` (ISO 8601)

---

### 2.2 Data Layer

| Component | Description | Technology |
|-----------|-------------|------------|
| **Latest State** | Current sensor readings | `latest_state.json` |
| **History** | Historical predictions (last 100) | `history.json` |
| **Drug Metadata** | Drug stability profiles | `drug_metadata.csv` |
| **Model** | Trained ML model | `model.pkl` |

**Data Flow:**
```
Source → API → Prediction Engine → Storage → Dashboard
```

---

### 2.3 Intelligence Layer

| Component | Description |
|-----------|-------------|
| **ML Model** | Random Forest classifier for risk prediction |
| **Feature Engineering** | Temperature, humidity, exposure time, drug stability score |
| **Risk Classification** | Low (0), Medium (1), High (2), Critical (3) |
| **Compliance Engine** | Threshold checking & alert generation |

**Prediction Pipeline:**
```
Input → Feature Extraction → Model Predict → Risk Score → Compliance Check → Response
```

---

### 2.4 API Layer

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Submit environmental data for prediction |
| `/latest` | GET | Get most recent sensor reading |
| `/history` | GET | Get prediction history |
| `/drugs` | GET | Get list of supported drugs |
| `/health` | GET | System health check |

**Request Format (POST /predict):**
```json
{
  "drug_name": "Insulin",
  "temperature": 35,
  "humidity": 60,
  "exposure_hours": 3,
  "location": "Lagos",
  "facility_id": "FAC-001",
  "batch_id": "BATCH-001",
  "device_id": "SENSOR-001",
  "source": "manual"
}
```

**Response Format:**
```json
{
  "risk_level": "High",
  "risk_score": 2,
  "compliance": "Non-Compliant",
  "alert": "Temperature threshold exceeded",
  "recommendation": "Inspect and quarantine batch",
  "timestamp": "2026-04-28T10:30:00Z"
}
```

---

### 2.5 Presentation Layer

| Component | Description |
|-----------|-------------|
| **Stats Grid** | Key metrics (total events, high risk, compliance rate) |
| **Manual Prediction Form** | Input form for inspection data |
| **Live Monitoring Panel** | Real-time sensor data stream |
| **Unified Assessment** | Combined prediction & compliance result |
| **Alert Center** | Prioritized alerts list |
| **Trend Charts** | Environmental trend visualization |
| **Location Risk Map** | Geographic risk overview |
| **Monitoring History** | Historical data table |

---

## 3. System Components Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Sensors    │────▶│   Backend    │────▶│  Dashboard   │
│  (ESP32/     │     │   (Flask)    │     │   (React)    │
│   DHT22)     │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    ▼                    │
       │            ┌──────────────┐            │
       └──────────▶│   ML Model   │◀───────────┘
                    │  (Random     │
                    │   Forest)    │
                    └──────────────┘
```

---

## 4. Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React + Vite | 19.x |
| **Styling** | Tailwind CSS | 4.x |
| **Charts** | Recharts | 3.x |
| **Backend** | Flask | 3.x |
| **CORS** | Flask-CORS | - |
| **ML** | Scikit-learn | 1.x |
| **Serialization** | Joblib | - |
| **Data** | Pandas | - |

---

## 5. Deployment Architecture

### Development Mode
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  React App  │────▶│   Flask     │────▶│   Local     │
│  :5173      │     │   :5000     │     │   Files     │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Production Mode (Future)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  IoT        │────▶│   Cloud     │────▶│   Cloud     │
│  Devices    │     │   API       │     │   Storage   │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 6. Security Considerations

- **CORS**: Restricted to frontend origin
- **Input Validation**: Drug name whitelist
- **File Storage**: Local JSON files (extensible to database)
- **No Authentication**: Demo version (production would need auth)

---

## 7. Scalability Points

| Component | Current | Scalable To |
|-----------|---------|-------------|
| **Storage** | JSON files | PostgreSQL/MongoDB |
| **API** | Single instance | Load-balanced cluster |
| **ML Model** | Local file | Model serving (TensorFlow Serving) |
| **Frontend** | Vite dev server | CDN + cloud hosting |
| **Sensors** | Simulator | MQTT broker + real devices |

---

*End of Architecture Document*
