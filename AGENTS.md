# Project engineering constraints

## Frontend architecture

This project intentionally uses server-rendered Go templates and HTMX.

Prefer server-side rendering over client-side rendering.

Do not introduce:
- React
- Vue
- Svelte
- Angular
- JSX
- client-side component frameworks
- graph visualization libraries
- SVG rendering libraries
- JavaScript build tooling

Do not add a production dependency without explicit approval.

Use:
- Go
- html/template
- HTMX
- native browser APIs
- HTML/CSS/SVG
- small amounts of vanilla JavaScript where browser-side interaction
  genuinely requires it

Keep JavaScript as a progressive enhancement rather than making it
responsible for rendering application state.

## Scope discipline

Implement only behavior required by the task.

Do not add speculative:
- configuration
- abstractions
- extension points
- animations
- controls
- UI features
- compatibility layers
- libraries
- frameworks

Do not redesign adjacent code unless required to implement the task.

Prefer the smallest implementation that satisfies the stated acceptance
criteria.

## Stack 

- Backend: Go
- Frontend: Server-rendered Go templates, HTMX 4.0
- Styling: HTML/CSS/SVG
- Interaction: Vanilla JavaScript (progressive enhancement)
