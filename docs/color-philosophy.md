# Color Philosophy

**Palette: Typesetter's Proof**

Photocopy paper stock for light mode. Near-black warm dark for dark mode. Vermillion-rust accent — the color of an Indian post office date-stamp. Precise, slightly editorial. Signals craft over personality.

Press `T` to toggle modes.

## Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg` | #F2F1EE | #141413 | Page background |
| `surface` | #E6E4DF | #1C1C1A | Cards, panels |
| `stroke` | #D4D1CA | #242320 | Borders, dividers |
| `ink` | #1C1B19 | #E2E0DC | Primary text |
| `muted` | #66635E | #807C76 | Secondary text, placeholders |
| `accent` | #C13B2A | #D95440 | CTAs, links, highlights |
| `accent-hover` | #9E2E1E | #E8664E | Hover state for accent |

## Rules

- Never use hex directly in components. Always use a token.
- `bg` and `surface` are the only two background levels. Don't invent a third.
- `stroke` for all borders. Not `gray-200`, not hardcoded.
- `ink` for headings and primary text. `muted` for everything secondary.
- `accent` only for interactive elements and highlights — not decoration.
