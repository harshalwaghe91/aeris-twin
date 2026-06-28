import axios from "axios";
import type { AirInput } from "../types";

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000", timeout: 20000 });
export const endpoints = {
  cities: () => api.get("/cities").then(r => r.data),
  dashboard: (city = "Nagpur") => api.get("/dashboard", { params: { city } }).then(r => r.data),
  predict: (data: AirInput) => api.post("/predict", data).then(r => r.data),
  explain: (data: AirInput) => api.post("/explain", data).then(r => r.data),
  forecast: (city: string) => api.get(`/forecast/${city}`).then(r => r.data),
  hotspots: () => api.get("/hotspots").then(r => r.data),
  metrics: () => api.get("/model-metrics").then(r => r.data),
  chatbot: (message: string, current_aqi?: number) => api.post("/chatbot", { message, current_aqi }).then(r => r.data),
  whatIf: (original: AirInput, scenario: AirInput) => api.post("/what-if", { original, scenario }).then(r => r.data),
  uncertainty: (data: AirInput) => api.post("/predict-uncertainty", data).then(r => r.data),
  counterfactual: (observation: AirInput, target_aqi: number) => api.post("/counterfactual", { observation, target_aqi }).then(r => r.data),
  sources: (data: AirInput) => api.post("/source-attribution", data).then(r => r.data),
  policy: (observation: AirInput, policies: Record<string, number>) => api.post("/policy-simulator", { observation, ...policies }).then(r => r.data),
  exposure: (data: Record<string, unknown>) => api.post("/personal-exposure", data).then(r => r.data),
  anomalies: (city: string) => api.get(`/anomalies/${city}`).then(r => r.data),
  drift: () => api.get("/model-drift").then(r => r.data),
  twin: (city: string) => api.get(`/digital-twin/${city}`).then(r => r.data),
  evidence: (data: AirInput) => api.post("/evidence-graph", data).then(r => r.data),
};
