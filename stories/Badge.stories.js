import { renderBadge, BADGE_TYPES } from '../components/Badge.js';

/**
 * Status pill shown on claim cards, overlays, and the list-view table. A card
 * shows a primary badge (pending / approved / denied) and, when applicable, a
 * secondary financial badge (needs-payment / payment-resolved) — see the
 * "Card Logic" section of the root CLAUDE.md for valid combinations.
 */
export default {
  title: 'Components/Badge',
  render: ({ type }) => {
    const container = document.createElement('div');
    container.innerHTML = renderBadge(type);
    return container.firstElementChild ?? container;
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: BADGE_TYPES,
      description: 'Badge status',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Renders one status pill: a colored border, tinted background, and matching icon + label.',
      },
    },
  },
};

export const Pending = { args: { type: 'pending' } };
export const Approved = { args: { type: 'approved' } };
export const Denied = { args: { type: 'denied' } };
export const PaymentResolved = { args: { type: 'payment-resolved' } };
export const NeedsPayment = { args: { type: 'needs-payment' } };

export const AllStates = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;';
    BADGE_TYPES.forEach((type) => {
      wrap.insertAdjacentHTML('beforeend', renderBadge(type));
    });
    return wrap;
  },
  parameters: {
    docs: { description: { story: 'All five badge states side by side.' } },
  },
};
