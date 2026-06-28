from __future__ import annotations

from datetime import datetime, timedelta, timezone
import math

from .utils import aqi_meta


def build_forecast(city: str, baseline: float) -> dict:
    seed = sum(ord(char) for char in city) % 19
    now = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    hourly = []
    for hour in range(24):
        value = max(25, baseline + math.sin((hour + seed) / 3) * 18 + hour * .5 - 5)
        hourly.append({"time": (now + timedelta(hours=hour)).isoformat(), "aqi": round(value, 1), "category": aqi_meta(value)["category"]})
    daily = []
    for day in range(7):
        value = max(25, baseline + math.sin((day + seed) / 2) * 22 + day * 2)
        daily.append({"date": (now + timedelta(days=day)).date().isoformat(), "aqi": round(value, 1), "category": aqi_meta(value)["category"]})
    change = daily[-1]["aqi"] - daily[0]["aqi"]
    trend = "stable" if abs(change) < 8 else ("worsening" if change > 0 else "improving")
    return {
        "city": city, "hourly": hourly, "daily": daily, "trend": trend,
        "alert": any(point["aqi"] > 200 for point in hourly + daily),
        "message": "Unhealthy air is likely—plan lower-exposure travel." if any(point["aqi"] > 200 for point in hourly + daily) else "No severe air-quality event is forecast.",
    }
