# Candy Shopp — design concept

## Product and audience
A Moscow candy shop, aimed at people choosing a small treat or a sweet gift. Primary real action: telephone the shop or open its location. The gift-box builder and contact form are clearly marked demonstrations. No prices, opening hours, stock, own production, awards or reviews are invented.

## Direction
Candy-wrapper graphic design, interpreted as a lively editorial store. Oversized, tightly set Golos Text headlines; raspberry ink on strawberry pink; sugared cream, peach and pale lime as surfaces. A typographic hero shares space with a sculptural composition of individually drawn candy objects. The section rhythm changes from asymmetrical catalogue, to full-width dark gift scene, to three occasion panels, to a game console.

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
Transparent selection background, text-only contrasting highlight on dark and light surfaces. Ordinary cursor, selectable text. All CTA arrows are inline SVG, initially up-right and rotate to right on hover/focus only. Header Contacts stays visible on mobile, with anchor/focus offsets. Reduced motion is honoured in CSS and GSAP matchMedia. No persistent data storage. See QA.json and parent task browser verification for actual executed checks.

## Audit update: shared animation control

The footer exposes a 44 px minimum-height, 16 px text button to stop or resume all motion. The effective state combines a session-only user choice and `prefers-reduced-motion`; the system preference takes precedence. Stopping motion destroys/reverts the single GSAP context, clears pointer offsets and transient confetti, prevents CSS motion and uses native immediate anchor scrolling. Form, disclosure menu and game state do not reset. The CSS pause selector uses `scroll-behavior: auto !important` so GSAP's restoration of an inline scroll style cannot override it.

Decorative scroll and action animations now use separate outer/inner SVG layers. This prevents flavor changes from cancelling the scrub timeline. Narrow phones use two columns for candy choices while the six-slot gift box remains three columns. Bright focus outlines on dark surfaces and contrast-safe transparent selection are retained.
