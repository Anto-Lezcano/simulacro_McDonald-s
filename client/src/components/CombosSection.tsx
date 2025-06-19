import { motion } from "framer-motion";
import { ShoppingBag, Flame } from "lucide-react";
import { ReactElement } from "react";
import foto1 from "../assets/imagenes de mcdonal/big mac combo.jpg";
import foto2 from "../assets/imagenes de mcdonal/cajita feliz.jpg";
import foto3 from "../assets/imagenes de mcdonal/cajita feliz 2.jpg";
import foto4 from "../assets/imagenes de mcdonal/oreo.jpg";

interface Combo {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  isPopular?: boolean;
  image: string;
}

const combos: Combo[] = [
  {
    id: 1,
    name: "Big Mac Combo",
    description: "Big Mac, papas medianas y bebida",
    price: "$7.99",
    originalPrice: "$9.49",
    isPopular: true,
    image: foto1,
  },
  {
    id: 2,
    name: "McNífica Combo",
    description: "McNífica, papas y bebida",
    price: "$6.49",
    originalPrice: "$7.99",
    image: foto2,
  },
  {
    id: 3,
    name: "Happy Meal",
    description: "Hamburguesa, juguete y bebida pequeña",
    price: "$4.99",
    originalPrice: "$5.49",
    image: foto3,
  },
  {
    id: 4,
    name: "Cuarto de Libra Combo",
    description: "Doble Cuarto de Libra con queso",
    price: "$8.49",
    originalPrice: "$10.49",
    isPopular: true,
    image: foto4,
  },
];

export default function CombosSection(): ReactElement {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="text-yellow-400 w-6 h-6" />
          <span>Combos Destacados</span>
        </h3>
        <button className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1">
          Ver todos <span className="text-lg">→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {combos.map((combo, index) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-yellow-400 transition-colors group relative shadow-lg"
          >
            {combo.isPopular && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                <Flame className="w-3 h-3" />
                <span>POPULAR</span>
              </div>
            )}

            <div className="relative">
              <img
                src={combo.image}
                alt={combo.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-1 text-sm font-bold rounded-tl-lg">
                {combo.price}
                <span className="ml-2 text-xs text-neutral-400 line-through">
                  {combo.originalPrice}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h4 className="text-xl font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                {combo.name}
              </h4>
              <p className="text-neutral-300 text-sm mb-4">
                {combo.description}
              </p>

              <div className="flex justify-between items-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                  Agregar al pedido
                </button>
                <button className="text-neutral-400 hover:text-yellow-400 text-sm transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
