import { renderBadge } from './Badge.js';

/**
 * Renders one row of the "All claims" list view: service date, care
 * received (first item + an expandable "+N more" list), your-share amount,
 * status badges, claim number, and a "View claim details" link.
 *
 * @param {object} claim - A claim record shaped like an entry in CLAIMS (data.js).
 * @param {(claim: object) => void} [onSelect] - Called with `claim` when the
 *   row is clicked (clicks on the care-received toggle are excluded).
 * @returns {HTMLTableRowElement} The `<tr class="claim-row">` element.
 */
export function renderClaimRow(claim, onSelect) {
  const tr = document.createElement('tr');
  tr.className = 'claim-row';
  tr.dataset.id = claim.id;

  const first = claim.careReceived[0];
  const extras = claim.careReceived.slice(1);
  const extraCount = extras.length;
  const extraWord = extraCount === 1 ? 'service' : 'services';

  const isPending = claim.yourShare === 'Pending amount';
  const amountHtml = isPending
    ? `<span class="table-amount table-amount--pending">Pending amount</span>`
    : `<span class="table-amount">${claim.yourShare}</span>`;

  const careHtml = `
    <div class="table-care-first">${first}</div>
    ${extraCount > 0 ? `
      <div class="table-care-extra" hidden>
        ${extras.map(i => `<div class="table-care-extra-item">${i}</div>`).join('')}
      </div>
      <button class="table-care-toggle">+ and ${extraCount} more ${extraWord}</button>
    ` : ''}
  `;

  tr.innerHTML = `
    <td>${claim.serviceDate}</td>
    <td class="table-cell--care">${careHtml}</td>
    <td>${amountHtml}</td>
    <td>
      <div class="claim-state">
        ${renderBadge(claim.primaryBadge)}
        ${renderBadge(claim.secondaryBadge)}
      </div>
    </td>
    <td>${claim.claimNumber}</td>
    <td class="table-cell--action">
      <a href="#" class="view-details">View claim details</a>
    </td>
  `;

  // Expand / collapse care received
  const toggleBtn = tr.querySelector('.table-care-toggle');
  if (toggleBtn) {
    const extraDiv = tr.querySelector('.table-care-extra');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = !extraDiv.hidden;
      extraDiv.hidden = expanded;
      toggleBtn.textContent = expanded
        ? `+ and ${extraCount} more ${extraWord}`
        : '- show less';
    });
  }

  if (onSelect) {
    tr.addEventListener('click', (e) => {
      if (e.target.closest('.table-care-toggle')) return;
      e.preventDefault();
      onSelect(claim);
    });
  }

  return tr;
}
