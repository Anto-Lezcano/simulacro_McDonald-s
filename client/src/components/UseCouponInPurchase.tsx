import { ReactElement, useState } from "react";
import {
  Ticket,
  X,
  Check,
  ShoppingCart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function UseCouponInPurchase(): ReactElement {
  const { coupons, addCoupons } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Combo Big Mac", price: 8.99, quantity: 1 },
    { id: "2", name: "McFlurry Oreo", price: 3.99, quantity: 2 },
    { id: "3", name: "Papas Medianas", price: 2.49, quantity: 1 },
  ]);
  const [appliedCoupons, setAppliedCoupons] = useState<number>(0);
  const [showCouponPanel, setShowCouponPanel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedCoupons * 2; // $2 de descuento por cupón (puedes ajustar esto)
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (appliedCoupons >= coupons) return;

    setAppliedCoupons(appliedCoupons + 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRemoveCoupon = () => {
    if (appliedCoupons <= 0) return;

    setAppliedCoupons(appliedCoupons - 1);
  };

  const handleCompletePurchase = () => {
    // Lógica para completar la compra
    addCoupons(-appliedCoupons); // Restar los cupones usados
    setAppliedCoupons(0);
    alert(`Compra completada por $${total.toFixed(2)}. ¡Gracias!`);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-800 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-yellow-400" />
          <span>Mi Pedido</span>
        </h2>
        <div className="flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full">
          <Ticket className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-yellow-400">
            {coupons} cupones disponibles
          </span>
        </div>
      </div>

      {/* Lista de items en el carrito */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-neutral-700/50 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-neutral-400">
                ${item.price.toFixed(2)} c/u
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-neutral-700 rounded-full">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 text-neutral-300 hover:text-white"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 text-neutral-300 hover:text-white"
                >
                  +
                </button>
              </div>
              <span className="font-medium w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Panel de cupones */}
      <div className="mb-6">
        <button
          onClick={() => setShowCouponPanel(!showCouponPanel)}
          className="w-full flex justify-between items-center p-4 bg-neutral-700 hover:bg-neutral-700/80 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">Usar cupones de descuento</span>
            {appliedCoupons > 0 && (
              <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                {appliedCoupons} aplicados
              </span>
            )}
          </div>
          {showCouponPanel ? (
            <ChevronUp className="w-5 h-5 text-neutral-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-400" />
          )}
        </button>

        <AnimatePresence>
          {showCouponPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-neutral-700/30 rounded-b-lg border-t border-neutral-700">
                <p className="text-sm text-neutral-400 mb-4">
                  Cada cupón aplica $2 de descuento en tu compra. Puedes usar
                  hasta {coupons} cupones.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleApplyCoupon}
                    disabled={appliedCoupons >= coupons}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      appliedCoupons >= coupons
                        ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500 text-black"
                    }`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Agregar cupón</span>
                  </button>

                  <button
                    onClick={handleRemoveCoupon}
                    disabled={appliedCoupons <= 0}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      appliedCoupons <= 0
                        ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                        : "bg-red-400/20 hover:bg-red-400/30 text-red-400"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Quitar cupón</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Resumen de compra */}
      <div className="bg-neutral-700/50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3 text-lg">Resumen de compra</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-400">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">
              Descuento ({appliedCoupons} cupones):
            </span>
            <span className="text-green-400">-${discount.toFixed(2)}</span>
          </div>

          <div className="h-px bg-neutral-600 my-2"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Botón de compra */}
      <button
        onClick={handleCompletePurchase}
        disabled={cartItems.length === 0}
        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
          cartItems.length === 0
            ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        <ArrowRight className="w-5 h-5" />
        <span>Completar compra</span>
      </button>

      {/* Notificación de éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3"
          >
            <Check className="w-5 h-5" />
            <div>
              <p className="font-bold">¡Cupón aplicado!</p>
              <p className="text-sm">Descuento de $2 aplicado a tu compra</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
