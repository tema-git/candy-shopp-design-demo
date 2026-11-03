# Candy Shopp — concept website

Buildless HTML/CSS/JavaScript. All runtime assets are local. Publish the root directory on GitHub Pages (branch `main`, root), or serve locally with `python3 -m http.server 8974` from the parent `demos` directory. No build and no application server required.

## Files
- `index.html`: semantic content, native controls, reusable SVG candy/icon definitions.
- `style.css`: design tokens, responsive composition and decorative CSS objects.
- `app.js`: menu, flavour switcher, gift-box game, form validation and GSAP scroll choreography.
- `fonts.css` and `assets/`: local fonts, their licence, GSAP/ScrollTrigger and SVG favicon.
- `SOURCE.json`: factual business data and illustrative-content boundaries.
- `DESIGN.md`: reference decisions and interaction map.
- `QA.json`: executed static checks; browser tests are reported by the parent task.

## Company fields for future copies
Use `SOURCE.json.company` as the factual source of truth. Replace all occurrences in `index.html` of:
1. `Candy Shopp` — title, description, navigation brand, hero name, gift-box signature, footer.
2. `Большая Черёмушкинская, 1` — compact hero location.
3. `Большая Черёмушкинская улица, 1` — FAQ and contact address.
4. `+7 977 497-40-81` and `+79774974081` — display number and telephone URI.
5. The Yandex Maps search URL and public source-card URL.
Then update SOURCE.json, page metadata and README. Palette lives at the top of style.css. Game labels and flavour descriptions are in app.js. No shared dependency on another demo directory.

## Honest demonstration
The shop name, address and public telephone come from cited public directories. The site is an unofficial design concept. The candy range, gift packaging and game are illustrative. Stock, ingredients, hours, prices and actual ordering conditions must be confirmed by telephone. No reviews or success claims are fabricated.

The form validates a name (at least 2 characters) and an 11-digit Russian telephone number beginning with 7 or 8. It then clears the values and shows an explicit demo result. It never sends data, uses no backend and writes no cookies, localStorage or sessionStorage.

## Browser acceptance
- Open hero desktop and 360/390 px mobile; header Contacts is visible and no horizontal overflow.
- Click each flavour button and confirm active state, copy and art change.
- Use `.candy-picker button[data-candy]` six times, confirm `#box-count` is `6 из 6` and `#box-title` changes to a result. A seventh click must not overfill. Remove a `.box-slot.filled`, add again, then `.reset-box`.
- Use Tab/Enter for game buttons and menu; Escape closes mobile menu and returns focus.
- Submit `#contact-form` empty / invalid, then with `Тест` and `+7 999 123-45-67`; `#form-success` must explain that nothing was sent. `#form-reset` restores empty fields.
- Scroll every section up and down. Gift objects assemble from the edges as the block enters and lid opens; all clickable targets stay fixed.
- With prefers-reduced-motion, keep all content, game outcomes and form states available while large motion is disabled.

Final artwork is entirely code-generated SVG/CSS. No video, raster sequence or animated bitmap is used.

## Full source audit, 4 November 2026

- Footer `#motion-toggle` is a shared, in-memory control for all GSAP, pointer and CSS movement. `aria-pressed` reflects the actual enabled state. Off removes/reverts the GSAP context, clears confetti/timers and pointer frames, disables smooth scroll, and retains the game/form. System reduced motion forces off with a visible explanation. No settings are persisted.
- Toggle test: finish an animation or scroll section, turn off, move the pointer and scroll, complete the game while paused, turn on and check scroll effects return without duplicated triggers. Also test system reduced motion, mobile menu keyboard focus and Back navigation restoration.
- Game at 320–480 px uses two choices per row, preventing broken long candy labels. Box slots remain three per row.
- Form rejects numeric-only names and phone strings containing letters; accepts a Russian 11-digit phone starting 7/8 with optional leading plus, spaces, dashes and parentheses. Inline errors are live and associated with inputs.
- SVG flavor changes animate inner `use` layers, so toggling flavors cannot overwrite the scroll choreography. FAQ, contacts and occasion pointer geometry likewise have independent inner layers.
- Focus rings on burgundy surfaces use lime; measured contrast 6.62:1. Form button selection remains lime on burgundy; text selection background stays transparent.
- HTML nesting, IDs, fragment links, local assets and JavaScript syntax passed static checks. Browser visual/functional validation is performed separately by the parent task; see `AUDIT.md` for source locations.

The submit button starts disabled in HTML and is enabled only after the browser-only submit handler is installed. Without JavaScript, the visible noscript fallback provides the real phone number; the form cannot fall back to a default GET submission.
