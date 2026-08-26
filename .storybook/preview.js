import '../styles.css';

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'kp-grey',
      values: [
        { name: 'kp-grey', value: '#ebebeb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Overview', 'Components', 'Changelog', '*'],
      },
    },
  },
};

export default preview;
