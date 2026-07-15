# NEF College — Website

Static HTML site styled entirely with Tailwind CSS. No framework, no client-side
routing — plain pages that share a header/nav/footer via a tiny JS include script.

## Getting started

Requires Node.js (for the Tailwind build) and a local static server (the shared
header/footer are loaded via `fetch()`, which browsers block on `file://`).

```bash
npm install
npm run build   # compiles src/input.css -> assets/css/output.css (minified)
npm run serve   # serves the site at http://localhost:3000
```

While actively editing styles, run `npm run watch` instead of `build` to
recompile on save.

## Structure

```
index.html                 Home
contact.html                Contact
pages/
  about/                    The College, Chairman, Principal, Mission & Vision,
                             Affiliation, Governing Body
  courses/                  One page per programme (ba, bcom, bba, bca, bsw,
                             mba, msw, mcom, ma-sociology)
  admission/                Procedure, Merit List, Fee Structure, Prospectus,
                             Bank Details
  departments/               Overview + one page per teaching department
  legal/                     Terms of Use, Privacy Policy, Sitemap
  facilities.html
partials/
  header.html               Utility bar + header + nav (shared across all pages)
  footer.html                Footer (shared across all pages)
assets/
  css/output.css             Compiled Tailwind output (generated — do not edit)
  js/include.js               Fetches partials into <div data-include="..."> and
                               highlights the active nav item via <body data-nav="...">
src/
  input.css                   Tailwind entry point + @layer components for
                               repeated patterns (buttons, cards, the "weave"
                               strip, sidebar nav, tables, step flow, etc.)
tailwind.config.js             Design tokens ported from the original design
                                system (colors, fonts, max-width, shadow)
```

### How a page is wired together

Every page follows the same shell:

```html
<link rel="stylesheet" href="/assets/css/output.css">
...
<body data-nav="courses">
<div data-include="/partials/header.html"></div>
  ...page content...
<div data-include="/partials/footer.html"></div>
<script src="/assets/js/include.js"></script>
```

`data-nav` on `<body>` must match one of the `data-nav-key` values in
`partials/header.html` (`home`, `about`, `courses`, `admission`, `departments`,
`facilities`, `contact`, `legal`) so the correct top-level nav item gets
highlighted.

All internal links are root-absolute (`/pages/...`) rather than relative, so
pages nested at any depth resolve correctly — this only works when served from
the project root (`npm run serve`), not by double-clicking the HTML file.

### Adding a new page

1. Copy the closest existing page in `pages/` as a starting point.
2. Keep the `data-include` header/footer divs and the `<script>` tag as-is.
3. Set `<body data-nav="...">` to the matching nav section.
4. Link it from `partials/header.html` (nav dropdown), `partials/footer.html`
   (if relevant), and `pages/legal/sitemap.html`.
5. If you introduce new utility combinations you'll reuse often, add a
   component class to `src/input.css` instead of repeating long class strings.

## Theme tokens

- Primary: `#14304F` (oxford blue) / `#0C1F35` (deep) — see `primary` /
  `primary-deep` in `tailwind.config.js`
- Accent: `#C8912F` (brass) + `#F4E9D2` (soft) — `accent` / `accent-soft`
- Notice red: `#A6392F` — `notice`
- Paper: `#FBFAF6` · Ink: `#23262B`
- Display type: Fraunces · Body: Archivo (Google Fonts, linked per-page)
- Signature: woven diamond "weave" strip (gamosa/jacquard border motif) —
  `.weave` / `.weave--thin` component classes

## Getting this into Figma (5 min per page)

1. Run `npm run serve` so the plugin can read a live URL.
2. In Figma: Resources → Plugins → search "html.to.design" → run it.
3. Paste the page URL (or use the plugin's Chrome extension on the open page).
4. It imports as fully editable frames/layers. Repeat per page, per breakpoint
   (desktop 1440 / mobile 390 — the layout is responsive, just resize before
   capture).
