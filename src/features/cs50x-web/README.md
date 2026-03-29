# CS50x Web Feature Structure

Use one folder per project inside `src/features/cs50x-web`.

Recommended pattern:

```text
src/features/cs50x-web/
  credit/
    components/
    hooks/
    utils/
    lib/
    CreditPage.tsx
    index.ts
    types.ts
```

Guidelines:

- Keep project-specific logic inside that project's own folder.
- Put helper functions in `utils/`.
- Put integration or request logic in `lib/`.
- Put small reusable UI pieces in `components/`.
- Use `hooks/` only when the project needs custom React hooks.
- Export the main feature page from `index.ts`.
