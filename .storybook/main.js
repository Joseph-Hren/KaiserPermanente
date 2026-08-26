/** @type {import('@storybook/html-vite').StorybookConfig} */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    defaultName: 'Docs',
  },
  staticDirs: [{ from: '../assets', to: '/assets' }],
  // Deployed under /KaiserPermanente/storybook/ on GitHub Pages; STORYBOOK_BASE_PATH
  // is set to that by the deploy workflow and left unset (root) for local dev.
  viteFinal: async (viteConfig) => {
    viteConfig.base = process.env.STORYBOOK_BASE_PATH || '/';
    return viteConfig;
  },
};

export default config;
