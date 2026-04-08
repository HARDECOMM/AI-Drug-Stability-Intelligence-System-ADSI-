# ADSI API Test Examples

## Run the API

```bash
cd backend
python app.py
```

## Test Home Route

GET /

Expected response:

* API running message
* list of endpoints

## Test Drug List

GET /drugs

Expected response:

* list of available drug names

## Test Prediction

POST /predict

Example JSON:

```json
{
  "drug_name": "Insulin",
  "temperature_exposure": 34,
  "humidity": 62,
  "exposure_hours": 6
}
```

Expected response:

```json
{
  "drug_name": "Insulin",
  "drug_class": "Biologic",
  "recommended_temp": 8.0,
  "stability_index": 5.0,
  "temperature_exposure": 34.0,
  "humidity": 62.0,
  "exposure_hours": 6.0,
  "predicted_degradation_risk": "High"
}
```
