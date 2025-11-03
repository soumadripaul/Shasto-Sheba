import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MentalHealth from './pages/MentalHealth';
import HealthMap from './pages/HealthMap';
import HelpRequest from './pages/HelpRequest';
import HealthTips from './pages/HealthTips';
import MaternalHealth from './pages/MaternalHealth';
import SymptomChecker from './pages/SymptomChecker';
import HealthEventsWorkers from './pages/HealthEventsWorkers';
import VoiceAssistant from './pages/VoiceAssistant';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/health-map" element={<HealthMap />} />
            <Route path="/help-request" element={<HelpRequest />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/maternal-health" element={<MaternalHealth />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/health-events" element={<HealthEventsWorkers />} />
            <Route path="/health-workers" element={<HealthEventsWorkers />} />
            <Route path="/voice-assistant" element={<VoiceAssistant />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
