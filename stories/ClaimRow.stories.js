import { renderClaimRow } from '../components/ClaimRow.js';

/**
 * One row of the "All claims" list view. When there are 2+ care-received
 * items, the extras collapse behind a "+N more" toggle that expands in
 * place — click it to try.
 */
export default {
  title: 'Components/ClaimRow',
  render: (claim) => {
    const table = document.createElement('table');
    table.className = 'claims-table';
    const tbody = table.createTBody();
    tbody.appendChild(renderClaimRow(claim, (c) => console.log('Row clicked:', c.claimNumber)));
    return table;
  },
  argTypes: {
    primaryBadge: { control: 'select', options: ['pending', 'approved', 'denied'] },
    secondaryBadge: { control: 'select', options: [null, 'needs-payment', 'payment-resolved'] },
    yourShare: { control: 'text' },
    serviceDate: { control: 'text' },
    careReceived: { control: 'object' },
    claimNumber: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Clicking the row (outside the care-received toggle) normally opens the claim overlay — here it just logs to the console.',
      },
    },
  },
};

export const OneCareItem = {
  args: {
    id: 14,
    primaryBadge: 'approved',
    secondaryBadge: 'payment-resolved',
    yourShare: '$0.00',
    serviceDate: '1/8/2026',
    careReceived: ['Urgent Care Visit'],
    claimNumber: '4665540',
  },
};

export const ExpandableCareItems = {
  args: {
    id: 5,
    primaryBadge: 'denied',
    secondaryBadge: 'needs-payment',
    yourShare: '$215.00',
    serviceDate: '5/14/2026',
    careReceived: [
      'Registered Dietitian Consultation',
      'Individualized Meal Planning',
      'Nutrition Assessment',
      'Behavior Modification Counseling',
      'Meal Planning Resources',
    ],
    claimNumber: '4778561',
  },
};
