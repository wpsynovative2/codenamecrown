# Codename Crown

Next.js 16 (App Router) rebuild of `codenamecrown.synovative.in`, replacing the
WordPress/Elementor original. Layout, copy, colours, typography and spacing were
taken from the live site's generated CSS so the two render the same.

There is **no application backend**. Leads go straight from the browser to a
Google Apps Script Web App, which writes them into a Google Sheet.

```
app/
  components/     one component per page section, plus the modal + form
  data/site.ts    every piece of page copy, in one place
  lib/            validation, reCAPTCHA loader, Sheets submission
  globals.css     design tokens + all section styles
google-apps-script/Code.gs   the Sheets endpoint (deploy this yourself)
public/images/    project photography, plans, logos
public/Fonts/     Scaver Regular (section headings)
```

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the two values below
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for production. The page is fully static.

## Setting up the Google Sheet

1. Create a Google Sheet. **Extensions → Apps Script**.
2. Paste [`google-apps-script/Code.gs`](google-apps-script/Code.gs) over `Code.gs`.
3. **Project Settings → Script properties**, add:

   | Property           | Value                                              |
   | ------------------ | -------------------------------------------------- |
   | `RECAPTCHA_SECRET` | your reCAPTCHA v3 **secret** key                    |
   | `NOTIFY_EMAIL`     | *(optional)* address to email on each new lead      |
   | `MIN_SCORE`        | *(optional)* score threshold, defaults to `0.5`     |

4. **Deploy → New deployment → Web app**, with *Execute as* **Me** and
   *Who has access* **Anyone**. Copy the `/exec` URL.
5. Put that URL in `.env.local` as `NEXT_PUBLIC_SHEET_ENDPOINT`.

A `Leads` sheet with a header row is created automatically on the first
submission.

> After editing the script, deploy a **new version** — Apps Script keeps serving
> the old code until you do.

## reCAPTCHA v3

Register the site at <https://www.google.com/recaptcha/admin> and choose **v3**.

- The **site key** is public — `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `.env.local`.
- The **secret key** goes in the Apps Script properties above, never in this
  repo. That keeps verification server-side without us running a server.

With no site key set, the form still submits and the script skips verification,
so local development works without credentials.

## The enquiry form

One form component, `EnquiryForm`, is used in the contact section and inside the
modal. Every call-to-action on the page opens that modal — header *Enquire Now*,
the three *Enquire Now* buttons in the configuration table, every *Book Site
Visit* button, and the mobile *Brochure* button. Each records which button was
used in the `Source` column, so leads can be attributed.

Protections, matching the original and then some:

| Guard              | Behaviour                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Indian mobile      | Normalises `+91` / `0` / spacing, then requires 10 digits starting `6-9`. Checked in the browser *and* in Apps Script. |
| Email              | Optional (as on the original), but must be well-formed if filled.                                       |
| Consent            | Required checkbox.                                                                                      |
| Honeypot           | `website` field, positioned off-screen rather than `display:none` so bots still fill it. Anything in it → the submission is silently dropped and the bot is shown success. |
| reCAPTCHA v3       | Token fetched on submit, verified in Apps Script against `MIN_SCORE`.                                    |

Two hidden fields are captured automatically and never shown: `submittedAt`
(current date/time, `Asia/Kolkata`) and `pageUrl` (the current URL) — the
equivalents of the original's `[current_datetime]` and `[current_url]`
shortcodes.

Requests are sent as `text/plain` deliberately: that keeps them CORS "simple
requests", avoiding the preflight that Apps Script cannot answer.

## Analytics

Google Tag Manager (container `GTM-P4J3HNT2`) is wired up in
[`app/layout.tsx`](app/layout.tsx); the ID is a constant at the top of that file.

The loader sits in an explicit `<head>` in the root layout, and the `<noscript>`
iframe is the first element in `<body>` — the placement Google's snippet asks
for.

Note the two approaches that do **not** work here. `next/script` (at any
strategy, including `beforeInteractive`) and `@next/third-parties`'
`<GoogleTagManager>` both defer injection into `<body>` rather than `<head>`. A
raw `<script>` rendered as a direct child of `<html>` is invalid HTML — the
parser relocates it, which React reports as a hydration error. Rendering
`<head>` explicitly is what puts an inline script in the document head.

Nothing pushes to `dataLayer` beyond the container bootstrap yet, so enquiry
submissions are not tracked as conversions. `EnquiryForm` already knows which
button opened it (the `source` value), so a `dataLayer.push` on successful
submit is the natural next step if you want conversion tracking.

## Notes on fidelity

- **Fonts.** The original CSS asks for `"Scaver Regular"` but never loads the
  file, so the live site silently falls back to a generic sans-serif. Since
  `Scaver-Regular.ttf` was supplied in `public/Fonts`, it is self-hosted here via
  `next/font/local` and the headings render in the intended face. To match the
  live site's fallback instead, drop `var(--font-scaver)` from the
  `.rule-heading > span`, `.overview__title` and `.about__badge` rules in
  `globals.css`. `BEQINER ITALIC.ttf` is unused — the original references it
  nowhere.
- **Logos.** The header and footer logos in `public/images` are full-bleed
  1920×1080 exports, while WordPress served pre-cropped versions. `codename-crown-logo.png`
  and `prabhav-since-2000-white.png` are regenerated from those sources onto the
  exact canvases the original served, so they render at the same size.
- **Prices** stay blurred behind an *Enquire Now* button, as on the original.
- Icons are inlined SVG copies of the Font Awesome glyphs the original used, so
  no icon font is downloaded.


Css err