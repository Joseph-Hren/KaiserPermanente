import { renderCareReceived } from '../components/CareReceived.js';

/**
 * The "CARE RECEIVED" field on a claim card. Shows up to two items; a third
 * or more collapses into a "+ and N more services" link.
 */
export default {
  title: 'Components/CareReceived',
  render: ({ items }) => {
    const container = document.createElement('div');
    container.style.width = '320px';
    container.innerHTML = renderCareReceived(items);
    return container;
  },
  argTypes: {
    items: { control: 'object', description: 'Care received line items' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Every claim card shows at least one item; two or more collapse behind a "+N more" link.',
      },
    },
  },
};

export const OneItem = {
  args: { items: ['Acupuncture – 60 min'] },
};

export const TwoItems = {
  args: { items: ['Acupuncture – 60 min', 'Moxibustion Therapy'] },
};

export const ThreeOrMore = {
  args: {
    items: [
      'Registered Dietitian Consultation',
      'Individualized Meal Planning',
      'Nutrition Assessment',
      'Behavior Modification Counseling',
      'Meal Planning Resources',
    ],
  },
  parameters: {
    docs: { description: { story: 'Beyond two items, extras collapse into "+ and N more services".' } },
  },
};
