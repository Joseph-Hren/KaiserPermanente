const CHEVRON_SVG = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="#0078b3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/**
 * Renders one collapsible service row inside a claim overlay's SERVICES
 * PROVIDED section: a header (service name + your-share amount) that
 * expands to a detail panel with the full charge breakdown.
 *
 * Presentational only — expand/collapse is driven by toggling the `is-open`
 * class on the returned `.ov-service-card` element. `openOverlay()` in
 * app.js wires click and keydown (Enter/Space) listeners on
 * `.ov-service-header` that do this and keep `aria-expanded` in sync — the
 * header has no other focusable descendant, so that keyboard wiring is what
 * makes it operable at all, not just a nicety. Pass `isOpen: true` here only
 * to render an already-expanded row (e.g. for a Storybook "expanded" state).
 *
 * @param {object} svc - One entry from a claim's `services` array (data.js):
 *   `{ name, total, planRate, paidByKaiser, patientTotal, notes }`.
 * @param {object} [options]
 * @param {boolean} [options.isPending=false] - Whether the parent claim is
 *   still under review; when true, plan-rate/paid-by-Kaiser show as "—" and
 *   the share amount shows "Pending" instead of a dollar figure.
 * @param {boolean} [options.isOpen=false] - Render already expanded.
 * @param {string} [options.id] - Unique id for this service row, used to
 *   link the header to its detail panel via `aria-controls`. Omit it (as a
 *   standalone story might) to render without that link — `aria-expanded`
 *   and keyboard operability still work either way.
 * @returns {string} HTML string for the `.ov-service-card` block.
 */
export function renderServiceAccordion(svc, { isPending = false, isOpen = false, id } = {}) {
  const detailId = id ? `${id}-detail` : undefined;
  const shareAmt = isPending ? 'Pending' : svc.patientTotal;
  const detailContent = isPending
    ? `<div class="ov-detail-row"><span class="ov-detail-label">Total charged</span><span class="ov-detail-value">${svc.total}</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Plan rate</span><span class="ov-detail-value">—</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Paid by Kaiser</span><span class="ov-detail-value">—</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Patient total</span><span class="ov-detail-value">Pending</span></div>
       ${svc.notes ? `<div class="ov-svc-notes"><span class="ov-svc-notes-label">Notes:</span>${svc.notes}</div>` : ''}`
    : `<div class="ov-detail-row"><span class="ov-detail-label">Total charged</span><span class="ov-detail-value">${svc.total}</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Plan rate</span><span class="ov-detail-value">${svc.planRate}</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Paid by Kaiser</span><span class="ov-detail-value">${svc.paidByKaiser}</span></div>
       <div class="ov-detail-row"><span class="ov-detail-label">Patient total</span><span class="ov-detail-value">${svc.patientTotal}</span></div>
       ${svc.notes ? `<div class="ov-svc-notes"><span class="ov-svc-notes-label">Notes:</span>${svc.notes}</div>` : ''}`;

  return `
    <div class="ov-service-card${isOpen ? ' is-open' : ''}">
      <div class="ov-service-header" role="button" tabindex="0" aria-expanded="${isOpen}"${detailId ? ` aria-controls="${detailId}"` : ''}>
        <div class="ov-service-left">
          <span class="ov-svc-chevron">${CHEVRON_SVG}</span>
          <span class="ov-svc-name">${svc.name}</span>
        </div>
        <div class="ov-service-right">
          <span class="ov-svc-share-label">Your share</span>
          <span class="ov-svc-share-amt">${shareAmt}</span>
        </div>
      </div>
      <div class="ov-service-detail"${detailId ? ` id="${detailId}"` : ''}>${detailContent}</div>
    </div>`;
}
