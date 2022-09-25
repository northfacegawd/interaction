type PositionType = 'sticky' | 'normal';

export interface SceneInfo {
  type: PositionType;
  heightNum: number;
  scrollHeight: number;
  objs: {
    container: HTMLElement;
    [key: string]: any;
  };
  videoObjs?: {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    videoImages: Array<HTMLImageElement>;
  };
  values?: {
    [key: string]: ValuesArray | number | [number, number];
  };
  videoValues?: {
    videoImageCount: number;
    imageSequence: [number, number];
  };
}

export type ValuesArray =
  | [number, number, { start: number; end: number }]
  | number
  | [number, number];
