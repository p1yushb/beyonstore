# Beyon Store Locator Execution Plan

This document outlines the architectural and design plan for the Beyon Jewels store locator project.

---

## 1. Page & Section Breakdown
The project will be structured as a single-page application (SPA) style layout with conditional views or a multi-page structure for the deeper detail views.

### A. Store Locator (Main Search Page)
- **Hero Section**: High-impact lifestyle visual (Reduced height).
- **Search & Filter Bar**: Compact, functionally dense area below the hero.
- **City Selector Row**: Scrollable row of city icons/labels.
- **Store List Grid**: Dynamic listing of store cards.

### B. Store Detail View
- **Action Bar**: Fixed/Sticky top bar with quick actions (Icon-only Call #3c3c3c, Directions, Book An Appointment #D30B39).
- **Core Info Section**: Name, status, rating, reviews.
- **Logistics Section**: Hours table, Parking info, Languages.

### C. Appointment Booking
- **Booking Interface**: Focused form layout with clear step-by-step progression.

---

## 2. Component Hierarchy
- **`Layout`**: Wrapper for max-width and background.
- **`Hero`**: Image + Gradient Overlay + Text.
- **`FilterGroup`**:
    - `SearchBar`: Input + Icon.
    - `LocationButton`: "Use my location" trigger.
- **`CityPicker`**: List of city tiles.
- **`StoreCard`**: (Entire card clickable for Store Details)
    - `Badge`: Status indicator (Open/Closed).
    - `CardContent`: Name, address, hours.
    - `ButtonContainer`: CTA row (Book An Appointment #D30B39, Directions, Icon-only Call #3c3c3c).
- **`BookingForm`**: Input fields + Dropdowns + Textarea.

---

## 3. Colour & Typography System
Refining the provided brand assets for web:

| Role | Colour Name | Hex Code |
| :--- | :--- | :--- |
| **Primary BG** | White | `#FFFFFF` |
| **Primary Text** | Charcoal Grey | `#3C3C3C` |
| **Brand Accent** | Beyon Red | `#D30B39` |
| **Secondary Accent** | Gold | `#C5A576` |
| **Border/Dividers** | Lace Pink | `#FFE8ED` |

### Typography
- **Headings (Editorial)**: Serif font (e.g., *Playfair Display*). High contrast, elegant.
- **Body & Controls**: Sans-serif font (e.g., *Inter* or *Inter Tight*). Clean, modern, high legibility.
- **Nav/Labels**: Uppercase with `letter-spacing: 0.05em` to mirror the premium site nav.

---

## 4. Layout Strategy
- **Hero Section**: `min-height: 40vh` (50% reduction) for streamlined impact.
- **City Tiles**: `display: flex; gap: 1.5rem; overflow-x: auto;` with custom scroll bar or hidden scroll for "clean" mobile look.
- **Grid Strategy**: 
    - `display: grid; grid-template-columns: repeat(3, 1fr);` (Desktop)
    - `grid-template-columns: repeat(2, 1fr);` (Tablet)
    - `grid-template-columns: 1fr;` (Mobile)
- **Padding**: 5% horizontal padding on desktop to maintain white space.

---

## 5. CSS Architecture Approach
- **Vanilla CSS**: No frameworks, ensuring maximum performance and alignment with the user's request.
- **Custom Properties (Variables)**: Centralized definition of colors, font sizes, and spacing.
- **Box Model**: `border-box` sizing globally.
- **Modular CSS**: Separating layout styles (`layout.css`) from component styles (`components.css`).
- **Modern Features**: CSS Grid and Flexbox for responsiveness; `:hover` states for interactivity (gold glow or subtle lift).

---

## 6. Interaction Hooks (Future JS Implementation)
*The following hooks will be defined in HTML for later functionality:*

1.  **`onsearchinput`**: Triggered on search bar typing to filter listed stores.
2.  **`onclickusemylocation`**: To request GPS coordinates and sort/filter by proximity.
3.  **`oncitytileclick`**: To set the current city filter.
4.  **`onopenbooking`**: To show the "Book An Appointment" form.
5.  **`onviewstoredetails`**: Triggered on entire StoreCard click to navigate to the detail view.
6.  **`onsubmitappointment`**: To handle form data validation and "submission" logic.

---

## 7. Form Design (Appointment)
The form will follow the **Titan Eyeplus** logic but with Beyon's visual wrapper:
- **Visuals**: Centered card, soft shadows, pill-shaped buttons.
- **Flow**:
    - **Identify**: Name, Phone, Email.
    - **Locate**: City & Store (pre-filled if coming from a specific card).
---

## 8. Technical Integration (GMB API)
For detailed technical specifications regarding the data source (Google My Business), refer to the supplementary [GMB Integration Plan](file:///Users/p1yushb/Desktop/me/Projects/Beyon Store Locator/gmb_integration_plan.md). It details authentication, caching strategies, and data modeling for live store status.
