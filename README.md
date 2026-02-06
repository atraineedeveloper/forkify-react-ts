# Forkify React TS

Aplicación web para búsqueda, visualización y gestión de recetas, construida con React + TypeScript sobre Vite.

## Descripción

Este proyecto es una migración desde una implementación JavaScript/MVC hacia una arquitectura moderna basada en componentes, contexto global y tipado estático.

Incluye integración con la API de Forkify para:

- Buscar recetas por texto.
- Ver detalle completo de receta.
- Ajustar porciones con recálculo de ingredientes.
- Guardar marcadores (bookmarks) persistentes en `localStorage`.
- Subir recetas propias mediante formulario modal.

## Tecnologías

- React 19
- TypeScript 5
- Vite 7
- Sass
- ESLint

## Arquitectura

La aplicación está organizada por responsabilidades:

- `src/components`: UI desacoplada por secciones (`Header`, `SearchResults`, `RecipeView`, `AddRecipeModal`).
- `src/context`: estado global y acciones de la app (`AppProvider`, `useAppContext`).
- `src/hooks`: lógica reutilizable (`useRecipe`, `useBookmarks`).
- `src/services`: capa de acceso a API (`forkifyApi.ts`).
- `src/types`: contratos y tipos de dominio.
- `src/sass`: estilos por módulo.

## Requisitos

- Node.js 20+
- npm 10+

## Configuración local

1. Instala dependencias:

```bash
npm install
```

2. Configura variables de entorno:

```bash
cp .env.example .env
```

3. Define tu API key en `.env`:

```env
VITE_FORKIFY_API_KEY=tu_api_key
```

## Scripts disponibles

```bash
npm run dev      # entorno local
npm run build    # compilación de producción
npm run preview  # previsualización del build
npm run lint     # análisis estático
```

## Funcionalidades implementadas

- Búsqueda con paginación.
- Detalle de receta con navegación por hash (`#id`).
- Actualización de porciones e ingredientes en tiempo real.
- Bookmark/unbookmark con persistencia local.
- Formulario de subida con validaciones de ingredientes.
- Manejo de errores de red y API.

## Estado del proyecto

- Migración a React + TypeScript completada.
- Build y lint en estado estable.

## Despliegue

Este proyecto es compatible con plataformas estáticas como Vercel, Netlify o GitHub Pages (con configuración de SPA según proveedor).

## Licencia

Uso educativo y de portafolio.
