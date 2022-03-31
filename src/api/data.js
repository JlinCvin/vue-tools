import axios from '@/plugins/axios/api.request'


//发送签约
export const sendTaxSourceInvite= formData => {
  return axios.request({
      url: '/alliance/flexible/send_tax_source_invite',
      method: 'post',
      params: formData
  }).then((result) => {
      return result.data;
  });
};

//获取签约人员详情
export const getSignedUserDetail= formData => {
  return axios.request({
      url: '/alliance/flexible/signed_user_detail',
      method: 'get',
      params: formData
  }).then((result) => {
      return result.data;
  });
};

