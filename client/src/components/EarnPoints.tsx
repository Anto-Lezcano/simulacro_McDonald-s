import { ReactElement, useState } from "react";
import { Star, Zap, ShoppingBag, Check, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";

interface Purchase {
  id: string;
  name: string;
  price: number;
  date: string;
  pointsEarned: number;
  completed: boolean;
}

export default function EarnPoints(): ReactElement {
  const { points, addPoints } = useUser();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const samplePurchases: Purchase[] = [
    {
      id: "1",
      name: "Combo Big Mac",
      price: 8.99,
      date: new Date().toISOString(),
      pointsEarned: 10,
      completed: false,
    },
    {
      id: "2",
      name: "Combo Cuarto de Libra",
      price: 7.99,
      date: new Date().toISOString(),
      pointsEarned: 10,
      completed: false,
    },
    {
      id: "3",
      name: "10 McNuggets",
      price: 5.99,
      date: new Date().toISOString(),
      pointsEarned: 10,
      completed: false,
    },
    {
      id: "4",
      name: "McFlurry Oreo",
      price: 3.99,
      date: new Date().toISOString(),
      pointsEarned: 0,
      completed: false,
    },
    {
      id: "5",
      name: "Café Mediano",
      price: 2.49,
      date: new Date().toISOString(),
      pointsEarned: 0,
      completed: false,
    },
  ];

  const handleAddPurchase = () => {
    const newPurchase =
      samplePurchases[Math.floor(Math.random() * samplePurchases.length)];
    setPurchases([...purchases, newPurchase]);
    setSelectedPurchase(newPurchase);
  };

  const handleClaimPoints = (purchase: Purchase) => {
    if (purchase.completed) return;

    // Verificar si el precio es mayor a $5 para ganar puntos
    const earnsPoints = purchase.price >= 5;
    const pointsToAdd = earnsPoints ? 10 : 0;

    // Actualizar la compra
    const updatedPurchases = purchases.map((p) =>
      p.id === purchase.id
        ? { ...p, completed: true, pointsEarned: pointsToAdd }
        : p
    );

    setPurchases(updatedPurchases);
    if (pointsToAdd > 0) {
      addPoints(pointsToAdd);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-800 rounded-2xl shadow-lg">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-400/20 rounded-lg">
            <Zap className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Gana Puntos</h2>
            <p className="text-sm text-neutral-400">
              Por cada compra mayor a $5 ganas 10 puntos
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
        </div>
      </div>

      {/* Explicación */}
      <div className="bg-neutral-700/50 p-4 rounded-xl mb-8">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          ¿Cómo ganar puntos?
        </h3>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              Por cada compra mayor a $5 recibes 10 puntos automáticamente
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              Los puntos se acumulan para canjear por deliciosas recompensas
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              Revisa tu historial de compras para reclamar puntos pendientes
            </span>
          </li>
        </ul>
      </div>

      {/* Simulador de compras */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-yellow-400" />
          <span>Simular compra</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-neutral-700/50 p-4 rounded-xl">
            <p className="text-sm text-neutral-400 mb-2">
              Agrega una compra aleatoria para probar el sistema
            </p>
            <button
              onClick={handleAddPurchase}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar compra</span>
            </button>
          </div>

          {selectedPurchase && (
            <div className="flex-1 bg-neutral-700/50 p-4 rounded-xl border border-yellow-400/30">
              <h4 className="font-medium mb-1">{selectedPurchase.name}</h4>
              <div className="flex justify-between text-sm text-neutral-400 mb-3">
                <span>${selectedPurchase.price.toFixed(2)}</span>
                <span>{formatDate(selectedPurchase.date)}</span>
              </div>
              <button
                onClick={() => handleClaimPoints(selectedPurchase)}
                disabled={selectedPurchase.completed}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  selectedPurchase.completed
                    ? "bg-green-400/20 text-green-400 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                }`}
              >
                {selectedPurchase.completed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Puntos reclamados</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    <span>
                      {selectedPurchase.price >= 5
                        ? "Reclamar 10 puntos"
                        : "Compra menor a $5"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historial de compras */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-yellow-400" />
          <span>Historial de compras</span>
          <span className="text-sm bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
            {purchases.length}
          </span>
        </h3>

        {purchases.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 bg-neutral-700/30 rounded-xl">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No hay compras registradas</p>
            <p className="text-sm mt-2">
              Agrega una compra para comenzar a ganar puntos
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {purchases.map((purchase) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-700/50 p-4 rounded-xl border border-neutral-600 hover:border-yellow-400/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{purchase.name}</h4>
                    <p className="text-sm text-neutral-400 mt-1">
                      {formatDate(purchase.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${purchase.price.toFixed(2)}</p>
                    {purchase.completed ? (
                      <p
                        className={`text-xs mt-1 ${
                          purchase.pointsEarned > 0
                            ? "text-green-400"
                            : "text-neutral-500"
                        }`}
                      >
                        {purchase.pointsEarned > 0
                          ? `+${purchase.pointsEarned} puntos`
                          : "Sin puntos"}
                      </p>
                    ) : (
                      <button
                        onClick={() => handleClaimPoints(purchase)}
                        disabled={purchase.price < 5}
                        className={`text-xs mt-1 px-2 py-1 rounded-full ${
                          purchase.price >= 5
                            ? "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400"
                            : "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                        }`}
                      >
                        {purchase.price >= 5
                          ? "Reclamar puntos"
                          : "Compra menor a $5"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Notificación de éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 max-w-xs flex items-center gap-3"
          >
            <Gift className="w-5 h-5" />
            <div>
              <p className="font-bold">¡Puntos ganados!</p>
              <p className="text-sm">+10 puntos añadidos a tu cuenta</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
