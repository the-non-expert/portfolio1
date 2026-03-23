# Spacing Philosophy

One principle. Four spacing steps. No exceptions.

**Never use padding to fight width. Use a max-width container instead.**

Every section wraps content in:
```
max-w-5xl mx-auto px-4 md:px-6
```

This means no padding wars, no arbitrary `pt-20` hacks, no responsive padding chains. The container handles width. Padding handles breathing room inside components.

## Four Spacing Steps

| Name | Tailwind | Use |
|------|----------|-----|
| tight | `p-4` / `gap-4` | Card internals, small gaps |
| default | `p-6` / `gap-6` | Card grids, section internal spacing |
| section | `py-8` | Vertical breathing between sections |
| max | `p-10` | Hero only — hard ceiling |

That's all. Pick from these four. Nothing else.

## Banned

- `p-20`, `p-24`, `px-32`, `px-40` — never
- `pt-20` padding hacks — never
- Mixed `md:p-X p-Y` patterns without a container — never

If you need more breathing room, increase `py-8` to `py-12` and call it done. No more.
