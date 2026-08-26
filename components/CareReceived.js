/**
 * Renders the "CARE RECEIVED" field shown on a claim card: up to two line
 * items, plus a "+ and N more services" link when there are more.
 *
 * @param {string[]} items - Care received line items for one claim.
 * @returns {string} HTML string for the `.care-received` block.
 */
export function renderCareReceived(items) {
  const MAX_SHOWN = 2;
  const shown = items.slice(0, MAX_SHOWN);
  const extra = items.length - MAX_SHOWN;

  let html = `<div class="care-received">
    <span class="field-label">CARE RECEIVED</span>`;

  shown.forEach((item) => {
    html += `<span class="care-item">${item}</span>`;
  });

  if (extra > 0) {
    const word = extra === 1 ? 'service' : 'services';
    html += `<span class="care-more">+ and ${extra} more ${word}</span>`;
  }

  html += `</div>`;
  return html;
}
