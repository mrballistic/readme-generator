# README Generator - Product Requirements Document

## Problem Statement

Developers frequently need to create README files for new projects but spend time formatting markdown and remembering what sections to include. Starting with a blank file or copying from old projects is inefficient and leads to inconsistent documentation. A simple form-based generator can eliminate this friction and help developers ship better documentation faster.

## Target User

Developers creating new GitHub repositories who want a quick, professional README without overthinking structure or formatting.

## Core Features (MVP)

- Input form with fields for: repository name, description, technology stack, installation command, usage example, license type, and badge selections
- Badge options: common shields (build status, license, version) with automatic markdown generation
- License dropdown with popular options (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, Unlicense)
- Live markdown preview that updates as user types
- "Copy to Clipboard" button to grab the generated markdown
- Basic README template with standard sections: Title, Badges, Description, Tech Stack, Installation, Usage, License
- Client-side only implementation (no server, no database)

## Explicitly Out of Scope

- No AI-powered content generation
- No authentication or user accounts
- No saving/loading of previous READMEs
- No template customization or multiple template options
- No GitHub integration or direct file creation
- No support for additional sections (Contributing, Tests, Deployment, etc.)
- No markdown editing capabilities in the preview
- No custom badge creation (only preset common badges)

## Success Criteria

- User can fill out the form and see markdown preview update in real-time
- Generated markdown follows standard README conventions with properly formatted badges
- Badges render correctly as images in the preview
- Copy to clipboard works on first click without errors
- Entire workflow (form fill to copy) takes under 60 seconds
- Output markdown renders correctly when pasted into a GitHub README
