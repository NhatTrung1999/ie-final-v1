export const TAB_STAGE_LIST: string[] = [
  'CUTTING',
  'STITCHING',
  'ASSEMBLY',
  'STOCKFITTING',
  'NOSEW',
];

export interface IStageListState {
  stagelist: any[];
  loading: boolean;
  error: string | null;
}
