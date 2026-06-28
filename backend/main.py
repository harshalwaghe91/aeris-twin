from __future__ import annotations

from io import StringIO
from pathlib import Path
import csv

import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field

from src.chatbot import answer_question
from src.explainability import explain_prediction
from src.forecasting import build_forecast
from src.prediction import Predictor
from src.recommendations import recommendations_for
from src.report_generator import generate_pdf
from src.twin_intelligence import (
    anomaly_analysis,
    counterfactual_plan,
    digital_twin,
    drift_monitor,
    evidence_graph,
    personal_exposure,
    policy_simulation,
    source_attribution,
    uncertainty_prediction,
)
from src.utils import CITY_COORDS, aqi_meta, main_pollutant, now_iso

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "data/air_quality_sample.csv"
app = FastAPI(title="Aeris Twin API", version="2.0.0", description="Causal, explainable and uncertainty-aware urban air intelligence")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
predictor: Predictor | None = None


class AirInput(BaseModel):
    PM2_5: float = Field(72, alias="PM2.5", ge=0, le=1000)
    PM10: float = Field(118, ge=0, le=1200)
    NO2: float = Field(42, ge=0, le=500)
    SO2: float = Field(18, ge=0, le=500)
    CO: float = Field(1.2, ge=0, le=50)
    O3: float = Field(54, ge=0, le=600)
    temperature: float = Field(29, ge=-30, le=60)
    humidity: float = Field(61, ge=0, le=100)
    wind_speed: float = Field(2.8, ge=0, le=100)
    city: str = "Nagpur"

    model_config = {"populate_by_name": True}

    def as_features(self) -> dict:
        return self.model_dump(by_alias=True)


class WhatIfInput(BaseModel):
    original: AirInput
    scenario: AirInput


class ChatInput(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    current_aqi: float | None = None


class ReportInput(AirInput):
    format: str = "pdf"


class CounterfactualInput(BaseModel):
    observation: AirInput
    target_aqi: float = Field(100, ge=25, le=300)


class PolicyInput(BaseModel):
    observation: AirInput
    traffic_reduction: float = Field(0, ge=0, le=100)
    construction_control: float = Field(0, ge=0, le=100)
    industrial_control: float = Field(0, ge=0, le=100)
    open_burning_control: float = Field(0, ge=0, le=100)
    green_zone_expansion: float = Field(0, ge=0, le=100)


class ExposureInput(BaseModel):
    aqi: float = Field(150, ge=0, le=500)
    age: int = Field(25, ge=1, le=110)
    respiratory_condition: bool = False
    outdoor_minutes: int = Field(60, ge=0, le=1440)
    commute_mode: str = "car"
    work_type: str = "indoor"


def get_predictor() -> Predictor:
    global predictor
    if predictor is None:
        predictor = Predictor(ROOT)
    return predictor


def latest_by_city() -> pd.DataFrame:
    data = pd.read_csv(DATA_PATH)
    data["date"] = pd.to_datetime(data["date"])
    return data.sort_values("date").groupby("city", as_index=False).tail(1)


@app.on_event("startup")
def startup() -> None:
    get_predictor()


@app.get("/")
def root():
    return {"name": "Aeris Twin API", "version": "2.0.0", "docs": "/docs", "status": "operational"}


@app.get("/health")
def health():
    return {"status": "healthy", "model_ready": get_predictor().model is not None, "timestamp": now_iso()}


@app.get("/cities")
def cities():
    return {"cities": sorted(latest_by_city()["city"].unique().tolist())}


@app.get("/dashboard")
def dashboard(city: str = Query("Nagpur")):
    data = pd.read_csv(DATA_PATH)
    city_data = data[data["city"].str.lower() == city.lower()].copy()
    if city_data.empty:
        raise HTTPException(404, f"No observations found for {city}")
    city_data["date"] = pd.to_datetime(city_data["date"])
    city_data = city_data.sort_values("date")
    current = city_data.iloc[-1].to_dict()
    comparison = [{"city": row["city"], "aqi": round(float(row["AQI"]), 1), "category": aqi_meta(row["AQI"])["category"]} for _, row in latest_by_city().iterrows()]
    return {
        "city": current["city"], "current": current, "meta": aqi_meta(current["AQI"]),
        "main_pollutant": main_pollutant(current),
        "trend": [{"date": row["date"].date().isoformat(), "aqi": round(float(row["AQI"]), 1)} for _, row in city_data.tail(14).iterrows()],
        "comparison": sorted(comparison, key=lambda item: item["aqi"], reverse=True),
        "updated_at": now_iso(),
    }


@app.post("/predict")
def predict(payload: AirInput):
    return get_predictor().predict(payload.as_features())


@app.post("/predict-uncertainty")
def predict_with_uncertainty(payload: AirInput):
    return uncertainty_prediction(get_predictor(), payload.as_features())


@app.post("/explain")
def explain(payload: AirInput):
    return explain_prediction(get_predictor(), payload.as_features())


@app.get("/forecast/{city}")
def forecast(city: str):
    latest = latest_by_city()
    row = latest[latest["city"].str.lower() == city.lower()]
    if row.empty:
        raise HTTPException(404, f"Unknown city: {city}")
    return build_forecast(row.iloc[0]["city"], float(row.iloc[0]["AQI"]))


@app.get("/hotspots")
def hotspots():
    records = []
    for _, row in latest_by_city().iterrows():
        city = row["city"]
        records.append({
            "city": city, "lat": CITY_COORDS.get(city, (20.59, 78.96))[0], "lng": CITY_COORDS.get(city, (20.59, 78.96))[1],
            "aqi": float(row["AQI"]), **aqi_meta(row["AQI"]), "main_pollutant": main_pollutant(row),
            "pollutants": {key: float(row[key]) for key in ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3"]},
            "advice": recommendations_for(row["AQI"])["general"],
        })
    return {"hotspots": records, "updated_at": now_iso()}


@app.post("/what-if")
def what_if(payload: WhatIfInput):
    original = get_predictor().predict(payload.original.as_features())
    scenario = get_predictor().predict(payload.scenario.as_features())
    difference = round(scenario["predicted_aqi"] - original["predicted_aqi"], 1)
    percent = round(abs(difference) / max(original["predicted_aqi"], 1) * 100, 1)
    direction = "improvement" if difference < 0 else "worsening" if difference > 0 else "no change"
    return {
        "original": original, "scenario": scenario, "difference": difference, "change_percent": percent, "direction": direction,
        "recommendation": f"This scenario shows a {percent}% {direction}, moving AQI from {original['predicted_aqi']} to {scenario['predicted_aqi']}.",
    }


@app.post("/counterfactual")
def counterfactual(payload: CounterfactualInput):
    return counterfactual_plan(get_predictor(), payload.observation.as_features(), payload.target_aqi)


@app.post("/source-attribution")
def pollution_sources(payload: AirInput):
    return source_attribution(payload.as_features())


@app.post("/policy-simulator")
def simulate_policy(payload: PolicyInput):
    policies = payload.model_dump(exclude={"observation"})
    return policy_simulation(get_predictor(), payload.observation.as_features(), policies)


@app.post("/personal-exposure")
def exposure(payload: ExposureInput):
    return personal_exposure(payload.aqi, payload.model_dump(exclude={"aqi"}))


@app.get("/anomalies/{city}")
def anomalies(city: str):
    return anomaly_analysis(pd.read_csv(DATA_PATH), city)


@app.get("/model-drift")
def model_drift():
    return drift_monitor(pd.read_csv(DATA_PATH), get_predictor().metrics)


@app.get("/digital-twin/{city}")
def city_twin(city: str):
    latest = latest_by_city()
    row = latest[latest["city"].str.lower() == city.lower()]
    if row.empty:
        raise HTTPException(404, f"Unknown city: {city}")
    return digital_twin(row.iloc[0]["city"], float(row.iloc[0]["AQI"]))


@app.post("/evidence-graph")
def get_evidence_graph(payload: AirInput):
    return evidence_graph(get_predictor(), payload.as_features())


@app.post("/chatbot")
def chatbot(payload: ChatInput):
    return answer_question(payload.message, payload.current_aqi)


@app.get("/model-metrics")
def model_metrics():
    metrics = get_predictor().metrics
    data = pd.read_csv(DATA_PATH)
    latest = latest_by_city()
    return {
        **metrics,
        "dataset": {"rows": len(data), "columns": len(data.columns), "date_start": data["date"].min(), "date_end": data["date"].max(), "missing_values": int(data.isna().sum().sum())},
        "system": {"cities_monitored": len(latest), "average_aqi": round(float(latest["AQI"].mean()), 1), "highest_city": latest.loc[latest["AQI"].idxmax(), "city"], "lowest_city": latest.loc[latest["AQI"].idxmin(), "city"]},
    }


@app.post("/generate-report")
def report(payload: ReportInput):
    features = payload.as_features()
    prediction = get_predictor().predict(features)
    if payload.format.lower() == "csv":
        buffer = StringIO()
        writer = csv.writer(buffer)
        writer.writerow(["city", "generated_at", "predicted_aqi", "category", "risk_level", "main_pollutant"])
        writer.writerow([payload.city, now_iso(), prediction["predicted_aqi"], prediction["category"], prediction["risk_level"], prediction["main_pollutant"]])
        return Response(buffer.getvalue(), media_type="text/csv", headers={"Content-Disposition": f'attachment; filename="{payload.city.lower()}-air-quality.csv"'})
    explanation = explain_prediction(get_predictor(), features)
    pdf = generate_pdf(features, prediction, explanation, recommendations_for(prediction["predicted_aqi"]))
    return Response(pdf, media_type="application/pdf", headers={"Content-Disposition": f'attachment; filename="{payload.city.lower()}-air-quality-report.pdf"'})
