
### Proyecto Node.js con TypeScript: Sistema de Autenticación y API REST de Usuarios

Este proyecto es una aplicación de backend desarrollada con Node.js y TypeScript. Su objetivo principal es proporcionar un sistema de autenticación robusto y una API REST para la gestión de usuarios. A continuación se describen brevemente sus características principales:

#### Características

1.  **Autenticación de Usuarios**:
    
    -   Registro de nuevos usuarios.
    -   Inicio de sesión con verificación de credenciales.
    -   Generación y validación de tokens JWT para sesiones seguras.
2.  **API REST de Usuarios**:
    
    -   Creación, lectura, actualización y eliminación de perfiles de usuario.
    -   Rutas protegidas que requieren autenticación para el acceso.

#### Tecnologías Utilizadas

-   **Node.js**: Plataforma de ejecución para JavaScript en el servidor.
-   **TypeScript**: Superset de JavaScript que añade tipos estáticos y otras características.
-   **Express**: Framework de Node.js para la creación de aplicaciones web y APIs.
-   **JWT (JSON Web Tokens)**: Para la autenticación y autorización de usuarios.
-   **dotenv**: Para la gestión de variables de entorno.

#### Estructura del Proyecto

-   `src/`: Contiene el código fuente de la aplicación.
    -   `router/`: Rutas de la API, incluyendo `authRoutes.ts` para autenticación.
    -   `controllers/`: Lógica de negocio y manejo de solicitudes.
    -   `models/`: Definición de esquemas y modelos de datos.
    -   `middlewares/`: Funciones intermedias como la verificación de tokens JWT.
    -   `app.ts`: Configuración de la aplicación Express.
    -   `server.ts`: Inicio del servidor.

#### Configuración y Ejecución

1.  **Instalación de Dependencias**:
        
    `npm install` 
    
2.  **Compilación del Proyecto**:
3.      
    `npm run build` 
    
4.  **Ejecución del Servidor**:
    
    `npm start` 
    

#### Ejemplo de Ruta

-   **Autenticación**:
    -   Registro: `POST /auth/register`
    -   Inicio de Sesión: `POST /auth/login`
-   **Gestión de Usuarios**:
    -   Obtener Usuario: `GET /users/:id`
    -   Actualizar Usuario: `PUT /users/:id`
    -   Eliminar Usuario: `DELETE /users/:id`

Este proyecto está diseñado para ser una base sólida para cualquier aplicación que requiera autenticación de usuarios y gestión de datos de usuario mediante una API REST.
