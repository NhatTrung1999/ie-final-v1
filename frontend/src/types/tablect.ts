export interface ITableHeader {
  No: string;
  ProgressStagePartName: string;
  Type: string;
  Cts: number;
  Average: string;
  MachineType: string;
  Confirm: string;
  Action: string;
}

export interface ITableData {
  Id: string;
  No: string;
  ProgressStagePartName: string;
  Area: string;
  Path: string;
  Nva: {
    Type: string;
    Cts: number[];
    Average: number;
  };
  Va: {
    Type: string;
    Cts: number[];
    Average: number;
  };
  MachineType: string;
  Confirm: string;
}

export const TABLE_HEADER: ITableHeader[] = [
  {
    No: 'No',
    ProgressStagePartName: 'Progress Stage Part Name',
    Type: 'Type',
    Cts: 10,
    Average: 'Average',
    MachineType: 'Machine Type',
    Confirm: 'Confirm',
    Action: 'Action',
  },
];

export interface ITableCtState {
  tablect: ITableData[];
  activeColId: string | null;
  loading: boolean;
  error: string | null;
}

export const TABLE_DATA: ITableData[] = [
  {
    Id: '1',
    No: 'C1',
    ProgressStagePartName: 'Test',
    Area: 'CUTTING',
    Path: '/path.json',
    Nva: {
      Type: 'NVA',
      Cts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Average: 0,
    },
    Va: {
      Type: 'VA',
      Cts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Average: 0,
    },
    MachineType: '',
    Confirm: '26324',
  },
];
