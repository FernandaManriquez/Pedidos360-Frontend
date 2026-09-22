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
La autenticación utiliza OAuth 2.0 / OpenID Connect mediante el flujo Authorization Code con PKCE, administrado automáticamente por MSAL.

1. Angular inicia el flujo de autenticación mediante MSAL.
2. Microsoft Entra ID autentica al usuario.
3. El frontend obtiene un JWT con el scope autorizado.
4. `MsalInterceptor` adjunta el token en las solicitudes al API Gateway.
5. API Gateway valida el JWT y reenvía la solicitud al BFF.
6. El backend procesa la solicitud y devuelve la respuesta al frontend.

## Evidencias de autenticación e integración

A continuación se presentan las evidencias de configuración y funcionamiento del frontend.

### Tenant y usuario de prueba

Microsoft Entra ID fue utilizado como proveedor de identidad. Dentro del tenant se configuró un usuario para realizar las pruebas de autenticación.

<img width="2048" height="945" alt="entra-usuarios" src="https://github.com/user-attachments/assets/268a37aa-477b-42cb-a2fe-76df1c8ec9d1" />

### Aplicación registrada como SPA

La aplicación `Pedidos360-Frontend` fue registrada en Microsoft Entra ID como Single Page Application, utilizando `http://localhost:4200` como URI de redirección durante la ejecución local.

<img width="2048" height="982" alt="entra-auth-spa" src="https://github.com/user-attachments/assets/de4d8614-c618-4004-bdf2-2afc6070c7ae" />

### Permisos para consumir la API

El frontend posee el permiso delegado `Pedidos.ReadWrite` correspondiente a `Pedidos360-Backend-API`, permitiendo obtener un token válido para consumir los endpoints protegidos.

<img width="2048" height="962" alt="entra-permisos-api" src="https://github.com/user-attachments/assets/bf682866-0978-4032-b7ed-ed9428e8ee46" />


### Consumo autenticado mediante API Gateway

Con la sesión iniciada, el frontend realiza las solicitudes al backend mediante AWS API Gateway. La siguiente evidencia muestra una petición autenticada con respuesta `HTTP 200 OK`.

<img width="2047" height="1102" alt="peticion-200" src="https://github.com/user-attachments/assets/f89a6ebc-04a1-4b99-8377-6e3dd572c099" />

### Vista de productos

El frontend obtiene y muestra correctamente los productos recibidos desde el backend.

<img width="2048" height="1116" alt="productos" src="https://github.com/user-attachments/assets/ffe3d853-f684-4f9d-8cb0-ef0764ac7768" />

### Vista de pedidos

La aplicación también consume el servicio de pedidos y muestra los datos recibidos desde el backend.

<img width="2047" height="1116" alt="pedidos" src="https://github.com/user-attachments/assets/ba1282e1-dbf4-496f-86a4-a31412038a14" />
