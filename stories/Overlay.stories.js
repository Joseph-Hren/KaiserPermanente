import { CLAIMS } from '../data.js';
import { renderOverlayContent } from '../components/Overlay.js';

/**
 * The full claim overlay: topbar, service date/provider, your-share amount,
 * the SERVICES PROVIDED accordion, cost SUMMARY, and the "why you owe" card.
 * Uses real entries from CLAIMS (data.js) so each state below is exactly
 * what a user would see on the live site — see the "Overlay logic" section
 * of the root CLAUDE.md for the rules this content follows (share amount
 * must match the card, every CARE RECEIVED item must appear as a service
 * row, etc).
 */
export default {
  title: 'Components/Overlay',
  render: (claim) => {
    const panel = document.createElement('div');
    panel.className = 'overlay-panel';
    panel.style.cssText = 'position:static;transform:none;max-height:none;';
    panel.innerHTML = `<div class="overlay-content">${renderOverlayContent(claim)}</div>`;

    panel.querySelector('.ov-close-btn').addEventListener('click', () => console.log('Close clicked'));
    panel.querySelectorAll('.ov-service-header').forEach((hdr) => {
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

    return panel;
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Click or Tab-and-Enter a service row header to expand/collapse it, same as on the live site.',
      },
    },
  },
};

export const Pending = { args: CLAIMS.find((c) => c.id === 1) };
export const ApprovedNeedsPayment = { args: CLAIMS.find((c) => c.id === 3) };
export const DeniedNeedsPayment = { args: CLAIMS.find((c) => c.id === 5) };
export const ApprovedPaymentResolved = { args: CLAIMS.find((c) => c.id === 6) };
