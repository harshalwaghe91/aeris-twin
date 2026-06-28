# Aeris Twin — Causal, Explainable and Uncertainty-Aware Urban Air Digital Twin

Aeris Twin is a full-stack environmental intelligence platform that predicts Air Quality Index with uncertainty, explains model behaviour, attributes probable pollution sources, creates counterfactual clean-air plans, simulates urban policy, models zone-level pollution movement, forecasts exposure, detects anomalies and provides personalised health guidance.

It is designed as a professional final-year engineering project, deployable portfolio application, and reproducible machine-learning system. The app works without paid APIs.

## Problem statement

Air-quality readings are often fragmented and difficult for non-specialists to interpret. Prediction alone is also insufficient when stakeholders cannot understand what drove a result. Aeris Twin joins monitoring, uncertainty-aware machine learning, causal scenario analysis, explainability, forecasting, health guidance, and reporting in one transparent workflow.

## Objectives

- Predict AQI from six pollutants, weather, and city context.
- Compare Random Forest, XGBoost, and Linear Regression and persist the best evaluated pipeline.
- Explain individual predictions and global feature influence.
- Forecast hourly and daily air-quality conditions.
- Translate AQI into audience-specific health actions.
- Provide deployable REST APIs and a responsive SaaS-style interface.

## Highlights

- Premium responsive landing page and dark/light dashboard
- Six-city live demo using reproducible CSV telemetry
- AQI prediction, risk, confidence, primary pollutant, and explanation
- Calibrated 95% uncertainty intervals and reliability classification
- Target-based counterfactual XAI that searches for minimum pollutant reductions
- Pollution-source fingerprint attribution with confidence and contribution mix
- Causal policy portfolio simulation with health-benefit estimates
- Zone-level urban Digital Twin with plume movement and population exposure
- Personal Exposure Passport based on vulnerability, travel and outdoor duration
- Robust anomaly detection and continuous model/data drift monitoring
- Traceable evidence graph from atmospheric signal to recommended intervention
- Local sensitivity explanation and global importance visualization
- 24-hour and seven-day forecasts with unhealthy-air alerts
- Interactive Leaflet hotspot map for Indian cities
- What-if pollution intervention simulator
- Health recommendations for children, elderly people, respiratory patients, workers, and the general public
- Real PDF report generation and CSV export
- Admin analytics with MAE, RMSE, R², model comparison, and dataset health
- Offline rule-based air-quality chatbot
- Automatic training when the persisted model is absent

## Technology

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, React Leaflet, Axios, Lucide.

**Backend:** FastAPI, Pydantic, Pandas, NumPy, Scikit-learn, XGBoost, Joblib, ReportLab, Uvicorn.

## Architecture

```text
CSV observations
      │
      ▼
cleaning + city encoding + scaling
      │
      ▼
RF / XGBoost / Linear Regression comparison
      │
      ▼
persisted best pipeline ──► explainability + forecasting
      │
      ▼
FastAPI REST services
      │
      ▼
React intelligence dashboard ──► PDF / CSV / decisions
```

## ML workflow

1. Load the required pollutant, weather, city, date, and AQI columns.
2. Coerce numeric values and impute missing values with medians.
3. One-hot encode city and standardize numeric features inside a reusable pipeline.
4. Use a deterministic train/test split.
5. Train supported candidate regressors.
6. Compare MAE and persist the lowest-error pipeline to `backend/models/aqi_model.pkl`.
7. Store complete evaluation metadata in `backend/models/metrics.json`.

The Explainable AI screen provides model-agnostic local sensitivity around a prediction and a global importance view. This is reliable with the deployed mixed preprocessing pipeline and can be extended to native SHAP plots for a chosen tree estimator.

## Local setup

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API documentation is available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Set `VITE_API_BASE_URL` if the backend runs elsewhere.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Service and model readiness |
| GET | `/dashboard` | City snapshot, trends, comparison |
| GET | `/cities` | Available monitoring cities |
| POST | `/predict` | AQI inference |
| POST | `/predict-uncertainty` | AQI interval and reliability |
| POST | `/explain` | Local and global explanation |
| POST | `/counterfactual` | Minimum-change clean-air plan |
| POST | `/source-attribution` | Probable source fingerprint |
| POST | `/policy-simulator` | Multi-policy impact simulation |
| POST | `/personal-exposure` | Individual exposure passport |
| GET | `/anomalies/{city}` | Robust event detection |
| GET | `/model-drift` | Model and feature drift health |
| GET | `/digital-twin/{city}` | Zone-level city simulation |
| POST | `/evidence-graph` | Traceable decision graph |
| GET | `/forecast/{city}` | 24-hour and seven-day outlook |
| GET | `/hotspots` | Geospatial hotspot data |
| POST | `/what-if` | Scenario comparison |
| POST | `/chatbot` | Offline assistant |
| GET | `/model-metrics` | Evaluation and dataset metrics |
| POST | `/generate-report` | PDF or CSV response |

## Deployment

- Use `render.yaml` to deploy the FastAPI service on Render.
- Deploy `frontend` on Vercel and set `VITE_API_BASE_URL` to the Render URL.
- `frontend/vercel.json` includes the SPA fallback required by React Router.
- See [deployment-guide.md](deployment-guide.md) for the full checklist.

## Screenshots

Add portfolio screenshots here after deployment:

- Landing page
- Intelligence dashboard
- Prediction and Explainable AI
- Hotspot map
- Forecast lab
- Model analytics

## Future scope

IoT sensor streaming, official CPCB ingestion, satellite aerosol features, causal policy evaluation, multilingual alerts, mobile push notifications, spatial interpolation, and federated city models.

## Resume points

- Built a deployment-ready urban air Digital Twin spanning uncertainty-aware prediction, counterfactual XAI, source attribution, causal policy simulation, personalised exposure, anomaly/drift monitoring and GIS intelligence.
- Engineered a reproducible multi-model regression pipeline with preprocessing, evaluation, automatic artifact persistence, and typed inference APIs.
- Designed a responsive SaaS analytics experience with interactive geospatial and time-series visualization, downloadable PDF/CSV reporting, and offline-first operation.

## Disclaimer

This project provides educational and decision-support estimates. Use official monitoring stations and qualified medical advice for safety-critical decisions.
