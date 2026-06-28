from __future__ import annotations

import json
from pathlib import Path

import joblib
import pandas as pd

from .data_preprocessing import FEATURES
from .train_model import train_and_save
from .utils import aqi_meta, main_pollutant


class Predictor:
    def __init__(self, root: Path):
        self.root = root
        self.model_path = root / "models/aqi_model.pkl"
        self.metrics_path = root / "models/metrics.json"
        if not self.model_path.exists():
            self.model, self.metrics = train_and_save(root / "data/air_quality_sample.csv", self.model_path, self.metrics_path)
        else:
            self.model = joblib.load(self.model_path)
            self.metrics = json.loads(self.metrics_path.read_text()) if self.metrics_path.exists() else {}

    def predict(self, payload: dict) -> dict:
        row = {key: payload[key] for key in FEATURES}
        aqi = max(0.0, min(500.0, float(self.model.predict(pd.DataFrame([row]))[0])))
        meta = aqi_meta(aqi)
        pollutant = main_pollutant(row)
        confidence = max(70, min(98, round(100 - float(self.metrics.get("mae", 15)) * .9)))
        return {
            "predicted_aqi": round(aqi, 1),
            **meta,
            "main_pollutant": pollutant,
            "confidence": confidence,
            "explanation": f"The estimated AQI is {meta['category']}, driven mainly by {pollutant}. Weather conditions and the combined pollutant load also influence dispersion.",
        }
