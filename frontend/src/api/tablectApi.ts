import axiosConfig from '../libs/axiosConfig';
import type { ITableCtPayload, ITableCtResponse } from '../types/tablect';

const tablectApi = {
  getData: async (): Promise<ITableCtResponse[]> => {
    const res = await axiosConfig.get('tablect/get-data');
    return res.data;
  },
  createData: async (payload: ITableCtPayload): Promise<ITableCtResponse> => {
    const res = await axiosConfig.post('tablect/create-data', payload);
    return res.data;
  },
  deleteData: async (Id: string) => {
    const res = await axiosConfig.delete(`tablect/${Id}`);
    return res.data;
  },
  saveData: async (payload: ITableCtPayload) => {
    const res = await axiosConfig.patch('tablect/save-data', payload);
    return res.data;
  },
  confirmData: async (payload: ITableCtPayload) => {
    const res = await axiosConfig.patch('tablect/confirm-data', payload);
    return res.data;
  },
};

export default tablectApi;
