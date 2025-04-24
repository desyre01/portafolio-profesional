import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TutorialTour from "./components/TutorialTour";
import LandingPage from "./pages/LandingPage";
import CreatePortfolio from "./pages/CreatePortfolio";
import UnifiedPortfolioForm from "./components/UnifiedPortfolioForm";
import PersonalInfoForm from "./components/PersonalInfoForm";
import EducationForm from "./components/EducationForm";
import WorkExperienceForm from "./components/WorkExperienceForm";
import ProjectForm from "./components/ProjectForm";
import SkillsForm from "./components/SkillsForm";
import ContactForm from "./components/ContactForm";
import LanguagesForm from "./components/LanguagesForm";
import ReferencesForm from "./components/ReferencesForm";
import ProfileView from "./components/ProfileView";
import ChatbotWidget from "./components/ChatbotWidget";
import Footer from "./components/Footer";

function App() {
  const profileId = localStorage.getItem("profileId");

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-sky-300">
        <div className="bg-white/30 backdrop-blur-sm min-h-screen shadow-lg">
          <Navbar />
      
          <div className="container mx-auto p-4">
            {profileId && <TutorialTour profileId={profileId} />}

            <div className="bg-white/70 rounded-2xl shadow-xl p-6">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreatePortfolio />} />
                <Route path="/unified-form" element={<UnifiedPortfolioForm />} />
                
                <Route path="/personal-info" element={<PersonalInfoForm />} />
                <Route path="/education" element={<EducationForm />} />
                <Route path="/work-experience" element={<WorkExperienceForm />} />
                <Route path="/projects" element={<ProjectForm />} />
                <Route path="/skills" element={<SkillsForm />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/languages" element={<LanguagesForm />} />
                <Route path="/references" element={<ReferencesForm />} />
                <Route path="/crear-portafolio" element={<UnifiedPortfolioForm />} />

                <Route path="/profile/:id" element={<ProfileView />} />
              </Routes>
            </div>
          </div>

          <ChatbotWidget />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;