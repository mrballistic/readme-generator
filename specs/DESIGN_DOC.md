# README Generator - Technical Design Document

## 1. Data Model

### TypeScript Interfaces

```typescript
interface ReadmeFormData {
  repoName: string;
  description: string;
  techStack: string[]; // Array of tech names
  installCommand: string;
  usageExample: string;
  license: LicenseType;
  badges: BadgeType[];
}

type LicenseType =
  | "MIT"
  | "Apache-2.0"
  | "GPL-3.0"
  | "BSD-3-Clause"
  | "Unlicense"
  | "None";

type BadgeType = "build" | "license" | "version" | "downloads";

interface BadgeConfig {
  type: BadgeType;
  label: string;
  shieldsUrl: string; // Template for shields.io URL
}
```

## 2. Component Hierarchy

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

### Component Props

**App**

- No props (root component)
- State: `formData: ReadmeFormData`
- Creates theme based on `useMediaQuery('(prefers-color-scheme: dark)')`

**FormSection**

- `formData: ReadmeFormData`
- `onChange: (data: ReadmeFormData) => void`

**TextInput** (using MUI TextField)

- `label: string`
- `value: string`
- `onChange: (value: string) => void`
- `placeholder?: string`
- `multiline?: boolean`
- `rows?: number`

**TechStackInput** (using MUI Autocomplete + Chip)

- `value: string[]`
- `onChange: (value: string[]) => void`
- Uses freeSolo mode for custom tech entry

**LicenseDropdown** (using MUI Select)

- `value: LicenseType`
- `onChange: (value: LicenseType) => void`

**BadgeSelector** (using MUI FormGroup + Checkbox)

- `selectedBadges: BadgeType[]`
- `onChange: (badges: BadgeType[]) => void`

**PreviewSection**

- `markdown: string`

**MarkdownPreview**

- `content: string`
- Wrapped in MUI Paper with custom styling for markdown content

**CopyButton** (using MUI Button)

- `content: string`
- Shows ContentCopy icon
- Displays Snackbar on successful copy

## 3. Key Functions

### Markdown Generation (`utils/markdownGenerator.ts`)

**`generateReadme(formData: ReadmeFormData): string`**

- Main orchestrator function
- Calls sub-generators and concatenates sections
- Returns complete markdown string

**`generateBadges(repoName: string, badges: BadgeType[], license: LicenseType): string`**

- Takes selected badge types and generates shields.io markdown
- Uses template: `![Label](https://img.shields.io/badge/...)`
- Returns badge markdown with line breaks

**`generateTechStack(techStack: string[]): string`**

- Converts array to markdown list or inline badges
- Returns formatted tech stack section

**`generateLicenseSection(license: LicenseType): string`**

- Returns license section markdown
- Handles "None" case

**Helper: `escapeMarkdown(text: string): string`**

- Sanitizes user input to prevent markdown injection
- Escapes special characters if needed

### Clipboard Utility (`utils/clipboard.ts`)

**`copyToClipboard(text: string): Promise<boolean>`**

- Uses Navigator Clipboard API
- Returns success/failure for user feedback
- Fallback to document.execCommand if needed

### Theme Configuration (`theme/index.ts`)

**`createAppTheme(mode: 'light' | 'dark'): Theme`**

- Creates MUI theme with custom palette
- Dark mode: uses MUI dark palette with adjustments for markdown preview
- Light mode: clean, accessible colors
- Custom typography for code blocks in preview

### Constants (`constants/badges.ts`, `constants/licenses.ts`)

**`BADGE_CONFIGS: Record<BadgeType, BadgeConfig>`**

- Maps badge types to their shields.io configurations

**`LICENSE_OPTIONS: { value: LicenseType; label: string }[]`**

- Dropdown options for license selection

**`COMMON_TECH_STACK: string[]`**

- Autocomplete suggestions for tech stack (React, TypeScript, Node, etc.)

## 4. File Structure

```
src/
├── components/
│   ├── App.tsx
│   ├── FormSection.tsx
│   ├── PreviewSection.tsx
│   ├── inputs/
│   │   ├── TextInput.tsx
│   │   ├── TechStackInput.tsx
│   │   ├── LicenseDropdown.tsx
│   │   └── BadgeSelector.tsx
│   ├── preview/
│   │   ├── MarkdownPreview.tsx
│   │   └── CopyButton.tsx
├── utils/
│   ├── markdownGenerator.ts
│   └── clipboard.ts
├── constants/
│   ├── badges.ts
│   ├── licenses.ts
│   └── techStack.ts
├── theme/
│   └── index.ts
├── types/
│   └── index.ts (all TypeScript interfaces)
├── main.tsx
└── index.css (minimal global resets only)
```

## 5. Third-Party Libraries

### Required Dependencies

**`@mui/material`** (v5.x)

- **Why**: Professional UI components with built-in theming and dark mode
- **Usage**: All form inputs, layout components (Grid, Container, Paper), Button
- **Components used**: TextField, Autocomplete, Select, Checkbox, FormGroup, FormControl, Button, Paper, Container, Grid, Snackbar

**`@mui/icons-material`**

- **Why**: Copy icon for CopyButton
- **Usage**: ContentCopy icon

**`@emotion/react` + `@emotion/styled`**

- **Why**: Required peer dependencies for MUI
- **Usage**: MUI's styling engine

**`react-markdown`** (v9.x)

- **Why**: Renders markdown preview in real-time
- **Usage**: Only in `MarkdownPreview` component
- **Note**: Need to style markdown output to match MUI theme

### Built-in APIs (No Install Needed)

**`useMediaQuery` (from @mui/material)**

- Detects `(prefers-color-scheme: dark)`
- Determines initial theme mode

**Navigator Clipboard API**

- Browser native, no dependency needed
- For copy-to-clipboard functionality

**Array/String methods**

- Native JavaScript for all data manipulation

### Explicitly NOT Using

- No separate CSS framework (MUI handles all styling)
- No form library (React state + MUI is sufficient)
- No markdown parser beyond react-markdown
- No state management library (useState is enough)
- No routing library (single page)
- No HTTP client (no API calls)

## 6. State Management Strategy

### Single Source of Truth

- All form data lives in `App` component as `useState<ReadmeFormData>`
- Theme mode determined once at mount via `useMediaQuery`
- Markdown is derived state, recalculated on every render
- Snackbar open/close state managed locally in CopyButton

### Data Flow

1. User updates form input (MUI component)
2. Child component calls `onChange` prop
3. App updates formData state
4. React re-renders with new formData
5. `generateReadme(formData)` called in render
6. Preview updates automatically with new markdown

### Dark Mode Implementation

```typescript
// In App.tsx
const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
const theme = useMemo(
  () => createAppTheme(prefersDarkMode ? "dark" : "light"),
  [prefersDarkMode],
);
```

### Why This Works

- Small, predictable state shape
- No async operations
- Real-time preview is just a pure function call
- MUI theme automatically updates all components
- No performance concerns with this data size

## 7. Development Considerations

### Initial State

```typescript
const INITIAL_FORM_DATA: ReadmeFormData = {
  repoName: "",
  description: "",
  techStack: [],
  installCommand: "",
  usageExample: "",
  license: "MIT",
  badges: [],
};
```

### Validation

- Optional: Basic presence checks (show helper text if required fields empty)
- No blocking validation—let users preview incomplete READMEs
- MUI TextField provides built-in error states if needed

### Layout Strategy

- Desktop: Two-column grid (50/50 split) using MUI Grid
- Tablet: Same two-column but with some padding adjustments
- Mobile: Single column stack (form on top, preview below)
- Use MUI breakpoints: `xs`, `sm`, `md`, `lg`, `xl`

### Dark Mode Markdown Styling

- Preview Paper component needs custom background
- Code blocks in markdown need syntax-aware colors
- Links should use theme.palette.primary for consistency
- Must ensure sufficient contrast for WCAG compliance

### MUI Theme Customization

```typescript
// Light theme: clean, professional
palette: {
  primary: blue,
  background: { paper: white, default: grey[50] }
}

// Dark theme: comfortable for extended use
palette: {
  mode: 'dark',
  primary: blue[300],
  background: { paper: grey[900], default: grey[800] }
}
```

### Accessibility

- All form inputs have proper labels (MUI handles this)
- Copy button shows visual feedback (Snackbar)
- High contrast ratios in both themes
- Keyboard navigation works throughout (MUI default)
