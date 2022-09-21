import '../css/default.css';
import '../css/main.css';

import { SceneInfo } from './model';

function main() {
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
  }

  window.addEventListener('resize', setLayout, { passive: true });
  window.addEventListener('DOMContentLoaded', setLayout);
}

main();
