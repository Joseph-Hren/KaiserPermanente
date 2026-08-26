import { ACTIVITY_CARDS, CLAIMS, PAGINATION } from './data.js';
import { renderBadge } from './components/Badge.js';
import { renderClaimCard } from './components/ClaimCard.js';
import { renderActivityCard } from './components/ActivityCard.js';
import { renderPagination as renderPaginationMarkup, getMobilePageItems } from './components/Pagination.js';
import { renderOverlayContent } from './components/Overlay.js';
import { renderClaimRow } from './components/ClaimRow.js';
import { renderViewToggle } from './components/ViewToggle.js';

/* ─── Activity carousel ──────────────────────────────────────────────────── */
let activityPage = 0;
let mobilePaginationCurrent = 1;

const ACTIVITY_PAGES = [
  ACTIVITY_CARDS.slice(0, 4),
  ACTIVITY_CARDS.slice(4, 8),
  ACTIVITY_CARDS.slice(8),
];

function renderActivityCards() {
  const container = document.getElementById('activity-cards');
  container.innerHTML = '';
  ACTIVITY_PAGES[activityPage].forEach(card => container.appendChild(renderActivityCard(card)));
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
  strip.appendChild(makeWrap(ACTIVITY_PAGES[nextPage].map(renderActivityCard)));

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
    CLAIMS.slice(start, start + perPage).forEach(claim => grid.appendChild(renderClaimCard(claim, openOverlay)));
  } else {
    const { perPage, current } = PAGINATION;
    CLAIMS.slice((current - 1) * perPage, current * perPage).forEach(claim => grid.appendChild(renderClaimCard(claim, openOverlay)));
  }
}

/* ─── Pagination ─────────────────────────────────────────────────────────── */
function renderPagination() {
  const container = document.getElementById('pagination');
  const { total, current } = PAGINATION;

  if (isMobile()) {
    const perPage = 6;
    const totalPages = Math.ceil(total / perPage);
    const current = mobilePaginationCurrent;
    const pageItems = getMobilePageItems(current, totalPages);

    container.innerHTML = renderPaginationMarkup({ total, perPage, current, pageItems });

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
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  container.innerHTML = renderPaginationMarkup({ total, perPage, current, pageItems });

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

  content.innerHTML = renderOverlayContent(claim);

  content.querySelector('.ov-close-btn').addEventListener('click', closeOverlay);

  content.querySelectorAll('.ov-service-header').forEach(hdr => {
    const toggle = () => {
      const isOpen = hdr.closest('.ov-service-card').classList.toggle('is-open');
      hdr.setAttribute('aria-expanded', String(isOpen));
    };
    hdr.addEventListener('click', toggle);
    hdr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
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
  paginated.forEach(claim => tbody.appendChild(renderClaimRow(claim, openOverlay)));

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

document.getElementById('view-toggle-mount').innerHTML = renderViewToggle({ view: currentView });

const viewToggle = document.getElementById('view-toggle');

/* Clicking anywhere on the toggle (icon or either text label) switches views */
viewToggle.addEventListener('click', () => {
  // Suppress the hover-preview fade so the toggle doesn't flash the view just
  // switched away from — the pointer is still hovering when the click lands.
  viewToggle.classList.add('view-toggle--just-clicked');
  switchView(currentView === 'card' ? 'list' : 'card');
});

/* Only re-arm the hover preview once the pointer actually leaves and returns. */
viewToggle.addEventListener('mouseleave', () => {
  viewToggle.classList.remove('view-toggle--just-clicked');
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
