import { renderViewToggle } from '../components/ViewToggle.js';

/**
 * The Card view / List view toggle above "All claims". Hover previews the
 * other view by fading the current icon; clicking switches. Try clicking
 * without moving the mouse away — the hover preview is suppressed until you
 * leave and re-enter, so the toggle doesn't flash the view you just left.
 */
export default {
  title: 'Components/ViewToggle',
  render: ({ view: initialView }) => {
    let view = initialView;
    const wrap = document.createElement('div');

    function paint() {
      wrap.innerHTML = renderViewToggle({ view });
      const toggle = wrap.firstElementChild;
      toggle.addEventListener('click', () => {
        // Suppress the hover-preview fade right after a click — see
        // components/ViewToggle.js for why. Re-painting resets the class,
        // matching app.js's fresh mouseleave-driven re-arm.
        view = view === 'card' ? 'list' : 'card';
        paint();
        wrap.firstElementChild.classList.add('view-toggle--just-clicked');
      });
      toggle.addEventListener('mouseleave', () => {
        toggle.classList.remove('view-toggle--just-clicked');
      });
    }

    paint();
    return wrap;
  },
  argTypes: {
    view: { control: 'select', options: ['card', 'list'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'app.js wires the same click/mouseleave pair shown here — see components/ViewToggle.js for why.',
      },
    },
  },
};

export const CardSelected = { args: { view: 'card' } };
export const ListSelected = { args: { view: 'list' } };
