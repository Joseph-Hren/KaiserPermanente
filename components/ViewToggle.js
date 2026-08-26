/**
 * Renders the Card view / List view toggle: two labels flanking a button
 * with two stacked icons (`view-card.svg` / `view-list.svg`). The icon
 * matching `view` is layered on top via `.toggle-icon--current`; hovering
 * the toggle fades it out to reveal the other view's icon underneath, as a
 * preview of what clicking would switch to (see `.view-toggle:hover
 * .toggle-icon--current` in styles.css).
 *
 * Presentational only — `app.js` wires the click listener that switches
 * views, plus a click/mouseleave pair that adds/removes
 * `view-toggle--just-clicked` so the hover-preview fade is suppressed right
 * after a click (otherwise the toggle would flash the view just switched
 * away from, since the pointer is still hovering when the click lands).
 *
 * @param {object} props
 * @param {'card'|'list'} props.view - Which view is currently active.
 * @returns {string} HTML string for the `.view-toggle` element.
 */
export function renderViewToggle({ view }) {
  const isCard = view === 'card';
  const currentSrc = isCard ? 'assets/view-card.svg' : 'assets/view-list.svg';
  const currentAlt = isCard ? 'Card view selected' : 'List view selected';
  const otherSrc = isCard ? 'assets/view-list.svg' : 'assets/view-card.svg';

  return `
    <div class="view-toggle" id="view-toggle">
      <span class="view-toggle-label${isCard ? ' view-toggle-label--active' : ''}" id="label-card">Card view</span>
      <button class="view-toggle-btn" id="view-toggle-btn" aria-label="Switch view">
        <div class="toggle-icon-stack">
          <img src="${otherSrc}" class="toggle-icon toggle-icon--other" alt="" width="78" height="32">
          <img src="${currentSrc}" class="toggle-icon toggle-icon--current" id="toggle-icon-current" alt="${currentAlt}" width="78" height="32">
        </div>
      </button>
      <span class="view-toggle-label${isCard ? '' : ' view-toggle-label--active'}" id="label-list">List view</span>
    </div>
  `;
}
