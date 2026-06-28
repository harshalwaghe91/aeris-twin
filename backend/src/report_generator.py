from __future__ import annotations

from io import BytesIO
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle


def generate_pdf(payload: dict, prediction: dict, explanation: dict, recommendations: dict) -> bytes:
    stream = BytesIO()
    doc = SimpleDocTemplate(stream, pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=18 * mm, bottomMargin=18 * mm)
    styles = getSampleStyleSheet()
    story = [
        Paragraph("Aeris Twin — Causal Air Intelligence Report", styles["Title"]),
        Paragraph(f"{payload['city']} · {datetime.now().strftime('%d %B %Y, %H:%M')}", styles["Normal"]),
        Spacer(1, 10),
        Paragraph(f"Predicted AQI: {prediction['predicted_aqi']} — {prediction['category']}", styles["Heading2"]),
        Paragraph(prediction["explanation"], styles["BodyText"]),
        Spacer(1, 10),
    ]
    rows = [["Pollutant / condition", "Value"]] + [[key, str(payload[key])] for key in ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3", "temperature", "humidity", "wind_speed"]]
    table = Table(rows, colWidths=[80 * mm, 70 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#10231e")), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), .4, colors.HexColor("#d1d5db")), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f2f8f5")]),
        ("PADDING", (0, 0), (-1, -1), 7),
    ]))
    story += [table, Spacer(1, 12), Paragraph("Explainable AI summary", styles["Heading2"]), Paragraph(explanation["human_explanation"], styles["BodyText"])]
    story += [Spacer(1, 8), Paragraph("Health recommendations", styles["Heading2"])]
    for audience in ["general", "children", "elderly", "respiratory", "workers"]:
        story.append(Paragraph(f"<b>{audience.title()}:</b> {recommendations[audience]}", styles["BodyText"]))
    story += [Spacer(1, 10), Paragraph("Conclusion", styles["Heading2"]), Paragraph(f"The model identifies {prediction['main_pollutant']} as the main pollutant. Use this screening insight with official monitoring and public-health guidance.", styles["BodyText"])]
    doc.build(story)
    return stream.getvalue()
