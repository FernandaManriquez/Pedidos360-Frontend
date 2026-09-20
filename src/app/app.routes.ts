import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PedidosComponent } from './component/pedidos';
import { ProductosComponent } from './component/productos';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'pedidos', component: PedidosComponent, canActivate: [MsalGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [MsalGuard] }
];
