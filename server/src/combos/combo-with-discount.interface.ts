export interface ComboWithDiscount {
  nombre: string;
  imagen: string;
  precioOriginal: number;
  precioConDescuento: number;
  descuentoAplicado: number;
  cupon: string | null;
}
