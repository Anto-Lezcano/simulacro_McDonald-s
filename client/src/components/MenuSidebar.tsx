import { motion } from "framer-motion";
import {
  Home,
  Gift,
  Utensils,
  Ticket,
  History,
  User,
  LogOut,
} from "lucide-react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface MenuItem {
  icon: ReactElement;
  label: string;
  path: string;
}

export default function MenuSidebar(): ReactElement {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { icon: <Home className="w-5 h-5" />, label: "Inicio", path: "/dashboard" },
    {
      icon: <Gift className="w-5 h-5" />,
      label: "Promociones",
      path: "/promos",
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      label: "Combos",
      path: "/combos",
    },
    {
      icon: <Ticket className="w-5 h-5" />,
      label: "Cupones",
      path: "/coupons",
    },
    {
      icon: <History className="w-5 h-5" />,
      label: "Historial",
      path: "/history",
    },
    { icon: <User className="w-5 h-5" />, label: "Perfil", path: "/profile" },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen w-64 bg-neutral-900 border-r border-yellow-400/20 shadow-2xl z-40 pt-20"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 mb-8 border-b border-yellow-400/10">
        <img src={logo} alt="McDonald's" className="h-10" />
        <h1 className="font-bold text-xl text-yellow-400">McDonald's</h1>
      </div>

      {/* Items del menú */}
      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors group"
              >
                <span className="text-yellow-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer del menú */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-yellow-400/10">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </motion.div>
  );
}
