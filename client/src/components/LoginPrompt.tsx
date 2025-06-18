import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 text-center"
    >
      <p className="text-white/80 text-sm mb-2">
        ¿Ya tienes una cuenta?{" "}
        <span className="text-yellow-400">¡Qué bueno verte de nuevo!</span>
      </p>
      <button
        onClick={() => navigate("/login")}
        className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors text-sm underline underline-offset-4"
      >
        Inicia sesión aquí para disfrutar de tus beneficios
      </button>
    </motion.div>
  );
}
