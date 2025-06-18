import { motion } from "framer-motion";
import { Ticket, Clock, ChevronRight } from "lucide-react";
import { ReactElement } from "react";

interface Coupon {
  id: number;
  title: string;
  description: string;
  code: string;
  expires: string;
  isRedeemable: boolean;
}

const userCoupons: Coupon[] = [
  {
    id: 1,
    title: "Descuento 20%",
    description: "En cualquier combo familiar",
    code: "MCD20FAM",
    expires: "15/06/2024",
    isRedeemable: true,
  },
  {
    id: 2,
    title: "McFlurry Gratis",
    description: "Con la compra de cualquier combo",
    code: "FREEICE",
    expires: "30/06/2024",
    isRedeemable: true,
  },
  {
    id: 3,
    title: "2x1 en Postres",
    description: "En la compra de cualquier postre",
    code: "2X1SWEET",
    expires: "10/07/2024",
    isRedeemable: true,
  },
  {
    id: 4,
    title: "Café Gratis",
    description: "Con cualquier desayuno",
    code: "FREECOFFEE",
    expires: "05/07/2024",
    isRedeemable: true,
  },
];

export default function UserCoupons(): ReactElement {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Ticket className="text-yellow-400 w-6 h-6" />
          <span>Mis Cupones</span>
        </h3>
        <button className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1">
          Ver historial <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userCoupons.map((coupon, index) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-xl p-5 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group relative"
          >
            <div className="absolute top-3 right-3 text-xs bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full">
              Activo
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="bg-yellow-400/10 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold group-hover:text-yellow-400 transition-colors">
                  {coupon.title}
                </h4>
                <p className="text-sm text-neutral-300">{coupon.description}</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-neutral-400 mb-1">Código:</p>
              <p className="font-mono font-bold text-yellow-400 text-lg">
                {coupon.code}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <Clock className="w-3 h-3" />
                <span>Vence: {coupon.expires}</span>
              </div>

              <button
                className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                  coupon.isRedeemable
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                }`}
              >
                {coupon.isRedeemable ? "Canjear" : "Usado"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
