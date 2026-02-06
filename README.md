# Forkify React TS

A recipe web application built with React + TypeScript + Vite.

## Live Demo

- https://atraineedeveloper.github.io/forkify-react-ts/

## Overview

This project is a migration of the original JavaScript/MVC Forkify app to a modern React architecture with global state, reusable hooks, and strict typing.

Main capabilities:

- Search recipes by keyword
- Browse paginated results
- Open recipe details (hash-based navigation)
- Update servings and automatically recalculate ingredients
- Add/remove bookmarks with `localStorage` persistence
- Upload custom recipes through a validated modal form

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Sass
- ESLint

## Project Structure

- `src/components` - UI components (`Header`, `SearchResults`, `RecipeView`, `AddRecipeModal`)
- `src/context` - Global state provider and context contract
- `src/hooks` - Reusable business logic (`useRecipe`, `useBookmarks`)
- `src/services` - API integration layer (`forkifyApi.ts`)
- `src/types` - Domain types and interfaces
- `src/sass` - Modular styles

## Requirements

- Node.js 20+
- npm 10+

## Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set your Forkify API key:

```env
VITE_FORKIFY_API_KEY=your_api_key
```

## Available Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

The project is configured for GitHub Pages deployment via GitHub Actions.

## License

Intended for educational and portfolio use.
