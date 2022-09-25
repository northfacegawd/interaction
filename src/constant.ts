import { SceneInfo } from './model';

export const sceneInfo: SceneInfo[] = [
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
      canvas: document.querySelector('#video-canvas-0') as HTMLCanvasElement,
      context: (
        document.querySelector('#video-canvas-0') as HTMLCanvasElement
      ).getContext('2d') as CanvasRenderingContext2D,
      videoImages: [],
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
      canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
      canvas_filter: [0, 10, { start: 0.9, end: 1 }],
      videoImageCount: 300,
      imageSequence: [0, 299],
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
      pinB: document.querySelector('#scroll-section-2 .b .pin') as HTMLElement,
      pinC: document.querySelector('#scroll-section-2 .c .pin') as HTMLElement,
      canvas: document.querySelector('#video-canvas-1') as HTMLCanvasElement,
      context: (
        document.querySelector('#video-canvas-1') as HTMLCanvasElement
      ).getContext('2d') as CanvasRenderingContext2D,
      videoImages: [],
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
      canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
      canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
      canvas_filter: [0, 10, { start: 0.9, end: 1 }],
      videoImageCount: 960,
      imageSequence: [0, 959],
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
      canvas: document.querySelector('.image-blend-canvas'),
      context: (
        document.querySelector('.image-blend-canvas') as HTMLCanvasElement
      ).getContext('2d'),
      imagesPath: ['blend-image-1.jpg', 'blend-image-2.jpg'],
      images: [],
    },
    values: {},
  },
];
