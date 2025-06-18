import { motion } from "framer-motion";
import { Gift, Smile, ChevronRight, Star } from "lucide-react";
import logo from "../assets/logoB.jpg";

export default function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl shadow-2xl px-8 py-6 max-w-2xl w-full relative overflow-hidden border-2 border-yellow-300"
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0">
          <img src={logo} alt="McDonald's Logo" className="w-40 rotate-12" />
        </div>
        <div className="absolute left-0 bottom-0">
          <img src={logo} alt="McDonald's Logo" className="w-32 -rotate-12" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-4">
          <div className="relative">
            <img
              src={logo}
              alt="McDonald's"
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          </div>

          <div className="space-y-1 text-yellow-950">
            <h2 className="text-3xl font-extrabold tracking-tight">
              ¡Bienvenido/a!
            </h2>
            <p className="text-lg font-medium flex items-center gap-2">
              <Smile className="w-5 h-5 text-yellow-700" />
              <span className="font-bold">
                Estas son tus promociones del día
              </span>{" "}
              🍔🍟
            </p>
          </div>
        </div>

        <div className="bg-yellow-300/50 rounded-xl p-4 mb-5 border border-yellow-300/70">
          <div className="flex items-center gap-2 text-yellow-900 font-semibold">
            <Gift className="w-5 h-5 text-red-500" />
            <span className="text-sm md:text-base">
              No te pierdas nuestras{" "}
              <span className="font-bold text-red-500">ofertas exclusivas</span>
            </span>
          </div>
        </div>

        {/* Botón CTA mejorado */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          <span>Ver todas las promociones</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}
