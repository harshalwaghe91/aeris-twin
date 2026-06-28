from __future__ import annotations

from datetime import datetime, timezone

AQI_BANDS = [
    (50, "Good", "Low", "#22c55e"),
    (100, "Moderate", "Moderate", "#eab308"),
    (200, "Poor", "High", "#f97316"),
    (300, "Very Poor", "Very high", "#ef4444"),
    (float("inf"), "Severe", "Critical", "#7e22ce"),
]

CITY_COORDS = {
    "Nagpur": (21.1458, 79.0882),
    "Pune": (18.5204, 73.8567),
    "Mumbai": (19.0760, 72.8777),
    "Delhi": (28.6139, 77.2090),
    "Bengaluru": (12.9716, 77.5946),
    "Hyderabad": (17.3850, 78.4867),
}


def aqi_meta(aqi: float) -> dict:
    value = max(0.0, float(aqi))
    for ceiling, category, risk, color in AQI_BANDS:
        if value <= ceiling:
            return {"category": category, "risk_level": risk, "color": color}
    raise RuntimeError("AQI band unavailable")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def main_pollutant(values: dict) -> str:
    normalized = {
        "PM2.5": float(values.get("PM2.5", 0)) / 60,
        "PM10": float(values.get("PM10", 0)) / 100,
        "NO2": float(values.get("NO2", 0)) / 80,
        "SO2": float(values.get("SO2", 0)) / 80,
        "CO": float(values.get("CO", 0)) / 2,
        "O3": float(values.get("O3", 0)) / 100,
    }
    return max(normalized, key=normalized.get)
