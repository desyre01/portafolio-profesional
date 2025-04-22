import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreatePortfolio from "./pages/CreatePortfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ProfileView from "./pages/ProfileView";
import EducationForm from "./components/EducationForm";
import WorkExperienceForm from "./components/WorkExperienceForm";
import ProjectForm from "./components/ProjectForm";
import SkillsForm from "./components/SkillsForm";
import ContactForm from "./components/ContactForm";
import TutorialTour from "./components/TutorialTour";
import ChatbotWidget from "./components/ChatbotWidget";
import LanguagesForm from "./components/LanguagesForm";
import ReferencesForm from "./components/ReferencesForm";
import ProfileCardView from "./components/ProfileCardView";
import UnifiedPortfolioForm from "./components/UnifiedPortfolioForm";


function App() {
  const profileId = localStorage.getItem("profileId");

  return (
    <Router>
      <Navbar />
  
      {profileId && <TutorialTour profileId={profileId} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePortfolio />} />
        <Route path="/personal-info" element={<PersonalInfoForm />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        <Route path="/education" element={<EducationForm />} />
        <Route path="/work-experience" element={<WorkExperienceForm />} />
        <Route path="/projects" element={<ProjectForm />} />
        <Route path="/skills" element={<SkillsForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/languages" element={<LanguagesForm />} />
        <Route path="/references" element={<ReferencesForm />} />
        <Route path="/profile/:id" element={<ProfileCardView />} />
        <Route path="/unified-form" element={<UnifiedPortfolioForm />} />

      </Routes>

      <ChatbotWidget />
      <Footer />
    </Router>
  );
}

export default App;
