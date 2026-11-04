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

## Current interaction controls

The gift-box builder now follows the hero and seamless ribbon. The footer gives the plain-text Spoki Studio credit. There is no manual animation switch: only the system reduced-motion preference controls decoration. No long autoplay loop is used.

Header Contacts keeps a fixed anchor target while the inner face moves slightly on pointer/focus. Its motion is disabled on coarse pointers and under reduced motion. The themed SVG cursor appears only on decorative art.

The topic field is a custom select-only combobox, with a hidden named form input. It supports pointer/touch selection, Arrow keys, Home/End, typeahead, Enter/Space selection, Escape cancellation, ordinary Tab navigation, outside close and form reset. Pending navigation never alters the committed value before Enter/Space/Tab.

### QA selectors
- Game: `.candy-picker button`, `.box-slot.filled`, `#box-count`, `.reset-box`. Six picks finish the box; seventh does not add a slot. Removal and restart remain usable by keyboard.
- Dropdown: `#customer-topic` trigger; `#topic-options` listbox; `.select-option`; `#customer-topic-value` hidden form value; `#topic-selected` visible value. From the default, open and ArrowDown, then Escape: committed value stays “Ассортимент и наличие”. Open, End, Enter: changes to “Как добраться”. Form reset restores the default.
- Magnetic contact: `.header-contact` fixed outer target; `.contact-face` visual inner face. Pointer max 5 px X / 4 px Y. Text and art cursor behavior should be checked separately.
- Ribbon: `.ribbon-track` contains two identical `.ribbon-group` children. Compare at top/middle/end of its scroll range and after viewport resize/font loading.
- Form: `#customer-name`, `#customer-phone`, `.form-submit`, `#form-success`, `#form-reset`. Reject a numeric-only name and phone letters such as “+79990000000abc”. Success clears values, reports no submission and allows retry.

The submit button starts disabled in HTML and is enabled only after the browser-only submit handler exists. A noscript phone fallback prevents default GET submission without JavaScript. No personal-data storage or network endpoint exists.

See AUDIT.md for current source checks; parent task owns browser QA and publication.
