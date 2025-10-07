import axiosConfig from '../libs/axiosConfig';

const excelApi = {
  exportLSA: async () => {
    const res = await axiosConfig.get('excel/export-lsa', {
      responseType: 'blob',
    });
    return res.data;
  },
  exportTimeStudy: async () => {
    const res = await axiosConfig.get('excel/export-time-study', {
      responseType: 'blob',
    });
    return res.data;
  },
};

export default excelApi;
