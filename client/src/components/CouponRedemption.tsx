import { ReactElement, useState, useEffect } from "react";
import {
  Gift,
  X,
  Check,
  Zap,
  Star,
  ChevronRight,
  Ticket,
  Clock,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";

interface Coupon {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  image?: string;
  expirationDate: string;
  category: "food" | "drink" | "dessert" | "combo";
}

export default function CouponRedemption(): ReactElement {
  const { name, points, coupons, redeemCoupon, addCoupons } = useUser();
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionStatus, setRedemptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [view, setView] = useState<"available" | "myCoupons">("available");
  const [filter, setFilter] = useState<
    "all" | "food" | "drink" | "dessert" | "combo"
  >("all");

  // Simulación de datos mejorados
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const mockCoupons: Coupon[] = [
          {
            id: "1",
            title: "Combo Big Mac + Bebida",
            description: "Disfruta de un Big Mac mediano con papas y bebida",
            pointsRequired: 800,
            expirationDate: "2023-12-31",
            category: "combo",
          },
          {
            id: "2",
            title: "McFlurry Oreo",
            description: "Postre helado con trozos de galleta Oreo",
            pointsRequired: 300,
            expirationDate: "2023-11-30",
            category: "dessert",
          },
          {
            id: "3",
            title: "Café + Medialuna",
            description: "Desayuno clásico con café caliente",
            pointsRequired: 200,
            expirationDate: "2023-12-15",
            category: "drink",
          },
          {
            id: "4",
            title: "Happy Meal",
            description: "Combo infantil con juguete sorpresa",
            pointsRequired: 400,
            expirationDate: "2023-12-20",
            category: "combo",
          },
          {
            id: "5",
            title: "10 Nuggets",
            description: "10 deliciosos nuggets de pollo",
            pointsRequired: 500,
            expirationDate: "2023-12-10",
            category: "food",
          },
        ];
        setAvailableCoupons(mockCoupons);
      } catch (error) {
        console.error("Error al cargar cupones:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleRedeem = async () => {
    if (!selectedCoupon) return;

    setIsRedeeming(true);
    setRedemptionStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      redeemCoupon(selectedCoupon.pointsRequired);
      addCoupons(1);
      setRedemptionStatus("success");

      setAvailableCoupons((prev) =>
        prev.filter((c) => c.id !== selectedCoupon.id)
      );

      setTimeout(() => {
        setSelectedCoupon(null);
        setRedemptionStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error al canjear:", error);
      setRedemptionStatus("error");
    } finally {
      setIsRedeeming(false);
    }
  };

  const daysUntilExpiration = (expDate: string) => {
    const today = new Date();
    const expiration = new Date(expDate);
    const diffTime = expiration.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <span className="text-red-400">🍔</span>;
      case "drink":
        return <span className="text-blue-400">🥤</span>;
      case "dessert":
        return <span className="text-pink-400">🍦</span>;
      case "combo":
        return <span className="text-yellow-400">🍟</span>;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const filteredCoupons =
    filter === "all"
      ? availableCoupons
      : availableCoupons.filter((coupon) => coupon.category === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-neutral-800 rounded-2xl shadow-lg">
      {/* Encabezado mejorado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-400/20 rounded-lg">
            <Gift className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tienda de Recompensas</h2>
            <p className="text-sm text-neutral-400">
              Canjea tus puntos por deliciosas recompensas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-yellow-400">
              {points.toLocaleString()} pts
            </span>
          </div>
          <div className="flex items-center gap-2 bg-red-400/10 px-4 py-2 rounded-full">
            <Ticket className="w-5 h-5 text-red-400" />
            <span className="font-bold text-red-400">{coupons} cupones</span>
          </div>
        </div>
      </div>

      {/* Selector de vista */}
      <div className="flex border-b border-neutral-700 mb-6">
        <button
          onClick={() => setView("available")}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            view === "available"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Cupones Disponibles</span>
        </button>
        <button
          onClick={() => setView("myCoupons")}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            view === "myCoupons"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Mis Cupones ({coupons})</span>
        </button>
      </div>

      {view === "available" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <h3 className="text-lg font-semibold mb-2">
                Filtrar por categoría
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === "all"
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "hover:bg-neutral-700"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Todos los cupones</span>
                </button>
                <button
                  onClick={() => setFilter("combo")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === "combo"
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "hover:bg-neutral-700"
                  }`}
                >
                  <span>🍟</span>
                  <span>Combos</span>
                </button>
                <button
                  onClick={() => setFilter("food")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === "food"
                      ? "bg-red-400/20 text-red-400"
                      : "hover:bg-neutral-700"
                  }`}
                >
                  <span>🍔</span>
                  <span>Hamburguesas</span>
                </button>
                <button
                  onClick={() => setFilter("drink")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === "drink"
                      ? "bg-blue-400/20 text-blue-400"
                      : "hover:bg-neutral-700"
                  }`}
                >
                  <span>🥤</span>
                  <span>Bebidas</span>
                </button>
                <button
                  onClick={() => setFilter("dessert")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === "dessert"
                      ? "bg-pink-400/20 text-pink-400"
                      : "hover:bg-neutral-700"
                  }`}
                >
                  <span>🍦</span>
                  <span>Postres</span>
                </button>
              </div>

              {/* Progreso de puntos */}
              <div className="mt-6 p-4 bg-neutral-700/50 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Tu progreso</h3>
                <div className="h-2 bg-neutral-600 rounded-full mb-2">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{
                      width: `${Math.min(100, (points / 1000) * 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-neutral-400">
                  {points} de 1000 puntos para el próximo nivel
                </p>
              </div>
            </div>
          </div>

          {/* Lista de cupones disponibles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Cupones disponibles</span>
              </h3>
              <span className="text-sm text-neutral-400">
                {filteredCoupons.length} resultados
              </span>
            </div>

            {filteredCoupons.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 bg-neutral-700/30 rounded-xl">
                <Gift className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No hay cupones disponibles en esta categoría</p>
                <button
                  onClick={() => setFilter("all")}
                  className="mt-4 text-yellow-400 hover:text-yellow-300 text-sm"
                >
                  Ver todos los cupones
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredCoupons.map((coupon) => (
                  <motion.div
                    key={coupon.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedCoupon(coupon)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCoupon?.id === coupon.id
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-neutral-700 hover:border-yellow-400/50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getCategoryIcon(coupon.category)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{coupon.title}</h4>
                          <p className="text-neutral-300 text-sm mt-1">
                            {coupon.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-neutral-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {daysUntilExpiration(coupon.expirationDate) > 0
                                ? `Vence en ${daysUntilExpiration(
                                    coupon.expirationDate
                                  )} días`
                                : "Últimos días"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <span className="font-bold text-yellow-400 text-lg">
                          {coupon.pointsRequired} pts
                        </span>
                        <div className="mt-2">
                          {points >= coupon.pointsRequired ? (
                            <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">
                              Puedes canjear
                            </span>
                          ) : (
                            <span className="text-xs bg-red-400/20 text-red-400 px-2 py-1 rounded-full">
                              Faltan {coupon.pointsRequired - points} pts
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Panel de confirmación */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-neutral-700/80 p-6 rounded-xl border border-neutral-600 shadow-lg">
              {selectedCoupon ? (
                <>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-yellow-400" />
                    <span>Confirmar canje</span>
                  </h3>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(selectedCoupon.category)}
                      <h4 className="font-bold">{selectedCoupon.title}</h4>
                    </div>
                    <p className="text-sm text-neutral-300 mb-4">
                      {selectedCoupon.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Puntos requeridos:</span>
                        <span className="font-bold text-yellow-400">
                          {selectedCoupon.pointsRequired} pts
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tus puntos:</span>
                        <span className="font-bold">{points} pts</span>
                      </div>
                      <div className="h-px bg-neutral-600 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Puntos restantes:</span>
                        <span
                          className={`font-bold ${
                            points - selectedCoupon.pointsRequired < 0
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {points - selectedCoupon.pointsRequired} pts
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Válido hasta:</span>
                        <span>
                          {new Date(
                            selectedCoupon.expirationDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {redemptionStatus === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/10 text-green-400 p-3 rounded-lg flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        <span>¡Canje exitoso!</span>
                      </motion.div>
                    ) : redemptionStatus === "error" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 text-red-400 p-3 rounded-lg flex items-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        <span>Error al canjear</span>
                      </motion.div>
                    ) : (
                      <button
                        onClick={handleRedeem}
                        disabled={
                          isRedeeming || points < selectedCoupon.pointsRequired
                        }
                        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                          points < selectedCoupon.pointsRequired
                            ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                            : "bg-yellow-400 hover:bg-yellow-500 text-black hover:scale-[1.02]"
                        }`}
                      >
                        {isRedeeming ? (
                          <span className="animate-pulse">Procesando...</span>
                        ) : (
                          <>
                            <Gift className="w-5 h-5" />
                            <span>Canjear ahora</span>
                          </>
                        )}
                      </button>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="text-center py-8 text-neutral-400">
                  <Gift className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>Selecciona un cupón para canjear tus puntos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Vista de Mis Cupones mejorada */
        <div className="bg-neutral-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Ticket className="w-5 h-5 text-yellow-400" />
              <span>Mis Cupones ({coupons})</span>
            </h3>
            <button
              onClick={() => setView("available")}
              className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>Ver más cupones</span>
            </button>
          </div>

          {coupons > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(coupons)].map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-neutral-800 p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400/10 p-2 rounded-full">
                      <Ticket className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cupón {index + 1}</h4>
                      <p className="text-xs text-neutral-400">
                        Disponible para usar
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-neutral-700 px-2 py-1 rounded-full">
                      Válido por 30 días
                    </span>
                    <button className="text-sm bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-md transition-colors">
                      Ver código
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400 bg-neutral-700/30 rounded-xl">
              <Ticket className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No tienes cupones disponibles</p>
              <button
                onClick={() => setView("available")}
                className="mt-4 text-yellow-400 hover:text-yellow-300 flex items-center justify-center gap-1 mx-auto bg-yellow-400/10 hover:bg-yellow-400/20 px-4 py-2 rounded-lg transition-colors"
              >
                <span>Canjear cupones</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
