/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Community() {
  const {siteConfig} = useDocusaurusContext();
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned);

  return (
    <Section>
      <SectionTitle title="Meta의 지원, 커뮤니티의 힘." />
      <div className={styles.featureContainer}>
        <div>
          <p>
            Meta는 2015년 React Native를 출시했으며, 이후 꾸준히 유지 관리하고
            있습니다.
          </p>
          <p>
            2018년, React Native는 GitHub에서{' '}
            <a href="https://octoverse.github.com/2018/projects#repositories">
              2번째로 많은
            </a>{' '}
            기여자 수를 기록한 저장소였습니다. 현재 React Native는 전 세계
            개인과 기업의 기여로 유지되고 있으며, 여기에는{' '}
            <span>
              <a href="https://callstack.com/">Callstack</a>
            </span>
            ,{' '}
            <span>
              <a href="https://expo.io/">Expo</a>
            </span>
            , <a href="https://infinite.red/">Infinite Red</a>,{' '}
            <a href="https://www.microsoft.com/">Microsoft</a>,{' '}
            <a href="https://swmansion.com/">Software Mansion</a> 등이
            포함됩니다.
          </p>
          <p>
            우리 커뮤니티는 항상 흥미로운 새 프로젝트를 선보이며, Android와
            iOS를 넘어{' '}
            <span>
              <a href="https://github.com/microsoft/react-native-windows#readme">
                React Native Windows
              </a>
            </span>
            ,{' '}
            <a href="https://github.com/microsoft/react-native-macos#readme">
              React Native macOS
            </a>
            ,{' '}
            <a href="https://github.com/necolas/react-native-web#readme">
              React Native Web
            </a>{' '}
            등 다양한 플랫폼을 탐색하고 있습니다.
          </p>
        </div>
        <div>
          <p>
            React Native는 수천 개의 앱에서 사용되고 있으며, 이미 아래 앱 중
            하나를 사용해 보셨을 가능성이 높습니다:
          </p>
          <ul className="AppList">
            {apps.map((app, i) => {
              const imgSource = !app.icon.startsWith('http')
                ? useBaseUrl('img/showcase/' + app.icon)
                : app.icon;
              return (
                <li key={i} className="item">
                  {app.infoLink ? (
                    <a href={app.infoLink}>
                      <img src={imgSource} alt={app.name} />
                    </a>
                  ) : (
                    <img src={imgSource} alt={app.name} />
                  )}
                </li>
              );
            })}
          </ul>
          <p>
            그리고 <a href={useBaseUrl(`showcase`)}>더 많은 앱</a>들이 있습니다.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Community;
