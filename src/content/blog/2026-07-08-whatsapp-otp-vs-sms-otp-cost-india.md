---
title: "WhatsApp OTP vs SMS OTP in India: real costs, and the DLT approval nobody explains"
slug: whatsapp-otp-vs-sms-otp-cost-india
excerpt: "I built a login flow on WhatsApp OTP, then moved it to SMS — because
  the economics said so. Here's the actual cost comparison, and a plain-language
  walkthrough of India's DLT registration, the government approval step that
  blocks most first-timers."
date: 2026-07-08T10:00:00.000+05:30
readingTime: 8 min read
category: Engineering
featuredImage: /images/og/whatsapp-otp-vs-sms-otp-cost-india.png
published: false
---
Every app and portal in India eventually needs the same thing: a user types their phone number, gets a code, and they're in. No passwords — this audience doesn't do passwords.

I've built this flow both ways — WhatsApp OTP first, then a switch to SMS OTP — for a real production system where the users are small retailers on budget Android phones. The switch wasn't about technology. It was about economics and setup friction, and nobody writes honestly about either. So here it is, including the part that trips up almost everyone: **DLT registration**, the Government of India-mandated approval process your SMS traffic must clear before a single OTP gets delivered.

## The cost comparison, honestly

Prices below are indicative as of mid-2026 — always check current rate cards, both change.

| | WhatsApp OTP | SMS OTP |
|---|---|---|
| Per-message cost | ~₹0.11–0.13 per authentication message | ~₹0.15–0.25 per SMS via Indian aggregators |
| One-time setup cost | ₹0 in fees, but see below | ~₹5,900 DLT entity registration (per operator portal) |
| Setup friction | Meta business verification, WhatsApp Business API access, template approval by Meta | DLT registration, header + template approval |
| Delivery | Needs data connection; instant when online | Works on any phone, any network, no data |
| User trust | Message arrives in a chat app from a business number | Arrives in the inbox where every bank OTP already lives |

Read that per-message row again: **WhatsApp is actually cheaper per message.** So why did I switch to SMS?

**First, the hidden costs.** WhatsApp's per-message price is only the start. Getting production API access means Meta business verification (documents, waiting, sometimes rejection loops), and most teams end up going through a Business Solution Provider who adds markup or a monthly platform fee. The advertised rate is not the landed rate.

**Second, the audience reality.** My users were shop retailers on low-end Androids with patchy data. An SMS OTP arrives even when WhatsApp is waiting for a connection. For login — the front door of the whole system — "arrives always" beats "cheaper when it arrives."

**Third, the OTP habit.** Every bank, every UPI app, every government service in India delivers OTPs by SMS. Users have a decade of trained behaviour: code arrives in inbox, type it in. Don't spend your onboarding teaching a new habit at the exact moment you need zero friction.

WhatsApp OTP wins in different situations: if your users are data-connected smartphone natives, if you're already using WhatsApp for order updates (one channel, one relationship), or at high volumes where the per-message gap compounds.

## DLT registration: the government approval step, in plain language

Here's the part that actually blocks people. You cannot just buy SMS credits and start sending in India. TRAI's DLT (Distributed Ledger Technology) regulations require every business sending SMS to register itself, its sender ID, and its message templates — and telecom operators **silently drop** messages that don't match a registered template. Not rejected with an error. Dropped.

The information is scattered across operator portals and provider FAQs, so here is the whole flow in order:

### Step 1: Pick a DLT portal and register your entity

Any one telecom operator's DLT portal works for all networks — Airtel, Jio, Vi, BSNL, or Tata all run one. You register once, as a "Principal Entity," with:

- PAN (yours or the company's)
- GST certificate if you have one (proprietors can often register with PAN alone)
- A letter of authorisation if you're registering on a client's behalf

There's a one-time registration fee (~₹5,900 on most portals). Approval typically takes a few working days. You get a **Principal Entity ID** — save it, everything else hangs off it.

### Step 2: Register your header (sender ID)

The header is the 6-character name the SMS arrives from — the `AX-KIRAYA` style prefix users see. For transactional/OTP traffic you register an alphabetic header. Keep it obviously derived from your business name; random-looking headers get rejected.

### Step 3: Register your content template

This is where most first-timers fail. Every SMS body must match a pre-approved template, with variables marked as `{#var#}`:

> `{#var#} is your OTP for logging in to {#var#}. Valid for 10 minutes. Do not share it with anyone.`

Rules that matter:

- Choose the right category — OTPs are **transactional** (or service-implicit). Miscategorised templates get rejected or throttled.
- The live message must match the template *exactly* apart from the variables. An extra space, a changed word, a missing full stop — silently dropped.
- Register variations you'll actually need now, not later. Template approval takes days; production bugs take minutes.

### Step 4: Wire it into your SMS provider

Aggregators like MSG91, Kaleyra, or Textlocal ask for your Entity ID, header, and template IDs, and pass them with every send. Once mapped, delivery is boring and reliable — which is exactly what you want from a login flow.

**Total realistic timeline: one to two weeks** from documents to first delivered OTP, most of it waiting for approvals. Budget for it; don't discover it the week of launch.

## The punchline

The process above is documented — technically — across a dozen portals and help pages. But I've watched businesses buy SMS credits, send OTPs into the void for days, and blame their developer, their provider, and their phones before anyone mentions the word "template." Now you know before you start, which puts you ahead of most teams shipping login flows in India.

This is also a compact example of what [custom software work actually looks like](/blog/how-much-does-a-custom-website-cost-in-india): the code for an OTP flow takes a day. Knowing which channel fits your users, and clearing the regulatory path so it works in production — that's the part you're really paying for.

## Frequently asked questions

### Is WhatsApp OTP cheaper than SMS OTP in India?

Per message, usually yes (~₹0.11–0.13 vs ~₹0.15–0.25). But WhatsApp needs Meta business verification and usually a solution provider with markup, and delivery depends on the user having data. For login flows aimed at ordinary Indian users, SMS is the more reliable default.

### What is DLT registration and is it mandatory?

It's TRAI's registration system for commercial SMS in India — your business, sender ID, and message templates must all be pre-approved. Yes, it's mandatory: unregistered traffic is silently dropped by operators.

### How long does DLT registration take?

Entity approval takes a few working days; header and template approvals add a few more. Plan one to two weeks end to end.

### Why are my OTP SMS not getting delivered even though my provider shows "sent"?

Nine times out of ten: your message body doesn't exactly match your registered DLT template, or the template category is wrong. Operators drop mismatches without an error. Compare the live message and the template character by character.

### Can you set all of this up as part of a project?

Yes — DLT registration, template approval, and the OTP flow itself are part of the build when a project needs login. It's included in scope and priced upfront like everything else.

---

**Building something that needs login, OTPs, or WhatsApp integration?** Tell me about it and I'll give you a fixed quote — including the regulatory legwork nobody mentions until launch week. [Get in touch →](/contact)
