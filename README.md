# leonardkipar.dev

Personal website for Leonard Kipar. This is a single-page portfolio with snap-scrolling sections, bilingual content (EN/DE), animated gradients, and a Three.js background shader.

## Tech Stack

- React 19 + TypeScript
- Vite
- Three.js via @react-three/fiber and @react-three/drei
- SVG icon set via SVGR

## Project Structure

- `src/sections/` contains the page sections (greet, about, career, skills, projects, contact).
- `src/locales/lang.json` holds the EN/DE copy.
- `src/components/` contains shared UI and animation helpers.
- `src/css/` contains the styling for each section.

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```
