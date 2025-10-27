# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application named "carciti". It uses the standard Vite template setup with minimal configuration.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with `tsc -b` and build for production
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Tech Stack

- **React 19.1.1** with TypeScript
- **Vite 7.1.7** as build tool with @vitejs/plugin-react (uses Babel for Fast Refresh)
- **TypeScript 5.9.3** with strict mode enabled
- **ESLint 9** with typescript-eslint, react-hooks, and react-refresh plugins

## TypeScript Configuration

The project uses a composite TypeScript configuration:
- `tsconfig.json` - Root config that references app and node configs
- `tsconfig.app.json` - Application source code (src/) with strict linting rules:
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - Target: ES2022, JSX: react-jsx
- `tsconfig.node.json` - Vite configuration files

## Project Structure

```
src/
  App.tsx         - Main application component
  App.css         - Component styles
  main.tsx        - Application entry point
  index.css       - Global styles
  assets/         - Static assets (images, etc.)
public/           - Public static files
```

## ESLint Configuration

Located in `eslint.config.js` using the flat config format:
- Ignores `dist/` directory
- Applies to all `.ts` and `.tsx` files
- Extends recommended configs for JavaScript, TypeScript, React Hooks, and React Refresh
- Configured for browser environment (ES2020)
