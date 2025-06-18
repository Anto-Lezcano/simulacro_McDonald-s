import { motion } from "framer-motion";
import { Clock, Flame, Tag } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Big Mac + Papas",
    description: "Disfruta la clásica Big Mac con papas medianas",
    price: "$5.99",
    timeLeft: "2 días",
    isHot: true,
  },
  {
    id: 2,
    title: "Happy Meal",
    description: "Incluye juguete sorpresa para los más pequeños",
    price: "$3.49",
    timeLeft: "5 días",
  },
  {
    id: 3,
    title: "Cajita Feliz",
    description: "Hamburguesa, papas, bebida y juguete",
    price: "$4.25",
    timeLeft: "1 día",
  },
  {
    id: 4,
    title: "McFlurry Oreo",
    description: "Delicioso helado con trozos de galleta Oreo",
    price: "$2.99",
    timeLeft: "3 días",
    isHot: true,
  },
];

export default function PromoGrid() {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Tag className="text-yellow-400 w-6 h-6" />
        <span>Promociones destacadas</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-neutral-700/50 rounded-2xl overflow-hidden border border-neutral-600 hover:border-yellow-400 transition-colors group"
          >
            <div className="relative">
              <div className="h-40 bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white opacity-30">
                  M
                </span>
              </div>

              {promo.isHot && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>HOT</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h4 className="text-xl font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                {promo.title}
              </h4>
              <p className="text-neutral-300 text-sm mb-3">
                {promo.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-yellow-400 font-bold text-lg">
                  {promo.price}
                </span>
                <div className="flex items-center gap-1 text-neutral-400 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{promo.timeLeft}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
