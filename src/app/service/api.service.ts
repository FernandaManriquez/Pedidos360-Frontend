import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Pedido } from '../model/pedido';
import { Producto } from '../model/producto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiBaseUrl;

  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.api}/api/pedidos`);
  }

  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}/api/productos`);
  }
}
