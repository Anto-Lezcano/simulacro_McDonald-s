import fondo from "../assets/fondoL2.jpg";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../api/Login";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import RegisterPrompt from "../components/RegisterPrompt";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await loginUser(formData);
      console.log(result);

      toast.success("Inicio de sesión exitoso!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5 relative">
      <Helmet>
        <title>Iniciar Sesión | McRewards</title>
        <meta
          name="description"
          content="Inicia sesión en McRewards para acceder a tus promociones exclusivas, puntos y cupones. ¡Disfrutá de los beneficios de ser parte!"
        />
        <meta
          name="keywords"
          content="McDonald's, iniciar sesión, login, McRewards, promociones McDonald's, puntos, cupones"
        />
        <meta property="og:title" content="Iniciar Sesión | McRewards" />
        <meta
          property="og:description"
          content="Accedé a tu cuenta de McRewards para disfrutar de promociones y beneficios."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tu-sitio.com/login" />
        <meta
          property="og:image"
          content="https://tu-sitio.com/imagen-seo-login.jpg"
        />
      </Helmet>
      <ToastContainer />
      <div className="absolute inset-0 z-0">
        <img
          src={fondo}
          alt="Fondo McDonald's"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="flex w-11/12 max-w-4xl bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={fondo}
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-black/50">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Iniciar Sesión
          </h2>
          <p className="text-white text-opacity-80 mb-8 text-center">
            ¡Ingresá para disfrutar de nuestras promociones!
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email */}
            <div className="relative">
              <FaUser className="absolute top-3 left-4 text-yellow-400 text-xl" />
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full py-3 pl-12 pr-4 bg-transparent border border-yellow-400 rounded-full text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <FaLock className="absolute top-3 left-4 text-yellow-400 text-xl" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="w-full py-3 pl-12 pr-4 bg-transparent border border-yellow-400 rounded-full text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full hover:bg-yellow-500 transition"
            >
              Iniciar sesión
            </motion.button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-4 text-white/70 text-sm">o</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <GoogleLoginButton />
          </form>
          <RegisterPrompt />
        </div>
      </div>
    </div>
  );
}
