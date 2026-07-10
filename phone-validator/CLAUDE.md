# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important rules
- Always use rtk before commands


## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check via `vue-tsc -b`, then build with Vite
- `npm run preview` — preview the production build

There is no lint or test script configured in this project.

## Architecture

This is a small Vue 3 + TypeScript + Vite single-page app that validates phone numbers per-country using `libphonenumber-js`.

- `src/main.ts` mounts `App.vue`.
- `src/App.vue` lazy-loads `src/components/PhoneValidator.vue` via `defineAsyncComponent`.
- `src/components/PhoneValidator.vue` contains essentially all app logic:
  - A hardcoded `countries` array defines the country picker: `code` (a `libphonenumber-js` `CountryCode`), `dialCode`, `flag`, input `placeholder`, and a localized `errorTranslation` string shown when validation fails for that country.
  - Validation calls `parsePhoneNumberFromString(phoneNumber, selectedCountry.code)` from `libphonenumber-js` and checks `.isValid()`.
  - The country dropdown's open/close state is tracked in `isOpen`, toggled by `openDropdown`, and closed via a `document`-level `click` listener (`clickOutside`) registered in `onMounted`/`onUnmounted`, guarded by a `selectRef` template ref to detect outside clicks.
  - When adding a new country, add an entry to `countries` with a valid `CountryCode` and a translated error message — the rest of the component is generic over this list.

## Styling

- Styling is Tailwind CSS v4, wired up via the `@tailwindcss/vite` plugin in `vite.config.ts` (not a `tailwind.config.js`/`postcss.config.js` file — v4 doesn't require them).
- `src/index.css` is just `@import "tailwindcss";` and is imported from both `main.ts` and `App.vue`.
- `src/style.css` is currently unused/empty.
