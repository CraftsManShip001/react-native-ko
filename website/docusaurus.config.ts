/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';
import path from 'path';

import users from './showcase.json';
import versions from './versions.json';
import prismThemeDark from './core/PrismThemeDark';
import prismThemeLight from './core/PrismThemeLight';

import remarkSnackPlayer from '@react-native-website/remark-snackplayer';
import remarkCodeblockLanguageTitle from '@react-native-website/remark-codeblock-language-as-title';

const isProductionDeployment =
  (!!process.env.NETLIFY && process.env.CONTEXT === 'production') ||
  (!!process.env.VERCEL && process.env.VERCEL_ENV === 'production');

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc. · 본 사이트는 React Native 공식 문서(CC BY 4.0)의 한국어 비공식 번역본입니다.`;

export type EditUrlButton = {
  label: string;
  href: string;
};

const commonDocsOptions: PluginContentDocs.Options = {
  admonitions: {keywords: ['important'], extendDefaults: true},
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl: (options => {
    const baseUrl =
      'https://github.com/facebook/react-native-website/edit/main';
    const nextReleasePath = `docs/${options.docPath}`;
    const isNextRelease = options.version === 'current';
    const buttons: EditUrlButton[] = [
      {
        label: isNextRelease ? 'Edit this page' : 'Edit page for next release',
        href: `${baseUrl}/${nextReleasePath}`,
      },
    ];
    if (!isNextRelease) {
      const label =
        options.version === lastVersion
          ? 'Edit page for current release'
          : `Edit page for ${options.version} release`;
      const thisVersionPath = path.posix.join(
        'website',
        options.versionDocsDirPath,
        options.docPath
      );
      buttons.push({
        label,
        href: `${baseUrl}/${thisVersionPath}`,
      });
    }
    return JSON.stringify(buttons);
  }) as PluginContentDocs.EditUrlFunction,
  remarkPlugins: [remarkSnackPlayer, remarkCodeblockLanguageTitle],
};

const isDeployPreview =
  process.env.PREVIEW_DEPLOY === 'true' ||
  (!!process.env.VERCEL && process.env.VERCEL_ENV === 'preview');

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  future: {
    // Turns Docusaurus v4 future flags on to make it easier to upgrade later
    v4: true,
    // Make Docusaurus build faster - enabled by default
    // See https://github.com/facebook/docusaurus/issues/10556
    // See https://github.com/facebook/react-native-website/pull/4268
    // See https://docusaurus.io/blog/releases/3.6
    faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },

  title: 'React Native',
  tagline:
    'React로 Android, iOS 등에서 동작하는 네이티브 앱을 만드는 프레임워크',
  organizationName: 'Meta Platforms, Inc.',
  projectName: 'react-native',
  url: 'https://reactnative.dev',
  baseUrl: '/',
  clientModules: [
    './modules/snackPlayerInitializer.ts',
    './modules/jumpToFragment.ts',
  ],
  trailingSlash: false, // because trailing slashes can break some existing relative links
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {
      src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
      defer: true,
    },
    {src: 'https://snack.expo.dev/embed.js', defer: true},
    {src: 'https://platform.twitter.com/widgets.js', async: true},
  ],
  favicon: 'favicon.ico',
  titleDelimiter: '·',
  customFields: {
    users,
    facebookAppId: '1677033832619985',
  },
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  onBrokenLinks: 'warn',
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'WebPage',
        '@id': 'https://reactnative.dev/',
        url: 'https://reactnative.dev/',
        name: 'React Native · Learn once, write anywhere',
        description:
          'A framework for building native apps for Android, iOS, and more using React',
        logo: 'https://reactnative.dev/img/pwa/manifest-icon-192.png',
        inLanguage: 'en-US',
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@type': 'WebSite',
        '@id': 'https://reactnative.dev/',
        url: 'https://reactnative.dev/',
        name: 'React Native · Learn once, write anywhere',
        description:
          'A framework for building native apps for Android, iOS, and more using React',
        publisher: 'Meta Platforms, Inc.',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://reactnative.dev/search?q={query}',
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              valueRequired: true,
              valueName: 'query',
            },
          },
        ],
        inLanguage: 'en-US',
      }),
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/pwa/apple-icon-180.png',
      },
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars'),
          editCurrentVersion: true,
          // 한국어 번역 사이트: 최신 stable 버전만 빌드한다.
          onlyIncludeVersions: [lastVersion],
          versions: {
            [lastVersion]: {
              badge: false, // Do not show version badge for last RN version
            },
          },
          ...commonDocsOptions,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        gtag: {
          trackingID: 'G-58L13S6BDP',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    function disableExpensiveBundlerOptimizationPlugin() {
      return {
        name: 'disable-expensive-bundler-optimizations',
        configureWebpack(_config, isServer) {
          // This optimization is expensive and only reduces by 3% the JS assets size
          // Let's skip it for local and deploy preview builds
          // See also https://github.com/facebook/docusaurus/discussions/11199
          return {
            optimization: {
              concatenateModules: isProductionDeployment ? !isServer : false,
            },
          };
        },
      };
    },
    [
      'content-docs',
      {
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: require.resolve('./sidebarsArchitecture'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      'content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: require.resolve('./sidebarsContributing'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    // PWA 플러그인은 한국어 사이트에서 비활성화함
    // (dev 모드의 @theme/PwaReloadPopup 미해결 이슈 회피용이며 PWA 기능은 불필요).
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'React Native · Learn once, write anywhere',
        siteDescription:
          'A framework for building native apps for Android, iOS, and more using React',
        depth: 3,
        includeOrder: [
          '/docs/getting-started',
          '/docs/environment-setup',
          '/docs/set-up-your-environment',
          '/docs/integration-with-existing-apps',
          '/docs/integration-with-android-fragment',
          '/docs/intro-react-native-components',
          '/docs/intro-react',
          '/docs/handling-text-input',
          '/docs/using-a-scrollview',
          '/docs/using-a-listview',
          '/docs/troubleshooting',
          '/docs/platform-specific-code',
          '/docs/building-for-tv',
          '/docs/out-of-tree-platforms',
          '/docs/more-resources',
          '/docs/**',
          '/architecture/**',
          '/showcase/**',
          '/contributing/**',
          '/versions',
        ],
        content: {
          includeBlog: false,
          includePages: true,
          includeVersionedDocs: false,
          enableLlmsFullTxt: true,
          excludeRoutes: [
            '/blog/201*/**',
            '/blog/2020/**',
            '/blog/2021/**',
            '/blog/2022/**',
            '/blog/page/**',
            '/blog/tags/**',
            '/blog/archive',
            '/blog/authors',
            '/releases',
            '/search',
          ],
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      defaultLanguage: 'tsx',
      theme: prismThemeLight,
      darkTheme: prismThemeDark,
      additionalLanguages: [
        'diff',
        'bash',
        'json',
        'java',
        'kotlin',
        'objectivec',
        'swift',
        'groovy',
        'ruby',
        'flow',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-add-line',
          line: 'highlight-add-next-line',
          block: {start: 'highlight-add-start', end: 'highlight-add-end'},
        },
        {
          className: 'code-remove-line',
          line: 'highlight-remove-next-line',
          block: {
            start: 'highlight-remove-start',
            end: 'highlight-remove-end',
          },
        },
      ],
    },
    navbar: {
      title: 'React Native',
      logo: {
        src: 'img/header_logo.svg',
        alt: '',
      },
      style: 'dark',
      items: [
        {
          label: '개발',
          type: 'dropdown',
          position: 'right',
          items: [
            {
              label: '가이드',
              type: 'doc',
              docId: 'getting-started',
            },
            {
              label: '컴포넌트',
              type: 'doc',
              docId: 'components-and-apis',
            },
            {
              label: 'API',
              type: 'doc',
              docId: 'accessibilityinfo',
            },
            {
              label: '아키텍처',
              type: 'doc',
              docId: 'architecture-overview',
              docsPluginId: 'architecture',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'overview',
          label: '기여하기',
          position: 'right',
          docsPluginId: 'contributing',
        },
        {
          to: '/showcase',
          label: '쇼케이스',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: '모든 버전',
            },
          ],
        },
        {
          href: 'https://github.com/facebook/react-native',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    image: 'img/logo-share.png',
    footer: {
      style: 'dark',
      links: [
        {
          title: '개발하기',
          items: [
            {
              label: '가이드',
              to: 'docs/getting-started',
            },
            {
              label: '컴포넌트',
              to: 'docs/components-and-apis',
            },
            {
              label: 'API',
              to: 'docs/accessibilityinfo',
            },
            {
              label: '아키텍처',
              to: 'architecture/overview',
            },
          ],
        },
        {
          title: '참여하기',
          items: [
            {
              label: '쇼케이스',
              to: 'showcase',
            },
            {
              label: '기여하기',
              to: 'contributing/overview',
            },
            {
              label: '디렉터리',
              href: 'https://reactnative.directory/',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native',
            },
          ],
        },
        {
          title: '소통하기',
          items: [
            {
              label: 'X',
              href: 'https://x.com/reactnative',
            },
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/reactnative.dev',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/react-native',
            },
          ],
        },
        {
          title: '더 둘러보기',
          items: [
            {
              label: 'ReactJS',
              href: 'https://react.dev/',
            },
            {
              label: '개인정보 처리방침',
              href: 'https://opensource.fb.com/legal/privacy/',
            },
            {
              label: '이용약관',
              href: 'https://opensource.fb.com/legal/terms/',
            },
          ],
        },
      ],
      logo: {
        alt: 'Meta Open Source Logo',
        src: 'img/oss_logo.svg',
        href: 'https://opensource.fb.com/',
      },
      copyright,
    },
    algolia: {
      appId: '8TDSE0OHGQ',
      apiKey: '83cd239c72f9f8b0ed270a04b1185288',
      indexName: 'react-native-v2',
      contextualSearch: true,
    },
    metadata: [
      {
        property: 'og:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:site', content: '@reactnative'},
      {name: 'mobile-web-app-capable', content: 'yes'},
    ],
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        fontFamily:
          '"Optimistic Display", system-ui, -apple-system, sans-serif',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
