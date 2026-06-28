from .utils import aqi_meta


ADVICE = {
    "Good": {
        "general": "Enjoy normal outdoor activities and keep choosing low-emission travel.",
        "children": "Outdoor play is encouraged.",
        "elderly": "Normal routines are safe.",
        "respiratory": "No special restriction; keep prescribed medication available.",
        "workers": "Normal outdoor work is appropriate.",
    },
    "Moderate": {
        "general": "Sensitive people should reduce prolonged heavy exertion outdoors.",
        "children": "Take breaks during strenuous outdoor play.",
        "elderly": "Prefer lighter outdoor activity during peak traffic hours.",
        "respiratory": "Monitor symptoms and carry a rescue inhaler if prescribed.",
        "workers": "Use breaks and hydration during extended exposure.",
    },
    "Poor": {
        "general": "Limit prolonged outdoor exertion and use an N95 near traffic.",
        "children": "Move vigorous play indoors.",
        "elderly": "Avoid busy roads and keep windows closed at peak hours.",
        "respiratory": "Avoid outdoor exercise; follow your clinical action plan.",
        "workers": "Use a well-fitted N95 and rotate exposure where possible.",
    },
    "Very Poor": {
        "general": "Avoid strenuous outdoor activity; use filtration indoors.",
        "children": "Keep outdoor time brief and low intensity.",
        "elderly": "Stay indoors with clean air and monitor breathing.",
        "respiratory": "Remain indoors; contact a clinician if symptoms increase.",
        "workers": "Reschedule heavy work and use respiratory protection.",
    },
    "Severe": {
        "general": "Avoid outdoor activities, wear an N95, close windows, and run an air purifier.",
        "children": "Stay indoors in a clean-air room.",
        "elderly": "Avoid exposure and seek help for chest pain or breathlessness.",
        "respiratory": "Follow your emergency plan and consult a doctor for breathing difficulty.",
        "workers": "Suspend non-essential outdoor work; use certified protection if unavoidable.",
    },
}


def recommendations_for(aqi: float) -> dict:
    category = aqi_meta(aqi)["category"]
    return {"category": category, **ADVICE[category]}
