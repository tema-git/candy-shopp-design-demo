# Candy Shopp — design concept

## Product and audience
A Moscow candy shop, aimed at people choosing a small treat or a sweet gift. Primary real action: telephone the shop or open its location. The gift-box builder and contact form are clearly marked demonstrations. No prices, opening hours, stock, own production, awards or reviews are invented.

## Direction
Candy-wrapper graphic design, interpreted as a lively editorial store. Oversized, tightly set Golos Text headlines; raspberry ink on strawberry pink; sugared cream, peach and pale lime as surfaces. A typographic hero shares space with a sculptural composition of individually drawn candy objects. The gift-box builder follows the hero and ribbon immediately. The remaining rhythm moves through an asymmetrical catalogue, full-width dark gift scene, three occasion panels, FAQ and contacts.

The initial flat product-photo concept was superseded by the user's instruction to make motion in code. Final implementation contains no bitmap imagery or video. Each candy is SVG geometry with gradients, highlights and shadows; wrappers, gift lid and packaging are CSS geometry. They respond independently to pointer and scroll.

## Tokens
- Cherry / primary action: `#8f1539`; deep text: `#70102c`.
- Strawberry canvas: `#f8b6c8`; paper: `#fff5e8`.
- Peach catalogue surface: `#f9d8bd`; lime action on dark: `#d9e57e`.
- Font: local Golos Text, variable 400–900 with Cyrillic and Latin subsets, SIL OFL.
- Body 18 px, buttons and fields 16 px, secondary notes 14 px minimum.
- Desktop gutter 5%; mobile gutter 20 px. Sticky header 88 / 76 / 72 px.
- Rounded shapes belong to candy/packaging and are varied by role; there is no universal card treatment.

## Sources and deliberate adaptations
- Refero Adam Lippes: https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24 — inspected public design record. Used the idea of image/subject scale and contrasting page rhythm. Original playful colour and type treatment; did not copy the brand's monochrome style or tiny labels.
- 21st Animated Feature Spotlight 3D: https://21st.dev/@ruixen.ui/components/animated-feature-spotlight3d — inspected public description and usage source. Adapted the idea of bounded depth on decorative imagery. No React component code was imported; controls remain fixed. The source's live motion was not independently tested.
- MotionSites cursor tracking: https://motionsites.ai/lesson/cursor-tracking-website-with-motionsites — input-to-object response adapted to independent SVG/CSS candies, not video seeking.
- MotionSites scroll story: https://motionsites.ai/lesson/build-scroll-animated-website-with-ai — native scroll drives object assembly. No copied media, frame caches, page pinning or prompt text.
- GSAP and ScrollTrigger vendored from existing local project, with their source notices retained.

## Interaction map
| Section | Input and code response | Bounds / touch / reduced motion |
| --- | --- | --- |
| Hero | Pointer shifts different SVG props at different depths; wrapper foil moves; sugar fragments track. Scroll gently tilts the full decorative scene. | Decoration only, roughly 12–36 px. Touch uses visible static scene plus scroll. Reduced motion disables transforms. |
| Ribbon | Scroll carries the horizontal typographic band. | Clipped to its section, native page scroll preserved. Static under reduced motion. |
| Flavours | Three native buttons select descriptive copy, colour and SVG composition. Pointer adds bounded depth. Incoming scroll assembles three props from opposite sides. | Buttons stay fixed; keyboard and touch use click. Reduced motion changes state instantly. |
| Gift | On section entrance, scattered candies converge while a CSS lid lifts and tilts away from a CSS box. Pointer affects only decorative scene. | Starts at `top bottom`, reversible scrub. No text hidden. Reduced motion retains readable assembled/open scene. |
| Occasions | Each candy scales/rotates into its panel on entrance, responds to section pointer. | Three different surfaces; mobile panels stack. Static in reduced motion. |
| Gift builder | Click/tap/Enter adds a candy to six stable slots. Clicking a filled slot removes it. Six choices produce a result and code confetti. | Native buttons, capacity protected even under rapid clicks. Reset and removal available. SVG content pops, target wrappers never move. Confetti disabled in reduced motion. |
| FAQ | Native details; decorative citrus rolls with scroll and pointer. | Keyboard summaries, no required animation. |
| Contact | Decorative ring rotates/scales early on entrance and reacts to cursor. Fields stay fixed. | Custom validation, honest demo success and retry. No network or storage. |

## Accessibility and verification boundaries
Transparent selection background, text-only contrasting highlight on dark and light surfaces. Ordinary text/link/field cursors and selectable text are preserved. A local 32 px SVG candy cursor appears only over the hero artwork, flavour artwork and decorative gift scene on fine pointers. All CTA arrows are inline SVG, initially up-right and rotate to right on hover/focus only. Header Contacts stays visible on mobile, with anchor/focus offsets. Only the system reduced-motion preference controls motion. The code enables/cleans up its GSAP context when that preference changes. No persistent data storage. See QA.json and parent task browser verification for actual executed checks.

## Requested interaction refinements

- The six-slot gift-box builder appears directly after hero and ribbon; its capacity, keyboard actions, result, removal and replay remain unchanged.
- The ribbon is a fixed-width clipped band around two identical groups. Each group is at least the viewport width plus 180 px. Scroll translates the track by exactly one measured group width and recalculates on refresh, so both endpoints are equivalent and no right-side blank edge enters the band. It is scroll driven, not an autoplay loop.
- Flavour choices are native toggle buttons with colour and an underline for the active state. They have no link-style arrows.
- Header Contacts uses an unchanged, padded anchor hitbox. A pointer-transparent inner face moves at most 5 px horizontally and 4 px vertically; keyboard focus gets a 2 / −1 px response. Coarse pointer and system reduced motion disable this effect.
- The local SVG candy cursor is restricted to non-text art zones. It never replaces cursors for prose, links, controls or fields; reduced motion and coarse input retain the system cursor.
- The contact-topic field is a custom, palette-matched select-only combobox. Its hidden named input carries the committed form value. Active option and committed selection are separate: Arrow/Home/End/typeahead navigate; Enter, Space and Tab commit; Escape and outside interaction cancel. Tab is never trapped. Reset restores the initial value and UI. The popup measures available viewport space and can open upwards.
- The manual motion button, its visible hints and session preference were removed at the user's explicit request. Motion is on by default and governed only by `prefers-reduced-motion`. There are no long autoplay loops. All interactions remain usable with static decoration.
- Public imagery/production disclaimers and device-input instructions were removed; no real-work or availability claim was introduced. Practical stock/allergen information and honest form/game behavior remain. Footer credits Spoki Studio as plain text without an invented URL.
- The demo form continues to reset personal fields, never stores or sends data, and keeps submit disabled in static HTML until its preventDefault handler is installed.

The new dropdown follows the WAI select-only combobox interaction model: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/. Browser verification of this iteration is performed by the parent task.
