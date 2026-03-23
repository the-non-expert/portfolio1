# Font Philosophy

Two fonts. That's it.

**Playfair Display** (serif) for headings — elegant, distinctive, signals that this is a personal brand. **Lato** (sans-serif) for body text — clean, readable, gets out of the way.

## Type Scale

| Name | Tailwind | Weight | Font | Usage |
|------|----------|--------|------|-------|
| H1 / Display | text-4xl | font-bold | Playfair Display | Hero, page title |
| H2 | text-2xl | font-semibold | Playfair Display | Section headings |
| H3 | text-lg | font-medium | Playfair Display | Card / component headings |
| Body | text-base | font-normal | Lato | Default prose |
| Small | text-xs | font-normal | Lato | Labels, captions, meta |

## Rules

- Use only **bold**, **semibold**, **medium**, **normal**. No light, extralight.
- Hardcoded sizes are banned: `text-[10px]`, `text-[11px]`, `text-[12px]`. Use `text-xs` instead.
- No `font-mono` — not in config.
- Playfair Display only for headings. Lato only for body/small text. Never mix them.
