import { ReactElement, useState, useEffect } from "react";
import {
  Beef,
  Sandwich,
  IceCream,
  Coffee,
  EggFried,
  Search,
  ShoppingCart,
} from "lucide-react";
import MenuCategory from "./MenuCategory";
import { getMenu } from "../api/menu";
import { Menu } from "../types/Menu";

export default function McMenu(): ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>("Hamburguesa");
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [filteredItems, setFilteredItems] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    {
      id: "Hamburguesa",
      name: "Hamburguesa",
      icon: <Beef className="w-5 h-5" />,
      color: "bg-red-500",
    },
    {
      id: "Snack",
      name: "Snacks",
      icon: <Sandwich className="w-5 h-5" />,
      color: "bg-yellow-500",
    },
    {
      id: "Postre",
      name: "Postres",
      icon: <IceCream className="w-5 h-5" />,
      color: "bg-pink-500",
    },
    {
      id: "Bebida",
      name: "Bebidas",
      icon: <Coffee className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: "Desayuno",
      name: "Desayunos",
      icon: <EggFried className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        const data = await getMenu(activeCategory);
        setMenuData(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error loading menu:", error);
        setMenuData([]);
        setFilteredItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [activeCategory]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(menuData);
      return;
    }

    const results = menuData.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, menuData]);

  const handleAddToCart = (item: Menu) => {
    setCart((prevCart) => [...prevCart, item]);
    // Aquí podrías añadir un toast de confirmación
  };

  const getCategoryName = () => {
    return (
      categories.find((cat) => cat.id === activeCategory)?.name || "Productos"
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-center relative">
        <h2 className="text-3xl font-bold text-white mb-2">Menú McDonald's</h2>
        <p className="text-yellow-100">Descubre nuestras deliciosas opciones</p>

        {cart.length > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {cart.length}
          </div>
        )}
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar en el menú..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <MenuCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            color={category.color}
            active={activeCategory === category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setSearchTerm("");
            }}
          />
        ))}
      </div>

      {/* Productos */}
      <div className="bg-neutral-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {categories.find((c) => c.id === activeCategory)?.icon}
            <span>
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : getCategoryName()}
            </span>
          </h3>
          <span className="text-neutral-400 text-sm">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            <span className="sr-only">Cargando...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8">
            {searchTerm ? (
              <p className="text-neutral-400">
                No hay resultados para "
                <span className="text-yellow-400">{searchTerm}</span>"
              </p>
            ) : (
              <p className="text-neutral-400">
                No hay productos disponibles en esta categoría
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={`${item._id}-${item.tipo}`}
                className="bg-neutral-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="h-40 bg-neutral-600 flex items-center justify-center relative">
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl font-bold text-white opacity-20">
                      M
                    </span>
                  )}
                </div>
                <div className="p-4 flex-grow">
                  <h4 className="text-lg font-bold mb-1">{item.nombre}</h4>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-yellow-400 font-bold">
                      ${item.precio.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Carrito */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-lg flex items-center justify-center relative"
            onClick={() => {
              console.log("Carrito:", cart);
            }}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
