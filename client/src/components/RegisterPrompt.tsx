import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RegisterPrompt() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 text-center"
    >
      <p className="text-white/80 text-sm mb-2">
        ¿Primera vez por aquí?{" "}
        <span className="text-yellow-400">¡Te damos la bienvenida!</span>
      </p>
      <button
        onClick={() => navigate("/registro")}
        className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors text-sm underline underline-offset-4"
      >
        Crea tu cuenta y disfruta de beneficios exclusivos
      </button>
    </motion.div>
  );
}
