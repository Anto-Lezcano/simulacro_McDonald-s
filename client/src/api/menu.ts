// api/menu.ts
const BASEURL = "http://localhost:3000";
import { Menu } from "../types/Menu";

export async function getMenu(tipo: string): Promise<Menu[]> {
  try {
    const response = await fetch(`${BASEURL}/menu/${tipo}`);
    if (!response.ok) throw new Error("Error al obtener el menú");

    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    throw new Error(result.message || "Datos no disponibles");
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}
