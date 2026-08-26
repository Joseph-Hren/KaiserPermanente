import { renderPagination, getMobilePageItems } from '../components/Pagination.js';

/**
 * The pagination bar shown below "All claims": an item-count label,
 * prev/next arrows, and page-number buttons. Desktop lists every page;
 * mobile windows around the current page with an ellipsis. This story is
 * interactive — click a page number or an arrow to see it repaint, the same
 * as `app.js` does on the live site.
 */
export default {
  title: 'Components/Pagination',
  argTypes: {
    total: { control: 'number', description: 'Total items across all pages' },
    perPage: { control: 'number', description: 'Items shown per page' },
    mobile: { control: 'boolean', description: 'Use the ellipsis-windowed mobile page list' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Purely presentational — renderPagination() returns markup only; the caller wires click handlers on `.page-btn` and `.pagination-arrow`, same as this story does.',
      },
    },
  },
};

function makeInteractiveDemo({ total, perPage, mobile }) {
  let current = 1;
  const wrap = document.createElement('div');
  wrap.className = 'pagination';

  function paint() {
    const totalPages = Math.ceil(total / perPage);
    const pageItems = mobile
      ? getMobilePageItems(current, totalPages)
      : Array.from({ length: totalPages }, (_, i) => i + 1);
    wrap.innerHTML = renderPagination({ total, perPage, current, pageItems });

    wrap.querySelectorAll('.page-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        current = parseInt(btn.dataset.page, 10);
        paint();
      });
    });
    wrap.querySelectorAll('.pagination-arrow').forEach((arrow) => {
      arrow.addEventListener('click', () => {
        if (arrow.disabled) return;
        const dir = arrow.getAttribute('aria-label') === 'Previous page' ? -1 : 1;
        current = Math.max(1, Math.min(totalPages, current + dir));
        paint();
      });
    });
  }

  paint();
  return wrap;
}

export const Desktop = {
  args: { total: 31, perPage: 12, mobile: false },
  render: (args) => makeInteractiveDemo(args),
};

export const Mobile = {
  args: { total: 31, perPage: 6, mobile: true },
  render: (args) => makeInteractiveDemo(args),
  parameters: {
    docs: { description: { story: 'Ellipsis-windowed page list at the compact mobile sizing.' } },
  },
};

export const ManyPages = {
  args: { total: 240, perPage: 12, mobile: true },
  render: (args) => makeInteractiveDemo(args),
  parameters: {
    docs: { description: { story: 'Windowing shows ellipses on both sides once there are enough pages.' } },
  },
};
