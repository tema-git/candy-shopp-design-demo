# Candy Shopp — source audit

Audited 4 November 2026 against the current Vercel Web Interface Guidelines and all 12 user rules. All issues below have been corrected. Browser verification is delegated to the parent task; no browser result is claimed here.

- `app.js:11` — Added shared session-only motion state; system reduced motion takes precedence.
- `app.js:96` — Added footer pause/resume, GSAP context cleanup, pointer reset and transient-confetti cleanup.
- `style.css:30` — Disabled smooth scroll with !important and all decorative CSS transforms/transitions while paused.
- `app.js:18` — Mobile menu now closes when keyboard focus leaves the header; header Contacts/brand anchors also close it.
- `app.js:45` — Flavor interaction now animates inner use geometry, preserving the separate scroll animation.
- `style.css:22` — Pointer geometry separated from scroll targets in occasion, FAQ and contact scenes.
- `style.css:19` — Fixed dark-green focus outlines on burgundy surfaces (previous contrast 1.08:1); lime gives 6.62:1.
- `style.css:20` — Fixed inherited dark selection color on burgundy form buttons; transparent background retained.
- `style.css:37` — Changed candy choice grid to two columns on narrow phones; removed mid-word breaking.
- `app.js:74` — Name requires at least two Unicode letters; phone validates allowed punctuation and 11 Russian digits, rejecting letters.
- `index.html:70` — Added semantic name/phone autofill and polite inline validation announcements.
- `index.html:66` — Added accessible group for game contents; empty slots get role=img with a meaningful label.
- `app.js:112` — Refresh scroll geometry after font loading, window load and FAQ expansion.
- `app.js:116` — Restore effective animation preference after Back/Forward cache return.

Static checks: JavaScript syntax pass; HTML nesting pass; duplicate IDs 0; missing anchors 0; missing local assets 0; Unicode UI icon glyphs 0. No data storage or form-network endpoint. No autoplay CSS loops or video were found; pause still governs every decorative movement.

Measured text contrasts: deep burgundy on pink 6.96:1; secondary text on cream 6.01:1; secondary text on peach 4.81:1; input placeholder on white 4.60:1.

- `index.html:70` — Submit is disabled in static HTML and enabled only after the JavaScript preventDefault handler is installed. Without JavaScript, a noscript notice offers the real phone link, preventing the browser default GET from exposing form values in the URL.
