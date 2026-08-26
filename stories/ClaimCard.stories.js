import { renderClaimCard } from '../components/ClaimCard.js';

/**
 * The card shown in "All claims" grid view: status badges, your-share
 * amount, service date, care received, and a link that opens the claim
 * overlay. Width/height/border/radius are fixed per the root CLAUDE.md spec
 * (360×300, 12px radius, 1px `--background-strokes-card-stroke` border).
 */
export default {
  title: 'Components/ClaimCard',
  render: (claim) => renderClaimCard(claim, (c) => console.log('Card clicked:', c.claimNumber)),
  argTypes: {
    primaryBadge: { control: 'select', options: ['pending', 'approved', 'denied'] },
    secondaryBadge: { control: 'select', options: [null, 'needs-payment', 'payment-resolved'] },
    yourShare: { control: 'text' },
    serviceDate: { control: 'text' },
    careReceived: { control: 'object' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Clicking the card (or "View claim details") normally opens the claim overlay — here it just logs to the console.',
      },
    },
  },
};

export const Pending = {
  args: {
    id: 1,
    primaryBadge: 'pending',
    secondaryBadge: null,
    yourShare: 'Pending amount',
    serviceDate: '7/12/2026',
    careReceived: ['Acupuncture – 60 min', 'Moxibustion Therapy'],
  },
};

export const ApprovedNeedsPayment = {
  args: {
    id: 3,
    primaryBadge: 'approved',
    secondaryBadge: 'needs-payment',
    yourShare: '$71.00',
    serviceDate: '6/14/2026',
    careReceived: [
      'Laboratory – A1C Blood Panel',
      'Fasting Glucose Test',
      'Complete Blood Count (CBC)',
      'Urinalysis',
    ],
  },
};

export const DeniedNeedsPayment = {
  args: {
    id: 5,
    primaryBadge: 'denied',
    secondaryBadge: 'needs-payment',
    yourShare: '$215.00',
    serviceDate: '5/14/2026',
    careReceived: ['Registered Dietitian Consultation', 'Individualized Meal Planning'],
  },
};

export const ApprovedPaymentResolved = {
  args: {
    id: 6,
    primaryBadge: 'approved',
    secondaryBadge: 'payment-resolved',
    yourShare: '$0.00',
    serviceDate: '4/30/2026',
    careReceived: ['Office Visit – Pre-Diabetes Management', 'Lifestyle Counseling', 'Pre-Diabetes Education'],
  },
};
