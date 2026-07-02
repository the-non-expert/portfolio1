---
title: "NGO website development in India: what it costs, and what donors actually expect"
slug: ngo-website-development-cost-in-india
excerpt: "Most NGO websites in India are built like brochures. But donors don't
  give to brochures — they give to organisations they can verify. Real price
  brackets, the features that actually move donations, and the trap of
  commission-charging platforms."
date: 2026-07-04T10:00:00.000+05:30
readingTime: 7 min read
category: Pricing
featuredImage: /images/og/ngo-website-development-cost-in-india.png
published: false
---
Most NGO websites in India are built like brochures: a mission statement, some photos, a bank account number at the bottom. Then the team wonders why online donations never really started.

Here's the uncomfortable truth I learned building a donation platform for an NGO: **donors don't give to brochures. They give to organisations they can verify, through a payment flow they trust, in under a minute.** Everything about the website either builds that trust or leaks it.

This post covers what an NGO website actually costs in India, which features move donations and which are decoration, and the commission trap that quietly eats into donation-platform money.

## The price brackets

Same format as my [general website pricing](/blog/how-much-does-a-custom-website-cost-in-india): one-time payment, you own everything, no subscription to me.

| Tier | What it is | Price range |
|---|---|---|
| **Presence website** | Mission, programs, gallery, contact, bank details for direct transfer | ₹5,000 – ₹20,000 |
| **Donation platform** | Online payments (UPI/cards), automatic receipts, payment verification | ₹20,000 – ₹40,000 |
| **Full platform** | Everything above + admin panel, campaign pages, donation source tracking | ₹40,000+ |

The recurring costs stay tiny either way: a domain (~₹800–1,500/year) and hosting, which for NGO-scale traffic runs comfortably on free tiers. If an agency is quoting you a monthly "maintenance" fee to keep a static website alive, that fee is paying their office rent, not your website.

## What donors actually expect

I'd rank these by how directly they affect whether a visitor completes a donation:

**1. UPI, front and centre.** In India, if your donation flow doesn't open straight into UPI, you lose the majority of small donors on the spot. Cards are the backup, not the default.

**2. Instant, automatic receipts.** A donor who gets a proper receipt by email within seconds trusts you with the *next* donation. A donor who has to WhatsApp someone and ask doesn't. If you have 80G status, the receipt is also a tax document — automating it is the single most donor-friendly feature you can build.

**3. Proof of legitimacy.** Registration number, 80G/12A status if you have them, names and faces of the people running things, photos from the ground that are obviously yours and not stock. Donors do check.

**4. Where the money goes.** Even a simple breakdown — "₹500 feeds a family for a week" — outperforms paragraphs of mission language. Specific beats noble.

**5. A payment page on *your* domain.** Getting redirected to some third-party fundraising site mid-donation is where trust quietly dies. The payment gateway can (and should) be a trusted name like Razorpay — but the journey should start and end on your website.

## The commission trap

There's a whole industry of donation platforms that host your fundraiser "for free" and then take a cut of every donation — commonly 5–10% once you add platform fees and payment charges. On ₹10 lakh of annual donations, that's up to a lakh of donor money that never reaches the cause.

A payment gateway integrated directly on your own website charges the gateway fee — typically around 2% (and lower for UPI on some plans) — and nothing else, to anyone, ever. The gap between those two numbers, compounded over years, usually pays for the entire website several times over.

There's a fair counterpoint: marketplaces like these do bring *discovery* — people browsing causes may find you. If most of your donors already know you (which is true for nearly every local NGO), you're paying a discovery commission on donors you brought yourself.

## The part nobody builds: knowing where donations come from

Here's a real problem from my work on [SikhAid NGO's platform](/work/sikhaid-ngo): donations were arriving from the website, from a YouTuber's fundraiser, and from payment links shared in WhatsApp groups — all into one account. The team had no way to tell which campaign brought which donation, so they couldn't tell the YouTuber what his drive raised or decide where to put effort next.

The fix was a webhook-based source-tracking system — every payment gets attributed to its origin automatically. I wrote up the full technical approach in [Razorpay webhooks: attributing payments from multiple sources](/blog/razorpay-webhook-track-payments-by-source). If your NGO runs more than one campaign at a time, this is the feature that turns your donation data from a bank statement into a strategy.

## What you can skip

Honesty section, as always: a blog you won't update (a stale blog reads worse than no blog), a newsletter popup, social feeds embedded on the homepage, and an events calendar for events you announce on WhatsApp anyway. Every one of these adds cost and none of them moves donations. Start narrow, add later — you own the code, so nothing is locked.

## Frequently asked questions

### How much does an NGO website cost in India?

A presence website with your programs, story, and contact details: ₹5,000–₹20,000 one-time. A full donation platform with UPI payments, automatic receipts, and verification: ₹20,000–₹40,000. You own the code and all accounts; recurring costs are just the domain (~₹800–1,500/year).

### Can donors pay through UPI on our own website?

Yes — a payment gateway like Razorpay handles UPI, cards, and netbanking on your own domain. Donors never leave your website, and money settles directly to the NGO's account.

### Do we need a fundraising platform like Ketto or Milaap instead?

They're useful for one-off viral campaigns where discovery matters. For your regular donor base, their platform fees take a cut of every donation — money that a one-time website build saves permanently.

### Can we track which campaign a donation came from?

Yes, with webhook-based source tracking — each donation is tagged to its origin (website, a specific fundraiser, a shared link) automatically. It's the difference between knowing *that* you received money and knowing *why*.

### What about 80G receipts?

If your NGO has 80G status, receipt generation can be automated — donor details captured at payment, receipt emailed instantly. It's the most-appreciated feature I've built for donation platforms.

---

**Running an NGO and want a real number?** Tell me where you are today — even if it's "we share our account number on WhatsApp" — and I'll give you a fixed quote upfront. One-time payment, you own everything. [Get in touch →](/contact)
