import { motion } from "framer-motion";
import { Star, Ticket, UserCircle } from "lucide-react";
import { ReactElement } from "react";
import { useUser } from "../contexts/UserContext";

export default function UserProfileCard(): ReactElement {
  const { name, points, coupons } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 shadow-lg h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <UserCircle className="w-12 h-12 text-yellow-400" />
          <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>

      <div className="space-y-4">
        {/* Puntos */}
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-4 rounded-xl border border-yellow-400/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400/10 p-2 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Tus puntos</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {points.toLocaleString()}
                </p>
              </div>
            </div>
            <button className="text-xs bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 px-3 py-1 rounded-full transition">
              Canjear
            </button>
          </div>
        </div>

        {/* Cupones */}
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-4 rounded-xl border border-red-400/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-red-400/10 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Tus cupones</p>
                <p className="text-2xl font-bold text-red-400">{coupons}</p>
              </div>
            </div>
            <button className="text-xs bg-red-400/20 hover:bg-red-400/30 text-red-400 px-3 py-1 rounded-full transition">
              Ver todos
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
