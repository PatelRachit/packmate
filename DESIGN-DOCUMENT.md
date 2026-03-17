# PackMate - Design Document

## Project Description

Travelers waste hours researching what to pack, often forgetting essentials or over-packing for the wrong climate — especially students going abroad or taking their first solo trip. PackMate solves this by letting travelers build and manage structured packing lists for their trips while the community contributes and upvotes real-world packing tips per trip type.

Users create a trip by entering their destination, climate, trip type, and duration, then manually build their packing list by selecting from a categorized master items database (Clothing, Electronics, Toiletries, Documents, Activity Gear) and adding custom items. Community members who've traveled to similar destinations can share and upvote packing tips, which appear alongside each trip's list.

---

## User Personas

### Sarah
- CS junior studying abroad in Europe for a semester
- Needs a carry-on-only packing list for cold weather and business casual settings
- Frustrated by generic packing blogs that don't match her specific trip duration and climate
- Wants to see what other students studying abroad actually packed

### Marcus
- Freshman taking his first solo beach trip
- Overwhelmed by packing and unsure where to start
- Wants to browse what experienced travelers recommend for beach trips
- Needs simple, clear suggestions without information overload

### Priya
- Graduate student organizing a group hiking trip
- Needs a structured gear checklist covering all essentials
- Wants advice from people who've done similar trips
- Values community-verified tips over generic packing lists

### Alex
- Budget backpacker hopping between multiple countries
- Needs minimalist lists and proven tips for long multi-destination travel
- Wants to filter tips by trip type quickly without browsing irrelevant content
- Contributes tips back to the community after each trip

---

## User Stories

### Rachit's Implementation (Trips & PackingItems)

1. As a traveler, I want to create a trip by entering destination, climate, type, and duration, so I have a dedicated space to build my packing list.

2. As a traveler, I want to view all my trips in a dashboard, so I can manage multiple upcoming trips at once.

3. As a traveler, I want to update my trip details (dates, luggage type, destination), so my trip information stays accurate as plans change.

4. As a traveler, I want to delete a trip I've cancelled, so my dashboard only shows relevant trips.

5. As a traveler, I want to browse master packing items by category (Clothing, Electronics, Documents), so I can pick relevant items and add them to my trip list.

6. As a traveler, I want to add custom items not in the master list, so I can personalize my packing list for specific needs.

7. As a traveler, I want to check off items as I pack them, so I can track my packing progress with a completion percentage.

8. As an admin, I want to add/edit/delete master packing items in the database, so the item catalog stays accurate and up to date.

### Prajakta's Implementation (Users & CommunityTips)

1. As a traveler, I want to create an account, so I can save trips and contribute community tips.

2. As a traveler, I want to log in securely, so my trip data and profile are protected.

3. As a traveler, I want to submit a packing tip tagged to a specific trip type and climate, so other travelers with similar trips can benefit from my experience.

4. As a traveler, I want to browse community tips filtered by trip type (beach, hiking, business), so I find advice relevant to my journey.

5. As a traveler, I want to upvote tips I found genuinely useful, so the best advice rises to the top for future travelers.

6. As a traveler, I want to remove an upvote I placed accidentally, so vote counts stay accurate.

7. As a traveler, I want to view all tips I've submitted in one place, so I can track my community contributions.

8. As a traveler, I want to log out, so my session is secure.

---

## Design Mockups

### 1. Home / Navigation
```
+-----------------------------------------------+
|  🧳 PackMate                [Community Tips] [Users] [Trips] |
+-----------------------------------------------+
|                                               |
|   Welcome to PackMate                         |
|   Your collaborative travel packing app       |
|                                               |
|   [Browse Community Tips]  [Create a Trip]   |
|                                               |
+-----------------------------------------------+
```

### 2. Community Tips Page
```
+-----------------------------------------------+
|  🧳 PackMate                                  |
+-----------------------------------------------+
|  Community Packing Tips                       |
|                                               |
|  Filter by trip type: [Beach ▼]              |
|                                               |
|  +------------------------------------------+|
|  | 🏖 Beach  — by Marcus                    ||
|  | "Pack reef-safe sunscreen, you'll need   ||
|  |  it every single day."                   ||
|  | 👍 42   [Edit] [Delete]                  ||
|  +------------------------------------------+|
|  +------------------------------------------+|
|  | 🏖 Beach  — by Sarah                     ||
|  | "A dry bag is worth every penny for      ||
|  |  keeping your phone safe."               ||
|  | 👍 38   [Edit] [Delete]                  ||
|  +------------------------------------------+|
|                                               |
|  -- Add a Tip --                             |
|  Trip Type: [Select ▼]                       |
|  Your Name: [____________]                   |
|  Tip:       [________________________]       |
|             [________________________]       |
|  [Add Tip]                                   |
+-----------------------------------------------+
```

### 3. Users Page
```
+-----------------------------------------------+
|  🧳 PackMate                                  |
+-----------------------------------------------+
|  Users                                        |
|                                               |
|  -- Add User --                              |
|  Name:      [____________]                   |
|  Email:     [____________]                   |
|  Home City: [____________]                   |
|  [Add User]                                  |
|                                               |
|  +------------------------------------------+|
|  | Sarah Chen — sarah@mail.com — Boston     ||
|  |                    [Edit] [Delete]        ||
|  +------------------------------------------+|
|  +------------------------------------------+|
|  | Marcus Lee — marcus@mail.com — New York  ||
|  |                    [Edit] [Delete]        ||
|  +------------------------------------------+|
+-----------------------------------------------+
```

### 4. Trips Dashboard (Rachit)
```
+-----------------------------------------------+
|  🧳 PackMate                                  |
+-----------------------------------------------+
|  My Trips                                     |
|                                               |
|  [+ Create New Trip]                         |
|                                               |
|  +------------------------------------------+|
|  | 🌍 Europe Semester Abroad                ||
|  | Cold · Business · 120 days               ||
|  | Progress: ████████░░ 80%                 ||
|  |              [View] [Edit] [Delete]       ||
|  +------------------------------------------+|
|  +------------------------------------------+|
|  | 🏖 Cancun Beach Trip                     ||
|  | Tropical · Beach · 7 days                ||
|  | Progress: ███░░░░░░░ 30%                 ||
|  |              [View] [Edit] [Delete]       ||
|  +------------------------------------------+|
+-----------------------------------------------+
```

### 5. Trip Packing List (Rachit)
```
+-----------------------------------------------+
|  🧳 Europe Semester Abroad                    |
|  Cold · Business · 120 days                   |
+-----------------------------------------------+
|  Packing Progress: ████████░░ 80% (16/20)    |
|                                               |
|  Clothing                                     |
|  [x] Wool coat                               |
|  [x] Business casual shirts (x3)             |
|  [ ] Thermal underlayers                     |
|                                               |
|  Electronics                                  |
|  [x] Laptop + charger                        |
|  [x] Universal power adapter                 |
|  [ ] Portable battery pack                   |
|                                               |
|  + Add custom item: [___________] [Add]      |
+-----------------------------------------------+
```

---

## Database Schema

### Users Collection (Prajakta)
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "submittedTips": ["tipId"],
  "upvotedTips": ["tipId"],
  "currentActiveTripId": "tripId",
  "createdAt": "Date"
}
```

### CommunityTips Collection (Prajakta)
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "authorId": "ObjectId",
  "tripTypeTags": ["beach", "hiking", "city", "winter", "business"],
  "climateTags": ["tropical", "cold", "dry", "temperate"],
  "upvoteCount": "number",
  "upvotedBy": ["userId"],
  "isVerified": "boolean",
  "isFeatured": "boolean",
  "createdAt": "Date"
}
```

### Trips Collection (Rachit)
```json
{
  "_id": "ObjectId",
  "tripName": "string",
  "destination": "string",
  "climate": "string",
  "tripType": "string",
  "luggageType": "string",
  "durationDays": "number",
  "startDate": "Date",
  "endDate": "Date",
  "status": "string",
  "items": [
    {
      "itemId": "ObjectId",
      "isChecked": "boolean",
      "isCustom": "boolean",
      "customName": "string"
    }
  ]
}
```

### PackingItems Collection (Rachit)
```json
{
  "_id": "ObjectId",
  "name": "string",
  "category": "Clothing | Electronics | Toiletries | Documents | Activity Gear",
  "climateTags": ["tropical", "cold", "dry"],
  "tripTypeTags": ["beach", "hiking", "business"],
  "isEssential": "boolean"
}
```

---

## Technical Architecture

```
+------------------+        AJAX/Fetch        +-------------------+
|   React Frontend |  ─────────────────────>  |  Express Backend  |
|   (Vite, Hooks)  |  <─────────────────────  |  (Node.js)        |
+------------------+        JSON              +-------------------+
                                                       |
                                              +-------------------+
                                              |  MongoDB Atlas    |
                                              |  - users          |
                                              |  - communityTips  |
                                              |  - trips          |
                                              |  - packingItems   |
                                              +-------------------+
```