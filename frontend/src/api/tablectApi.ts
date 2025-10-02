import axiosConfig from '../libs/axiosConfig';
import type { ITableCtPayload, ITableCtResponse } from '../types/tablect';

const tablectApi = {
  saveData: async (payload: ITableCtPayload): Promise<ITableCtResponse> => {
    const res = await axiosConfig.post('tablect/save-data', payload);
    return res.data;
  },
};

export default tablectApi;
