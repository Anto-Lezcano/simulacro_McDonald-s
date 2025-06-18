import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTags,
  FaUtensils,
  FaTicketAlt,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/Login";
import { toast } from "react-toastify";
import logo from "../assets/mcdonalds.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Sesión cerrada correctamente");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      toast.error(error.message || "Error al cerrar sesión");
    }
  };

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Inicio", icon: <FaHome />, path: "#" },
    { label: "Promos", icon: <FaTags />, path: "#" },
    { label: "Combos", icon: <FaUtensils />, path: "#" },
    { label: "Cupones", icon: <FaTicketAlt />, path: "#" },
    { label: "Historial", icon: <FaHistory />, path: "#" },
    { label: "Perfil", icon: <FaUser />, path: "#" },
  ];

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl overflow-hidden shadow-lg border border-yellow-400/30"
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex">
        {/* Logo con fondo diferenciado */}
        <div className="flex items-center gap-3 px-6 py-4 bg-black text-yellow-400">
          <img src={logo} alt="McDonald's" className="h-10" />
          <h1 className="font-bold text-xl">McDonald's</h1>
        </div>

        {/* Menú central con contraste */}
        <div className="flex-1 flex justify-center gap-8 px-6 py-4 bg-neutral-900 text-yellow-300">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2 hover:text-white transition text-lg"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Botón Cerrar sesión con fondo diferente */}
        <div className="flex items-center gap-2 px-6 py-4 bg-black text-red-500">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-white transition text-lg"
          >
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
