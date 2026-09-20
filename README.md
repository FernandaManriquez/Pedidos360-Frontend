# Pedidos360 Frontend

Frontend de Pedidos360 desarrollado con Angular e integrado con Microsoft Entra ID mediante MSAL.

## Tecnologías

- Angular
- TypeScript
- MSAL Angular
- OAuth 2.0 / OpenID Connect
- Microsoft Entra ID
- AWS API Gateway

## Funcionalidades

- Inicio y cierre de sesión con Microsoft Entra ID.
- Protección de rutas mediante `MsalGuard`.
- Envío automático del JWT mediante `MsalInterceptor`.
- Consulta de productos.
- Consulta de pedidos.
- Consumo del backend a través de AWS API Gateway.

## Rutas

- `/productos`
- `/pedidos`

## Configuración

La configuración principal se encuentra en:

```text
src/app/environments/environment.ts
```

Incluye:

- Client ID de la aplicación frontend registrada en Entra ID.
- Tenant ID.
- Authority de Microsoft Entra ID.
- Redirect URI.
- Scope `Pedidos.ReadWrite` expuesto por el backend.
- URL base de AWS API Gateway.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm start
```

La aplicación queda disponible en:

```text
http://localhost:4200
```

## Compilación

```bash
npm run build
```

## Flujo de autenticación

1. Angular inicia el flujo de autenticación mediante MSAL.
2. Microsoft Entra ID autentica al usuario.
3. El frontend obtiene un JWT con el scope autorizado.
4. `MsalInterceptor` adjunta el token en las solicitudes al API Gateway.
5. API Gateway valida el JWT y reenvía la solicitud al BFF.
6. El backend procesa la solicitud y devuelve la respuesta al frontend.
