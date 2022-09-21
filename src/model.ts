type PositionType = 'sticky' | 'normal';

export interface SceneInfo {
  type: PositionType;
  heightNum: number;
  scrollHeight: number;
  objs: {
    container: HTMLElement | null;
  };
}
