// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashbord from "./pages/Dashbord";
import IniciarSesion from "./pages/LoginPage";
import Registrarse from "./pages/RegisterPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registrarse />} />
      </Routes>
    </Router>
  );
}
