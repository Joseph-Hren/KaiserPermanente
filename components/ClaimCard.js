import { renderBadge } from './Badge.js';
import { renderCareReceived } from './CareReceived.js';

/**
 * Renders one claim card for the grid view: status badges, your-share
 * amount, service date, care received, and a "View claim details" link. See
 * the "Claim Card" and "Card Logic" sections of the root CLAUDE.md for the
 * badge/amount rules this data must already satisfy.
 *
 * @param {object} claim - A claim record shaped like an entry in CLAIMS (data.js).
 * @param {(claim: object) => void} [onSelect] - Called with `claim` when the card is clicked.
 * @returns {HTMLElement} The `.claim-card` element.
 */
export function renderClaimCard(claim, onSelect) {
  const div = document.createElement('div');
  div.className = 'claim-card';
  div.dataset.id = claim.id;

  div.innerHTML = `
    <div class="claim-state">
      ${renderBadge(claim.primaryBadge)}
      ${renderBadge(claim.secondaryBadge)}
    </div>
    <div class="your-share">
      <span class="field-label">YOUR SHARE</span>
      <span class="amount">${claim.yourShare}</span>
    </div>
    <div class="service-date">
      <span class="field-label">SERVICE DATE</span>
      <span class="date-value">${claim.serviceDate}</span>
    </div>
    ${renderCareReceived(claim.careReceived)}
    <a href="#" class="view-details">View claim details</a>
  `;

  if (onSelect) {
    div.addEventListener('click', (e) => {
      e.preventDefault();
      onSelect(claim);
    });
  }

  return div;
}
