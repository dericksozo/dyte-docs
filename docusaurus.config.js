/* eslint-disable */
const fs = require('fs');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');
const tailwindPlugin = require('./plugins/tailwind-plugin.cjs');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@docusaurus/preset-classic').Options} */
const defaultSettings = {
  remarkPlugins: [
    [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
  ],
};

/**
 * Defines a section with overridable defaults
 * @param {string} section
 * @param {import('@docusaurus/plugin-content-docs').Options} options
 */
function defineSection(section, version = {}, options = {}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      path: `docs/${section}`,
      routeBasePath: section,
      id: section,
      sidebarPath: require.resolve('./sidebars-default.js'),
      breadcrumbs: false,
      editUrl: 'https://github.com/dyte-in/docs/tree/main/',
      versions: version && {
        current: {
          label: version.label,
        },
      },
      ...defaultSettings,
      ...options,
    }),
  ];
}

const latestVersions = {
  'ui-kit': '1.x.x',
  'web-core': '1.x.x',
  'react-native': '0.25.x',
  android: '0.14.x',
  ios: '1.33.x',
  flutter: '0.7.x',
  'android-core': '1.x.x',
  'rn-core': '1.x.x',
  'flutter-core': '1.0.0',
  'ios-core': '1.0.0',
};

const SECTIONS = [
  defineSection('guides', {
    label: 'v2',
  }),
  defineSection('cli'),
  defineSection('plugin-sdk'),
  defineSection('react', { label: '0.x.x' }),
  defineSection('javascript', { label: '0.x.x' }),

  // [web] ui-sdk
  defineSection('ui-kit', {
    label: latestVersions['ui-kit'],
  }),
  defineSection('react-ui-kit', {
    label: latestVersions['ui-kit'],
  }),
  defineSection('angular-ui-kit', {
    label: latestVersions['ui-kit'],
  }),

  // [web] core-sdk
  defineSection('web-core', {
    label: latestVersions['web-core'],
  }),

  // [web] android-core
  defineSection('android-core', {
    label: latestVersions['android-core'],
  }),

  // [web] flutter-core
  defineSection('flutter-core', {
    label: latestVersions['flutter-core'],
  }),

  //mobile-core
  defineSection('ios-core', {
    label: latestVersions['ios-core'],
  }),

  // rn-core
  defineSection('rn-core', {
    label: latestVersions['rn-core'],
  }),

  // [mobile]
  defineSection('react-native', {
    label: latestVersions['react-native'],
  }),
  defineSection('android', {
    label: latestVersions['android'],
  }),
  defineSection('ios', {
    label: latestVersions['ios'],
  }),
  defineSection('flutter', {
    label: latestVersions['flutter'],
  }),
];

const sdksHTML = fs.readFileSync('./src/snippets/sdks.html', 'utf-8');
const resourcesHTML = fs.readFileSync('./src/snippets/resources.html', 'utf-8');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dyte Docs',
  tagline: 'Real-time audio & video SDKs, ready to launch 🚀',
  // TODO: Update base url
  url: 'https://docs.dyte.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/favicon.ico',
  trailingSlash: false,
  scripts: [
    { src: '/js/banner.js', async: true },
    ...(isDev
      ? []
      : [
          {
            src: 'https://cdn.dyte.in/manalytics.js',
            defer: true,
          },
        ]),
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dyte-in', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  clientModules: [
    require.resolve('./src/css/custom.css'),
    require.resolve('./src/css/api-reference.css'),
    require.resolve('./src/client/define-ui-kit.js'),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/home',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars-home.js'),
          breadcrumbs: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/dyte-in/docs/tree/main/',
          ...defaultSettings,
        },
        blog: false,
      }),
    ],
  ],

  plugins: [tailwindPlugin, webpackPlugin, ...SECTIONS],

  themes: ['@docusaurus/theme-live-codeblock'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/dyte-docs-card.png',
      colorMode: {
        defaultMode: 'dark',
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      announcementBar: {
        id: 'ph-banner',
        content: '<ph-banner></ph-banner>',
        isCloseable: false,
      },
      navbar: {
        // NOTE: hideOnScroll breaks on `/api`, enable when fixed
        // hideOnScroll: true,
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Dyte Docs',
          height: '40px',
          width: '101px',
        },
        items: [
          {
            label: 'SDKs',
            type: 'dropdown',
            className: 'dyte-dropdown',
            items: [
              {
                type: 'html',
                value: sdksHTML,
                className: 'dyte-dropdown',
              },
            ],
          },
          {
            label: 'Guides',
            to: 'guides/quickstart',
            position: 'left',
            className: 'new-badge',
          },
          {
            label: 'API Reference',
            to: '/api/',
          },
          {
            label: 'Resources',
            type: 'dropdown',
            className: 'dyte-dropdown resources-dropdown',
            items: [
              {
                type: 'html',
                value: resourcesHTML,
                className: 'dyte-dropdown',
              },
            ],
          },
          {
            label: 'Support',
            to: 'https://dyte.io/contact',
          },

          {
            type: 'search',
            position: 'right',
          },
          {
            label: 'Book a demo',
            href: 'https://dyte.io/schedule-demo',
            position: 'right',
            className: 'navbar-book-demo',
          },
          {
            label: 'Sign Up',
            href: 'https://dev.dyte.io/register',
            position: 'right',
            className: 'dev-portal-signup dev-portal-link',
          },
        ],
      },
      footer: {
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Dyte Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Demo',
                href: 'https://app.dyte.io',
              },
              {
                label: 'Developer Portal',
                href: 'https://dev.dyte.io',
              },
              {
                label: 'Pricing',
                href: 'https://dyte.io/#pricing',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://dyte.io',
              },
              {
                label: 'Join Us',
                href: 'https://dyte.freshteam.com/jobs',
              },
              {
                label: 'Privacy Policy',
                href: 'https://dyte.io/privacy-policy',
              },
              {
                label: 'Contact Us',
                href: 'https://dyte.io/contact',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: 'https://docs.dyte.io',
              },
              {
                label: 'Blog',
                href: 'https://dyte.io/blog',
              },
              {
                label: 'Community',
                href: 'https://community.dyte.io',
              },
            ],
          },
        ],
        copyright: 'Copyright © Dyte since 2020. All rights reserved.',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          'dart',
          'ruby',
          'groovy',
          'kotlin',
          'java',
          'swift',
          'objectivec',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-next-line-error',
          },
        ],
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      algolia: {
        appId: 'HL0HSV62RK',
        apiKey: '72ebf02146698733b7114c7b36da0945',
        indexName: 'docs',
        contextualSearch: true,
        searchParameters: {},
      },
    }),
};

module.exports = config;
