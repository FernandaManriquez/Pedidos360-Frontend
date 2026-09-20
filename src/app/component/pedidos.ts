import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { ApiService } from '../service/api.service';
import { Pedido } from '../model/pedido';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],

  template: `
    <section style="padding: 1rem 2rem;">
      <h2>Pedidos</h2>

      <p *ngIf="cargando">
        Cargando pedidos...
      </p>

      <p *ngIf="error">
        {{ error }}
      </p>

      <table
        *ngIf="!cargando && pedidos.length > 0"
        border="1"
        cellpadding="8"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let pedido of pedidos">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.usuario }}</td>
            <td>{{ pedido.productoId }}</td>
            <td>{{ pedido.cantidad }}</td>
            <td>{{ pedido.total }}</td>
            <td>{{ pedido.estado }}</td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!cargando && !error && pedidos.length === 0">
        No hay pedidos registrados.
      </p>
    </section>
  `
})
export class PedidosComponent implements OnInit {

  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  pedidos: Pedido[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.api.listarPedidos().subscribe({
      next: data => {
        this.pedidos = data;
        this.cargando = false;

        this.cdr.markForCheck();
      },

      error: err => {
        console.error('Error cargando pedidos:', err);

        this.error = 'No se pudieron cargar los pedidos.';
        this.cargando = false;

        this.cdr.markForCheck();
      }
    });
  }
}