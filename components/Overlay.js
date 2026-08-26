import { renderBadge } from './Badge.js';
import { renderServiceAccordion } from './ServiceAccordion.js';
import { renderWhyYouOwe } from './WhyYouOwe.js';

const EOB_ICON_SVG = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13 2H4C3.44772 2 3 2.44772 3 3V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V8L13 2Z" stroke="#4c556a" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 2V8H19" stroke="#4c556a" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 12H15M7 16H12" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const DOWNLOAD_ICON_SVG = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3V15M11 15L7 11M11 15L15 11" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 17V19H19V17" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/**
 * Derives the "Why do you owe what you owe?" explanation for a claim, based
 * on its pending/denied/resolved state. See the "Overlay logic" section of
 * the root CLAUDE.md — text must vary by claim state.
 *
 * @param {object} claim
 * @param {boolean} isPending
 * @returns {string}
 */
function getWhyText(claim, isPending) {
  const isDenied = claim.primaryBadge === 'denied';
  const isResolved = claim.secondaryBadge === 'payment-resolved';

  if (isPending) {
    return 'Your claim is currently being reviewed. Once processing is complete, you will see your final cost share and any amount you may owe.';
  }
  if (isDenied) {
    return 'This claim was denied. The services listed were not covered under your current plan terms. You are responsible for the billed amount at the plan rate. You have the right to appeal this decision within 60 days of receiving this notice.';
  }
  if (isResolved) {
    return 'This claim has been fully processed. Kaiser covered the negotiated plan rate for your covered services, and there is no remaining patient balance.';
  }
  return "You're in Phase 1 of your DHMO plan. You haven't reached your deductible yet, so you pay the full plan rate for these covered services. Once you reach your $2,000 deductible, Kaiser will begin sharing costs with you.";
}

/**
 * Renders the full contents of a claim overlay: topbar (claim #, close
 * button, status badges), service date / provider, your-share amount (with
 * a "View and pay your bill" button when a payment is owed), the expandable
 * SERVICES PROVIDED accordion, a cost SUMMARY, the "why you owe" card, and
 * the EOB/download action buttons. The dollar amount shown here must match
 * the claim card's YOUR SHARE, and every CARE RECEIVED item must appear in
 * a service row — see the "Overlay logic" section of the root CLAUDE.md.
 *
 * Presentational only — `openOverlay()` in app.js sets this as
 * `#overlay-content`'s innerHTML, then wires the close button and the
 * per-service accordion toggle listeners.
 *
 * @param {object} claim - A claim record shaped like an entry in CLAIMS (data.js).
 * @returns {string} HTML string for `#overlay-content`.
 */
export function renderOverlayContent(claim) {
  const isPending = claim.yourShare === 'Pending amount';
  const needsPayment = claim.secondaryBadge === 'needs-payment';

  const serviceCards = claim.services
    .map((svc, i) => renderServiceAccordion(svc, { isPending, id: `ov-svc-${claim.id}-${i}` }))
    .join('');

  const s = claim.summary;
  const summaryTotalCharged = s.totalCharged;
  const summaryPlanRate = isPending ? '—' : s.planRate;
  const summaryAppliedDed = isPending ? '—' : s.appliedToDeductible;
  const summaryYourTotal = isPending ? 'Pending' : s.yourTotal;

  const whyCard = renderWhyYouOwe({ whyText: getWhyText(claim, isPending) });

  return `
    <div class="ov-topbar">
      <span class="ov-claim-num">Claim # ${claim.claimNumber}</span>
      <div class="ov-topbar-spacer"></div>
      <button class="ov-close-btn" aria-label="Close overlay">
        <span class="ov-close-x">×</span>
        <span class="ov-close-label">Close</span>
      </button>
      <div class="ov-topbar-badges">
        ${renderBadge(claim.primaryBadge)}
        ${renderBadge(claim.secondaryBadge)}
      </div>
    </div>

    <hr class="ov-rule">

    <div class="ov-body">
      <!-- SERVICE DATE / PROVIDER labels, then HR, then values -->
      <div class="ov-two-col">
        <span class="ov-field-label">SERVICE DATE</span>
        <span class="ov-field-label">PROVIDER</span>
      </div>
      <hr class="ov-rule">
      <div class="ov-two-col">
        <div class="ov-info-value">${claim.serviceDate}</div>
        <div class="ov-info-value">${claim.provider}</div>
      </div>

      <!-- YOUR SHARE label, then HR, then amount (+ button if needed) -->
      <span class="ov-field-label">YOUR SHARE</span>
      <hr class="ov-rule">
      ${isPending
        ? `<div class="ov-share-amount ov-share-amount--pending">Pending amount</div>`
        : `<div class="ov-two-col">
             <div class="ov-share-amount">${claim.yourShare}</div>
             ${needsPayment
               ? `<div class="ov-pay-btn-col"><button class="ov-pay-btn">View and pay your bill</button></div>`
               : '<div></div>'}
           </div>`}

      <!-- SERVICES PROVIDED label, then HR, then cards -->
      <span class="ov-section-label">SERVICES PROVIDED</span>
      <hr class="ov-rule">
      <div style="padding-top:12px;">${serviceCards}</div>

      <!-- SUMMARY label, then HR, then rows -->
      <span class="ov-section-label">SUMMARY</span>
      <hr class="ov-rule">
      <div style="padding-top:8px;padding-bottom:4px;">
        <div class="ov-summary-row">
          <span class="ov-summary-label">Total charged:</span>
          <span class="ov-summary-value">${summaryTotalCharged}</span>
        </div>
        <div class="ov-summary-row">
          <span class="ov-summary-label">Plan rate:</span>
          <span class="ov-summary-value">${summaryPlanRate}</span>
        </div>
        <div class="ov-summary-row">
          <span class="ov-summary-label">Applied to your deductible:</span>
          <span class="ov-summary-value">${summaryAppliedDed}</span>
        </div>
        <div class="ov-summary-row ov-summary-row--total">
          <span class="ov-summary-label">Your total share:</span>
          <span class="ov-summary-value">${summaryYourTotal}</span>
        </div>
      </div>

      ${whyCard}
    </div>

    <div class="ov-actions">
      <button class="ov-action-btn">
        <div class="ov-btn-icon-circle">${EOB_ICON_SVG}</div>
        View your Explanation of Benefits (EOB)
      </button>
      <button class="ov-action-btn">
        <div class="ov-btn-icon-circle">${DOWNLOAD_ICON_SVG}</div>
        Download and print your claim
      </button>
    </div>
  `;
}
