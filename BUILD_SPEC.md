# README Generator — Build Spec

## PRD

### Problem Statement
Developers have GitHub repos with empty or low-quality READMEs. Writing them manually is tedious, so they don't get done. This leads to projects that are hard to understand and poor portfolio presentation.

### Target User
Developers who want portfolio-ready READMEs without the friction.

### Core Features (MVP)
- Form to input: repo name, description, tech stack (checkboxes), install command, usage example, license (dropdown)
- Auto-generated shields.io badges based on selected tech stack
- Live markdown preview that updates as user types
- Copy to clipboard button with "Copied!" feedback
- License section conditionally shown (hidden if "None" selected)

### Out of Scope
- Table of contents generation
- Multiple templates or themes
- File download (clipboard only)
- GitHub API integration
- Backend or database
- User accounts

### Success Criteria
A user can generate a complete, professional README and copy it in under 2 minutes.

---

## Technical Design Document

### Tech Stack
- Vite + React + TypeScript
- react-markdown for preview rendering
- No other external dependencies

### Data Model

```typescript
// src/types.ts
export interface ReadmeData {
  repoName: string
  description: string
  techStack: string[]
  installCommand: string
  usageExample: string
  license: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'None'
}

export const TECH_OPTIONS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Vite',
  'Tailwind CSS',
  'Next.js',
  'Express',
  'PostgreSQL'
] as const

export const LICENSE_OPTIONS = ['MIT', 'Apache-2.0', 'GPL-3.0', 'None'] as const
```

### File Structure

```
src/
├── types.ts              # ReadmeData interface and constants
├── badges.ts             # Badge URL lookup + getBadgeMarkdown()
├── generateReadme.ts     # Main markdown generation function
├── components/
│   ├── ReadmeForm.tsx    # All form inputs
│   ├── ReadmePreview.tsx # Markdown preview + raw toggle
│   └── CopyButton.tsx    # Clipboard functionality
├── App.tsx               # Main container, state, layout
└── App.css               # Basic styling
```

### Key Functions

**badges.ts**
- Map of tech name → shields.io badge URL
- Function: `getBadgeMarkdown(techStack: string[]): string`
- Returns markdown image syntax for all matching badges

**generateReadme.ts**
- Function: `generateReadme(data: ReadmeData): string`
- Returns complete markdown README with:
  - `# Title`
  - Badges (inline)
  - Description paragraph
  - `## Tech Stack` (bullet list)
  - `## Installation` (code block)
  - `## Usage` (code block)
  - `## License` (conditional, only if not "None")

### Component Specs

**ReadmeForm**
- Props: `data: ReadmeData`, `onChange: (data: ReadmeData) => void`
- Controlled inputs for all fields
- Checkboxes for techStack (map over TECH_OPTIONS)
- Select dropdown for license

**ReadmePreview**
- Props: `markdown: string`
- Toggle between rendered (react-markdown) and raw (`<pre>`) view
- Styled container with border

**CopyButton**
- Props: `text: string`
- Uses `navigator.clipboard.writeText()`
- Shows "Copied!" for 2 seconds after click

**App**
- Holds ReadmeData state with defaults
- Two-column layout: form left, preview right
- Copy button below preview

---

## Task List

Work through these in order. Complete each file fully before moving to the next. After each file, briefly confirm what you created.

1. **Create `src/types.ts`** — interfaces and constants
2. **Create `src/badges.ts`** — badge lookup object and getBadgeMarkdown function
3. **Create `src/generateReadme.ts`** — markdown generation function
4. **Create `src/components/ReadmeForm.tsx`** — complete form with all inputs
5. **Create `src/components/ReadmePreview.tsx`** — preview with raw/rendered toggle
6. **Create `src/components/CopyButton.tsx`** — clipboard button with feedback
7. **Update `src/App.tsx`** — wire everything together with state and layout
8. **Update `src/App.css`** — clean two-column layout, basic polish

---

## Instructions for Claude

You are pair programming with me. I have a fresh Vite + React + TypeScript project with react-markdown already installed.

Work through the task list above, one file at a time. For each task:
1. Generate the complete file
2. Tell me the filename and briefly confirm what it does
3. Move to the next task

Do not stop to ask me questions. Make reasonable decisions based on the spec. If something is ambiguous, pick the simpler option.

Begin with Task 1.
