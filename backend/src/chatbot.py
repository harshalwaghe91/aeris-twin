from __future__ import annotations


def answer_question(message: str, context_aqi: float | None = None) -> dict:
    text = message.lower()
    action = None
    if "digital twin" in text or "city twin" in text:
        answer = "Opening the Digital Twin is the best next step: it connects zone-level AQI, wind transport, pollution sources and population exposure."
        action = {"label": "Open Digital Twin", "route": "/twin"}
    elif "policy" in text or "intervention" in text or "counterfactual" in text:
        answer = "Use the Causal Intervention Lab to set a target AQI, compare control policies and calculate the minimum pollutant changes required."
        action = {"label": "Design intervention", "route": "/intervention"}
    elif "drift" in text or "model health" in text or "exposure passport" in text:
        answer = "The Exposure & Drift Lab combines personal dose estimation, anomaly detection and model-health monitoring."
        action = {"label": "Open safety lab", "route": "/exposure-lab"}
    elif "what is aqi" in text or ("aqi" in text and "mean" in text):
        answer = "AQI is a single scale that translates several pollutant concentrations into an easy-to-read health risk indicator. Lower is cleaner."
    elif "pm2.5" in text or "particulate" in text:
        answer = "PM2.5 particles are smaller than 2.5 micrometres. They can reach deep into the lungs and enter the bloodstream, so long exposure raises respiratory and cardiovascular risk."
    elif "outside" in text or "safe" in text:
        if context_aqi is None:
            answer = "Check the current AQI first. Above 200, avoid strenuous outdoor activity; sensitive groups should reduce exposure above 100."
        else:
            answer = f"With AQI around {context_aqi:.0f}, " + ("avoid strenuous outdoor activity and use an N95 if exposure is unavoidable." if context_aqi > 200 else "normal activity is reasonable, though sensitive people should watch for symptoms." if context_aqi > 100 else "outdoor activity is generally safe.")
    elif "asthma" in text or "breath" in text:
        answer = "People with asthma should follow their clinician’s action plan, carry prescribed reliever medication, avoid high-AQI exposure, and seek medical care for persistent breathlessness."
    elif "why" in text and ("high" in text or "pollution" in text):
        answer = "AQI often rises when emissions from traffic, dust, industry, or burning combine with low wind and atmospheric conditions that trap pollutants near the ground."
    elif "reduce" in text or "solution" in text:
        answer = "High-impact measures include cleaner transport, dust control, emission enforcement, renewable power, stopping open burning, better public transit, and real-time hotspot response."
    else:
        answer = "I can explain AQI, pollutants, outdoor safety, health precautions, local causes, forecasts, and practical ways to reduce exposure."
    return {"answer": answer, "mode": "offline command intelligence", "action": action, "suggestions": ["Open the city digital twin", "Design a pollution policy", "Check my exposure passport"]}
