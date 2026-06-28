from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from .data_preprocessing import FEATURES, NUMERIC_FEATURES, load_and_clean


def _preprocessor() -> ColumnTransformer:
    return ColumnTransformer([
        ("numbers", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), NUMERIC_FEATURES),
        ("city", OneHotEncoder(handle_unknown="ignore"), ["city"]),
    ])


def train_and_save(data_path: Path, model_path: Path, metrics_path: Path) -> tuple[Pipeline, dict]:
    data = load_and_clean(data_path)
    X, y = data[FEATURES], data["AQI"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.22, random_state=42)
    candidates = {
        "Random Forest": RandomForestRegressor(n_estimators=180, min_samples_leaf=2, random_state=42),
        "Linear Regression": LinearRegression(),
    }
    try:
        from xgboost import XGBRegressor
        candidates["XGBoost"] = XGBRegressor(n_estimators=160, max_depth=4, learning_rate=.05, subsample=.9, random_state=42)
    except ImportError:
        pass

    results, fitted = {}, {}
    for name, estimator in candidates.items():
        pipeline = Pipeline([("preprocessor", _preprocessor()), ("model", estimator)])
        pipeline.fit(X_train, y_train)
        prediction = pipeline.predict(X_test)
        results[name] = {
            "mae": round(float(mean_absolute_error(y_test, prediction)), 2),
            "rmse": round(float(np.sqrt(mean_squared_error(y_test, prediction))), 2),
            "r2": round(float(r2_score(y_test, prediction)), 3),
        }
        fitted[name] = pipeline
    best_name = min(results, key=lambda name: results[name]["mae"])
    metrics = {
        **results[best_name],
        "selected_model": best_name,
        "models_compared": results,
        "training_rows": len(data),
        "features": len(FEATURES),
        "cities": int(data["city"].nunique()),
    }
    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(fitted[best_name], model_path)
    metrics_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return fitted[best_name], metrics


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    train_and_save(root / "data/air_quality_sample.csv", root / "models/aqi_model.pkl", root / "models/metrics.json")
