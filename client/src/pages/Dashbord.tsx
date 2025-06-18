import Navbar from "../components/FloatingNav";
import WelcomeCard from "../components/WelcomeCard";
import PromoGrid from "../components/PromoGrid";
import UserProfileCard from "../components/UserProfileCard";
import CombosSection from "../components/CombosSection";
import UserCoupons from "../components/UserCoupons";
import MenuSidebar from "../components/MenuSidebar";
import McMenu from "../components/McMenu";
import CouponRedemption from "../components/CouponRedemption";
import EarnPoints from "../components/EarnPoints";
import UseCouponInPurchase from "../components/UseCouponInPurchase";
import { ReactElement, useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Zap, ShoppingCart, Tag, Menu as MenuIcon } from "lucide-react";
import { useUser } from "../contexts/UserContext";

export default function Dashboard(): ReactElement {
  const [activeTab, setActiveTab] = useState<
    "promociones" | "menu" | "canjear" | "puntos" | "comprar"
  >("promociones");
  const { points, coupons } = useUser();

  // Efecto para sugerir canje si los puntos son bajos
  useEffect(() => {
    if (points < 300 && activeTab !== "canjear") {
      const timer = setTimeout(() => {
        setActiveTab("canjear");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [points, activeTab]);

  // Efecto para sugerir compras si hay cupones
  useEffect(() => {
    if (coupons > 0 && activeTab !== "comprar") {
      const timer = setTimeout(() => {
        if (coupons > 0) {
          const notification = document.createElement("div");
          notification.className =
            "fixed bottom-6 left-6 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fadeIn";
          notification.innerHTML = `
            <ShoppingCart class="w-5 h-5" />
            <div>
              <p class="font-bold">¡Tienes cupones disponibles!</p>
              <p class="text-sm">Usa tus ${coupons} cupones en tu próxima compra</p>
            </div>
            <button id="close-notification" class="ml-2 bg-black/20 hover:bg-black/30 p-1 rounded-full">
              <X class="w-4 h-4" />
            </button>
          `;

          document.body.appendChild(notification);

          const closeBtn = document.getElementById("close-notification");
          if (closeBtn) {
            closeBtn.onclick = () => {
              notification.classList.remove("animate-fadeIn");
              notification.classList.add("animate-fadeOut");
              setTimeout(() => notification.remove(), 300);
            };
          }

          setTimeout(() => {
            notification.classList.remove("animate-fadeIn");
            notification.classList.add("animate-fadeOut");
            setTimeout(() => notification.remove(), 300);
          }, 5000);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [coupons, activeTab]);

  const tabs = [
    {
      id: "promociones",
      label: "Promociones",
      icon: Tag,
      notification: points < 300,
    },
    {
      id: "menu",
      label: "Menú",
      icon: MenuIcon,
    },
    {
      id: "puntos",
      label: "Ganar Puntos",
      icon: Zap,
    },
    {
      id: "comprar",
      label: "Comprar",
      icon: ShoppingCart,
      badge: coupons > 0 ? coupons : null,
    },
    {
      id: "canjear",
      label: "Canjear",
      icon: Gift,
      highlight: points < 300,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      <Navbar />
      <MenuSidebar />

      {/* Contenido principal con margen para el sidebar */}
      <div className="pt-16 pl-64 container mx-auto px-4 pb-8">
        {/* Navegación por pestañas mejorada */}
        <div className="mb-8">
          {/* Versión desktop - Grid responsive */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-black shadow-xl shadow-yellow-500/25"
                      : "bg-neutral-800/50 border-neutral-700 hover:border-yellow-400/50 hover:bg-neutral-700/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <Icon
                        className={`w-6 h-6 ${
                          isActive
                            ? "text-black"
                            : "text-yellow-400 group-hover:text-white"
                        }`}
                      />

                      {/* Badge de notificación */}
                      {tab.badge && (
                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                          {tab.badge}
                        </span>
                      )}

                      {/* Indicador de notificación */}
                      {tab.notification && (
                        <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full animate-pulse"></span>
                      )}
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-black"
                          : "text-neutral-300 group-hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </span>

                    {/* Highlight especial */}
                    {tab.highlight && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        ¡Oferta!
                      </span>
                    )}
                  </div>

                  {/* Efecto de brillo en hover */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Versión mobile - Lista vertical compacta */}
          <div className="sm:hidden space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-black"
                      : "bg-neutral-800/50 border-neutral-700 hover:border-yellow-400/50"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-black" : "text-yellow-400"
                      }`}
                    />

                    {tab.badge && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full min-w-[18px] h-4 flex items-center justify-center px-1">
                        {tab.badge}
                      </span>
                    )}

                    {tab.notification && (
                      <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full animate-pulse"></span>
                    )}
                  </div>

                  <span
                    className={`font-medium flex-1 text-left ${
                      isActive ? "text-black" : "text-neutral-300"
                    }`}
                  >
                    {tab.label}
                  </span>

                  {tab.highlight && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                      ¡Oferta!
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Contenido dinámico con animación */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "promociones" ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <WelcomeCard />
                </div>
                <div className="lg:col-span-1">
                  <UserProfileCard />
                </div>
              </div>
              <PromoGrid />
              <CombosSection />
              <UserCoupons />
            </>
          ) : activeTab === "menu" ? (
            <McMenu />
          ) : activeTab === "puntos" ? (
            <EarnPoints />
          ) : activeTab === "comprar" ? (
            <UseCouponInPurchase />
          ) : (
            <CouponRedemption />
          )}
        </motion.div>
      </div>

      {/* Notificación flotante para puntos bajos */}
      {points < 300 && activeTab !== "canjear" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-4 rounded-2xl shadow-2xl z-50 max-w-xs"
        >
          <div className="flex items-center gap-3">
            <div className="bg-black/20 p-2 rounded-xl">
              <Gift className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">¡Tienes pocos puntos!</p>
              <p className="text-sm opacity-90">
                Canjea antes de que se acaben
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("canjear")}
            className="mt-3 w-full bg-black text-yellow-400 px-4 py-2 rounded-xl font-semibold hover:bg-neutral-800 transition-colors duration-200"
          >
            Canjear Ahora
          </button>
        </motion.div>
      )}
    </div>
  );
}
