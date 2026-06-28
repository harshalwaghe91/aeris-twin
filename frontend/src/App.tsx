import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import About from "./pages/About";
import AdminAnalytics from "./pages/AdminAnalytics";
import ChatbotPage from "./pages/ChatbotPage";
import Dashboard from "./pages/Dashboard";
import ExplainableAI from "./pages/ExplainableAI";
import Forecasting from "./pages/Forecasting";
import HealthRecommendations from "./pages/HealthRecommendations";
import Home from "./pages/Home";
import HotspotMap from "./pages/HotspotMap";
import Prediction from "./pages/Prediction";
import Reports from "./pages/Reports";
import WhatIfAnalysis from "./pages/WhatIfAnalysis";
import DigitalTwin from "./pages/DigitalTwin";
import CausalIntervention from "./pages/CausalIntervention";
import ExposureDrift from "./pages/ExposureDrift";

export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route element={<Layout/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/prediction" element={<Prediction/>}/><Route path="/explainable-ai" element={<ExplainableAI/>}/><Route path="/twin" element={<DigitalTwin/>}/><Route path="/intervention" element={<CausalIntervention/>}/><Route path="/exposure-lab" element={<ExposureDrift/>}/><Route path="/forecasting" element={<Forecasting/>}/><Route path="/hotspots" element={<HotspotMap/>}/><Route path="/what-if" element={<WhatIfAnalysis/>}/><Route path="/health" element={<HealthRecommendations/>}/><Route path="/reports" element={<Reports/>}/><Route path="/analytics" element={<AdminAnalytics/>}/><Route path="/chatbot" element={<ChatbotPage/>}/></Route></Routes>}
