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
  </svg>`,
};

const BADGE_CONFIG = {
  pending: { cls: 'badge--pending', label: 'Pending' },
  approved: { cls: 'badge--approved', label: 'Approved' },
  denied: { cls: 'badge--denied', label: 'Denied' },
  'payment-resolved': { cls: 'badge--payment-resolved', label: 'Payment resolved' },
  'needs-payment': { cls: 'badge--needs-payment', label: 'Needs payment' },
};

/** The status values `renderBadge` accepts. */
export const BADGE_TYPES = Object.keys(BADGE_CONFIG);

/**
 * Renders a status badge — a colored pill with an icon and label.
 *
 * Every claim card and overlay shows one or two of these: a primary status
 * (pending / approved / denied) and, when applicable, a secondary financial
 * status (needs-payment / payment-resolved). See the "Card Logic" section of
 * the root CLAUDE.md for which combinations are valid.
 *
 * @param {'pending'|'approved'|'denied'|'payment-resolved'|'needs-payment'|null|undefined} type
 *   The badge status. Falsy (e.g. a claim's unused secondary badge slot) renders nothing.
 * @returns {string} An HTML string for the badge `<span>`, or `''` if `type` is falsy.
 */
export function renderBadge(type) {
  if (!type) return '';
  const { cls, label } = BADGE_CONFIG[type];
  return `<span class="badge ${cls}">
    <span class="badge-icon">${BADGE_ICONS[type]}</span>
    ${label}
  </span>`;
}
