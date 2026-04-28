# AI Drug Stability Intelligence System (ADSI)

## 🧠 Abstract

Maintaining pharmaceutical stability throughout distribution networks is essential for ensuring drug efficacy and patient safety.  

In tropical regions such as Nigeria, medicines are frequently exposed to elevated temperature and humidity conditions during transportation and storage, leading to degradation of active pharmaceutical ingredients (APIs).

This project presents the **AI Drug Stability Intelligence System (ADSI)** — a real-time monitoring and predictive analytics platform that integrates environmental sensing, machine learning, and intelligent alert systems to detect and prevent drug degradation in real-world supply chains.

---

## 🚨 Problem Statement

Drug supply chains in Africa face:

- Lack of real-time environmental monitoring  
- High exposure to heat and humidity  
- Weak regulatory visibility across locations  
- Increased risk of ineffective or unsafe medicines  

These challenges directly impact **public health outcomes**.

---

## 💡 Proposed Solution

ADSI introduces a **data-driven monitoring and decision system** that:

- Collects environmental data (temperature, humidity, time)
- Predicts degradation risk using machine learning
- Detects threshold breaches and compliance violations
- Generates alerts and escalation decisions
- Visualizes system state via an intelligent dashboard

---

## 🧠 System Architecture

Sensor → API → AI Model → Database → Dashboard → Alerts

### Architecture Diagram
![Architecture](diagrams/architecture.drawio.png)

### AI Pipeline
![AI Pipeline](diagrams/ai_pipeline.drawio.png)

### Data Flow
![Data Flow](diagrams/data_flow.drawio.png)

---

## 🔬 Methodology

### Dataset

A synthetic dataset was developed based on:

- Pharmaceutical stability guidelines  
- Environmental exposure modeling  
- Tropical storage conditions  

### Features

- drug_name  
- temperature_exposure  
- humidity  
- exposure_hours  
- stability_index  
- risk_label  

### Model

- Supervised machine learning (Scikit-learn)
- Classification output:
  - Low Risk
  - Moderate Risk
  - High Risk

---

## ⚙️ System Implementation

### Backend

- Flask API  
- Endpoint: `/predict`  
- Handles both sensor and manual inputs  

### Frontend

- React (Vite)  
- Tailwind CSS (Premium Twilight Healthcare UI)  
- Modular dashboard architecture  

### Simulation Layer

- Real-time sensor simulation  
- Continuous environmental data streaming  

---

## Live Demo

Frontend: https://your-frontend.vercel.app  
Backend: https://your-backend.onrender.com  

## Demo Video

https://youtube.com/your-video-link  

---

## 📊 Results & Dashboard Output

### 🖥️ Full Dashboard Overview
![Dashboard](assets/dashboad-overview.png)

---

### 🔴 Manual Risk Prediction & Live Monitoring (Sensor Data)
![Live Monitoring](assets/incoming&manual.png)

---

### 📡 Latest Live Monitoring Detail
![Latest Monitoring](assets/unifiedMonitoring.png)

---

### 🚨 Alert Center
![Alert Center](assets/alert-center.png)

---

### 🌍 Location Risk Intelligence
![Location Risk](assets/location-risk.png)

---

### 🧾 Inspection Priority Panel
![Inspection Panel](assets/inspection-panel.png)

---

### 📈 Environmental Trends

#### Temperature & Humidity Charts
![Temperature](assets/tem&humChart.png)

---

### 📊 Risk Distribution
![Risk Distribution](assets/risk-distribution.png)

---

### 📜 Monitoring History
![Monitoring History](assets/monitoring-history.png)

---

### 💊 Drug Activity Summary
![Drug Activity](assets/drug-activity.png)

---

## 🧠 Intelligent Features

- Threshold breach detection  
- Repeated non-compliance tracking  
- Escalation logic (NORMAL → WARNING → CRITICAL)  
- Priority scoring for inspection  
- Real-time alert generation  

---

## 🌍 Real-World Application

ADSI can be deployed in:

- Pharmacies  
- Drug warehouses  
- Distribution chains  
- Regulatory bodies (e.g., NAFDAC)  

### Deployment Flow

Sensor → Cloud API → AI Model → Dashboard → Regulatory Action

---

## 🏆 Novelty & Contribution

Unlike existing systems, ADSI:

- Combines **AI prediction + IoT monitoring**
- Introduces **escalation intelligence**
- Supports **multi-location risk tracking**
- Enables **decision-based alerts**, not just monitoring

---

## 📈 Impact

- Reduces distribution of degraded drugs  
- Improves patient safety  
- Strengthens regulatory oversight  
- Enables proactive intervention  

---

## 🔮 Future Work

- Real IoT hardware deployment  
- Cloud database integration (MongoDB / Firebase)  
- Mobile monitoring application  
- GPS-based logistics tracking  
- Integration with national drug regulatory systems  

---

## ⚙️ Technologies

**Hardware:** ESP32 + DHT22  
**Backend:** Flask (Python)  
**AI:** Scikit-learn  
**Frontend:** React (Vite) + Tailwind CSS  
**Database:** JSON (extendable to MongoDB)  

---

## 👤 Author

Haruna Ademoye  
AI/ML Engineer | Pharmaceutical Technology

---

## 🚀 How to Run

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Step 1: Set Up Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

### Step 2: Set Up Frontend

```bash
# Navigate to dashboard
cd dashboard

# Install dependencies
npm install

# Or if using yarn:
yarn install
```

### Step 3: Run the System

You need **3 terminal windows**:

**Terminal 1 — Backend API:**
```bash
cd backend
python app.py
```
> Server runs at: `http://localhost:5000`

**Terminal 2 — Frontend Dashboard:**
```bash
cd dashboard
npm run dev
```
> Dashboard opens at: `http://localhost:5173`

**Terminal 3 — Sensor Simulator (Optional):**
```bash
cd backend
python simulator.py
```
> This generates continuous sensor data for live monitoring demo

---

### Quick Test

1. Open `http://localhost:5173` in your browser
2. Use the manual prediction form (left panel):
   - Drug: Insulin
   - Temperature: 35
   - Humidity: 60
   - Hours: 3
   - Click **Predict**
3. Watch the unified assessment result appear
4. Or wait for simulator data to appear in the live monitoring panel

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Ensure backend runs on port 5000 |
| Model not found | Run `python train_model.py` first |
| Simulator not connecting | Check backend is running |
| Port already in use | Kill process on port 5000 or 5173 |  