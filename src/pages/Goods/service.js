import request from '@/utils/request';

// 后台api接口
export async function query(params) {
  return request('/api/rule', {
    params,
  });
}
export async function remove(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params},
  });
}
export async function add(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params},
  });
}
export async function update(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params},
  });
}
