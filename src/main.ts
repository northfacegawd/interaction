import '../css/default.css';
import '../css/main.css';

import { SceneInfo } from './model';

function main() {
  // window.pageXOffset 대신 쓸 변수
  let yOffset = 0;
  // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 높이값의 합
  let prevScrollHeight = 0;
  // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let currentScene = 0;
  // 새로운 scene이 시작된 순간 true
  let enterNewScene = false;

  const sceneInfo: SceneInfo[] = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0') as HTMLElement,
        messageA: document.querySelector(
          '#scroll-section-0 .main-message.a',
        ) as HTMLElement,
        messageB: document.querySelector(
          '#scroll-section-0 .main-message.b',
        ) as HTMLElement,
        messageC: document.querySelector(
          '#scroll-section-0 .main-message.c',
        ) as HTMLElement,
        messageD: document.querySelector(
          '#scroll-section-0 .main-message.d',
        ) as HTMLElement,
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1') as HTMLElement,
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2') as HTMLElement,
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3') as HTMLElement,
      },
    },
  ];

  // 각 스크롤 섹션의 높이 세팅
  function setLayout() {
    sceneInfo.forEach((scene) => {
      scene.scrollHeight = scene.heightNum * window.innerHeight;
      if (scene.objs.container) {
        scene.objs.container.style.height = `${scene.scrollHeight}px`;
      }
    });

    // 섹션 높이 세팅 후 yOffset을 초기화 해주어야함
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  /**
   *
   * @param values 애니메이션을 추가할 속성
   * @param currentYOffset 현재 씬에서 얼마나 스크롤 되었는지
   */
  function calcValues(values: [number, number], currentYOffset: number) {
    // 현재 씬에서 스크롤된 범위를 비율로 구하기
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    const rv = scrollRatio * (values[1] - values[0]) + values[0];

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        if (!values) {
          return;
        }
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity,
          currentYOffset,
        ).toString();
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    // prevScrollHeight 초기화
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) {
        return;
      }
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (enterNewScene) {
      return;
    }
    playAnimation();
  }

  window.addEventListener(
    'scroll',
    () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    },
    { passive: true },
  );
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout, { passive: true });
}

main();
