import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { ApiService } from '../service/api.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],

  template: `
    <section style="padding: 1rem 2rem;">
      <h2>Productos</h2>

      <p *ngIf="cargando">
        Cargando productos...
      </p>

      <p *ngIf="error">
        {{ error }}
      </p>

      <table
        *ngIf="!cargando && productos.length > 0"
        border="1"
        cellpadding="8"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let producto of productos">
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.stock }}</td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!cargando && !error && productos.length === 0">
        No hay productos registrados.
      </p>
    </section>
  `
})
export class ProductosComponent implements OnInit {

  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  productos: Producto[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.api.listarProductos().subscribe({
      next: data => {
        this.productos = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },

      error: err => {
        console.error('Error cargando productos:', err);

        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;

        this.cdr.markForCheck();
      }
    });
  }
}