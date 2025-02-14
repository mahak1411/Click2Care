import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Activities from "./pages/Activities";
import Login from './pages/Login'
import SymptomTracker from "./pages/SymptomTracker";
import Chatbot from "./pages/Chatbot";
import DocumentUpload from "./pages/DocumentUpload";
import DoctorsList from "./pages/DoctorsList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/symptom" element={<SymptomTracker/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/docUpload" element={<DocumentUpload/>} />
        <Route path="/doctors-list" element={<DoctorsList/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
