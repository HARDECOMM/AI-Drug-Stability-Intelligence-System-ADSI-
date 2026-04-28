## Sensor Design

> **Document Version**: 1.0
> **Date**: April 2026

---

## 1. Overview

The sensor subsystem is responsible for collecting real-time environmental data (temperature and humidity) from storage facilities, warehouses, and transportation vehicles. This data feeds into the AI prediction engine to assess drug stability.

---

## 2. Hardware Components

| Component | Model | Specification | Purpose |
|-----------|-------|----------------|---------|
| **Microcontroller** | ESP32 | WiFi + Bluetooth, 240MHz | Process & transmit sensor data |
| **Temperature Sensor** | DHT22 | Range: -40°C to 80°C, Accuracy: ±0.5°C | Measure ambient temperature |
| **Humidity Sensor** | DHT22 | Range: 0-100% RH, Accuracy: ±2% RH | Measure relative humidity |
| **Power Supply** | 5V USB / Battery | 2000mAh LiPo backup | Power the device |

---

## 3. Pin Configuration

```
ESP32 Pinout (DHT22 Connection)
═══════════════════════════════

┌────────────────────────────┐
│          ESP32             │
├────────────────────────────┤
│  GPIO 4  ──────► Data (DHT22)│
│  3.3V    ──────► VCC        │
│  GND     ──────► GND        │
└────────────────────────────┘
```

---

## 4. Data Collection Protocol

### Measurement Interval
- **Default**: Every 30 seconds
- **Configurable**: 10s – 5min via API

### Data Format
```json
{
  "device_id": "SENSOR-001",
  "temperature": 28.5,
  "humidity": 65.0,
  "timestamp": "2026-04-28T10:30:00Z"
}
```

---

## 5. Communication

| Protocol | Details |
|----------|---------|
| **WiFi** | Connect to local network |
| **HTTP** | POST data to Flask API |
| **Fallback** | Store locally if network unavailable |

**API Endpoint:** `POST http://<backend>/predict`

---

## 6. Power Consumption

| Mode | Current | Duration |
|------|---------|-----------|
| **Active** | 80mA | During transmission |
| **Sleep** | 10mA | Between readings |
| **Average** | ~15mA | 24-hour operation |

**Battery Life:** ~5 days (2000mAh)

---

## 7. Deployment Scenarios

### Scenario 1: Warehouse
- Multiple sensors per warehouse
- Central hub collects and forwards data

### Scenario 2: Pharmacy
- Single sensor per storage room
- Direct API connection

### Scenario 3: Transport
- Portable battery-powered sensor
- GPS location tagging (future)

---

## 8. Calibration

| Parameter | Value |
|-----------|-------|
| Temperature Offset | ±0.5°C |
| Humidity Offset | ±2% RH |
| Calibration Interval | 6 months |

---

## 9. Future Enhancements

- [ ] GPS module for location tracking
- [ ] Additional sensors (light, vibration)
- [ ] LoRaWAN for remote areas
- [ ] Solar power option

---

## 10. Cost Estimate

| Item | Unit Cost (USD) |
|------|-----------------|
| ESP32 | $6.00 |
| DHT22 | $4.00 |
| Power supply | $5.00 |
| Enclosure | $3.00 |
| **Total** | **~$18.00** |

---

*End of Sensor Design Document*