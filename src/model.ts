type PositionType = 'sticky' | 'normal';

export interface SceneInfo {
  type: PositionType;
  heightNum: number;
  scrollHeight: number;
  objs: {
    container: HTMLElement;
    [key: string]: any;
  };
  values?: {
    [key: string]: ValuesArray | number | [number, number];
  };
}

export type ValuesArray =
  | [number, number, { start: number; end: number }]
  | number
  | [number, number];
