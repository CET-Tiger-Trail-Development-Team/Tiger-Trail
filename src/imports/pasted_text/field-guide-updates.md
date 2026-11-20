Populate the Field Guide with new entries and add two new categories. This 
is a content and data change. Do not modify the card component's visual 
design, the deck mechanics, or the XP and trophy logic.

## 1. Add two categories

Extend the category type in data.ts (currently survival, navigation, lore, 
mcet, safety) with one more:

  accessibility

Color pair, matching the existing pattern (strong fill / light tint):
  Accessibility  #0C447C / #E6F1FB

Rationale for a dedicated category rather than folding into Survival: RIT 
hosts NTID, and accessibility content here is substantial and distinct 
(disability services, interpreter and captioning requests, accommodations, 
neurodivergent support, physical access routing). Burying it inside 
Survival hides it from the students who most need it.

Add the deck chip for it in the same style as the others.

## 2. Add a last_verified field

Add to the Field Guide entry type:

  lastVerified?: string   (ISO date, e.g. "2026-09-18")

Render it as small muted text (11px, muted token) at the very bottom of 
the card back, formatted as "Verified September 2026". Omit the line 
entirely when the field is absent.

Reason: several of these resources are student-maintained and go stale. 
One linked map is already out of date and one student site is inactive. 
This field lets a future staleness check flag entries that have not been 
reviewed in a while.

## 3. New entries

Each entry follows the existing shape: category, title, icon, optional 
stats (up to two), facts (three, each with lead phrase and detail), 
optional tip, optional resource link, lastVerified.

Where a stat would require inventing a number, omit the stats array 
entirely rather than fabricating one.

### SURVIVAL

Entry: Dining dollars and Tiger Spend
  icon: wallet
  stats: [{ value: "$0", label: "refunded at year end" }]
  facts:
    - Three currencies | Dining dollars are tax-exempt and food-only. 
      Tiger Bucks are taxed but work for laundry, printing, and the 
      bookstore. Gracie's meals are entrance swipes.
    - Nothing comes back | Unused dining dollars are forfeited at the end 
      of the year. You can add money, never withdraw it.
    - Top up anywhere | Add funds through the Tiger Spend site or the 
      orange kiosks near dining locations.
  tip: Many students pick the basic Roar plan and add money as they go, 
    rather than over-buying up front.
  link: https://tigerspend.rit.edu/

Entry: Laundry lives in the tunnels
  icon: wash-machine
  facts:
    - Where | Dormside laundry rooms are in the tunnel system beneath the 
      residence halls.
    - Set an alarm | Students will move your clothes if a machine sits 
      finished. Come back promptly.
    - Detergent matters | Do not use Tide pods or beaded detergent in 
      these machines.

Entry: What you cannot bring to a dorm
  icon: ban
  facts:
    - No cooking appliances | Nothing but an auto-shutoff coffee or tea 
      maker. No hot plates, air fryers, or toasters, even with automatic 
      shutoff.
    - No kitchen access | Dorms have none without a dietitian 
      accommodation, and you still cannot opt out of the meal plan.
    - Other restrictions | No substances, no pets except approved ESAs and 
      fish, no tapestries or ceiling attachments.
  link: https://www.rit.edu/housing/

Entry: Mail and packages
  icon: package
  stats: [{ value: "3", label: "campus mailrooms" }]
  facts:
    - Three locations | The DSP mail office on dormside, one at RIT Inn, 
      and the Global Village mail office.
    - Use the closest one | Your packages route to the mailroom nearest 
      your housing assignment.
    - Format matters | RIT publishes a specific address format for student 
      mail. Follow it or your package may not route correctly.

Entry: Parking on campus
  icon: car
  facts:
    - Permit required | You must buy a permit for the semester or year to 
      park on campus.
    - Lots are assigned | Dorm residents park in lots B and K. Residence 
      Hall A, Kate Gleason, and Frances Baker residents can use lot C.
    - Some housing excludes parking | 175 Jefferson and Perkins Green 
      residents cannot park on the main campus.

Entry: Free food and clothing
  icon: heart-handshake
  facts:
    - RIT FoodShare | A free food pantry open to the whole community, 
      including vegan and gluten-free items.
    - Bern's Closet | Free professional clothing for interviews and career 
      fairs, plus winter coats, hats, gloves, and boots.
    - No cost, no questions | Both are free to community members. You 
      check out at the front desk.
  link: https://www.rit.edu/lead/rit-foodshare

Entry: Getting your account working
  icon: key
  facts:
    - RIT Start | Where you change your password, add devices to the 
      network, and set up Duo.
    - Duo is mandatory | Two-factor authentication is required for 
      myCourses, SIS, and every secure RIT site.
    - Help Center | Submit a ticket at help.rit.edu when something breaks, 
      rather than emailing individual staff.

### NAVIGATION

Entry: The tunnel system
  icon: arrow-down-circle
  stats: [{ value: "2", label: "separate networks" }]
  facts:
    - Two networks | One connects the residence halls, the other connects 
      academic buildings. They are not joined.
    - What's down there | The dorm tunnels hold the post office, laundry, 
      and convenience stores.
    - Winter route | Download the tunnel map before the first snow. It is 
      the difference between a five-minute walk and a cold one.

Entry: Reserve a study room
  icon: calendar-check
  stats: [{ value: "30+", label: "bookable rooms in Wallace" }]
  facts:
    - Wallace Library | More than thirty study rooms, bookable up to two 
      weeks ahead for groups or solo work.
    - Also NTID | Reservable spaces exist on the NTID side as well.
    - Book early | Rooms fill fast during midterms and finals weeks.
  link: https://reserve.rit.edu/

Entry: Getting off campus
  icon: bus
  facts:
    - Free shuttles | Loop to Wegmans, Target, and Marketplace Mall in 
      Henrietta at no cost.
    - Track them live | The Tripshot app shows shuttle locations, routes, 
      and service updates in real time.
    - Downtown needs a car | Shuttles stay local to Henrietta. South 
      Wedge, Park Avenue, and the Public Market need a car or rideshare.

### LORE

Entry: Brick City
  icon: building-arch
  facts:
    - One design | Campus was built in the late 1960s with a single 
      unified brick architectural plan.
    - The nickname stuck | It earned RIT the name Brick City, now also the 
      name of homecoming weekend.
    - Look closer | Student-run projects like the RIT Iceberg and 
      Tunnelvisionaries document the campus's stranger corners.

Entry: Deaf culture at RIT
  icon: hand-finger-right
  stats: [{ value: "1st", label: "and largest technical college for Deaf students" }]
  facts:
    - NTID is here | The National Technical Institute for the Deaf shares 
      this campus. You will have Deaf and hard-of-hearing classmates.
    - Talk to the person | If someone has an interpreter, speak to them, 
      not the interpreter. Get attention with a hand wave in their line of 
      sight, never a clap or snap.
    - Learn some sign | No Voice Zone meets weekly at every skill level. 
      Learn from Deaf people and Deaf resources when you can.
  tip: Not all Deaf and hard-of-hearing people sign, and not all read lips. 
    There is no single way people communicate.
  link: https://www.rit.edu/ntid/

Entry: Traditions worth showing up for
  icon: confetti
  facts:
    - TigerFest | A week-long welcome festival opening the fall semester, 
      with fireworks.
    - Brick City Homecoming | Mid-October. Families, alumni, and 
      college-specific mixers where you can meet faculty outside class.
    - Imagine RIT | A spring innovation festival with hundreds of student 
      exhibits across the entire campus.

### MCET

Entry: The 45-mile rule
  icon: ruler-measure
  stats:
    - { value: "45 mi", label: "minimum distance to qualify" }
    - { value: "50%", label: "fall rent to hold your room" }
  facts:
    - RIT housing | Break or pause your contract for free, but only if the 
      co-op is more than 45 miles from campus.
    - Private complexes | Twelve-month lease. Park Point, Province, Apex 
      and others will not pause it. You must find a subletter.
    - Spring is harder | No hold option in spring, and hundreds of 
      students leave at once, flooding the sublet market.
  tip: Local or virtual co-ops do not qualify. You keep paying your normal 
    contract.

Entry: Immersions and minors
  icon: books
  facts:
    - Immersion is required | Every RIT student completes a set of courses 
      in a subject outside their major.
    - Minors are optional | They complement your major and signal depth to 
      employers.
    - There is a fair | The Immersion and Minor Fair runs each fall. You 
      can sign up on the spot.
  link: https://www.rit.edu/study/immersions-and-minors

Entry: Study abroad
  icon: world
  stats:
    - { value: "600+", label: "programs" }
    - { value: "60+", label: "countries" }
  facts:
    - Every major qualifies | With the right plan, any RIT major can study 
      abroad. Start with your advisor.
    - Global campuses | RIT Dubai, RIT Croatia, and RIT Kosovo are the 
      most seamless option for staying on track.
    - Go to a 101 session | Led by students who have returned. Offered 
      several times a week.

### SAFETY

Entry: TigerSafe and blue lights
  icon: shield
  facts:
    - Virtual blue light | The TigerSafe app summons immediate help and 
      shares your location with Public Safety.
    - Request a walk | You can ask for a Public Safety officer to walk you 
      to your dorm or class at any hour.
    - Save the numbers | Emergency 585-475-3333. Text line 585-205-8333. 
      Put both in your phone before you need them.

Entry: Walking safely at night
  icon: walk
  facts:
    - Stay on lit paths | The Quarter Mile and the center of campus are 
      the best-lit routes. Some paths are much darker.
    - Keep one ear open | If you wear headphones alone, leave one out or 
      turn off noise cancellation.
    - Share your location | With people you trust, or just tell someone 
      when you expect to be back.

### ACCESSIBILITY

Entry: Disability Services
  icon: accessible
  facts:
    - myDSO | The portal where you request academic, housing, and dining 
      accommodations.
    - Start early | Accommodations take time to process. Do not wait until 
      a deadline is already a problem.
    - Housing and dining too | Accommodations cover more than exams. 
      Severe food allergies can qualify for a reduced meal plan or private 
      kitchen access.
  link: https://www.rit.edu/disabilityservices/

Entry: Interpreters and captioning
  icon: hand-finger-right
  facts:
    - Access Services | Request interpreters or real-time captioning for 
      classes, meetings, and events.
    - Not just for class | Coverage extends to campus events and club 
      meetings, not only lectures.
    - Tiger Chat | An app built to make quick back-and-forth with Deaf 
      students easier when signing is not an option.

Entry: Spectrum Support Program
  icon: users
  facts:
    - Who it serves | Support and community for autistic and 
      neurodivergent students.
    - What it offers | Coaching, peer connection, and structured support 
      alongside academic accommodations.
    - Separate from DSO | You can use both. They serve different needs.
  link: https://www.rit.edu/spectrumsupport/apply

Entry: Getting around campus accessibly
  icon: map-pin
  facts:
    - CampusPulse access map | A student-built interactive map of 
      elevators and accessible routes across campus.
    - Floor plans | Official building and residence hall floor plans are 
      published, some behind RIT login.
    - Ask about housing | Accessible room layouts exist, including units 
      with private bathrooms and kitchens.

## 4. Starter deck

Add a curated onboarding deck that pulls specific entries across 
categories in a fixed order, rather than being a category filter.

  - Name it "Start here" and place its chip first in the deck selector, 
    visually distinguished from category chips (for example a neutral fill 
    rather than a category color)
  - It references existing entries by id. Do not duplicate entry content.
  - Reading an entry through the starter deck marks it read everywhere. 
    The starter deck is a view, not a separate copy.
  - Suggested order: Getting your account working, Find your classrooms, 
    Dining dollars and Tiger Spend, The tunnel system, TigerSafe and blue 
    lights, Deaf culture at RIT, What you cannot bring to a dorm, 
    Traditions worth showing up for
  - Once every entry in it is read, the chip shows a completed state and 
    moves to the end of the chip row

## 5. Constraints

  - Do not change the card visual design, the deck drag mechanics, the XP 
    award timing, or the trophy conditions
  - All new fields optional. Existing entries must render unchanged
  - Every fact's lead phrase should be three words or fewer where possible, 
    and each detail should be one sentence
  - Do not invent statistics. If an entry has no real number, omit stats
  - Do not add photographs or image fields
  - Verify the accessibility category's color pair is legible in dark mode