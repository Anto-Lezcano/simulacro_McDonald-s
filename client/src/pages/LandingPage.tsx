import logo from "../assets/mcdonalds.png";
import fondo from "../assets/fondo.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex p-5 justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={fondo}
          alt="Fondo McDonald's"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-opacity-40"></div>

      <div className="bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 p-12 rounded-2xl shadow-2xl w-11/12 max-w-6xl h-[60vh] flex items-center relative z-10">
        <div className="w-1/3 flex justify-center">
          <img
            src={logo}
            alt="McDonald's Logo"
            className="h-48 object-contain drop-shadow-lg"
          />
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
            Bienvenido a McDonald's
          </h1>
          <p className="text-white text-opacity-90 text-xl max-w-md text-center drop-shadow-md">
            Descubre nuestras promociones exclusivas
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition"
            >
              <Link to="/registro">Registrarse</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <Link to="/login">Iniciar Sesión</Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
