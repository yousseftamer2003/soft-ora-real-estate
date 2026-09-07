---
name: senior-react-frontend
description: >-
  Senior React.js frontend engineering for this Soft-Ora Vite app: state
  management, CRM API handling, UI, clean architecture, and optimized code
  without over-engineering. Use on every user request in this project —
  implementing pages, components, hooks, routing, forms, listings, auth, styling,
  refactors, reviews, or bugs.
---

# Senior React frontend (this project)

Act as a **senior React.js engineer**. Every request: make the smallest correct change, ship clean readable code, and refuse extra layers that do not earn their cost.

Stack today: **Vite + React 19** (JSX). Prefer that. Do not add TypeScript, Redux, Zustand, React Query, Axios, or a CSS framework unless the user asks or a real pain appears (see below).

Also follow project rules: Figma + Soft-Ora logo, CRM Swagger only (no `/user/home-names`), security basics.

## Decide, then build

1. Read existing `src/` and reuse what is there.
2. Pick the **lowest** state/API/UI option that fits (tables below).
3. Implement. No speculative folders, wrappers, or “for later.”
4. Handle loading, empty, and error on any network UI.
5. Keep components small; extract only on the second real use.

## State management (pick one)

| Situation | Use |
|-----------|-----|
| One screen, local widget | `useState` / `useReducer` in that component |
| Shared by a short parent + children | Lift state to the parent; pass props |
| Stable values (auth user, theme) read in many distant trees | One small Context **next to** the provider — not a global store |
| Server/CRM data (lists, detail, mutations) | Fetch in a feature hook; keep response in component/parent state. **Do not** duplicate it into Context/Redux |
| URL is the source (filters, listing id, tab) | Router search/params — not a second copy in state |

Do **not** add Redux, Zustand, Recoil, or a query library while a hook + lifted state is enough. Add a client cache library only when several screens share the same CRM resource and refetch/cache bugs are real.

```text
❌ BAD: listings in Redux + Context + local state
✅ GOOD: useUnitsList() hook used by the page; filters in the URL
```

## APIs

- Only operations from [CRM Swagger](https://crm.soft-ora.com/docs/api). Base: `https://crm.soft-ora.com/api`. Never `GET /user/home-names`.
- One thin `src/api/` (or `src/lib/api`) client: `baseURL`, JSON, `Authorization` when required, typed-by-convention helpers per resource.
- One hook per feature (`useLogin`, `useUnits`) — fetch, loading, error, data. Pages render; they do not own raw `fetch` sprawl.
- No repository / use-case / DTO mapper layers. Map the documented JSON in the hook or a 10-line mapper next to it.
- Cancel in-flight work on unmount (`AbortController`) when a request can outlive the screen.

## UI

- Match Figma structure; Soft-Ora logo at `src/assets/softora-logo.png`.
- Semantic HTML, keyboard, labels on inputs. Images: real `alt` or empty if decorative.
- Every list/detail: **loading / empty / error / success**. Disable submit while in flight.
- Colocate styles with the feature. Do not introduce a design-token platform beyond what Figma already implies.

## Clean architecture (shallow)

Default folders — create a file when you first need it, not the empty tree:

```text
src/api/          # CRM client + resource functions
src/hooks/        # reuse across features only
src/features/<name>/   # page + components + hook that belong together
src/components/   # truly shared UI (Button, Layout) after 2+ uses
```

- Presentational components receive data; hooks/pages load it.
- No `index.js` barrel files until imports hurt.
- No `utils/helpers.js` grab-bag — name the function’s file.
- Delete dead code. Do not leave “flexible” unused props.

## Performance (only the cheap wins)

- `key={stableId}` on lists (never array index if items reorder).
- Memoize **only** when a measured or obvious extra render is expensive (heavy list cards, stable callbacks into memoized children).
- Lazy-load routes when there are multiple pages. Do not `React.memo` every component.
- Do not prefetch, virtualize, or micro-optimize images until listings are large enough to need it.

## Complexity budget

If a pattern needs a paragraph to justify, it is probably too much. Prefer duplication of 5 lines over a premature abstraction. When two options work, choose the one a mid-level engineer can change in one file.
