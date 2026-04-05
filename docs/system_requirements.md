## System Requirements

1. Problem Definition
2. Project Objectives
3. Functional Requirements
4. Non Functional Requirements
5. System Actors
6. Use Cases
7. System Inputs
8. System Outputs
9. MVP Scope

---

# Day 1 — System Requirements Definition

**Project:** AI Drug Stability Intelligence System (ADSI)

Goal of Day 1:
Clearly define **what the system must do** before building anything.

This prevents confusion during development.

---

# 1. Problem Definition

Pharmaceutical drugs degrade when exposed to unfavorable environmental conditions such as:

* high temperature
* excessive humidity
* prolonged storage

In hot regions like Nigeria, medicines may be transported or stored at temperatures exceeding recommended stability limits.

According to the World Health Organization, improper storage conditions contribute to significant loss of drug potency in pharmaceutical supply chains.

Current monitoring systems only **record temperature**, but they do not **predict degradation risk**.

The goal of ADSI is to build a system that:

* monitors environmental conditions
* analyzes exposure patterns
* predicts drug degradation risk using AI

---

# 2. Project Objective

Develop an **AI-powered pharmaceutical stability monitoring system** that:

1. Collects environmental data from sensors
2. Stores the data in a cloud database
3. Uses machine learning to estimate drug degradation risk
4. Displays a stability risk score on a monitoring dashboard

---

# 3. System Overview

The system will consist of **four major layers**.

### Layer 1 — Sensor Layer

Hardware sensors collect environmental data.

Measured variables:

* temperature
* humidity
* time

Example sensors:

* DHT22
* DS18B20

---

### Layer 2 — Data Transmission Layer

Sensor data is transmitted to a server.

Possible communication protocols:

* HTTP API
* MQTT

Device example:

ESP32 microcontroller.

---

### Layer 3 — AI Processing Layer

Machine learning models analyze environmental exposure.

Input variables:

* temperature
* humidity
* exposure time
* drug stability characteristics

Output:

Stability Risk Score.

---

### Layer 4 — Visualization Layer

Dashboard displays:

* real-time environmental data
* risk predictions
* alerts

Technology:

React dashboard.

---

# 4. Functional Requirements

The system must perform the following functions.

### Environmental Monitoring

The system must:

* collect temperature readings
* collect humidity readings
* timestamp every measurement

---

### Data Storage

The system must:

* store sensor readings
* maintain historical records
* support querying for analysis

---

### AI Prediction

The system must:

* process environmental exposure data
* estimate drug degradation risk
* generate a Stability Risk Score

---

### Dashboard Monitoring

The system must:

* visualize environmental conditions
* show risk predictions
* generate alerts for unsafe conditions

---

# 5. Non-Functional Requirements

These define system quality.

### Performance

System should process sensor data in near real-time.

---

### Scalability

The architecture should support monitoring of:

* multiple warehouses
* pharmacies
* transportation units

---

### Reliability

The system should operate continuously without major downtime.

---

### Security

Sensor communication must be authenticated.

---

# 6. System Actors

Users interacting with the system include:

### Pharmacists

Monitor drug storage conditions.

---

### Pharmaceutical Distributors

Track environmental exposure during transportation.

---

### Regulatory Authorities

Monitor drug quality compliance.

Example agency:

National Agency for Food and Drug Administration and Control

---

# 7. Use Case Scenarios

### Use Case 1 — Drug Shipment Monitoring

1. Sensor device installed in drug container
2. Temperature readings collected
3. Data transmitted to cloud
4. AI predicts degradation risk
5. Dashboard displays warning if risk is high

---

### Use Case 2 — Pharmacy Storage Monitoring

1. Sensor installed in pharmacy storage room
2. Environmental data recorded
3. AI model predicts stability risk
4. Alert generated if storage conditions are unsafe

---

# 8. Core System Inputs

| Input             | Source     |
| ----------------- | ---------- |
| Temperature       | Sensor     |
| Humidity          | Sensor     |
| Exposure Duration | Calculated |
| Drug Type         | User input |

---

# 9. Core System Outputs

| Output               | Description                |
| -------------------- | -------------------------- |
| Stability Risk Score | Probability of degradation |
| Risk Category        | Low / Medium / High        |
| Environmental Log    | Historical sensor data     |
| Alerts               | Warning notifications      |

---

# 10. MVP Scope (Very Important)

For the **first prototype**, we will build only:

1. Temperature sensor
2. Data transmission
3. Simple AI risk prediction
4. Dashboard display

This is enough to prove the concept.

---

# Day 1 Deliverables (Completed)

By the end of Day 1 we now have:

✔ Problem definition
✔ Project objective
✔ System architecture overview
✔ Functional requirements
✔ Non-functional requirements
✔ System actors
✔ Use cases
✔ Input/output definitions
✔ MVP scope

This document becomes the **System Requirements Specification (SRS).**

---