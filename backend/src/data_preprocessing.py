from __future__ import annotations

from pathlib import Path

import pandas as pd

FEATURES = ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3", "temperature", "humidity", "wind_speed", "city"]
NUMERIC_FEATURES = FEATURES[:-1]


def load_and_clean(path: Path) -> pd.DataFrame:
    frame = pd.read_csv(path)
    required = set(FEATURES + ["AQI"])
    missing = required.difference(frame.columns)
    if missing:
        raise ValueError(f"Dataset is missing columns: {sorted(missing)}")
    for column in NUMERIC_FEATURES + ["AQI"]:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
        frame[column] = frame[column].fillna(frame[column].median())
    frame["city"] = frame["city"].fillna("Unknown").astype(str)
    return frame
