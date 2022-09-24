type PositionType = 'sticky' | 'normal';

export interface SceneInfo {
  type: PositionType;
  heightNum: number;
  scrollHeight: number;
  objs: {
    container: HTMLElement;
    [key: string]: HTMLElement;
  };
  values?: {
    [key: string]: ValuesArray;
  };
}

export type ValuesArray = [number, number, { start: number; end: number }];
