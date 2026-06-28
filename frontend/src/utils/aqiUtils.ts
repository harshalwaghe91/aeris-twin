export const aqiColor = (aqi: number) => aqi <= 50 ? "#22c55e" : aqi <= 100 ? "#eab308" : aqi <= 200 ? "#f97316" : aqi <= 300 ? "#ef4444" : "#9333ea";
export const aqiCategory = (aqi: number) => aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : aqi <= 200 ? "Poor" : aqi <= 300 ? "Very Poor" : "Severe";
export const shortDate = (date: string) => new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(date));
