# Pedidos360 Frontend — EA3

Frontend Angular integrado con Microsoft Entra ID mediante MSAL. Rama de entrega: `feature/ea3-kafka`.

## Estado al 21 de noviembre de 2026

Se verificó Angular ejecutado localmente en `http://localhost:4200`, con inicio de sesión y consultas autenticadas de productos y pedidos a través de AWS API Gateway. Ambas consultas respondieron HTTP 200.

El frontend no está publicado en la nube. Se creó el bucket S3 privado `pedidos360-frontend-ea3-257513036260`, pero el intento de configurar CloudFront con acceso privado fue bloqueado por el permiso IAM `cloudfront:CreateOriginAccessControl`. No se obtuvo una distribución funcional ni una URL CloudFront.

## Configuraciones

| Perfil | Archivo | URL base del backend |
|---|---|---|
| Local | src/app/environments/environment.ts | http://localhost:8080 |
| AWS | src/app/environments/environment.aws.ts | https://0tf2rrk5b0.execute-api.us-east-1.amazonaws.com/dev |

El perfil AWS cambia el destino de las solicitudes, no el alojamiento del frontend. Conserva la redirección Entra ID `http://localhost:4200` y `production: false`; `angular.json` configura este perfil con optimización deshabilitada y source maps. No se presenta como una compilación de producción publicada.

El interceptor protege las solicitudes a `${environment.apiBaseUrl}/*` y solicita el scope delegado `Pedidos.ReadWrite`. Los identificadores públicos de las aplicaciones Entra ID no son contraseñas. No incluir tokens, secretos de cliente o claves privadas en el repositorio.

## Instalación y ejecución en Windows PowerShell

Desde la raíz del repositorio:

```powershell
npm.cmd install
```

Para el backend local:

```powershell
npm.cmd start
```

Para los servicios accesibles mediante API Gateway:

```powershell
npm.cmd start -- --configuration aws
```

Ejecutar una sola instancia de Angular en el puerto 4200. El perfil AWS no necesita iniciar el BFF ni los microservicios en el computador local, pero requiere la instancia EC2 y el API Gateway operativos.

## Compilación verificada

```powershell
npm.cmd run build -- --configuration aws
```

Esta compilación terminó correctamente. Generó un bundle inicial sin optimizar de aproximadamente 2,27 MB en `dist/pedidos360-frontend`. No equivale a un despliegue en S3 ni a la validación de la configuración production.

## Autenticación y rutas

La autenticación usa OAuth 2.0 / OpenID Connect con Authorization Code y PKCE mediante MSAL. `MsalGuard` protege las rutas; `MsalInterceptor` incorpora el access token a las solicitudes configuradas.

Rutas de consulta: `/productos` y `/pedidos`.

Flujo validado: Angular local → API Gateway → BFF en EC2 → microservicio → MariaDB en AWS. El gateway rechazó una solicitud sin JWT con HTTP 401 y aceptó la consulta con un token válido con HTTP 200.

El preflight CORS devolvió HTTP 204 para el origen `http://localhost:4200`, autorizando las cabeceras `authorization` y `content-type`.

## Estado del despliegue

S3 permanece privado. La configuración CloudFront no pudo completarse con el rol del laboratorio. Un futuro alojamiento HTTPS requiere ajustar y registrar la URI de redirección SPA en Entra ID, permitir el nuevo origen en CORS y producir una compilación apropiada para publicación. Esas acciones no se declaran realizadas.

## Evidencias históricas

Las imágenes siguientes documentan autenticación e integración de la etapa previa. Las pruebas actuales de EA3 incluyen las respuestas 200 de productos y pedidos vía API Gateway y el error IAM del intento CloudFront.

### Autenticación e integración

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
