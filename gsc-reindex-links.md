# GSC Re-index Request Links — Round 2

Open each link and click **"Request Indexing"** in the Google Search Console UI.
Generated: 2026-06-12 (after PR #12 merge + deploy; sitemap with 21 URLs resubmitted 04:43 UTC).

GSC allows ~10–12 manual requests/day. Do them in this priority order — if you hit the daily cap, finish the remainder tomorrow.

## Priority 1 — new case studies (commercial pages)

| Page | Status | GSC Inspect Link |
|---|---|---|
| `/work/piipharma-loyalty` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=0G6IDSVrlEvbmERjZTEjNA&utm_medium=link&utm_source=api) |
| `/work/badasha-ticketing` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=U_5BdhsURxlaAekcfgXOMQ&utm_medium=link&utm_source=api) |
| `/work/kiraya-app` | Unknown to Google — link runs a fresh inspection, then request indexing | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=g0N09DUFh_gPdcR4UTUy4w&utm_medium=link&utm_source=api) |

## Priority 2 — listing pages (now footer-linked sitewide)

| Page | Status | GSC Inspect Link |
|---|---|---|
| `/writing` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=y8gtrKCDB38NInBPxut9qg&utm_medium=link&utm_source=api) |
| `/reading` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=q-t3_Zi4NZXEljCNAO540A&utm_medium=link&utm_source=api) |
| `/blog/is-it-worth-learning-a-new-language` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=nR0qaO93yzHAYPH76RKEOg&utm_medium=link&utm_source=api) |

## Priority 3 — writing pieces

| Page | Status | GSC Inspect Link |
|---|---|---|
| `/writing/good-optics` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=WANQsmUsKyoSQIX8WDCWmA&utm_medium=link&utm_source=api) |
| `/writing/the-concert-of-faith` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=_w0HaU14m97a_Z8u8hbqug&utm_medium=link&utm_source=api) |
| `/writing/the-unsteady-pursuit` | Unknown to Google | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=7NTi6g2d4oqAd9fjoeWkFA&utm_medium=link&utm_source=api) |
| `/writing/recognizing-the-pity-projectors-who-shrink-your-world` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=78CM_tGaNPXbWPqKAZKH1A&utm_medium=link&utm_source=api) |
| `/writing/what-do-people-misunderstand-about-my-generation` | Discovered, never crawled | [Open in GSC](https://search.google.com/search-console/inspect?resource_id=sc-domain:ayushjhunjhunwala.com&id=Ur-lEEjgFsxRn6b-28eztQ&utm_medium=link&utm_source=api) |

## Notes
- The Search Console API cannot click "Request Indexing" — it must be done in the UI (these links open each URL pre-inspected).
- Expected crawl within 1–3 days after requesting; the indexing decision can take longer.
- The sitewide footer links and fresh sitemap (lastmod 2026-06-11) from PR #12 raise crawl priority on their own — requesting just accelerates it.
- Round 1 (2026-05-05) got 8/8 requested pages indexed.

## Benchmark cycle
- Cycle started 2026-06-12. Baseline lives in `docs/seo/keyword-benchmark.csv` (zero non-brand impressions).
- Next snapshot due **2026-07-12**: pull 28-day query data via the gsc MCP per `docs/seo/benchmark-method.md`, append `pos_2026-07` / `impr_2026-07` columns, report milestone changes.
