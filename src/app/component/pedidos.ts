import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Pedido } from '../model/pedido';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html'
})
export class PedidosComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  usuario = '';
  productoId: number | null = null;
  cantidad = 1;
  cargando = true;
  guardando = false;
  mensaje = '';
  error = '';

  get total(): number {
    const producto = this.productos.find(p => p.id === this.productoId);
    return (producto?.precio ?? 0) * (this.cantidad || 0);
  }

  ngOnInit(): void {
    forkJoin({
      pedidos: this.api.listarPedidos(),
      productos: this.api.listarProductos()
    }).subscribe({
      next: datos => {
        this.pedidos = datos.pedidos;
        this.productos = datos.productos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  crear(): void {
    if (this.guardando) return;
    this.error = '';
    this.mensaje = '';
    const producto = this.productos.find(p => p.id === this.productoId);
    if (!this.usuario.trim() || !producto?.id ||
        !Number.isInteger(this.cantidad) || this.cantidad < 1 ||
        !Number.isSafeInteger(this.total) || this.total < 0) {
      this.error = 'Revisa el usuario, producto y cantidad.';
      return;
    }

    this.guardando = true;
    this.api.crearPedido({
      usuario: this.usuario.trim(),
      productoId: producto.id,
      cantidad: this.cantidad,
      total: this.total,
      estado: 'PENDIENTE'
    }).subscribe({
      next: pedido => {
        this.pedidos = [...this.pedidos, pedido];
        this.mensaje = `Pedido ${pedido.id} creado correctamente.`;
        this.guardando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo confirmar la creación. Revisa la lista antes de reintentar.';
        this.guardando = false;
        this.cdr.markForCheck();
      }
    });
  }
}
