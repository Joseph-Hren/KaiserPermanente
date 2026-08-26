import { renderServiceAccordion } from '../components/ServiceAccordion.js';

/**
 * One collapsible row in a claim overlay's SERVICES PROVIDED section.
 * Clicking the header toggles the `is-open` class, which the overlay wires
 * up at runtime — this story wires the same toggle for a live demo.
 */
export default {
  title: 'Components/ServiceAccordion',
  render: (args) => {
    const wrap = document.createElement('div');
    wrap.style.width = '480px';
    wrap.innerHTML = renderServiceAccordion(args.svc, {
      isPending: args.isPending,
      isOpen: args.isOpen,
      id: 'story-svc',
    });
    wrap.querySelectorAll('.ov-service-header').forEach((hdr) => {
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
    return wrap;
  },
  argTypes: {
    isPending: { control: 'boolean' },
    isOpen: { control: 'boolean', description: 'Initial expand/collapse state' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Click or focus + Enter/Space the header to expand/collapse. `isPending` swaps plan-rate/paid-by-Kaiser figures for "—" and the share amount for "Pending".',
      },
    },
  },
};

const sampleService = {
  name: 'Laboratory – A1C Blood Panel',
  total: '$85.00',
  planRate: '$35.00',
  paidByKaiser: '$0.00',
  patientTotal: '$35.00',
  notes: 'A1C test to monitor blood sugar levels over the past 3 months. Applied to deductible at plan rate.',
};

export const Collapsed = {
  args: { svc: sampleService, isPending: false, isOpen: false },
};

export const Expanded = {
  args: { svc: sampleService, isPending: false, isOpen: true },
};

export const PendingExpanded = {
  args: {
    svc: {
      name: 'Acupuncture – 60 min',
      total: '$125.00',
      planRate: null,
      paidByKaiser: null,
      patientTotal: null,
      notes: 'Monthly acupuncture session. Claim under review.',
    },
    isPending: true,
    isOpen: true,
  },
};
