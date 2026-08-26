import { renderActivityCard } from '../components/ActivityCard.js';

/**
 * One card in the "Recent claims activity" carousel: a cost icon, a status
 * message, and a contextual link.
 */
export default {
  title: 'Components/ActivityCard',
  render: (card) => renderActivityCard(card),
  argTypes: {
    text: { control: 'text' },
    linkText: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export const ClaimDetails = {
  args: {
    text: 'Your claim from 6/14/2026 has a $71.00 balance due.',
    linkText: 'View claim details',
  },
};

export const ExplanationOfBenefits = {
  args: {
    text: 'Your Explanation of Benefits for June 2026 is now available.',
    linkText: 'View EOB',
  },
};

export const DeductibleProgress = {
  args: {
    text: 'Your deductible progress: you have met $750 of your $2,000 deductible.',
    linkText: 'View coverage details',
  },
};
