# README Generator — Build Spec

## PRD

### Problem Statement

Developers frequently need to create README files for new projects but spend time formatting markdown and remembering what sections to include. Starting with a blank file or copying from old projects is inefficient and leads to inconsistent documentation. A simple form-based generator can eliminate this friction and help developers ship better documentation faster.

### Target User

Developers creating new GitHub repositories who want a quick, professional README without overthinking structure or formatting.

### Core Features (MVP)

- Input form with fields for: repository name, description, technology stack, installation command, usage example, license type, and badge selections
- Badge options: common shields (build, license, version, downloads) with automatic markdown generation
- License dropdown with popular options (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, Unlicense)
- Live markdown preview that updates as user types
- "Copy to Clipboard" button to grab the generated markdown
- Basic README template with standard sections: Title, Badges, Description, Tech Stack, Installation, Usage, License
- Client-side only implementation (no server, no database)
- Dark mode support based on user's browser preference

### Out of Scope

- No AI-powered content generation
- No authentication or user accounts
- No saving/loading of previous READMEs
- No template customization or multiple template options
- No GitHub integration or direct file creation
- No support for additional sections (Contributing, Tests, Deployment, etc.)
- No markdown editing capabilities in the preview
- No custom badge creation (only preset common badges)

### Success Criteria

- User can fill out the form and see markdown preview update in real-time
- Generated markdown follows standard README conventions with properly formatted badges
- Badges render correctly as images in the preview
- Copy to clipboard works on first click without errors
- Entire workflow (form fill to copy) takes under 60 seconds
- Output markdown renders correctly when pasted into a GitHub README
- Dark mode automatically activates based on browser preference

---

## Technical Design Document

### Tech Stack

- Vite + React + TypeScript (already scaffolded)
- Material-UI (MUI) v5 for components and theming
- @mui/icons-material for icons
- react-markdown for preview rendering
- Vitest + React Testing Library for testing

### Data Model

```typescript
// src/types/index.ts
export interface ReadmeFormData {
  repoName: string;
  description: string;
  techStack: string[]; // Array of tech names
  installCommand: string;
  usageExample: string;
  license: LicenseType;
  badges: BadgeType[];
}

export type LicenseType =
  | "MIT"
  | "Apache-2.0"
  | "GPL-3.0"
  | "BSD-3-Clause"
  | "Unlicense"
  | "None";

export type BadgeType = "build" | "license" | "version" | "downloads";

export interface BadgeConfig {
  type: BadgeType;
  label: string;
  shieldsUrl: string; // Template for shields.io URL
}
```

### Component Hierarchy

```
App (ThemeProvider wrapper)
├── Container
│   ├── Grid (two-column layout)
│   │   ├── Grid item (Form column)
│   │   │   └── FormSection
│   │   │       ├── Paper
│   │   │       ├── TextField (repoName, description, installCommand, usageExample)
│   │   │       ├── TechStackInput (Autocomplete/Chip components)
│   │   │       ├── FormControl + Select (LicenseDropdown)
│   │   │       └── FormGroup (BadgeSelector with Checkboxes)
│   │   └── Grid item (Preview column)
│   │       └── PreviewSection
│   │           ├── Paper
│   │           ├── MarkdownPreview
│   │           └── Button (CopyButton)
```

### File Structure

```
src/
├── types/
│   └── index.ts              # All TypeScript interfaces
├── constants/
│   ├── badges.ts             # BADGE_CONFIGS
│   ├── licenses.ts           # LICENSE_OPTIONS
│   └── techStack.ts          # COMMON_TECH_STACK
├── utils/
│   ├── markdownGenerator.ts  # All markdown generation functions
│   └── clipboard.ts          # copyToClipboard utility
├── theme/
│   └── index.ts              # createAppTheme function
├── components/
│   ├── App.tsx               # Main app with state and layout
│   ├── FormSection.tsx       # Form container
│   ├── PreviewSection.tsx    # Preview container
│   ├── inputs/
│   │   ├── TextInput.tsx
│   │   ├── TechStackInput.tsx
│   │   ├── LicenseDropdown.tsx
│   │   └── BadgeSelector.tsx
│   └── preview/
│       ├── MarkdownPreview.tsx
│       └── CopyButton.tsx
├── main.tsx
└── index.css                 # Minimal global resets
```

### Key Functions

**utils/markdownGenerator.ts**

- `generateReadme(formData: ReadmeFormData): string` - Main orchestrator
- `generateBadges(repoName: string, badges: BadgeType[], license: LicenseType): string`
- `generateTechStack(techStack: string[]): string`
- `generateLicenseSection(license: LicenseType): string`
- `escapeMarkdown(text: string): string` - Helper for sanitization

**utils/clipboard.ts**

- `copyToClipboard(text: string): Promise<boolean>` - Uses Navigator Clipboard API

**theme/index.ts**

- `createAppTheme(mode: 'light' | 'dark'): Theme` - Creates MUI theme

### Dark Mode Implementation

```typescript
// In App.tsx
const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
const theme = useMemo(
  () => createAppTheme(prefersDarkMode ? "dark" : "light"),
  [prefersDarkMode],
);
```

### State Management

- Single useState in App component: `formData: ReadmeFormData`
- Markdown is derived state (recalculated on each render)
- Theme mode determined once at mount via useMediaQuery
- Snackbar state managed locally in CopyButton

---

## Task List (TDD Approach)

Work through these in sequential order. Each task follows Test-Driven Development: write tests first, then implementation.

### Phase 1: Setup & Foundation

**Task 1: Install Dependencies**

- [x] Install MUI: `npm install @mui/material @emotion/react @emotion/styled`
- [x] Install MUI icons: `npm install @mui/icons-material`
- [x] Install react-markdown: `npm install react-markdown`
- [x] Install testing: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
- [x] Configure Vitest in `vite.config.ts`
- [x] Create test setup file

**Task 2: Create Types**

- [x] Create `src/types/index.ts` with all interfaces and types

**Task 3: Create Constants (Test-First)**

- [x] Write tests for `constants/licenses.ts`
- [x] Implement `constants/licenses.ts`
- [x] Write tests for `constants/badges.ts`
- [x] Implement `constants/badges.ts`
- [x] Write tests for `constants/techStack.ts`
- [x] Implement `constants/techStack.ts`

### Phase 2: Core Utilities (Test-First)

**Task 4: Markdown Generator - Badges**

- [x] Write tests for `generateBadges()`
- [x] Implement `generateBadges()`

**Task 5: Markdown Generator - Tech Stack**

- [x] Write tests for `generateTechStack()`
- [x] Implement `generateTechStack()`

**Task 6: Markdown Generator - License**

- [x] Write tests for `generateLicenseSection()`
- [x] Implement `generateLicenseSection()`

**Task 7: Markdown Generator - Main**

- [x] Write tests for `generateReadme()`
- [x] Implement `generateReadme()`

**Task 8: Clipboard Utility**

- [x] Write tests for `copyToClipboard()`
- [x] Implement `copyToClipboard()`

### Phase 3: Theme

**Task 9: Create Theme**

- [x] Implement `theme/index.ts` with light and dark modes
- [x] Test manually in browser

### Phase 4: UI Components (Test-First, Bottom-Up)

**Task 10: TextInput Component**

- [x] Write tests for TextInput
- [x] Implement TextInput with MUI TextField

**Task 11: LicenseDropdown Component**

- [x] Write tests for LicenseDropdown
- [x] Implement LicenseDropdown with MUI Select

**Task 12: BadgeSelector Component**

- [x] Write tests for BadgeSelector
- [x] Implement BadgeSelector with MUI Checkboxes

**Task 13: TechStackInput Component**

- [x] Write tests for TechStackInput
- [x] Implement TechStackInput with MUI Autocomplete

**Task 14: CopyButton Component**

- [x] Write tests for CopyButton
- [x] Implement CopyButton with MUI Button + Snackbar

**Task 15: MarkdownPreview Component**

- [x] Write tests for MarkdownPreview
- [x] Implement MarkdownPreview with react-markdown
- [x] Add theme-aware styling

### Phase 5: Container Components

**Task 16: FormSection Component**

- [x] Write tests for FormSection
- [x] Implement FormSection with all child inputs

**Task 17: PreviewSection Component**

- [x] Write tests for PreviewSection
- [x] Implement PreviewSection with preview and copy button

### Phase 6: Integration

**Task 18: App Component**

- [x] Write tests for App
- [x] Implement App with ThemeProvider, state, and layout
- [x] Wire FormSection and PreviewSection together

**Task 19: End-to-End Tests**

- [x] E2E: Fill form → preview updates
- [x] E2E: Copy button → clipboard
- [x] E2E: All features working together

### Phase 7: Polish

**Task 20: Styling & Responsiveness**

- [x] Test responsive layout
- [x] Verify dark mode
- [x] Accessibility check

**Task 21: Final QA**

- [x] Manual testing
- [x] All tests passing
- [x] No console errors

---

## Instructions for Claude

You are pair programming with me using Test-Driven Development (TDD). I have a fresh Vite + React + TypeScript project.

Work through the task list above, one task at a time. For each task:

1. **Write the test file first** (if applicable)
2. **Run tests to confirm they fail** (tell me what command to run)
3. **Write the implementation** to make tests pass
4. **Tell me the filename** and briefly confirm what it does
5. **Move to the next task**

Do not stop to ask questions. Make reasonable decisions based on the spec. If something is ambiguous, pick the simpler option.

Begin with Task 1.
