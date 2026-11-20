Reorganize the Tiger Trail navigation and Field Guide into a grouped 
information architecture. Do not change any content, data, or styling 
tokens. This is a structural and navigational change only.

## 1. Sidebar: group the six nav items into three labeled clusters

In the left sidebar component (currently rendering the flat list: Trail Map, 
Field Guide, Campus Map, Clubs, Calendar, Profile), replace the flat list 
with three groups. Keep every existing route, icon, and active state exactly 
as they are.

Group 1 label: "My path"
  - Trail Map (existing route /trail or current path)
  - Profile (existing route /profile)

Group 2 label: "Explore RIT"
  - Field Guide (/guide)
  - Campus Map (/campus)
  - Clubs (/clubs)

Group 3 label: "Stay current"
  - Calendar (/calendar)

Group label styling:
  - 11px, uppercase-off (sentence case), color: muted/tertiary text token
  - 8px horizontal padding to align with nav item text
  - 14px top margin above each group except the first, 6px bottom margin
  - Labels are NOT clickable, NOT focusable, and have no hover state
  - Render as a non-interactive <div> or <span>, not a button or link

Accessibility: wrap each group in a <nav> section or use role="group" with 
aria-label set to the group label text, so screen readers announce the 
grouping. Keep the existing keyboard tab order (top to bottom, unchanged).

Do not add, remove, rename, or reorder any nav destination. The only change 
is inserting three text labels and adjusting vertical spacing.

## 2. Field Guide: add a "Safety" filter category

In FieldGuide.tsx, the filter tab row currently renders: All, Survival, 
Navigation, Lore, MCET.

Add a sixth tab, "Safety", positioned last in the row (after MCET).

- It must behave identically to the existing category tabs: same click 
  handler, same active/inactive pill styling, same filtering logic
- Add "safety" as a valid category value wherever the existing categories 
  (survival, navigation, lore, mcet) are typed or enumerated, including 
  the TypeScript union/enum in data.ts and any filter state in store.ts
- Assign it a distinct category color following the same pattern the other 
  categories use for their label color and card accent
- The tab row must wrap gracefully on narrow widths rather than overflow 
  horizontally. Use flex-wrap, not a horizontal scroll container

If no entries currently carry the "safety" category, the tab should render 
an empty state consistent with how the app handles an empty filter result. 
Do not create placeholder content.

## 3. Field Guide cards: add cross-link actions

Each Field Guide entry card currently shows: category label, title, short 
description, and a "Read Secret" affordance.

Add a row of secondary action buttons beneath the description, above or 
beside the existing Read affordance. Two new conditional actions:

a) "Show on map"
   - Renders only when the entry has an associated map location
   - Add an optional field to the Field Guide entry type in data.ts, e.g. 
     mapLocationId?: string (or lat/lng pair, matching whatever shape 
     Map.tsx already consumes for its pins)
   - On click: navigate to the Campus Map route and pass the location so 
     the map centers on and highlights that pin. Use the existing router 
     (routes.tsx) with either a route param or query string, e.g. 
     /campus?focus={mapLocationId}
   - Map.tsx should read that param on mount and, if present, center the 
     map on that location and visually emphasize the matching marker
   - If the param is absent or does not match a known location, Map.tsx 
     falls back to its current default view with no error

b) "Related quest"
   - Renders only when the entry has an associated quest
   - Add an optional field, e.g. relatedQuestId?: string, referencing the 
     existing quest identifiers already used in the Trail Map / Quest Bank
   - On click: navigate to the Trail Map route and scroll to / highlight 
     that quest node, e.g. /trail?quest={relatedQuestId}
   - Same graceful fallback if the id is unknown

Both buttons:
  - Secondary/ghost styling, smaller than the primary Read affordance
  - Include a small leading icon (map pin for Show on map, trail/map icon 
    for Related quest)
  - Have accessible labels; if space forces an icon-only version, keep an 
    aria-label with the full text
  - Never render as disabled. If the entry has no linked location or quest, 
    omit the button entirely

Important layout constraint: the Field Guide grid currently renders three 
columns. Adding two action buttons per card may crowd that. Implement the 
action row so it wraps, and reduce to two columns at the breakpoint where 
three columns plus the action row would cause text truncation or button 
overlap. Do not let buttons overflow the card boundary.

## 4. Calendar: distinguish event scope

In Calendar.tsx, add a visual scope indicator to each event.

- Add an optional field to the event type, e.g. scope?: 'mcet' | 'campus'
- Render a small pill or tag on each event row and in each calendar cell 
  entry showing its scope, using the same badge pattern the app already 
  uses elsewhere
- Events with no scope value render with no badge rather than a default 
  one, so unlabeled data is not silently mislabeled
- Add a filter control above the calendar allowing the user to show all 
  events, MCET-only, or campus-wide. Default to showing all

## 5. Constraints across all changes

- Do not modify theme.css tokens, the color palette, typography, or spacing 
  scale. Reuse existing tokens only
- Do not change Auth.tsx, Onboarding.tsx, ITDashboard.tsx, or 
  PeerMentorDashboard.tsx
- Do not alter existing route paths. Only add optional query params
- All new fields on existing types must be optional so current data 
  continues to render without modification
- Preserve existing XP, progress tracking, and trophy logic untouched
- Every new interactive element must be keyboard accessible and have a 
  visible focus state matching existing controls
- Maintain the current light/dark behavior if present