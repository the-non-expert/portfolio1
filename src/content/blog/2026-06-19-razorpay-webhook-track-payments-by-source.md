---
title: "Razorpay webhooks: attributing payments from multiple sources through one gateway"
slug: razorpay-webhook-track-payments-by-source
excerpt: "One Razorpay account, donations pouring in from a website, a YouTuber's
  fundraiser, and direct links — all mixed together. Here's how I used webhooks
  and tags to attribute every payment to the right source, reliably."
date: 2026-06-19T10:00:00.000+05:30
readingTime: 7 min read
category: Engineering
featuredImage: /images/og/razorpay-webhook-track-payments-by-source.png
published: true
---
Here's a problem that sounds simple until you hit it: a single Razorpay account is collecting donations, but the money is arriving from several different sources at once — the main website, a separate fundraiser a YouTuber is running for the same cause, and direct payment links shared in WhatsApp groups. Razorpay sees one stream of payments. The organisation needs to know **how much came from each source**, so they can report back to each campaign and the YouTuber can see the impact of their drive.

I solved exactly this on a donation platform built around the [SikhAid NGO](/work/sikhaid-ngo) work. The reliable way to do it is with **webhooks and tags** — and getting it right means understanding why the obvious approach fails.

## Why you can't do this on the client

The tempting shortcut is to record the payment in the browser after checkout succeeds — read the payment ID, note which page the user came from, save it. It works in a demo and breaks in production, for two reasons:

1. **It's not reliable.** If the user closes the tab the instant payment completes, or their connection drops on the redirect, the donation is never recorded. The money is taken; your database never hears about it.
2. **It's not trustworthy.** Anything the browser sends can be faked. Someone can hit your "success" handler with a made-up payment ID and amount. You cannot build financial attribution on data the client controls.

The source of truth has to come from Razorpay's servers, directly to yours. That's a webhook.

## The shape of the solution

Three pieces:

1. **Tag each payment with its source at creation time** using Razorpay's `notes` field.
2. **Receive a server-side webhook** when Razorpay confirms the payment.
3. **Verify, deduplicate, and record** the payment against its source.

### 1. Tag the source with `notes`

Razorpay lets you attach arbitrary key-value `notes` to an order or payment. This is the hook for attribution — set it when the payment is created, based on where it originated:

```js
// When creating the order/checkout, stamp the source
const options = {
  amount: amountInPaise,
  currency: 'INR',
  notes: {
    source: 'youtuber-campaign',   // or 'website', 'whatsapp-link', ...
    campaign: 'punjab-floods-2025'
  }
};
```

The YouTuber's fundraiser link sets `source: 'youtuber-campaign'`; the main site sets `source: 'website'`. Those notes travel with the payment all the way through to the webhook.

### 2. Receive the webhook server-side

In SvelteKit, a webhook is just a `+server.ts` POST endpoint. Razorpay calls it when a payment is captured:

```ts
// src/routes/api/razorpay/webhook/+server.ts
import { json, error } from '@sveltejs/kit';
import crypto from 'crypto';
import { RAZORPAY_WEBHOOK_SECRET } from '$env/static/private';

export async function POST({ request }) {
  const signature = request.headers.get('x-razorpay-signature') ?? '';
  const rawBody = await request.text(); // raw body, not parsed JSON

  // ... verify signature (next step) ...
  const event = JSON.parse(rawBody);

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    await recordDonation({
      paymentId: payment.id,
      amount: payment.amount / 100,
      source: payment.notes?.source ?? 'unknown',
      campaign: payment.notes?.campaign ?? null
    });
  }

  return json({ ok: true });
}
```

### 3. Verify the signature — this is non-negotiable

Anyone can POST to a public URL. The only thing proving a request genuinely came from Razorpay is the signature, computed with your webhook secret. Verify it against the **raw** request body before trusting a single byte:

```ts
const expected = crypto
  .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');

const valid = crypto.timingSafeEqual(
  Buffer.from(expected),
  Buffer.from(signature)
);

if (!valid) throw error(400, 'Invalid signature');
```

Two details that trip people up: verify against the raw body string (re-serialising parsed JSON changes the bytes and breaks the hash), and use `timingSafeEqual` rather than `===` to avoid leaking the comparison through timing.

### 4. Deduplicate by payment ID

Razorpay may deliver the same webhook more than once — that's expected, and your endpoint must be **idempotent**. If you don't guard against it, one donation gets counted twice and every campaign's numbers drift. The fix is simple: make the payment ID the unique key, and ignore an event you've already recorded.

```ts
async function recordDonation(d) {
  const existing = await db.donations.findByPaymentId(d.paymentId);
  if (existing) return;            // already recorded — ignore the duplicate
  await db.donations.insert(d);
}
```

## The payoff

With the source riding along in `notes` and a verified, idempotent webhook recording it, the messy single stream becomes clean, attributable data. The organisation can pull "how much did the YouTuber's fundraiser raise?" as a straightforward query, separate from website donations — all through one Razorpay account, no second gateway needed.

## Frequently asked questions

### What is a Razorpay webhook?

A webhook is an HTTP request Razorpay sends to *your* server when an event happens — a payment captured, a refund processed, an order paid. Unlike the client-side success handler, it comes directly from Razorpay's servers, so it's reliable even if the user's browser closes, and it's the trustworthy source for recording payments.

### How do I track which campaign or source a Razorpay payment came from?

Attach a `notes` field (e.g. `source` and `campaign`) when you create the order or checkout. Those notes are returned in the webhook payload, so you can attribute each payment to its source and report on campaigns separately — all through a single Razorpay account.

### How do I verify a Razorpay webhook is genuine?

Compute an HMAC-SHA256 of the raw request body using your webhook secret, and compare it to the `x-razorpay-signature` header with a timing-safe comparison. Reject the request if they don't match. Always verify against the raw body, not re-serialised JSON.

### Why not just record the payment in the browser after checkout?

Because it's unreliable and unsafe: if the browser closes during the redirect the donation is lost, and a client can fake payment data. Webhooks come from Razorpay's servers and are signature-verified, so they're the correct source of truth for money.

---

**Building payments and need them tracked properly?** I build custom payment and donation systems — webhooks, attribution, reporting — as one-time projects you own. [Get in touch →](/contact)
