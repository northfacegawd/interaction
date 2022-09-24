import '../css/default.css';
import '../css/main.css';

import { SceneInfo, ValuesArray } from './model';

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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1') as HTMLElement,
        content: document.querySelector(
          '#scroll-section-1 .description',
        ) as HTMLElement,
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2') as HTMLElement,
        messageA: document.querySelector('#scroll-section-2 .a') as HTMLElement,
        messageB: document.querySelector('#scroll-section-2 .b') as HTMLElement,
        messageC: document.querySelector('#scroll-section-2 .c') as HTMLElement,
        pinB: document.querySelector(
          '#scroll-section-2 .b .pin',
        ) as HTMLElement,
        pinC: document.querySelector(
          '#scroll-section-2 .c .pin',
        ) as HTMLElement,
      },
      values: {
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3') as HTMLElement,
        canvasCaption: document.querySelector(
          '.canvas-caption',
        ) as HTMLCanvasElement,
      },
    },
  ];

  // 각 스크롤 섹션의 높이 세팅
  function setLayout() {
    sceneInfo.forEach((scene) => {
      if (scene.objs.container) {
        if (scene.type === 'sticky') {
          scene.scrollHeight = scene.heightNum * window.innerHeight;
        }
        if (scene.type === 'normal') {
          scene.scrollHeight = scene.objs.container.offsetHeight;
        }
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
  function calcValues(values: ValuesArray, currentYOffset: number) {
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // 현재 씬에서 스크롤된 범위를 비율로 구하기
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length > 2) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        return (
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0]
        );
      }
      if (currentYOffset < partScrollStart) {
        return values[0];
      }
      if (currentYOffset > partScrollEnd) {
        return values[1];
      }
    }

    return scrollRatio * (values[1] - values[0]) + values[0];
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // yOffset / 현재 씬의 scrollHeight
    const scrollRatio = currentYOffset / scrollHeight;
    if (!values) {
      return;
    }
    switch (currentScene) {
      case 0:
        /** a */
        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = `${calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          )}`;
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%)`;
        }
        if (scrollRatio > 0.22) {
          objs.messageA.style.opacity = `${calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          )}`;
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%)`;
        }
        /** b */
        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = `${calcValues(
            values.messageB_opacity_in,
            currentYOffset,
          )}`;
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio > 0.42) {
          // out
          objs.messageB.style.opacity = `${calcValues(
            values.messageB_opacity_out,
            currentYOffset,
          )}`;
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }
        /** c */
        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = `${calcValues(
            values.messageC_opacity_in,
            currentYOffset,
          )}`;
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio > 0.62) {
          // out
          objs.messageC.style.opacity = `${calcValues(
            values.messageC_opacity_out,
            currentYOffset,
          )}`;
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }
        /** d */

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = `${calcValues(
            values.messageD_opacity_in,
            currentYOffset,
          )}`;
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = `${calcValues(
            values.messageD_opacity_out,
            currentYOffset,
          )}`;
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }

        break;
      case 2:
        /** a */
        console.log(sceneInfo[currentScene].objs);
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = `${calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          )}`;
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio > 0.25) {
          // out
          objs.messageA.style.opacity = `${calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          )}`;
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }
        /** b */
        if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageB.style.opacity = `${calcValues(
            values.messageB_opacity_in,
            currentYOffset,
          )}`;
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset,
          )})`;
        }
        if (scrollRatio > 0.57) {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageB.style.opacity = `${calcValues(
            values.messageB_opacity_out,
            currentYOffset,
          )}`;
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset,
          )})`;
        }
        /** c */
        if (scrollRatio <= 0.83) {
          console.log('hi');
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageC.style.opacity = `${calcValues(
            values.messageC_opacity_in,
            currentYOffset,
          )}`;
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset,
          )})`;
        }
        if (scrollRatio > 0.83) {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageC.style.opacity = `${calcValues(
            values.messageC_opacity_out,
            currentYOffset,
          )}`;
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset,
          )})`;
        }
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
