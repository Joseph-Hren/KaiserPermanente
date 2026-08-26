# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows
[Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-08-25

### Added
- Initial versioned release of the Kaiser Permanente Claims Portal prototype.
- Storybook component library (`@storybook/html-vite`) with a11y (`storybook-addon-a11y`)
  and docs addons.
- Overview documentation page (usage conventions + live design tokens read from
  `styles.css`).
- GitHub Actions workflow deploying the live app to the Pages root and Storybook to
  `/storybook`.
- `components/` — Badge, CareReceived, ClaimCard, ActivityCard, Pagination,
  ServiceAccordion, WhyYouOwe, Overlay, ClaimRow, and ViewToggle extracted from `app.js`
  into individually documented, reusable modules with JSDoc. `app.js` now imports these
  directly (single source of truth between the live site and Storybook) rather than
  duplicating markup.
- A Storybook story for each of the above components.
- `npm run dev` — local static server, needed now that `app.js`/`data.js` are real ES
  modules (ES modules don't load over `file://`).

### Changed
- `index.html` loads `app.js` as `<script type="module">`; `data.js`'s script tag was
  removed since `app.js` now imports it directly.

### Fixed
- The Card view / List view toggle no longer flashes the just-left view after a click —
  the hover-preview fade is now suppressed until the pointer actually leaves and
  re-enters the toggle.
- The claim overlay's SERVICES PROVIDED accordion headers are now keyboard-operable
  (`role="button"`, `tabindex="0"`, Enter/Space toggling, `aria-expanded`/`aria-controls`,
  and a visible focus outline) — previously they only responded to a mouse click.
