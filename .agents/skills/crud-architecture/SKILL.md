---
name: crud-architecture
description: |
    Teach and enforce a clean, framework-agnostic CRUD page architecture for admin/backend management systems. 
    Focus on universal best practices: folder structure, separation of concerns, modal-mode vs page-mode, and consistent handling of add/edit/view operations. 
    The original repository[](https://github.com/yzfzfy/crud-template) is only a reference implementation in React + Antd — do NOT tie generated code to any specific framework or UI library unless the user explicitly requests it.
license: MIT
metadata:
    author: yzfzfy
    version: "1.0"
    repository: https://github.com/yzfzfy/crud-template
    purpose: Convey structural thinking and code organization ideas for CRUD pages that can be adapted to any tech stack (React, Vue, Svelte, etc.)
---

# CRUD Architecture Skill

## Important Notes — Framework Agnostic

This skill is **not** about teaching any specific framework or UI library.

Although the reference repository uses React + Ant Design, the core value lies in the **universal code organization ideas and best practices** for building maintainable CRUD pages.

**Default Behavior**:

- Output structural guidance, pseudo-code, or high-level code adapted to the user's tech stack.
- Only when the user explicitly says “use React”, “use React + Antd”, “React implementation”, or similar, load and reference the `references/react-antd-example.md` file for concrete code.

## When to Use This Skill

Use this skill when the user asks to generate, refactor, or design a CRUD / list + form management page for any entity (user, order, product, etc.).

Default to **modal-mode** (simple forms) unless the user specifies **page-mode** or mentions complex forms (tabs, sub-tables, steps, etc.).

## Core Principles (Strictly Follow)

- **Separation of Concerns**: API logic, table columns, form UI, and main page orchestration must be in separate files.
- **Two Modes**:
    - **modal-mode**: All operations (add/edit/view) inside a modal/popup — recommended for simple forms.
    - **page-mode**: Form in a separate dedicated page/route — for complex forms.
- **Three Form States**: Consistently handle **Add** (empty), **Edit** (pre-filled), **View** (read-only).
- **Copy-Paste Friendly**: Generated folder should be self-contained.
- Parent page manages business logic (submit, refresh, delete); form component focuses on UI and value handling.

## Required Folder Structure (Modal-mode — Default)

```bash
entity-management/
├── api.ts
├── columns.tsx
├── form-modal/
│   ├── index.tsx          # Modal controller
│   ├── modal-content.tsx  # Pure form UI
│   └── types.ts
└── page.tsx               # Main list page (or index.tsx if preferred)
```
