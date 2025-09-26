import axiosConfig from '../libs/axiosConfig';

const stagelistApi = {
  stagelistUpload: async (payload: FormData) => {
    // console.log(payload);
    const res = await axiosConfig.post('stagelist/stagelist-upload', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export default stagelistApi;
