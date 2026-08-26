const COST_ICON_HTML = `<img src="assets/cost.svg" alt="" width="47" height="46" style="display:block">`;

/**
 * Renders one "Recent claims activity" carousel card: an icon, a status
 * message, and a contextual link (e.g. "View claim details", "View EOB").
 *
 * @param {{ text: string, linkText: string }} card - An entry from ACTIVITY_CARDS (data.js).
 * @returns {HTMLElement} The `.activity-card` element.
 */
export function renderActivityCard(card) {
  const div = document.createElement('div');
  div.className = 'activity-card';
  div.innerHTML = `
    <div class="activity-card-icon">${COST_ICON_HTML}</div>
    <div class="activity-card-body">
      <p class="activity-card-text">${card.text}</p>
      <a href="#" class="activity-card-link">${card.linkText}</a>
    </div>
  `;
  return div;
}
