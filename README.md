# Dashboard: Gestión de Inventarios con React

### Reto Frontend

### By Ariel Arreola

Un dashboard moderno para la gestión de inventarios construido con React, TypeScript, Tailwind CSS y Mock Service Worker (MSW) para el desarrollo.

## Características

- **React 19** y TypeScript. Inicializado con Vite
- **Tailwind CSS** version 4
- **Headless UI** para componentes UI auxiliares
- **Redux Toolkit** estados globales y gestion de llamadas a APIs
- **React Router** para navegación
- **Chart.js para React** uso de gráficas en dashboard
- **MSW (Mock Service Worker)** para simulación de APIs

## Requisitos

- Node.js 22
- npm o yarn

## Instalación

1. **Clonar repositorio y acceder:**

   ```bash
   git clone https://github.com/arielarreola/frontend-k2-challenge.git
   cd frontend-k2-challenge
   ```

2. **Instalar dependencias:**
   ```bash
   npm i
   yarn
   ```
3. **Ejecutar comando para activar el MSW y generar el mockServiceworker:**
   ```bash
   npx msw init public/ --save
   ```

## MSW (Mock Service Worker)

El proyecto utiliza MSW para interceptar y mockear las peticiones HTTP durante el desarrollo.
MSW se configura automáticamente en modo desarrollo. El worker se inicializa en `src/main.tsx`:

```typescript
async function startApp() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: "warn",
    });
    console.log("MSW worker started successfully");
  }
}
```

### Estructura de MSW

- `src/mocks/browser.ts` - Configuración del worker para navegador
- `src/mocks/server.ts` - Configuración del server para Node.js (tests)
- `src/mocks/handlers/` - Definición de los endpoints mockeados
  - `index.ts` - Exportación principal de handlers
  - `products.ts` - Handlers para productos y categorías

### Endpoints Mockeados

El sistema incluye mocks para:

- **Productos:** CRUD completo con persistencia en localStorage.
- **Categorías:** Lista fija de categorías (Postres, Botanas, Bebidas para ejemplificar)
- **Autenticación:** Simulación de login, registro y logout

## Ejecución

2. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`o en su defecto, en el puerto que el sistema operativo permita y refleje en la consola.

3. **Construir para producción:**

   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── dashboard/      # Componentes del dashboard
│   ├── layout/         # Componentes de layout generales
│   ├── profile/        # Componentes de perfil
│   └── ui/             # UI kit reutilizables
├── contexts/           # Contextos de React (Auth y appearance)
├── hooks/              # Hooks personalizados para formularios y lógica de negocio
├── lib/                # Consumo de APIs y modelos
├── mocks/              # Configuración de MSW, apis simuladas y workers
│   ├── browser.ts
│   ├── server.ts
│   └── handlers
├── routes/             # Vistas de páginas por cada ruta
└── assets/             # Archivos estáticos (imagenes de fondo o logos)
└── utils/             # Métodos reutilizables para iteraciones de estructuras, validaciones o formatos

```

## 📝 Notas sobre MSW

- MSW solo se activa en modo desarrollo (`import.meta.env.DEV`)
- Los datos de usuario y de productos se persisten en localStorage para simular una base de datos
- El archivo `public/mockServiceWorker.js` es generado por MSW mediante el comando `npx msw init public --save`
