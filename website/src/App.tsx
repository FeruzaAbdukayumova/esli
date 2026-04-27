import { Routes, Route } from 'react-router-dom'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import MCATFlashcardsPage from './pages/MCATFlashcards'
import JapaneseVocabularyFlashcardsPage from './pages/JapaneseVocabularyFlashcards'
import AWSCertificationFlashcardsPage from './pages/AWSCertificationFlashcards'
import EsliVsAnkiPage from './pages/EsliVsAnki'
import AIFlashcardsMedicalStudentsPage from './pages/AIFlashcardsMedicalStudents'
import PrivacyPage from './pages/Privacy'
import TermsPage from './pages/Terms'

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/flashcards/mcat" element={<MCATFlashcardsPage />} />
      <Route path="/flashcards/japanese-vocabulary" element={<JapaneseVocabularyFlashcardsPage />} />
      <Route path="/flashcards/aws-certification" element={<AWSCertificationFlashcardsPage />} />
      <Route path="/compare/anki" element={<EsliVsAnkiPage />} />
      <Route path="/use-case/medical-students" element={<AIFlashcardsMedicalStudentsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  )
}
