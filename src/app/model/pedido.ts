export interface Pedido {
  id?: number;
  usuario: string;
  productoId: number;
  cantidad: number;
  total: number;
  estado?: string;
  fecha?: string;
}
