/* ─── Inline SVG badge icons ─────────────────────────────────────────────── */
/* All icons are inline SVG — no external file references needed.            */

const BADGE_ICONS = {
  pending: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C12.418 0 16 3.582 16 8C16 12.418 12.418 16 8 16C3.582 16 0 12.418 0 8C0 3.582 3.582 0 8 0ZM8 2C4.687 2 2 4.687 2 8C2 11.313 4.687 14 8 14C11.313 14 14 11.313 14 8C14 4.687 11.313 2 8 2ZM8 3.5C8.552 3.5 9 3.948 9 4.5V7H10.5C11.052 7 11.5 7.448 11.5 8C11.5 8.552 11.052 9 10.5 9H8C7.448 9 7 8.552 7 8V4.5C7 3.948 7.448 3.5 8 3.5Z" fill="#0078b3"/>
  </svg>`,

  approved: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="#0078b3" stroke-width="2"/>
    <path d="M4.5 8L6.5 10.5L11.5 5.5" stroke="#0078b3" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  denied: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9 1.5H5.1L1.5 5.1V10.9L5.1 14.5H10.9L14.5 10.9V5.1L10.9 1.5Z" stroke="#e50909" stroke-width="1.75"/>
    <line x1="5.25" y1="8" x2="10.75" y2="8" stroke="#e50909" stroke-width="1.75" stroke-linecap="round"/>
  </svg>`,

  'payment-resolved': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="#4cb20e" stroke-width="2"/>
    <path d="M4.5 8L6.5 10.5L11.5 5.5" stroke="#4cb20e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  'needs-payment': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2.5" width="14" height="12.5" rx="1.5" stroke="#efa403" stroke-width="1.5"/>
    <line x1="1" y1="6.5" x2="15" y2="6.5" stroke="#efa403" stroke-width="1.5"/>
    <line x1="5" y1="1" x2="5" y2="4" stroke="#efa403" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="11" y1="1" x2="11" y2="4" stroke="#efa403" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`
};

const BADGE_CONFIG = {
  'pending':          { cls: 'badge--pending',          label: 'Pending' },
  'approved':         { cls: 'badge--approved',          label: 'Approved' },
  'denied':           { cls: 'badge--denied',            label: 'Denied' },
  'payment-resolved': { cls: 'badge--payment-resolved',  label: 'Payment resolved' },
  'needs-payment':    { cls: 'badge--needs-payment',     label: 'Needs payment' }
};

function buildBadge(type) {
  if (!type) return '';
  const { cls, label } = BADGE_CONFIG[type];
  return `<span class="badge ${cls}">
    <span class="badge-icon">${BADGE_ICONS[type]}</span>
    ${label}
  </span>`;
}

/* ─── Activity card cost icon ────────────────────────────────────────────── */
const COST_ICON_HTML = `<img src="assets/cost.svg" alt="" width="47" height="46" style="display:block">`;

/* ─── Care received ──────────────────────────────────────────────────────── */
function buildCareReceived(items) {
  const MAX_SHOWN = 2;
  const shown = items.slice(0, MAX_SHOWN);
  const extra = items.length - MAX_SHOWN;

  let html = `<div class="care-received">
    <span class="field-label">CARE RECEIVED</span>`;

  shown.forEach(item => {
    html += `<span class="care-item">${item}</span>`;
  });

  if (extra > 0) {
    const word = extra === 1 ? 'service' : 'services';
    html += `<span class="care-more">+ and ${extra} more ${word}</span>`;
  }

  html += `</div>`;
  return html;
}

/* ─── Claim card ─────────────────────────────────────────────────────────── */
function buildClaimCard(claim) {
  const div = document.createElement('div');
  div.className = 'claim-card';
  div.dataset.id = claim.id;

  div.innerHTML = `
    <div class="claim-state">
      ${buildBadge(claim.primaryBadge)}
      ${buildBadge(claim.secondaryBadge)}
    </div>
    <div class="your-share">
      <span class="field-label">YOUR SHARE</span>
      <span class="amount">${claim.yourShare}</span>
    </div>
    <div class="service-date">
      <span class="field-label">SERVICE DATE</span>
      <span class="date-value">${claim.serviceDate}</span>
    </div>
    ${buildCareReceived(claim.careReceived)}
    <a href="#" class="view-details">View claim details</a>
  `;

  div.addEventListener('click', (e) => {
    e.preventDefault();
    openOverlay(claim);
  });

  return div;
}

/* ─── Activity carousel ──────────────────────────────────────────────────── */
let activityPage = 0;
let mobilePaginationCurrent = 1;

function getMobilePageItems(current, totalPages) {
  if (totalPages <= 1) return [1];

  const items  = [];
  const wStart = Math.max(1, current - 1);
  const wEnd   = Math.min(totalPages, current + 1);

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
const ACTIVITY_PAGES = [
  ACTIVITY_CARDS.slice(0, 4),
  ACTIVITY_CARDS.slice(4, 8),
  ACTIVITY_CARDS.slice(8),
];

function buildActivityCard(card) {
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

function renderActivityCards() {
  const container = document.getElementById('activity-cards');
  container.innerHTML = '';
  ACTIVITY_PAGES[activityPage].forEach(card => container.appendChild(buildActivityCard(card)));
}

function advanceActivityPage() {
  const container = document.getElementById('activity-cards');
  if (container.dataset.animating) return;

  const nextPage = (activityPage + 1) % ACTIVITY_PAGES.length;
  const pageW = container.offsetWidth;
  const gap   = parseFloat(getComputedStyle(container).columnGap) || 17;

  // Build wrappers: current page + next page sit side-by-side in one strip
  const makeWrap = (cards) => {
    const div = document.createElement('div');
    div.style.cssText = `display:flex;gap:${gap}px;flex-shrink:0;width:${pageW}px;`;
    cards.forEach(c => div.appendChild(c));
    return div;
  };

  const strip = document.createElement('div');
  strip.style.cssText = `display:flex;gap:${gap}px;`;
  strip.appendChild(makeWrap(Array.from(container.children)));
  strip.appendChild(makeWrap(ACTIVITY_PAGES[nextPage].map(buildActivityCard)));

  // Lock container width and clip, then swap content
  container.style.width   = pageW + 'px';
  container.style.overflow = 'hidden';
  container.dataset.animating = '1';
  container.innerHTML = '';
  container.appendChild(strip);

  // Force a synchronous reflow so the browser paints the start position
  void strip.offsetWidth;

  // Slide the strip left by exactly one page-width + gap
  strip.style.transition = 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)';
  strip.style.transform  = `translateX(-${pageW + gap}px)`;

  setTimeout(() => {
    activityPage = nextPage;
    container.style.width    = '';
    container.style.overflow = '';
    delete container.dataset.animating;
    renderActivityCards();
  }, 450);
}

/* ─── Breakpoint detection ───────────────────────────────────────────────── */
function isMobile() {
  return window.matchMedia('(max-width: 830px)').matches;
}

/* ─── Claims grid ────────────────────────────────────────────────────────── */
function renderClaimsGrid() {
  const grid = document.getElementById('claims-grid');
  grid.innerHTML = '';
  if (isMobile()) {
    const perPage = 6;
    const start = (mobilePaginationCurrent - 1) * perPage;
    CLAIMS.slice(start, start + perPage).forEach(claim => grid.appendChild(buildClaimCard(claim)));
  } else {
    const { perPage, current } = PAGINATION;
    CLAIMS.slice((current - 1) * perPage, current * perPage).forEach(claim => grid.appendChild(buildClaimCard(claim)));
  }
}

/* ─── Pagination ─────────────────────────────────────────────────────────── */
function renderPagination() {
  const container = document.getElementById('pagination');
  const { total, current } = PAGINATION;

  const chevronLeft = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none"><path d="M9.765 1L1 9.383L9.765 17.765" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  const chevronRight = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none"><path d="M1 1L9.765 9.383L1 17.765" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

  if (isMobile()) {
    const perPage = 6;
    const totalPages = Math.ceil(total / perPage);
    const current = mobilePaginationCurrent;
    const start = (current - 1) * perPage + 1;
    const end = Math.min(current * perPage, total);
    const pageItems = getMobilePageItems(current, totalPages);

    container.innerHTML = `
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

    container.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        mobilePaginationCurrent = parseInt(btn.dataset.page, 10);
        renderClaimsGrid();
        renderPagination();
        document.getElementById('claims-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    container.querySelectorAll('.pagination-arrow').forEach(arrow => {
      arrow.addEventListener('click', () => {
        if (arrow.disabled) return;
        const dir = arrow.getAttribute('aria-label') === 'Previous page' ? -1 : 1;
        mobilePaginationCurrent = Math.max(1, Math.min(totalPages, mobilePaginationCurrent + dir));
        renderClaimsGrid();
        renderPagination();
        document.getElementById('claims-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    return;
  }

  const { perPage } = PAGINATION;
  const totalPages = Math.ceil(total / perPage);
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, total);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  container.innerHTML = `
    <span class="pagination-count">${start}–${end} of ${total} claims</span>
    <div class="pagination-controls">
      <button class="pagination-arrow" aria-label="Previous page" ${current === 1 ? 'disabled' : ''}>
        ${chevronLeft}
      </button>
      <div class="pagination-pages">
        ${pages.map(p => `<button class="page-btn ${p === current ? 'page-btn--active' : ''}" data-page="${p}">${p}</button>`).join('')}
      </div>
      <button class="pagination-arrow" aria-label="Next page" ${current === totalPages ? 'disabled' : ''}>
        ${chevronRight}
      </button>
    </div>
  `;

  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      PAGINATION.current = parseInt(btn.dataset.page, 10);
      renderClaimsGrid();
      renderClaimsList();
      renderPagination();
      document.getElementById('claims-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  container.querySelectorAll('.pagination-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      if (arrow.disabled) return;
      const dir = arrow.getAttribute('aria-label') === 'Previous page' ? -1 : 1;
      PAGINATION.current = Math.max(1, Math.min(totalPages, PAGINATION.current + dir));
      renderClaimsGrid();
      renderClaimsList();
      renderPagination();
      document.getElementById('claims-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── Overlay ────────────────────────────────────────────────────────────── */
function openOverlay(claim) {
  const backdrop = document.getElementById('overlay-backdrop');
  const content  = document.getElementById('overlay-content');

  const isPending    = claim.yourShare === 'Pending amount';
  const needsPayment = claim.secondaryBadge === 'needs-payment';

  // Chevron: link-blue
  const chevSvg = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="#0078b3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // Bottom button icons (in grey circles)
  const eobSvg = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13 2H4C3.44772 2 3 2.44772 3 3V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V8L13 2Z" stroke="#4c556a" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 2V8H19" stroke="#4c556a" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 12H15M7 16H12" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  const dlSvg  = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3V15M11 15L7 11M11 15L15 11" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 17V19H19V17" stroke="#4c556a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const serviceCards = claim.services.map(svc => {
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
      <div class="ov-service-card">
        <div class="ov-service-header">
          <div class="ov-service-left">
            <span class="ov-svc-chevron">${chevSvg}</span>
            <span class="ov-svc-name">${svc.name}</span>
          </div>
          <div class="ov-service-right">
            <span class="ov-svc-share-label">Your share</span>
            <span class="ov-svc-share-amt">${shareAmt}</span>
          </div>
        </div>
        <div class="ov-service-detail">${detailContent}</div>
      </div>`;
  }).join('');

  const s = claim.summary;
  const summaryTotalCharged = s.totalCharged;
  const summaryPlanRate     = isPending ? '—' : s.planRate;
  const summaryAppliedDed   = isPending ? '—' : s.appliedToDeductible;
  const summaryYourTotal    = isPending ? 'Pending' : s.yourTotal;

  const isDenied  = claim.primaryBadge === 'denied';
  const isResolved = claim.secondaryBadge === 'payment-resolved';

  const whyText = isPending
    ? 'Your claim is currently being reviewed. Once processing is complete, you will see your final cost share and any amount you may owe.'
    : isDenied
      ? 'This claim was denied. The services listed were not covered under your current plan terms. You are responsible for the billed amount at the plan rate. You have the right to appeal this decision within 60 days of receiving this notice.'
      : isResolved
        ? 'This claim has been fully processed. Kaiser covered the negotiated plan rate for your covered services, and there is no remaining patient balance.'
        : "You're in Phase 1 of your DHMO plan. You haven't reached your deductible yet, so you pay the full plan rate for these covered services. Once you reach your $2,000 deductible, Kaiser will begin sharing costs with you.";

  content.innerHTML = `
    <div class="ov-topbar">
      <span class="ov-claim-num">Claim # ${claim.claimNumber}</span>
      <div class="ov-topbar-spacer"></div>
      <button class="ov-close-btn" aria-label="Close overlay">
        <span class="ov-close-x">×</span>
        <span class="ov-close-label">Close</span>
      </button>
      <div class="ov-topbar-badges">
        ${buildBadge(claim.primaryBadge)}
        ${buildBadge(claim.secondaryBadge)}
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

      <!-- WHY card: cost.svg icon + content side by side -->
      <div class="ov-why-card">
        <div class="ov-why-header">
          <img src="assets/cost.svg" alt="" class="ov-why-cost-icon" width="46" height="46">
          <div class="ov-why-content">
            <div class="ov-why-title">Why do you owe what you owe?</div>
            <p class="ov-why-text">${whyText}</p>
            <a href="#" class="ov-why-link">Learn more about how my plan works</a>
            <p class="ov-deductible-progress">You have paid $750.00 toward your deductible so far.</p>
            <img src="assets/plan-phase-graph.png" alt="Plan phase diagram" class="ov-phase-graph-img ov-phase-graph--desktop">
            <img src="assets/plan-phase-mobile.svg" alt="Plan phase diagram" class="ov-phase-graph-img ov-phase-graph--mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="ov-actions">
      <button class="ov-action-btn">
        <div class="ov-btn-icon-circle">${eobSvg}</div>
        View your Explanation of Benefits (EOB)
      </button>
      <button class="ov-action-btn">
        <div class="ov-btn-icon-circle">${dlSvg}</div>
        Download and print your claim
      </button>
    </div>
  `;

  content.querySelector('.ov-close-btn').addEventListener('click', closeOverlay);

  content.querySelectorAll('.ov-service-header').forEach(hdr => {
    hdr.addEventListener('click', () => hdr.closest('.ov-service-card').classList.toggle('is-open'));
  });

  backdrop.classList.add('is-open');
  document.getElementById('overlay-panel').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  document.getElementById('overlay-backdrop').classList.remove('is-open');
  document.getElementById('overlay-panel').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('overlay-backdrop').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeOverlay();
});

/* ─── List view: row builder ─────────────────────────────────────────────── */
function buildClaimRow(claim) {
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
        ${buildBadge(claim.primaryBadge)}
        ${buildBadge(claim.secondaryBadge)}
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

  // Row click → overlay (stop propagation from care toggle handled above)
  tr.addEventListener('click', (e) => {
    if (e.target.closest('.table-care-toggle')) return;
    e.preventDefault();
    openOverlay(claim);
  });

  return tr;
}

/* ─── List view: render ──────────────────────────────────────────────────── */
function renderClaimsList() {
  const container = document.getElementById('claims-list');
  container.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'claims-table';

  const chev = `<span class="table-sort-chevron"><svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

  const thead = table.createTHead();
  thead.innerHTML = `
    <tr>
      <th class="table-th table-th--date">Service date${chev}</th>
      <th class="table-th">Care received</th>
      <th class="table-th table-th--share">Your share${chev}</th>
      <th class="table-th table-th--status">Status${chev}</th>
      <th class="table-th table-th--claim">Claim #${chev}</th>
      <th class="table-th table-th--action"></th>
    </tr>
  `;

  const tbody = table.createTBody();
  const start = (PAGINATION.current - 1) * PAGINATION.perPage;
  const paginated = CLAIMS.slice(start, start + PAGINATION.perPage);
  paginated.forEach(claim => tbody.appendChild(buildClaimRow(claim)));

  container.appendChild(table);
}

/* ─── View toggle ────────────────────────────────────────────────────────── */
let currentView = 'card';

function switchView(view) {
  currentView = view;
  const grid = document.getElementById('claims-grid');
  const list = document.getElementById('claims-list');
  const iconCurrent = document.getElementById('toggle-icon-current');
  const iconOther = iconCurrent.previousElementSibling;
  const labelCard = document.getElementById('label-card');
  const labelList = document.getElementById('label-list');

  if (view === 'card') {
    grid.style.display = '';
    list.style.display = 'none';
    iconCurrent.src = 'assets/view-card.svg';
    iconCurrent.alt = 'Card view selected';
    iconOther.src = 'assets/view-list.svg';
    labelCard.classList.add('view-toggle-label--active');
    labelList.classList.remove('view-toggle-label--active');
  } else {
    grid.style.display = 'none';
    list.style.display = '';
    iconCurrent.src = 'assets/view-list.svg';
    iconCurrent.alt = 'List view selected';
    iconOther.src = 'assets/view-card.svg';
    labelList.classList.add('view-toggle-label--active');
    labelCard.classList.remove('view-toggle-label--active');
  }
}

/* Clicking anywhere on the toggle (icon or either text label) switches views */
document.getElementById('view-toggle').addEventListener('click', () => {
  switchView(currentView === 'card' ? 'list' : 'card');
});

/* ─── Re-render on breakpoint cross ─────────────────────────────────────── */
let lastMobile = isMobile();
window.addEventListener('resize', () => {
  const nowMobile = isMobile();
  if (nowMobile !== lastMobile) {
    lastMobile = nowMobile;
    PAGINATION.current = 1;
    if (nowMobile && currentView === 'list') switchView('card');
    renderClaimsGrid();
    renderPagination();
  }
});

/* ─── Init ───────────────────────────────────────────────────────────────── */
document.querySelector('.chevron-btn').addEventListener('click', advanceActivityPage);
renderActivityCards();
renderClaimsGrid();
renderClaimsList();
renderPagination();
// Start in card view — hide list container
document.getElementById('claims-list').style.display = 'none';
