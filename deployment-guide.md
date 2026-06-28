# Deployment Guide

## Backend on Render

1. Push the repository to GitHub.
2. In Render, choose **Blueprint** and select the repository. The included `render.yaml` configures the service.
3. Alternatively create a Python Web Service with root directory `backend`, build command `pip install -r requirements.txt`, and start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Wait for `/health` to return `{"status":"healthy"}` and copy the public service URL.

The model artifact is included. If it is removed, the backend automatically compares the supported regressors and recreates it at startup.

## Frontend on Vercel

1. Import the same repository in Vercel.
2. Set the root directory to `frontend` and framework preset to Vite.
3. Add `VITE_API_BASE_URL=https://your-render-service.onrender.com`.
4. Deploy. The included rewrite ensures React Router URLs work on refresh.

## Production checklist

- Confirm `/health`, `/dashboard`, and `/predict` on the Render URL.
- Restrict `allow_origins` in `backend/main.py` to the final Vercel domain if required.
- Keep optional AI keys in hosting environment variables, never source control.
- Render free services may sleep after inactivity; the first request can be slower.
