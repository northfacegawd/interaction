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

  const sceneInfo: SceneInfo[] = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
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

  function scrollLoop() {
    // prevScrollHeight 초기화
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) {
        return;
      }
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
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
