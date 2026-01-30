# README Generator

[![CI](https://github.com/mrballistic/readme-generator/actions/workflows/main.yml/badge.svg)](https://github.com/mrballistic/readme-generator/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A form-based tool that helps developers create professional README files in seconds. Fill out a simple form, see a live preview, and copy the generated markdown.

**[Live Demo](https://mrballistic.github.io/readme-generator/)**

## Features

- Input form for repository details (name, description, tech stack, install command, usage example)
- Badge generation (build status, license, version, downloads)
- License selection (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, Unlicense)
- Live markdown preview that updates as you type
- One-click copy to clipboard
- Dark mode support (follows system preference)
- Fully client-side (no server required)

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI (MUI) v7
- react-markdown
- Vitest + React Testing Library

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |

## License

MIT
