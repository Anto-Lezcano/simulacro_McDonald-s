import { motion } from "framer-motion";
import { Search, Bell, ShoppingCart, Star, HelpCircle } from "lucide-react";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mcdonalds.png";
import { useUser } from "../contexts/UserContext";

export default function FloatingNav(): ReactElement {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { points } = useUser(); // Obtenemos los puntos del contexto

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="fixed top-0 left-64 right-0 z-50 w-[calc(100%-16rem)] bg-neutral-900/80 backdrop-blur-sm border-b border-yellow-400/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 group"
          >
            <img
              src={logo}
              alt="McDonald's"
              className="h-8 group-hover:rotate-12 transition-transform"
            />
          </button>

          <motion.div
            animate={{ width: searchOpen ? 200 : 40 }}
            className="flex items-center overflow-hidden"
          >
            {searchOpen && (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                type="text"
                placeholder="Buscar promociones..."
                className="bg-neutral-800 text-white px-3 py-1 rounded-l-full text-sm w-full focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 ${
                searchOpen
                  ? "bg-yellow-400 text-black rounded-r-full"
                  : "bg-neutral-800 text-yellow-400 rounded-full hover:bg-yellow-400/20"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Iconos de utilidad */}
        <div className="flex items-center gap-4">
          <button className="p-2 relative text-neutral-300 hover:text-yellow-400 transition-colors group">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notificaciones</span>
          </button>

          <button
            onClick={() => navigate("/rewards")}
            className="flex items-center gap-1 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full transition-colors group"
          >
            <div className="relative">
              <Star className="w-4 h-4 fill-yellow-400" />
              {points < 300 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse"></span>
              )}
            </div>
            <motion.span
              key={points}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-sm font-medium"
            >
              {points.toLocaleString()} pts
            </motion.span>
          </button>

          <button className="p-2 relative text-neutral-300 hover:text-yellow-400 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
            <span className="sr-only">Carrito</span>
          </button>

          <button
            onClick={() => navigate("/help")}
            className="p-2 text-neutral-300 hover:text-yellow-400 transition-colors"
            title="Ayuda"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="sr-only">Ayuda</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
