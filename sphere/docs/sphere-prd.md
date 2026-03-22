# Sphere — Product Requirements Document

**Version:** 1.0  
**Date:** March 22, 2026  
**Status:** Draft  
**Platform:** Web Application  
**Organization Type:** Non-Profit

---

## 1. Vision & Mission

Sphere is a non-profit social platform that incentivizes real-life, in-person connection by bringing back the expressive, authentic, and silly energy of 2016-era internet culture. In a world where social media has become performative and isolating, Sphere flips the script: your social feed is built from *actual hangouts*, your friendships are measured by *showing up*, and your profile is a living scrapbook of real adventures — not curated highlight reels.

**Core Thesis:** People want to hang out more but face two barriers — flaking culture and lack of spontaneous discovery. Sphere solves both with accountability metrics and an explore-driven third-space recommendation engine.

---

## 2. Visual Identity & Design Language

The visual spec is defined by the attached reference mockups and must be replicated exactly across every screen.

### 2.1 Background & Environment
- **Persistent background:** Blue sky with soft pink-white clouds over rolling green hills (Windows XP "Bliss" homage)
- Background is consistent across all screens, creating a unified world
- Palm trees and environmental details appear contextually (e.g., Outersphere social circle view)

### 2.2 Glassmorphism System
- **Panels:** Heavy frosted-glass blur with semi-transparent white/blue tint
- **Borders:** Subtle glossy gradient borders with light refraction effect
- **Buttons & pills:** Frosted glass capsules with soft inner glow
- **Soap-bubble spheres:** Transparent iridescent spheres with rainbow highlights wrapping avatars — conveys the "sphere" metaphor literally

### 2.3 Typography
- **Headers:** First letter rendered in *Sloop* (script/calligraphic font), remainder in *Agrandir* (clean geometric sans-serif). Example: the "S" in "Sphere" is Sloop, "phere" is Agrandir
- **Body text:** Agrandir
- **Buttons & labels:** Retro pixel/bitmap font for interactive elements
- **Neon glow effect:** White glow/bloom applied to header text, especially on the lander and section titles

### 2.4 Avatar System
- **Body:** Preset glossy 3D body templates (bubbly, rounded forms reminiscent of MSN/Buddy icons)
- **Customization:** Mix-and-match face accessories (dog ears, cat ears, expressions, hats, etc.) layered onto the body template
- **Containment:** Each avatar sits inside a transparent iridescent soap-bubble sphere
- **Color variants:** Multiple body color options (pink, blue, green, purple, etc.)
- **Expressions:** Emoji-style face overlays (e.g., the yellow "awesome face" smiley seen in mockups)

### 2.5 Iconography & Decorative Elements
- **CD/Disc:** Holographic CD icon on profile pages — functional element (see Section 5.5)
- **Dragon mascot:** Small cartoon dragon in the bottom-left corner — serves as the back/navigation button
- **Folder icons:** 3D glossy colored folders for the Blog feature (pink, yellow, green, blue, purple, red)
- **Star icons:** Green 4-point star = "likes", Red/coral 4-point star = "flops"

---

## 3. Information Architecture & Screen Flow

### 3.1 Main Flow (Chronological Sequence)
Users progress through these screens in order as the primary experience:

```
Lander Page → Outer Sphere → Social Circle → Personal Profile (other user)
→ Inner Sphere → Upcoming Hangouts → Recent Hangouts (infinite scroll feed)
```

### 3.2 Navbar Tabs (Accessible From Any Screen)
Persistent navigation provides access to:

| Tab | Destination |
|-----|-------------|
| Home | Lander / Outersphere |
| Innersphere | Innersphere hub |
| Explore | Discovery tab (local businesses + stranger profiles) |
| Blog | Personal blog management |
| Profile | Your own profile (inner view) |

### 3.3 Screen Inventory

| # | Screen | File Reference | Description |
|---|--------|---------------|-------------|
| 1 | Lander Page | `lander-page.png` | Entry/splash — "Sphere: Your Inner Circle" branding with neon glow text on sky background |
| 2 | Outersphere | `outer-sphere.png` | Outersphere title card with soap-bubble sphere on landscape |
| 3 | Social Circle | `social-circle.png` | Interactive avatar landscape — your avatar ("YOU") surrounded by friends' avatars on the green hills, with friend count and days-since-last-hangout stats |
| 4 | Personal Profile (viewing others) | `personal-profile.png` | Another user's profile — avatar in bubble, CD icon, username, invite/stats buttons, user description, likes/flops, past hangout photos with tagged usernames, friendship score |
| 5 | Innersphere | `inner-sphere.png` | Innersphere title card with soap-bubble sphere on landscape |
| 6 | Upcoming Hangouts | `upcoming-hangouts.png` | Horizontally scrollable cards of upcoming hangouts with category filter pills, "Create Hangout" button |
| 7 | Recent Hangouts | `recent-hangouts.png` | Individual hangout card — cover photo (or random hex color fallback), hangout name, date, description text, tagged usernames |
| 8 | Your Profile (inner view) | `personal-profile-inner_view.png` | Your own profile — same layout as #4 but header reads "You" instead of username |
| 9 | Blog | `blog.png` | 3×2 grid of colored folders divided into Public (top row) and Private (bottom row) sections |
| 10 | Inside Blog Folder | `inside-blog-folder.png` | Individual blog folder opened — shows folder icon, "created by" with username pills, content area for photos & paragraphs |

---

## 4. Feature Specifications

### 4.1 Outersphere — Social Circle of Influence

**Purpose:** Visualize your real-world social connections as a living, spatial map.

**Layout:**
- Your avatar (labeled "YOU", green-tinted, wearing a flower crown or other distinction) is positioned prominently, typically bottom-left
- 10–20 friend avatars populate the landscape at any given time, moving around gently with idle animations
- Friends with higher friendship scores are positioned closer to your avatar; lower scores drift further away
- Clusters naturally form based on mutual hangout frequency

**Interactions:**
- **Hover:** Avatar highlights with a glow/scale-up effect
- **Click:** Navigates directly to that friend's personal profile
- **"Add Friend" button:** Positioned bottom-right, opens friend search/invite flow

**Stats Display (top-right corner):**
- `NUMBER OF FRIENDS [#]` — total friend count in frosted pill
- `DAYS SINCE LAST HANGOUT [#]` — urgency nudge in frosted pill

**Header:** "Outersphere" title with tagline *"You're grounded by the people around you"*

### 4.2 Innersphere — Your Hangout Hub

**Purpose:** Central hub for managing and discovering hangouts (sidequests).

**Flow:** Title card → Upcoming Hangouts → Recent Hangouts (scroll down for infinite feed)

#### 4.2.1 Upcoming Hangouts

**Layout:**
- Header: "Upcoming Hangouts" with Sloop/Agrandir treatment
- **"Create Hangout" button:** Top-right, frosted glass pill
- **Category filter bar:** Horizontal scroll of pill-shaped tags — starts with "ALL" then curated categories (Minecraft, Coachella, Beach, LA, Roblox, Fortnite, Movies, Musically, etc.) + user-created custom tags
- **Hangout cards:** 3-column horizontal scroll of glassmorphic cards, each containing:
  - Cover photo area (if no photo uploaded, display a random hex color as fallback)
  - Hangout name (bold, italicized)
  - Description text (lorem ipsum placeholder style in mockup)
  - Tagged username pills at the bottom (frosted capsules with Sloop/Agrandir username text)

#### 4.2.2 Recent Hangouts (Sidequest Feed)

**Layout:** Infinite vertical scroll of completed hangout cards accessed by scrolling below upcoming hangouts.

**Individual Hangout Card:**
- Centered card with rounded corners and soft shadow
- Cover photo with rounded top corners (random hex color if no photo)
- Hangout name + date (side by side, date right-aligned and italicized)
- Description paragraph
- Tagged username pills at bottom
- Interaction: Tap to expand full hangout detail with BeReal verification photos

### 4.3 Sidequests (Hangout Posts)

**Purpose:** The core social post format — verified proof that people actually hung out in real life.

**Creation Flow:**
1. User taps "Create Hangout" in Upcoming Hangouts
2. Fills in: Hangout name, description, date/time, category tags, invited friends
3. Hangout goes live in "Upcoming Hangouts" for all invited users

**Verification Flow (BeReal-Style):**
1. During the hangout, any attendee can initiate verification
2. **All attendees** must post a photo within the flexible duration of the hangout
3. Photos are captured in BeReal style (front + back camera simultaneously, or single capture)
4. Once all attendees have verified, the sidequest is marked as "Completed"
5. Attendees are then encouraged to write about their adventure and add additional photos

**Post-Verification Content:**
- Collaborative photo gallery from all attendees
- Written recaps/stories from participants
- Tagged participants with links to their profiles
- Like (green star) interaction from viewers

### 4.4 Personal Profile

**Two Variants:**
- **Viewing others** (`personal-profile.png`): Shows "Username" header, full stats, and a "Friendship Score" indicator
- **Viewing yourself** (`personal-profile-inner_view.png`): Shows "You" header, same layout

**Layout (Left Side):**
- Avatar in iridescent soap-bubble sphere
- CD/disc icon (top-left of avatar) — functional music element
- Emoji/expression overlay on avatar
- "Friendship Score" frosted pill (only visible when viewing others)

**Layout (Right Side — Glassmorphic Panel):**
- **Username** header (Sloop first letter + Agrandir)
- **Two action buttons:** "INVITE" (to invite to a sidequest) and "STATS"
- **User Description** text area
- **Likes & Flops counters:**
  - Green 4-point star with "likes" label — total likes received on sidequests
  - Red/coral 4-point star with "flops" label — accountability metric
- **Past Hangout Photos:** 2-column grid of recent sidequest cover photos, each with tagged username pills below

**Dragon mascot:** Bottom-left, serves as back button

### 4.5 Profile Song (CD/Disc Feature)

**Purpose:** MySpace-revival feature — users upload an MP3 file and a song plays when someone visits their profile.

**Behavior:**
- CD icon is always visible on profile
- When a visitor lands on the profile, the song auto-plays (with browser autoplay considerations — may require a click-to-play interaction)
- CD spins while music is playing
- Click CD to pause/play
- User uploads any MP3 from their device in profile settings

### 4.6 Accountability Metrics

**Purpose:** Combat flake culture by making reliability visible and social.

**"Flops" Metric — Composed of Two Sub-Metrics:**

| Metric | Definition | Calculation |
|--------|-----------|-------------|
| Flake Percentage | % of accepted hangouts where the user did not show up / did not verify | `(flaked hangouts / total accepted hangouts) × 100` |
| Late Percentage | % of hangouts where the user arrived 20+ minutes late | `(late arrivals / total attended hangouts) × 100` |

**Display:** Combined as the red "flops" star value on the profile. Exact display format TBD (could be averaged, or shown as two separate numbers like "12% flake · 8% late").

**Visibility:** Public on all profiles. Users cannot hide this metric.

### 4.7 Friendship Score

**Purpose:** Quantify the strength of a specific friendship based on real interaction data.

**Calculation Inputs:**
- **Frequency:** Total number of sidequests completed together
- **Recency:** Time since last hangout together (decays over time)
- **Mutual engagement:** Likes and interactions on each other's sidequest posts

**Display:** Shown as a frosted pill labeled "FRIENDSHIP SCORE" on the left side of the profile when viewing another user. Not visible on your own profile.

**Impact:** Determines avatar proximity in the Outersphere social circle — higher scores = closer positioning.

### 4.8 Explore Tab

**Purpose:** Help users discover new connections and real-world hangout venues.

**Two Sections:**

#### Section A: Sponsored Local Businesses (Third Spaces)
- Curated recommendations for cafes, movie theatres, restaurants, parks, and other hangout-friendly venues
- Serves as the non-profit's revenue/sponsorship model — businesses pay to be featured as recommended hangout spots
- Each listing includes: venue name, photo, category, description, and a "Plan a Sidequest Here" CTA
- Tied directly to the mission: drawing people to third spaces where IRL connection happens

#### Section B: People You Might Know
- Profile cards of strangers with shared interests, mutual friends, or geographic proximity
- Each card shows: avatar, username, brief description, shared interest tags
- Action: "Add Friend" or "Invite to Hangout"

### 4.9 Blog

**Purpose:** Long-form personal expression — a space for photos and paragraphs beyond the sidequest format.

**Blog Home (`blog.png`):**
- Header: "Blog" with Sloop/Agrandir treatment
- Two sections divided by a horizontal line:
  - **PUBLIC** (top row): 3 colored folders (pink, yellow, green) — visible to all visitors
  - **PRIVATE** (bottom row): 3 colored folders (blue, purple, red) — visible only to the author
- Each folder is a clickable 3D glossy icon
- Dragon mascot back button in bottom-left

**Inside a Blog Folder (`inside-blog-folder.png`):**
- Folder icon (top-left, smaller)
- "Created by" label with username pill(s)
- Content area: collaboration of photos & paragraphs (rich text + image layout)
- **Single-author only** — each folder belongs to one user
- Dragon mascot back button

### 4.10 Sidequest Invites

**Purpose:** Invite friends to upcoming sidequests directly from their profile or from the hangout creation flow.

**Invite Points:**
- "INVITE" button on any user's profile → opens a selector of your upcoming hangouts to invite them to
- During hangout creation → friend selector to add invitees
- Notification sent to invitees with hangout details and accept/decline actions

---

## 5. Navigation & Interaction Patterns

### 5.1 Dragon Mascot (Back Button)
- Small cartoon dragon character positioned in the bottom-left corner
- Paired with a frosted "back" label pill
- Present on all interior screens (not on the lander)
- Click navigates to the previous screen in the flow

### 5.2 Navbar
- Persistent across all screens (except possibly the lander splash)
- Tabs: Home, Innersphere, Explore, Blog, Profile
- Frosted glass style consistent with the overall design language

### 5.3 Hover & Click States
- **Avatars:** Glow/highlight on hover → navigate to profile on click
- **Buttons:** Subtle glass shimmer on hover, press-down effect on click
- **Cards:** Slight lift/shadow increase on hover
- **Folders:** Scale-up on hover, open animation on click

---

## 6. User Flows

### 6.1 Onboarding
1. User lands on Lander Page ("Sphere — Your Inner Circle")
2. Sign-up / log-in flow
3. Avatar creation: choose body template → customize face accessories → pick body color
4. Profile setup: username, description, optional MP3 upload
5. Friend discovery: import contacts, search by username, or skip to Explore

### 6.2 Creating a Sidequest
1. Navigate to Innersphere → Upcoming Hangouts
2. Tap "Create Hangout"
3. Fill in: name, description, date/time, category tags (choose from curated set or create custom)
4. Select cover photo (optional — defaults to random hex color)
5. Invite friends (search/select from friend list)
6. Publish → hangout appears in all invitees' Upcoming Hangouts

### 6.3 Verifying a Sidequest
1. During the hangout, one attendee initiates verification
2. All attendees receive a prompt to take a BeReal-style photo
3. Photos must be submitted within the duration of the hangout (flexible window)
4. Once all attendees submit → sidequest marked "Completed"
5. Post-hangout: attendees can add written recaps, additional photos
6. Completed sidequest appears in Recent Hangouts feed and on participants' profiles

### 6.4 Viewing a Friend's Profile
1. From Outersphere: hover over friend avatar → click to navigate
2. Profile loads with their avatar in bubble, stats, description
3. If they have a profile song (MP3), it begins playing (CD spins)
4. View their past hangout photos, likes/flops stats
5. Options: Invite to hangout, view friendship score

---

## 7. Technical Considerations

### 7.1 Platform
- **Web application** (desktop-first based on mockup layouts, responsive considerations TBD for future)
- Modern browser support (Chrome, Firefox, Safari, Edge)

### 7.2 Key Technical Challenges
- **Real-time avatar positioning:** Outersphere social circle requires dynamic layout of 10–20 avatars with proximity-based positioning driven by friendship scores
- **BeReal-style photo capture:** Browser-based camera access for verification photos
- **Audio playback:** MP3 profile songs with autoplay policy handling
- **Glassmorphism performance:** Heavy blur and transparency effects need GPU-accelerated CSS (backdrop-filter)
- **Infinite scroll:** Recent hangouts feed with lazy loading

### 7.3 Data Model (High-Level)
- **User:** username, avatar config, description, MP3 file, flake %, late %
- **Friendship:** user pair, friendship score (calculated), sidequest count, last hangout date
- **Sidequest:** name, description, date, category tags, cover photo, status (upcoming/active/completed), invited users, verification photos
- **Blog:** folders (public/private), posts (text + images), author
- **Explore listings:** business name, category, photos, description, sponsorship tier

---

## 8. Success Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Sidequests completed per user/month | ≥ 3 | Core engagement — are people actually hanging out? |
| Verification completion rate | ≥ 80% | Are both parties showing up and verifying? |
| Average flake percentage (platform-wide) | ≤ 15% | Is the accountability system working? |
| Friend connections per user | ≥ 10 | Is the social graph growing? |
| Explore → Sidequest conversion | ≥ 5% | Are sponsored venues driving real hangouts? |
| Blog posts per active user/month | ≥ 1 | Is the expressive layer being used? |

---

## 9. Open Questions & Future Considerations

1. **Notifications system:** Push notifications for sidequest invites, verification prompts, friend requests — what channels? (Browser notifications, email, SMS?)
2. **Moderation:** How are inappropriate photos, descriptions, or usernames handled?
3. **Privacy controls:** Beyond public/private blogs, can users control who sees their flops metric or profile song?
4. **Mobile responsive:** Is a mobile-responsive version planned for V2, or does this remain desktop-only?
5. **Gamification expansion:** Badges, streaks, sidequest milestones — planned for future iterations?
6. **Group sidequests:** Maximum attendee count? Can sidequests be open (anyone can join) vs. invite-only?
7. **Flops dispute:** Can a user contest a flake/late mark? What's the appeals process?
8. **Avatar accessory unlocks:** Are accessories earned through sidequests, or all available from the start?
9. **Explore algorithm:** How are "People You Might Know" ranked — mutual friends, shared interests, location, or a blend?

---

## 10. Appendix: Screen Reference Map

```
┌─────────────────────────────────────────────────────┐
│                   MAIN FLOW                         │
│                                                     │
│  Lander ──► Outersphere ──► Social Circle           │
│                                  │                  │
│                                  ▼                  │
│                          Personal Profile           │
│                          (other user)               │
│                                  │                  │
│                                  ▼                  │
│                          Innersphere                │
│                                  │                  │
│                                  ▼                  │
│                       Upcoming Hangouts             │
│                                  │                  │
│                                  ▼                  │
│                    Recent Hangouts (feed ∞)         │
│                                                     │
├─────────────────────────────────────────────────────┤
│                 NAVBAR TABS                         │
│                                                     │
│  [A] Your Profile (inner view)                      │
│  [B] Blog ──► Inside Blog Folder                    │
│  [C] Explore (businesses + people discovery)        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

*This document is a living spec and should be updated as design decisions are finalized and development progresses.*
