# Kaiser Permanente Claims Portal
## Project Overview
A patient-facing claims portal prototype for Kaiser Permanente. 
This is a portfolio piece demonstrating design systems thinking 
and AI-assisted design-to-code workflow. Not an official KP product.

## File Structure
- index.html — page structure and markup only
- styles.css — all visual styling, hover states, breakpoints
- data.js — all content arrays (cards, overlays, deductible data)
- app.js — all behavior (event listeners, view switching, overlays, pagination)
- assets/ — logo PNGs and SVG icons

## Do Not
- Put inline styles in HTML
- Put data arrays in HTML or app.js
- Invent icons — use the SVGs from Figma
- Use placeholder colors — use the exact tokens below

## Design Tokens — Colors

--text-primary: #0d1c3d;
--text-secondary: #4c556a;
--text-reverse: #ffffff;
--text-link: #0078b3;
--background-strokes-neutral: #ffffff;
--background-strokes-light-grey: #f5f5f5;
--background-strokes-grey: #f7f7f7;
--background-strokes-dark: #ebebeb;
--background-strokes-card-stroke: #d0d0d0;
--background-strokes-blue: #0078b3;
--colors-green-background: #e1f4d4;
--colors-green-border: #4cb20e;
--colors-green-text: #1f5000;
--colors-red-background: #f7cece;
--colors-red-border: #e50909;
--colors-red-text: #560000;
--colors-amber-text: #644500;
--colors-amber-border: #efa403;
--colors-amber-background: #fff4d2;
--colors-blue-background: #e6f2f7;
--colors-blue-border: #0078b3;
--colors-blue-text: #002b40;

## KP Brand Colors (navigation and header)
--kp-blue-nav: #0078B3  (main navigation bar)

## Typography
Font: Montserrat (Google Fonts)
Weights needed: 400, 500, 600, 700
Load via: https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap

## Key Component Specs
### Claim Card
- Width: 360px fixed
- Height: 300px
- Border radius: 12px
- Border: 1px solid #d0d0d0
- Padding: 20px
- Two badge slots: primary (left) + secondary financial (right)

### Status Badges
- Border radius: 20px (fully rounded pill)
- Each badge has: colored border, light tinted background, colored text and icon

## Asset Files Available
- assets/KPlogo.png — desktop logo
- assets/KPlogoMobile.png — mobile logo
- assets/badge-approved-check.svg
- assets/badge-approved-outer.svg
- assets/badge-denied-line.svg
- assets/badge-denied-outer.svg
- assets/badge-pending-outer.svg
- assets/badge-resolved-check.svg
- assets/badge-resolved-outer.svg
- assets/icon-cost-inner.svg
- assets/icon-search.png
- assets/icon-cost.png

## Card Logic
The medical claim cards show one or two status badges. Every claim card that has a Pending status badge should show the YOUR SHARE amount as Pending amount. Other states include Approved-Payment resolved, Approved-Payment needed, Denied-Payment resolved, and Denied-Payment needed. Any card with the Payment needed badge needs to show a YOUR SHARE dollar amount above zero. Any card that shows the Payment resolved badge must show a $0.00 for YOUR SHARE. SERVICE DATE should be in descending order, starting at 7/12/2026, and going backward in time. Our patient, Eliza Martinez, has a twice monthly Accupuncture appointment, so that should show up twice a month. She also has hypertension and pre-diabetes, so care services should reflect treatment for those conditions. There should be some other treatments as well. Every card should show at least one CARE RECEIVED item. It can show two, three or more will use a link in a smaller font, ie: + and one more service, + and three more services, etc. 
The node id for the claim card component is at node-id 642-19737 in the Figma file. Please get context from that component when writing code. 

## Overlay logic
When a card is clicked, it opens an overlay. Overlays must reflect the same dollar amount shown on the YOUR SHARE section of the card. Each CARE RECEIVED item on the card must also be reflected in the expandable CARE RECEIVED section of the overlay. The overlay must be centered on the page, with a dark shader covering the rest of the page. Make the dark shader #000000 at 25% opacity. The overlay must close when the user clicks the close component or when the user clicks outside the overlay. The node id for the desktop version of the overlay is at node-id=666-42557 - please get context there when building it. The mobile version is at node-id=678-46043. 

## Mobile layout
The node for the mobile layout is here: node-id=666-42594

## Desktop layout
Node for wide desktop layout is here: node-id=666-42577
