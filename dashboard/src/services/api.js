import axios from "axios";

export const API_BASE = "http://127.0.0.1:5000";

export const api = axios.create({
  baseURL: API_BASE,
});

export async function fetchSystemStatus() {
  const response = await api.get("/");
  return response.data;
}

export async function fetchDrugs() {
  const response = await api.get("/drugs");
  return response.data;
}

export async function fetchLatest() {
  const response = await api.get("/latest");
  return response.data;
}

export async function fetchHistory() {
  const response = await api.get("/history");
  return response.data;
}

export async function predictRisk(payload) {
  const response = await api.post("/predict", payload);
  return response.data;
}