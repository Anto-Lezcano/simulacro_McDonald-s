import fondo from "../assets/prueba1.jpg";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { registerUser } from "../api/registro";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoginPrompt from "../components/LoginPrompt";
import { Helmet } from "react-helmet-async";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
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

  const headleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await registerUser(formData);
      console.log(result);
      toast.success("Usuario registrado con éxito!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error: any) {
      toast.error(error.message || "Error al registrar usuario", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5 relative">
      <Helmet>
        <title>Registro | McRewards</title>
        <meta
          name="description"
          content="Regístrate en McRewards para acceder a promociones exclusivas, acumular puntos y canjear cupones. ¡Únete a nuestra comunidad y disfruta de beneficios especiales!"
        />
        <meta
          name="keywords"
          content="McDonald's, registro, registrarse, McRewards, promociones McDonald's, crear cuenta, cupones, puntos"
        />
        <meta property="og:title" content="Registro | McRewards" />
        <meta
          property="og:description"
          content="Crea tu cuenta en McRewards y accede a promociones exclusivas y beneficios especiales."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tu-sitio.com/register" />
        <meta
          property="og:image"
          content="https://tu-sitio.com/imagen-seo-registro.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Registro | McRewards" />
        <meta
          name="twitter:description"
          content="Crea tu cuenta en McRewards y accede a promociones exclusivas."
        />
        <meta
          name="twitter:image"
          content="https://tu-sitio.com/imagen-seo-registro.jpg"
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
            Crear Cuenta
          </h2>
          <p className="text-white text-opacity-80 mb-8 text-center">
            ¡Registrate para acceder a nuestras promociones!
          </p>

          <form onSubmit={headleSubmit} className="w-full space-y-6">
            <div className="relative">
              <FaUser className="absolute top-3 left-4 text-yellow-400 text-xl" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full py-3 pl-12 pr-4 bg-transparent border border-yellow-400 rounded-full text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-4 text-yellow-400 text-xl" />
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full py-3 pl-12 pr-4 bg-transparent border border-yellow-400 rounded-full text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
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
              Registrarse
            </motion.button>
          </form>
          <LoginPrompt />
        </div>
      </div>
    </div>
  );
}
