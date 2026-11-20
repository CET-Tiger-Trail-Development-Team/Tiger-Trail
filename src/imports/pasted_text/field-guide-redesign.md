Redesign the Field Guide entry card (FieldGuide.tsx) to add visual depth. 
The current cards are flat: every surface sits at nearly the same value, 
there is no elevation separation, and the content reads as one uniform 
slab of bullets. Keep all existing content, categories, XP logic, and 
trophy behavior. This is a presentation change only.

Do not use photographs. Every card uses a solid color header.

## Card container

  - border-radius: 16px
  - overflow: hidden (the header color must clip to the rounded corners)
  - background: the card surface token (one full step lighter than the 
    page background — if they currently look the same, widen that gap)
  - Two stacked shadows, not one:
      0 1px 2px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)
    The tight shadow reads as contact, the wide one as elevation. A single 
    soft shadow reads as a flat sticker.
  - No border on the card itself. The shadow does the separating.

## Header block

A solid fill in the entry's category color, occupying the top of the card.

  - padding: 18px 20px 20px
  - position: relative (the corner icon is absolutely positioned inside it)
  - background: the category's strong color (full saturation, not a tint)

Contents, top to bottom:

  1. Category label
     - 10px, letter-spacing 0.6px, uppercase
     - Color: the category's LIGHT tint (not white, not the strong color).
       This is what keeps it legible but subordinate to the title.
     - 8px bottom margin

  2. Entry title
     - 21px, weight 500, line-height 1.2, white
     - No truncation. Let it wrap to two lines if needed.

  3. Corner icon
     - Absolutely positioned, top 16px, right 16px
     - 34px circle, background rgba(255,255,255,0.16)
     - Icon inside at 18px, white, centered
     - Add an optional icon field to the entry type in data.ts so each 
       entry names its own icon. Fall back to a per-category default icon 
       if an entry does not specify one.

Category color pairs (strong fill / light tint):
  Survival    #0F6E56 / #E1F5EE
  Navigation  #185FA5 / #E6F1FB
  Lore        #993C1D / #FAECE7
  MCET        #534AB7 / #EEEDFE
  Safety      #791F1F / #FCEBEB

## Body block

padding: 16px 20px 18px

### 1. Stat tiles (optional, conditional)

A row of up to two tiles pulling the most concrete numbers from the entry.

  - display: flex, gap 10px, margin-bottom 14px
  - Each tile: flex 1, background = the surface tint one step up from the 
    card surface, border-radius 10px, padding 10px 12px
  - Tile value: 22px, weight 500, line-height 1
  - Tile label: 11px, secondary text color, 3px top margin

Add an optional stats field to the entry type, e.g.
  stats?: { value: string; label: string }[]

Conditional rendering rules, which matter because not every entry has 
numbers:
  - Two stats: render both tiles side by side
  - One stat: render a single full-width tile
  - Zero stats or field absent: omit the tile row entirely and let the 
    fact rows start directly beneath the header

Do not invent numbers to fill tiles. Narrative entries like "Brick City" 
or "The Quarter Mile" should simply render without a tile row.

### 2. Fact rows

Replaces the current bullet list. Aim for three rows, never more than four.

Each row:
  - display: flex, gap 10px, align-items flex-start
  - 9px gap between rows
  - Leading marker: 22px circle, flex-shrink 0, 1px top margin
      background: the category's LIGHT tint
      icon inside at 13px in the category's STRONG color
  - Text: 13px, line-height 1.5
      The lead phrase in weight 500 and primary text color
      The explanation in regular weight and secondary text color
      Both on the same line, flowing as one sentence

Add an optional icon per fact row, defaulting to a check icon if unset.

This structure is the point: four identical bullets read as a wall, three 
rows with distinct icons and a bolded lead phrase read as scannable.

### 3. Tip callout (optional)

For entries that have a practical tip:
  - margin-top 14px
  - border-left: 3px solid #EF9F27
  - background #FAEEDA
  - padding 9px 12px
  - 12px text, color #633806
  - border-radius: 0 6px 6px 0

Note the asymmetric radius. Rounded corners on a single-sided border look 
broken, so only the right corners round.

Render only when the entry has a tip. Omit the block entirely otherwise.

### 4. Footer row

  - margin-top 14px, border-top 0.5px hairline, padding-top 12px
  - display flex, space-between, align-items center
  - Left: XP status, 12px, in the category's strong color, with a small 
    circle-check icon. Shows "+10 XP earned" once read, or the unearned 
    state before that.
  - Right: a small secondary button linking to the entry's resource URL, 
    with an external-link icon. Render only when the entry has a link.

## Data model additions

All new fields optional so existing entries render without modification:

  icon?: string
  stats?: { value: string; label: string }[]
  facts?: { icon?: string; lead: string; detail: string }[]
  tip?: string

If an entry has no facts array, fall back to rendering its existing body 
content in the same padded body block. Do not break entries that have not 
been migrated yet.

## Constraints

  - No photographs, no image fields, no gradients anywhere except the 
    single scrim-free solid header fill
  - Do not change theme.css tokens, the type scale, or the spacing scale, 
    except to widen the value gap between page background and card surface 
    if they currently render at nearly the same lightness
  - Every color pairing above must remain legible in dark mode. The 
    category strong colors are dark enough that white text works in both 
    modes, but verify the light tints used for the category label and the 
    fact row circles do not wash out
  - Do not touch Auth.tsx, Onboarding.tsx, Map.tsx, Calendar.tsx, or the 
    Trail Map
  - Keep the existing XP award timing and trophy conditions exactly as 
    they are