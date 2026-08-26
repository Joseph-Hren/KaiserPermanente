/**
 * Computes which page buttons/ellipses to show for the mobile pagination bar,
 * windowed around the current page (current − 1 .. current + 1), anchored to
 * page 1 and the last page with a "…" gap when they fall outside the window.
 *
 * @param {number} current - The currently active page (1-indexed).
 * @param {number} totalPages - Total number of pages.
 * @returns {(number|'…')[]} Ordered list of page numbers and ellipsis markers.
 */
export function getMobilePageItems(current, totalPages) {
  if (totalPages <= 1) return [1];

  const items = [];
  const wStart = Math.max(1, current - 1);
  const wEnd = Math.min(totalPages, current + 1);

  if (wStart > 2) {
    // Anchor to page 1 + ellipsis.
    // Only keep the left neighbor when the ellipsis hides 2+ pages (wStart >= 4).
    // When it hides just 1 page (wStart === 3), skip it to stay compact.
    items.push(1);
    items.push('…');
    const from = wStart >= 4 ? wStart : current;
    for (let p = from; p <= wEnd; p++) items.push(p);
  } else {
    // wStart is 1 or 2 — page 1 is either in the window or just adjacent.
    // In either case let the window speak for itself; no separate page-1 anchor.
    for (let p = wStart; p <= wEnd; p++) items.push(p);
  }

  if (wEnd < totalPages - 1) {
    items.push('…');
    items.push(totalPages);
  } else if (wEnd < totalPages) {
    items.push(totalPages);
  }

  return items;
}

/**
 * Renders the pagination bar's contents: an item-count label, prev/next
 * arrow buttons, and the page-number buttons/ellipses given in `pageItems`.
 * Desktop callers pass every page number; mobile callers pass the windowed
 * list from {@link getMobilePageItems}. Purely presentational — the caller
 * is responsible for wiring click handlers on `.page-btn` and
 * `.pagination-arrow` after mounting this markup.
 *
 * @param {object} props
 * @param {number} props.total - Total number of items across all pages.
 * @param {number} props.perPage - Items shown per page.
 * @param {number} props.current - The currently active page (1-indexed).
 * @param {(number|'…')[]} props.pageItems - Page buttons/ellipses to render, in order.
 * @returns {string} HTML string for the `.pagination` container's contents.
 */
export function renderPagination({ total, perPage, current, pageItems }) {
  const totalPages = Math.ceil(total / perPage);
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, total);

  const chevronLeft = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none"><path d="M9.765 1L1 9.383L9.765 17.765" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  const chevronRight = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none"><path d="M1 1L9.765 9.383L1 17.765" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

  return `
    <span class="pagination-count">${start}–${end} of ${total} claims</span>
    <div class="pagination-controls">
      <button class="pagination-arrow" aria-label="Previous page" ${current === 1 ? 'disabled' : ''}>${chevronLeft}</button>
      <div class="pagination-pages">
        ${pageItems.map(p => p === '…'
          ? `<span class="pagination-ellipsis">…</span>`
          : `<button class="page-btn ${p === current ? 'page-btn--active' : ''}" data-page="${p}">${p}</button>`
        ).join('')}
      </div>
      <button class="pagination-arrow" aria-label="Next page" ${current === totalPages ? 'disabled' : ''}>${chevronRight}</button>
    </div>
  `;
}
