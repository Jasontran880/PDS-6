# Sphere — Claude Code Prompt Plan (v2)

## How To Use This File

This document contains **14 sequential prompts** to feed into Claude Code one at a time. Wait for each prompt to be fully completed and tested before moving to the next. Each prompt is self-contained and references the PRD + specific reference images + exact asset filenames.

---

## Asset Inventory (Exact Filenames)

Before starting, confirm your project folder matches this structure:

```
sphere/
├── docs/
│   └── sphere-prd.md
│
├── reference/                          ← Mockup screenshots
│   ├── lander-page.png
│   ├── outer-sphere.png
│   ├── social-circle.png
│   ├── personal-profile.png
│   ├── inner-sphere.png
│   ├── upcoming-hangouts.png
│   ├── recent-hangouts.png
│   ├── personal-profile-inner view.png
│   ├── blog.png
│   └── inside-blog-folder.png
│
├── assets/                             ← All image + font assets
│   ├── grass-overlay.png               ← Green hills foreground layer
│   ├── sphere.png                      ← Iridescent soap-bubble sphere
│   ├── outline.png                     ← Glass panel outline/border
│   ├── header.png                      ← Header decorative element
│   ├── music status.png                ← CD/disc icon for profile song
│   ├── arrow.png                       ← Navigation arrow
│   ├── avatar.png                      ← Base avatar body template
│   ├── face1.png                       ← Face accessory: dog ears + nose
│   ├── face2.png                       ← Face accessory variant 2
│   ├── face3.png                       ← Face accessory variant 3
│   ├── face4.png                       ← Face accessory variant 4
│   ├── face5.png                       ← Face accessory variant 5 (awesome face smiley)
│   ├── back-space-icon.png             ← Dragon mascot (back button)
│   ├── flops.png                       ← Red/coral 4-point star icon
│   ├── likes.png                       ← Green 4-point star icon
│   ├── palm-tree-left.png              ← Palm tree (left variant)
│   ├── palm-tree-right.png             ← Palm tree (right variant)
│   ├── divider.png                     ← Horizontal divider line
│   ├── large-outline.png               ← Large glass panel outline
│   ├── file colour 1.png               ← Blog folder icon (pink)
│   ├── file colour 2.png               ← Blog folder icon (green/lime)
│   ├── file colour 3.png               ← Blog folder icon (yellow)
│   ├── file colour 4.png               ← Blog folder icon (red/coral)
│   ├── file colour 5.png               ← Blog folder icon (blue)
│   ├── file colour 6.png               ← Blog folder icon (purple)
│   │
│   ├── Sloop-font/                     ← Folder containing Sloop font files
│   │   └── Sloop-font.ttf             ← Script/calligraphic font (first letter of headers)
│   │
│   ├── Agrandir-font/                  ← Folder containing Agrandir font files
│   │   └── (font files inside)        ← Geometric sans-serif (body + rest of headers)
│   │
│   └── retro_pixel-font/              ← Folder containing retro pixel font files
│       └── (font files inside)        ← Pixel/bitmap font (buttons + labels)
│
└── src/                                ← Code goes here
```

> **IMPORTANT:** Some filenames contain spaces (e.g., `music status.png`, `file colour 1.png`, `personal-profile-inner view.png`). When referencing these in code, wrap paths in quotes or use proper escaping.

---

## PHASE 1: FOUNDATION

### Prompt 1 — Project Scaffold + Design Tokens

```
Read the PRD at docs/sphere-prd.md (Sections 2.1–2.5 only — "Visual Identity & Design Language").

Look at ALL reference images in the reference/ folder to understand the visual language.

Set up a React + Vite project with the following:

1. Project scaffold with React, React Router, and Tailwind CSS

2. Font setup — load these three fonts from the assets folder using @font-face:
   - Sloop: located at assets/Sloop-font/Sloop-font.ttf — used for the FIRST LETTER of every heading
   - Agrandir: located inside assets/Agrandir-font/ folder — find the .ttf/.otf/.woff files inside and load them. Used for body text and the remaining letters of headings
   - Retro Pixel: located inside assets/retro_pixel-font/ folder — find the font files inside and load them. Used for buttons and labels

3. A global CSS file with design tokens as CSS variables:
   - Glassmorphism values (blur amount, transparency levels, border gradient specs)
   - Color palette extracted from the reference images (sky blue, cloud white/pink, grass green, avatar pink, avatar blue, etc.)
   - Glow/bloom text-shadow values for the neon heading effect
   - Spacing scale and border-radius values

4. A shared Background component that renders the persistent sky scene:
   - Use assets/grass-overlay.png as the green hills foreground layer
   - The sky + clouds should be a CSS gradient or a background image (match reference/lander-page.png)
   - This background appears on EVERY screen — build it as a layout wrapper

5. Basic React Router setup with placeholder routes for: Home, Outersphere, SocialCircle, Profile, Innersphere, UpcomingHangouts, RecentHangouts, Explore, Blog, BlogFolder

Do NOT build any screens yet. Only the scaffold, fonts, tokens, background, and routing.
```

---

### Prompt 2 — Shared UI Components

```
Read the PRD at docs/sphere-prd.md (Sections 2.2, 2.3, 2.5, 5.1, 5.3).

Look at reference images: personal-profile.png, blog.png, upcoming-hangouts.png, recent-hangouts.png, inside-blog-folder.png to identify recurring UI patterns.

Build these reusable components using the EXACT assets from the assets/ folder:

1. **GlassPanel** — The frosted glassmorphism container used everywhere.
   - Use assets/outline.png as the panel border/frame if it's a border image, OR use assets/large-outline.png for larger panels
   - Heavy backdrop-blur, semi-transparent white/blue tint, subtle glossy gradient border
   - Match the panels in reference/personal-profile.png and reference/blog.png exactly

2. **GlassPill** — Frosted glass capsule button used for "INVITE", "STATS", username tags, category filters.
   - See the pills in reference/personal-profile.png and reference/upcoming-hangouts.png

3. **SplitHeading** — Typography component where the first letter uses Sloop font and the rest uses Agrandir font, with a white neon glow text-shadow effect.
   - Use the Sloop font loaded from assets/Sloop-font/Sloop-font.ttf for the first letter
   - Use Agrandir from assets/Agrandir-font/ for the remaining letters
   - Add white glow via layered text-shadow
   - Used on: "Sphere", "Outersphere", "Innersphere", "Blog", "Upcoming Hangouts", "Username", etc.

4. **DragonBackButton** — The dragon mascot + "back" pill in the bottom-left corner.
   - Use assets/back-space-icon.png as the dragon image
   - Pair it with a frosted "back" label pill using the retro pixel font from assets/retro_pixel-font/
   - Position: fixed bottom-left
   - See reference/personal-profile.png bottom-left

5. **StarMetric** — The 4-point star icon with label.
   - Green star: use assets/likes.png with "likes" label
   - Red star: use assets/flops.png with "flops" label
   - See reference/personal-profile.png right side

6. **UsernamePill** — Frosted capsule with the first letter in Sloop font and rest in Agrandir.
   - Same split-font treatment as SplitHeading but smaller
   - See reference/recent-hangouts.png and reference/inside-blog-folder.png bottom username tags

7. **HangoutCard** — Card used in Upcoming and Recent hangouts.
   - GlassPanel container with: cover photo area (rounded top corners, random hex color fallback if no image), hangout name (bold italic), description text, tagged UsernamePill components at bottom
   - See reference/upcoming-hangouts.png for the upcoming variant
   - See reference/recent-hangouts.png for the recent/individual variant

8. **AvatarBubble** — Avatar inside a soap-bubble sphere.
   - Use assets/avatar.png as the base body
   - Use assets/sphere.png as the transparent bubble sphere wrapping the avatar
   - Layer face accessories on top: assets/face1.png, face2.png, face3.png, face4.png, face5.png
   - Accept props for: body color tint, which face accessory to use, size (small/medium/large)
   - See reference/social-circle.png and reference/personal-profile.png for how avatars look

Build a test/demo page where ALL components render together with mock data so I can verify them visually against the reference images.
```

---

## PHASE 2: MAIN FLOW SCREENS

### Prompt 3 — Lander Page

```
Read the PRD Section 3.3 (Screen #1) and Section 6.1 (Onboarding).

Look at reference/lander-page.png as the EXACT visual target.

Build the Lander Page:
- Full viewport with the shared sky+hills background (using assets/grass-overlay.png for the hills)
- "Sphere" title rendered with the SplitHeading component — large and centered. The "S" uses Sloop font (assets/Sloop-font/Sloop-font.ttf), "phere" uses Agrandir (assets/Agrandir-font/)
- "YOUR INNER CIRCLE" subtitle below in all-caps using Agrandir
- White neon glow/bloom effect on all text (layered text-shadow)
- The sky background with pink-tinted clouds should match reference/lander-page.png exactly
- No navbar on this screen
- Subtle entrance animation (fade-in, gentle float-up on the text)
- Click-anywhere or a minimal button to proceed to the Outersphere screen

This should be pixel-accurate to reference/lander-page.png.
```

---

### Prompt 4 — Outersphere Title Card

```
Read the PRD Section 3.3 (Screen #2) and Section 4.1.

Look at reference/outer-sphere.png as the EXACT visual target.

Build the Outersphere title screen:
- Full viewport with shared sky+hills background (assets/grass-overlay.png for the hills)
- Use assets/sphere.png as the large soap-bubble sphere, centered on the scene resting on the green hills
- "Outersphere" text centered inside/over the bubble using the SplitHeading component — "O" in Sloop, "utersphere" in Agrandir, with white neon glow
- The sphere.png asset should appear transparent and iridescent — if the asset itself has this quality, display it as-is. If needed, add CSS effects (subtle rainbow gradient overlay, slight opacity) to enhance the soap-bubble look
- Subtle idle animation: bubble gently bobs or breathes (CSS transform animation)
- Click the bubble or a continue action to proceed to the Social Circle screen
- No DragonBackButton on this screen

Match reference/outer-sphere.png exactly.
```

---

### Prompt 5 — Social Circle (Outersphere Main View)

```
Read the PRD Section 4.1 (Outersphere — Social Circle of Influence) thoroughly.

Look at reference/social-circle.png as the EXACT visual target.

Build the Social Circle screen using these exact assets:
- Full viewport with shared sky+hills background (assets/grass-overlay.png)
- Add palm trees to the scene: assets/palm-tree-left.png on the left side, assets/palm-tree-right.png on the right side. Position them as shown in reference/social-circle.png
- "Outersphere" header top-left using SplitHeading, with tagline "YOU'RE GROUNDED BY THE PEOPLE AROUND YOU" below in Agrandir

Top-right corner stats (GlassPill components):
- "NUMBER OF FRIENDS [#]"
- "DAYS SINCE LAST HANGOUT [#]"

Bottom-right: "ADD FRIEND" GlassPill button

Avatars:
- YOUR avatar (labeled "YOU"): use assets/avatar.png with a green color tint, wrapped in assets/sphere.png bubble, positioned bottom-left, larger than others. Add a flower crown or distinctive accessory
- 10-15 friend avatars scattered across the hills: each uses assets/avatar.png (with varied color tints: pink, blue, purple, etc.) wrapped in assets/sphere.png, with different face accessories layered on (assets/face1.png through face5.png)
- Friends labeled "friend #1", "friend #2", etc. on their bodies
- Avatars have gentle idle bobbing animations
- Hover: avatar glows and scales up
- Click: navigates to that friend's Personal Profile page

Use mock data for friend positions. Friends closer to "YOU" = higher friendship score. Scatter them at varying distances across the landscape.

Dragon back button (assets/back-space-icon.png) in the bottom-left area.
```

---

### Prompt 6 — Personal Profile (Viewing Others)

```
Read the PRD Sections 4.4, 4.5, 4.6, 4.7.

Look at reference/personal-profile.png as the EXACT visual target.

Build the Personal Profile page (viewing another user) using these exact assets:

LEFT SIDE:
- AvatarBubble component: assets/avatar.png (pink body) inside assets/sphere.png bubble
- Layer assets/face1.png (dog ears + nose) on top of the avatar as the face accessory
- Layer assets/face5.png (awesome face smiley) overlapping the avatar's lower body area
- CD/disc icon: use assets/music status.png positioned top-left of the avatar (the holographic CD)
- "FRIENDSHIP SCORE" GlassPill below the avatar

RIGHT SIDE (inside a GlassPanel using assets/outline.png or assets/large-outline.png as the frame):
- "Username" header using SplitHeading component (Sloop "U" + Agrandir "sername")
- Two action GlassPill buttons side by side: "INVITE" and "STATS"
- "USER DESCRIPTION" text area inside a frosted inner panel
- Stats on the right side of the description:
  - assets/likes.png with "likes" label (StarMetric component)
  - assets/flops.png with "flops" label (StarMetric component)
- Two past hangout photo cards at bottom in 2-column layout:
  - Each shows "past hangout photo" placeholder
  - Each has two UsernamePill components below

Dragon back button: assets/back-space-icon.png + "back" pill, bottom-left.

Use mock data throughout. The CD (assets/music status.png) should spin on hover with a CSS animation. Match reference/personal-profile.png exactly.
```

---

### Prompt 7 — Innersphere Title Card

```
Read the PRD Section 3.3 (Screen #5).

Look at reference/inner-sphere.png as the EXACT visual target.

Build the Innersphere title screen:
- Same structure as the Outersphere title card (Prompt 4) — reuse the same layout component
- Full viewport, shared sky+hills background (assets/grass-overlay.png)
- assets/sphere.png as the large soap-bubble sphere, centered on the hills
- "Innersphere" text using SplitHeading — "I" in Sloop (assets/Sloop-font/Sloop-font.ttf), "nnersphere" in Agrandir, with white neon glow
- Same subtle bob animation on the sphere
- Click to proceed to Upcoming Hangouts
- No DragonBackButton

This mirrors the Outersphere title card exactly but with different text. Reuse the component. Match reference/inner-sphere.png.
```

---

### Prompt 8 — Upcoming Hangouts

```
Read the PRD Section 4.2.1 (Upcoming Hangouts).

Look at reference/upcoming-hangouts.png as the EXACT visual target.

Build the Upcoming Hangouts screen:
- Shared sky+clouds background (this screen is more sky-heavy with less grass — match the bluer tone in reference/upcoming-hangouts.png)
- "Upcoming Hangouts" header top-left using SplitHeading — "U" in Sloop, "pcoming Hangouts" in Agrandir, white neon glow
- "CREATE HANGOUT" GlassPill button top-right with strong glow

Category filter bar:
- Horizontal scrolling row of GlassPill buttons: "ALL", "MINECRAFT", "COACHELLA", "BEACH", "LA", "ROBLOX", "FORTNITE", "MOVIES", "MUSICALLY"
- Use the retro pixel font (assets/retro_pixel-font/) for the filter labels
- Active/selected state: slightly more opaque or brighter

Hangout cards (3-column layout, horizontally scrollable):
- Each is a HangoutCard component inside a GlassPanel
- Cover photo area at top with rounded corners — use placeholder colors or sky/cloud images as placeholders. If no photo, fill with a random hex color
- "Hangout name" in bold italic (Agrandir)
- Lorem ipsum description text
- Two UsernamePill components at bottom of each card
- Use assets/divider.png if a visual divider is needed between sections

Render 3-6 mock hangout cards. Match reference/upcoming-hangouts.png exactly.
```

---

### Prompt 9 — Recent Hangouts (Feed)

```
Read the PRD Section 4.2.2 (Recent Hangouts / Sidequest Feed).

Look at reference/recent-hangouts.png as the EXACT visual target.

Build the Recent Hangouts feed section:
- This section lives BELOW the Upcoming Hangouts on the same scrollable page — user scrolls down from Upcoming Hangouts to reach this
- Background transitions to a lighter/neutral tone to match reference/recent-hangouts.png (the card itself is more neumorphic/soft white rather than glassmorphic)

Individual hangout card design (centered, not full-width):
- Soft rounded rectangle card with subtle shadow (lighter style than the glass panels — match reference/recent-hangouts.png)
- Cover photo area at top with large rounded corners (fallback: random hex color with italic placeholder text "COVER PHOTO [if not found, use random hexadecimal colour]")
- Below the photo: "Hangout name" (bold italic, left-aligned) + "date" (italic, right-aligned) on the same line
- Description paragraph in body text
- Two UsernamePill components at bottom

Render 5-8 mock hangout cards in a vertical feed layout.
Add a subtle fade-in animation as cards scroll into view (Intersection Observer).

Connect this section to the Upcoming Hangouts page so it's one continuous scrollable experience. Match reference/recent-hangouts.png for the card style.
```

---

## PHASE 3: NAVBAR TABS

### Prompt 10 — Your Profile (Inner View)

```
Read the PRD Section 4.4 (Personal Profile — your own profile variant).

Look at reference/personal-profile-inner view.png as the EXACT visual target.

Build the "Your Profile" page:
- Nearly identical to the Personal Profile built in Prompt 6
- Key differences:
  - Header reads "You" instead of "Username" — SplitHeading with "Y" in Sloop, "ou" in Agrandir
  - No "FRIENDSHIP SCORE" GlassPill (you don't score friendship with yourself)
  - Everything else identical: AvatarBubble (assets/avatar.png + assets/sphere.png + face accessories), CD icon (assets/music status.png), INVITE/STATS pills, description, assets/likes.png + assets/flops.png StarMetrics, past hangout photos

Refactor the Personal Profile from Prompt 6 into a shared component that accepts an `isOwnProfile` prop. When true: show "You" header, hide friendship score. When false: show username, show friendship score.

Accessible via the Profile tab in the navbar. Match reference/personal-profile-inner view.png exactly.
```

---

### Prompt 11 — Blog Home

```
Read the PRD Section 4.9 (Blog — Blog Home).

Look at reference/blog.png as the EXACT visual target.

Build the Blog home page using these exact assets:
- Shared sky+hills background (assets/grass-overlay.png)
- "Blog" header top-left using SplitHeading — "B" in Sloop, "log" in Agrandir, white neon glow
- Large GlassPanel containing a 3×2 grid of folder icons:

TOP ROW (labeled "PUBLIC" in bold caps, positioned top-right of the row):
- assets/file colour 1.png  ← pink folder (left)
- assets/file colour 3.png  ← yellow folder (middle)
- assets/file colour 2.png  ← green/lime folder (right)

Use assets/divider.png as the horizontal line separating the rows.

BOTTOM ROW (labeled "PRIVATE" in bold caps, positioned bottom-left of the row):
- assets/file colour 5.png  ← blue folder (left)
- assets/file colour 6.png  ← purple folder (middle)
- assets/file colour 4.png  ← red/coral folder (right)

NOTE: Verify the actual colors of each "file colour" asset by viewing them, and rearrange the grid positions to match reference/blog.png exactly (pink, yellow, green on top; blue, purple, red on bottom). The numbering above is my best guess — visually confirm.

- Each folder: hover scales up slightly, click navigates to Inside Blog Folder view
- Dragon back button: assets/back-space-icon.png + "back" pill, bottom-left

Match reference/blog.png exactly.
```

---

### Prompt 12 — Inside Blog Folder

```
Read the PRD Section 4.9 (Blog — Inside a Blog Folder).

Look at reference/inside-blog-folder.png as the EXACT visual target.

Build the Inside Blog Folder page:
- Shared sky+hills background (assets/grass-overlay.png)
- Large GlassPanel containing:
  - Small folder icon (top-left of the panel) — use the matching "file colour" asset based on which folder was clicked (e.g., assets/file colour 1.png for the pink folder)
  - "created by" label in bold Agrandir, with two UsernamePill components to the right
  - Content area below: centered bold text "This ends up being a collaboration of photos & paragraphs" (placeholder — eventually rich text + images)

- Dragon back button: assets/back-space-icon.png + "back" pill, bottom-left (navigates back to Blog home)

This is a simple layout. Match reference/inside-blog-folder.png exactly.
```

---

## PHASE 4: REMAINING FEATURES

### Prompt 13 — Explore Tab

```
Read the PRD Section 4.8 (Explore Tab).

There is NO reference image for this screen. Design it to match the established visual language exactly: same sky+hills background (assets/grass-overlay.png), GlassPanel containers, SplitHeading typography (Sloop + Agrandir), GlassPill buttons, same glow effects.

Build the Explore page with two sections:

SECTION A — "Local Spots" (Sponsored Third Spaces):
- SplitHeading: "Local Spots" or "Places to Hang"
- Horizontal scrolling row of venue cards (GlassPanel style):
  - Venue photo placeholder (colored rectangle)
  - Venue name in bold Agrandir
  - Category GlassPill tag (Café, Cinema, Restaurant, Park)
  - Brief description
  - "Plan a Sidequest Here" GlassPill CTA button
- 4-6 mock venue cards

SECTION B — "People You Might Know":
- SplitHeading: "People You Might Know"
- Grid or horizontal scroll of profile preview cards (GlassPanel):
  - Small AvatarBubble (assets/avatar.png + assets/sphere.png + random face accessory)
  - Username using SplitHeading style
  - Brief description
  - Shared interest GlassPill tags
  - "Add Friend" GlassPill button
- 6-8 mock profile cards

Accessible via the Explore tab in the navbar. Keep the same Y2K nostalgic energy as every other screen.
```

---

### Prompt 14 — Navbar + Routing + Polish

```
Read the PRD Sections 3.1, 3.2, 5.2.

Now connect everything together:

1. Build the persistent NAVBAR:
   - Frosted glass bar (bottom of viewport for app-like feel, or top — match whichever feels better with the aesthetic)
   - Tabs: Home, Innersphere, Explore, Blog, Profile
   - Use the retro pixel font from assets/retro_pixel-font/ for tab labels
   - Icons optional (can use simple pixel-art style icons or text-only)
   - Active tab: slightly brighter/more opaque glow
   - HIDE the navbar on the Lander Page (first screen only)
   - Use assets/arrow.png if a navigation arrow is needed anywhere

2. Wire up all routing:
   - Home → Lander (if first visit) → Outersphere title → Social Circle
   - Innersphere tab → Innersphere title → Upcoming Hangouts (scroll down → Recent Hangouts feed)
   - Explore tab → Explore page
   - Blog tab → Blog home → Inside Blog Folder (on folder click) → back via DragonBackButton
   - Profile tab → Your Profile (inner view)
   - Clicking a friend avatar in Social Circle → Personal Profile (other user view)
   - DragonBackButton (assets/back-space-icon.png) → navigates to previous screen on every page it appears

3. Polish pass:
   - Smooth page transitions (fade or slide animations between routes)
   - Shared background (assets/grass-overlay.png + sky) must be PERSISTENT and not jump/reload between routes
   - Glassmorphism rendering consistent on all screens
   - All hover/click states working on interactive elements
   - Title card screens (Outersphere, Innersphere) should auto-advance or feel like smooth transitions, not dead ends
   - Verify all asset paths resolve correctly — especially files with spaces in names like "music status.png", "file colour 1.png", etc.

This is a frontend prototype with mock data. No authentication, database, or backend logic needed.
```

---

## TIPS FOR EACH PROMPT SESSION

1. **Always start each prompt with:** "Read the PRD at docs/sphere-prd.md" + the specific section numbers. This grounds Claude Code in the spec.

2. **Always reference specific images:** "Look at reference/personal-profile.png as the EXACT visual target." This prevents hallucinated layouts.

3. **Asset filenames with spaces:** Several assets have spaces in their names (`music status.png`, `file colour 1.png` through `6`, `personal-profile-inner view.png`). Remind Claude Code to handle these properly in import paths. If it causes issues, rename them with hyphens before starting.

4. **Wait for completion:** Don't send the next prompt until the current one is fully built, renders correctly, and you've visually verified it against the reference image.

5. **Fix before moving on:** If a screen doesn't match the reference, send a correction prompt like: "Compare to reference/personal-profile.png — the GlassPanel blur isn't heavy enough, the sphere.png bubble needs to be more visible around the avatar, and the likes.png star should be positioned to the right of the description area, not below it."

6. **Don't combine prompts:** Each prompt is scoped to ~1 screen or ~1 component layer. Combining them will degrade quality.

7. **Prompt 2 is the most important:** The shared components (GlassPanel, GlassPill, SplitHeading, AvatarBubble) set the visual tone for everything. Spend extra time verifying these look right before proceeding to screens.

8. **Font folder check:** Before starting Prompt 1, open the font folders (assets/Sloop-font/, assets/Agrandir-font/, assets/retro_pixel-font/) and note the exact filenames inside. If Agrandir has multiple weights (Regular, Bold, etc.), tell Claude Code which weight files are available so it can load them properly.

9. **Color mapping for blog folders:** Before Prompt 11, view each "file colour" asset (1–6) to confirm which color each number maps to. Update the prompt if the mapping doesn't match my guesses (1=pink, 2=green, 3=yellow, 4=red, 5=blue, 6=purple).
