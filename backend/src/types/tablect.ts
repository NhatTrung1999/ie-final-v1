export interface ITablectData {
  Id: string;
  TablectId: string;
  No: string;
  ProgressStagePartName: string;
  Area: string;
  Path: string;
  Nva: string;
  Va: string;
  MachineType: string;
  ConfirmId: string;
  CreatedBy: string;
  CreatedAt: string;
}

export interface ITablectType {
  Type: string;
  Cts: number[];
  Average: number;
}
