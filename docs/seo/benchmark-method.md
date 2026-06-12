# Keyword Benchmark Method

How keywords get judged before targeting, and how rank is measured after.

## Judging a candidate keyword (before it enters the CSV)

1. **Demand check — Google Autocomplete.** Probe `suggestqueries.google.com/complete/search?client=firefox&q=<keyword>`. If the exact phrase (or a close variant) autocompletes, real people type it. No suggestion = no demand = rejected, however good it sounds.
2. **Intent check.** Commercial intent (cost/hire/for-small-business queries) beats informational for a portfolio site. Navigational queries belong to the brand cluster only.
3. **Difficulty tier (eyeball the live SERP):**
   - `easy` — brand terms, or SERPs with weak/outdated results
   - `medium` — SERPs with agencies/templates but no dominant authority; winnable with a strong case study or post
   - `hard` — SERPs owned by SaaS products, directories, or big-site listicles; only target via long-tail variants
4. **Asset check.** Every keyword must map to a real target page. If the page doesn't exist yet (e.g. the Android app and QR loyalty case studies), the keyword waits in the CSV with `page TBD`.

## Measuring (the benchmark loop)

- **Source of truth:** GSC search analytics via the `gsc` MCP — `get_advanced_search_analytics` with `dimensions=query`, 28-day window, on `sc-domain:ayushjhunjhunwala.com`.
- **Cadence:** monthly. Append a `pos_YYYY-MM` / `impr_YYYY-MM` snapshot rather than overwriting the baseline.
- **Milestones per keyword:** (1) appears in GSC at all → (2) impressions > 10/month → (3) position < 20 → (4) position < 10 → (5) first click.
- GSC only reports queries the site appears for, so absence from the report = milestone 0, not missing data.

## Baseline

Recorded 2026-06-11: zero non-brand queries had any impressions in the prior 90 days.
The only ranking query was "ayush jhunjhunwala" (30 impressions, position 5.5, 0 clicks).
