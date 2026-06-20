import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  contributing: [
    {
      type: 'category',
      label: 'React Native에 기여하기',
      collapsed: false,
      collapsible: false,
      items: [
        'overview',
        'how-to-report-a-bug',
        'how-to-contribute-code',
        'how-to-build-from-source',
        'how-to-run-and-write-tests',
        'how-to-open-a-pull-request',
        'changelogs-in-pull-requests',
        'contribution-license-agreement',
        {
          type: 'category',
          label: '저장소 관리',
          collapsed: false,
          collapsible: false,
          items: [
            'triaging-github-issues',
            'labeling-github-issues',
            'managing-pull-requests',
            'bots-reference',
          ],
        },
      ],
    },
  ],
} satisfies SidebarsConfig;
