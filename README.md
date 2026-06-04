# Aura Market 🌟

**Aura Market** es una Single Page Application (SPA) de comercio electrónico premium, construida completamente desde cero utilizando **Angular 19+**. La aplicación consume la API pública **Fake Store API** para ofrecer un catálogo dinámico y completo de productos, integrando características modernas del ecosistema de Angular, como **Signals**, enrutamiento dinámico, persistencia local, un diseño UI/UX de alta fidelidad y soporte para PWA.

## 🚀 Características Principales

- **Diseño Premium y Responsivo**: Interfaz fluida adaptada a dispositivos móviles, tablets y computadoras, con soporte nativo para **Modo Oscuro** (Dark/Light Mode).
- **Rutas y Navegación Dinámica**:
  - `/home`: Página principal con banner de bienvenida interactivo y filtrado rápido por categorías.
  - `/search`: Buscador en tiempo real con filtros avanzados por categoría, ordenamiento (precio, valoración) y rango de precios dinámico.
  - `/details/:id`: Detalle completo del producto, con selectores de cantidad, descripciones completas, valoración por estrellas y una sección de **Productos Relacionados** dinámicos.
  - `/cart`: Carrito de compras con cálculo automático de IVA, envío, subtotales, modificación interactiva de cantidades y simulación de proceso de pago (Checkout).
  - `/favorites`: Colección de artículos favoritos guardados por el usuario.
  - `**` (Wildcard): Página personalizada 404 (No Encontrado) animada.
- **Gestión de Estado Reactivo con Signals**: Uso exclusivo de Angular Signals para el manejo del estado del carrito de compras, favoritos y filtros del buscador.
- **Persistencia en LocalStorage**: Tanto el carrito como los favoritos se guardan localmente para conservar el estado al recargar la página.
- **Interceptor HTTP Global**: Prepend de la URL base configurada en `environments` y manejo de errores HTTP comunes (404, 500, problemas de conexión) de forma amigable para el usuario.
- **Service Worker & PWA**: Configuración Progressive Web App para permitir la instalación en dispositivos y habilitar capacidades offline.
- **Estados de Carga y Vacíos**: Skeleton loaders para transiciones suaves y mensajes ilustrados cuando las listas están vacías o no hay resultados.

---

## 🛠️ Stack Tecnológico

- **Framework**: Angular 19+ (Standalone Components, Modern Control Flow, Signals)
- **Estilos**: Vanilla CSS con variables CSS personalizadas
- **API**: [Fake Store API](https://fakestoreapi.com)
- **PWA**: `@angular/pwa` (Service Workers)

---

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                  # Servicios de datos, interceptores e interfaces
│   │   ├── interceptors/      # api.interceptor.ts
│   │   └── services/          # api.service.ts, cart.service.ts, favorite.service.ts
│   ├── features/              # Páginas de características (Home, Search, Details, Cart, Favorites, NotFound)
│   └── shared/                # Componentes comunes
│       └── components/        # Header, Footer, ProductCard, Skeleton, EmptyState
├── environments/              # Configuración de variables de entorno
├── styles.css                 # Estilos globales y tokens CSS
└── main.ts                    # Punto de entrada de la aplicación Angular
```

---

## 💻 Ejecución Local

Para levantar el proyecto en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd proyectoF
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Ver la aplicación**:
   Abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente ante cualquier cambio en el código.

---

## 📦 Construcción para Producción

Para compilar el proyecto optimizado para producción, ejecuta:

```bash
npm run build
```

Los archivos generados se guardarán dentro del directorio `dist/aura-market/browser`.
