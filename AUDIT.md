# Candy Shopp — current refinement audit

All changes are confined to this repository. Current browser QA is complete; executed scenarios and environment limits are recorded in QA.json.

- `index.html:44` — Moved the complete gift-box builder immediately after hero/ribbon without changing its mechanics.
- `index.html:43` — Replaced the finite ribbon content with two identical groups.
- `app.js:175` — Scroll moves exactly one group width, recalculated on refresh; min group width exceeds the visible band.
- `index.html:55` — Removed link arrows from all flavour toggles; active state uses colour and an underline.
- `app.js:35` — Implemented bounded inner-face magnet; fixed outer anchor, pointer/focus response, coarse/reduced disable.
- `style.css:62` — Restricted the local SVG cursor to non-text art zones; ordinary cursors retained elsewhere.
- `app.js:92` — Implemented select-only combobox with independent pending and committed selection, full keyboard navigation and reset.
- `app.js:106` — Fits the option popup to the viewport, opening upwards when needed.
- `app.js:10` — Removed all manual motion preference/state; only prefers-reduced-motion governs animation.
- `index.html:74` — Added plain-text Spoki Studio footer credit and removed visible imagery disclaimers.
- `index.html:48` — Replaced technical input instructions with the goal-oriented remove/replace action.
- `index.html:71` — Preserved initially disabled submit/no-JavaScript phone fallback and honest demo behavior.

Static checks passed: JavaScript syntax, HTML nesting, unique IDs, local asset references and fragment links. Native select count: 0. Manual motion controls/state: 0. Visible device-input instructions: 0. All artwork remains SVG/CSS code; no video or frame animation was added.

Form validation, storage/network safety, sticky header, 16 px controls, transparent selection, vector CTA arrows and the narrow two-column candy picker are preserved. Form submission stays disabled in HTML until its client-only handler is installed.
