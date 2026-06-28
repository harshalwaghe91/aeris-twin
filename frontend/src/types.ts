export type AirInput = {
  "PM2.5": number; PM10: number; NO2: number; SO2: number; CO: number; O3: number;
  temperature: number; humidity: number; wind_speed: number; city: string;
};
export type Prediction = { predicted_aqi: number; category: string; risk_level: string; color: string; main_pollutant: string; confidence: number; explanation: string };
export type DashboardData = {
  city: string; current: AirInput & { AQI: number; date: string }; meta: { category: string; risk_level: string; color: string };
  main_pollutant: string; trend: { date: string; aqi: number }[]; comparison: { city: string; aqi: number; category: string }[]; updated_at: string;
};
export const defaultInput: AirInput = { "PM2.5": 74, PM10: 126, NO2: 43, SO2: 18, CO: 1.2, O3: 56, temperature: 31, humidity: 59, wind_speed: 2.6, city: "Nagpur" };
