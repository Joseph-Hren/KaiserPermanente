import { renderWhyYouOwe } from '../components/WhyYouOwe.js';

/**
 * The "Why do you owe what you owe?" card at the bottom of a claim overlay.
 * `whyText` varies by claim state — see the four states below, matching the
 * logic in `components/Overlay.js`'s `getWhyText()`.
 */
export default {
  title: 'Components/WhyYouOwe',
  render: (args) => {
    const wrap = document.createElement('div');
    wrap.style.width = '560px';
    wrap.innerHTML = renderWhyYouOwe(args);
    return wrap;
  },
  argTypes: {
    whyText: { control: 'text' },
    deductibleProgressText: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export const InDeductiblePhase = {
  args: {
    whyText:
      "You're in Phase 1 of your DHMO plan. You haven't reached your deductible yet, so you pay the full plan rate for these covered services. Once you reach your $2,000 deductible, Kaiser will begin sharing costs with you.",
  },
};

export const Pending = {
  args: {
    whyText:
      'Your claim is currently being reviewed. Once processing is complete, you will see your final cost share and any amount you may owe.',
  },
};

export const Denied = {
  args: {
    whyText:
      'This claim was denied. The services listed were not covered under your current plan terms. You are responsible for the billed amount at the plan rate. You have the right to appeal this decision within 60 days of receiving this notice.',
  },
};

export const PaymentResolved = {
  args: {
    whyText:
      'This claim has been fully processed. Kaiser covered the negotiated plan rate for your covered services, and there is no remaining patient balance.',
  },
};
