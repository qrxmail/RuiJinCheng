import request from '@/utils/request';
export async function getOilStation() {
  // return request('/api/common/getOilStation');
  return request('/api/rule', {
    params,
  });
}
export async function getDriver() {
  // return request('/api/common/getDriver');
  return request('/api/rule', {
    params,
  });
}
export async function getTruck() {
  // return request('/api/common/getTruck');
  return request('/api/rule', {
    params,
  });
}

