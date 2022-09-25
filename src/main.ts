import '../css/default.css';
import '../css/main.css';
import { sceneInfo } from './constant';

import { ValuesArray } from './model';

function main() {
  // window.pageXOffset 대신 쓸 변수
  let yOffset = 0;
  // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 높이값의 합
  let prevScrollHeight = 0;
  // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let currentScene = 0;
  // 새로운 scene이 시작된 순간 true
  let enterNewScene = false;

  async function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < (sceneInfo[0].values?.videoImageCount ?? 0); i++) {
      imgElem = document.createElement('img');
      imgElem.src = (await import(`../video/001/IMG_${6726 + i}.JPG`)).default;
      sceneInfo[0].objs?.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < (sceneInfo[2].values?.videoImageCount ?? 0); i++) {
      imgElem2 = document.createElement('img');
      imgElem2.src = (await import(`../video/002/IMG_${7027 + i}.JPG`)).default;
      sceneInfo[2].objs?.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i = 0; i < (sceneInfo[3].objs?.imagesPath.length ?? 0); i++) {
      imgElem3 = document.createElement('img');
      imgElem3.src = (
        await import(`../images/${sceneInfo[3].objs.imagesPath[i]}`)
      ).default;
      sceneInfo[3].objs?.images.push(imgElem3);
    }
    console.log(sceneInfo[3].objs?.images);
  }

  setCanvasImages();

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

    // let heightRatio = window.innerHeight / 1080;
    // if (heightRatio > 1) {
    //   heightRatio = 1;
    // }
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
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
    if (!(values instanceof Array)) {
      return 0;
    }
    if (values.length === 3) {
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
        const sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset),
        );
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = `${calcValues(
          values.canvas_opacity,
          currentYOffset,
        )}`;
        objs.canvas.style.filter = `blur(${calcValues(
          values.canvas_filter,
          currentYOffset,
        )}px)`;
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
        const sequence2 = Math.round(
          calcValues(values.imageSequence, currentYOffset),
        );
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        objs.canvas.style.filter = `blur(${calcValues(
          values.canvas_filter,
          currentYOffset,
        )}px)`;

        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = `${calcValues(
            values.canvas_opacity_in,
            currentYOffset,
          )}`;
        }
        if (scrollRatio > 0.5) {
          objs.canvas.style.opacity = `${calcValues(
            values.canvas_opacity_out,
            currentYOffset,
          )}`;
        }

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
        // 가로 / 세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio = 0;
        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        if (values.rect1X instanceof Array && values.rect2X instanceof Array) {
          if (!values.rectStartY) {
            // values.rectStartY = objs.canvas.getBoundingClientRect().top;
            values.rectStartY =
              objs.canvas.offsetTop +
              (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
            console.log(values.rectStartY);
            values.rect1X[2]!.start = window.innerHeight / 2 / scrollHeight;
            values.rect2X[2]!.start = window.innerHeight / 2 / scrollHeight;
            values.rect1X[2]!.end = (values.rectStartY as any) / scrollHeight;
            values.rect2X[2]!.end = (values.rectStartY as any) / scrollHeight;
          }
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 흰색 박스 그리기
          objs.context.fillRect(
            calcValues(values.rect1X, currentYOffset),
            0,
            parseInt(`${whiteRectWidth}`),
            objs.canvas.height,
          );
          objs.context.fillRect(
            calcValues(values.rect2X, currentYOffset),
            0,
            parseInt(`${whiteRectWidth}`),
            objs.canvas.height,
          );
        }

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
  window.addEventListener('load', () => {
    const firstScene = sceneInfo[0];
    setLayout();
    firstScene.objs.context.drawImage(firstScene.objs.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout, { passive: true });
}

main();
