import { ReactElement } from "react";
import { motion } from "framer-motion";

interface MenuCategoryProps {
  icon: ReactElement;
  name: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
}

export default function MenuCategory({
  icon,
  name,
  color,
  active = false,
  onClick,
}: MenuCategoryProps): ReactElement {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} ${
        active ? "ring-2 ring-white scale-105" : "opacity-90 hover:opacity-100"
      } rounded-lg p-3 text-white flex flex-col items-center gap-2 shadow-md transition-all`}
    >
      <div
        className={`p-2 ${active ? "bg-white/30" : "bg-white/20"} rounded-full`}
      >
        {icon}
      </div>
      <span className="font-medium text-sm">{name}</span>
    </motion.button>
  );
}
