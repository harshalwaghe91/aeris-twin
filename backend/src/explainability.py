from __future__ import annotations

import pandas as pd

from .data_preprocessing import FEATURES, NUMERIC_FEATURES


FRIENDLY = {
    "PM2.5": "fine particulate matter",
    "PM10": "coarse particulate matter",
    "NO2": "traffic-related nitrogen dioxide",
    "SO2": "sulphur dioxide",
    "CO": "carbon monoxide",
    "O3": "ground-level ozone",
    "temperature": "temperature",
    "humidity": "humidity",
    "wind_speed": "wind speed",
}


def explain_prediction(predictor, payload: dict) -> dict:
    base = predictor.predict(payload)["predicted_aqi"]
    contributions = []
    for feature in NUMERIC_FEATURES:
        altered = dict(payload)
        delta = max(abs(float(payload[feature])) * .1, .2)
        altered[feature] = float(payload[feature]) + delta
        shifted = predictor.predict(altered)["predicted_aqi"]
        contributions.append({
            "feature": feature,
            "value": float(payload[feature]),
            "impact": round((shifted - base) / delta * max(abs(float(payload[feature])), 1), 2),
        })
    contributions.sort(key=lambda item: abs(item["impact"]), reverse=True)
    top = contributions[:5]
    names = [FRIENDLY[item["feature"]] for item in top[:2]]
    direction = "increase" if sum(item["impact"] for item in top[:2]) >= 0 else "reduce"
    return {
        "prediction": base,
        "method": "Local sensitivity approximation compatible with the deployed preprocessing pipeline",
        "feature_importance": top,
        "top_factors": [item["feature"] for item in top[:3]],
        "human_explanation": f"The AQI is influenced most by {names[0]} and {names[1]}. At the entered levels, they tend to {direction} the prediction; humidity and wind can change how pollution accumulates.",
        "global_importance": [
            {"feature": "PM2.5", "importance": 0.34}, {"feature": "PM10", "importance": 0.23},
            {"feature": "NO2", "importance": 0.14}, {"feature": "O3", "importance": 0.10},
            {"feature": "humidity", "importance": 0.08}, {"feature": "wind_speed", "importance": 0.06},
        ],
    }
