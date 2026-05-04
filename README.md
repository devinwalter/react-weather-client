# Documentation and Discussions

## Running the Application

You can run the app locally by cloning, copying the .env.template file to a .env file and putting in a valid OpenWeatherAPI key

## Timing

I timeboxed this to about 2 hours over multiple sessions, it's pretty hard to find just two hours in a day, so this was done over a couple of days.

## React

I decided to use react simply because of the ease of use, simplicity and quickness. I use react every single day, and this is is more inline with my every day workflow compared to a normal HTML + JS + CSS flow

## OpenWeatherAPI

I used [this](https://openweathermap.org/api/current?collection=current_forecast) API for my weather API

## Dependencies

### Axios

Third party data fetching library, pretty self explanatory

### @heroicons/react

Lightweight third party icon library, useful for small functional non-production apps like this one. Very large variety of SVG icons that can be easily used.

### @tanstack/react-query

Data fetching library for handling caching, loading, error states, and much more, used with many global state paradigms, if not using redux, I will use this library in pretty much every application

If using redux, there is an rtk-query (Redux Toolkit) that accomplishes the same thing.

### React Context

Demonstrated global state by using context, too lightweight to justify using redux for this, although redux is my personal go to for large applications

## CSS

Just used homegrown CSS, not CSS modules as there is some setup to be had, but wasn't worried about it. Realistically, in a production application, there would be some sort of defined CSS library that I use, could be MUI, Tailwind, etc... For this app, I just wrote my own CSS because it's kind of fun sometimes

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
