import { request } from '@/services';

/**
 * 获取列表的请求方法
 * @param data - 请求参数，类型为任意类型
 * @returns 返回一个请求 Promise
 */
export const listRequest = (data: any) => {
    return request({
        url: '/api/xxx/xxx',
        method: 'get',
        params: data,
    });
};

/**
 * 获取单条详情的请求方法
 * @param data - 请求参数，类型为任意类型，包含 id 属性
 * @returns 返回一个请求 Promise
 */
export const detailRequest = (data: any) => {
    return request({
        url: `/api/xxx/xxx/${data.id}`,
        method: 'get',
    });
};

/**
 * 新增单条的请求方法
 * @param data - 请求参数，类型为任意类型
 * @returns 返回一个请求 Promise
 */

export const addRequest = (data: any) => {
    return request({
        url: `/api/xxx/xxx`,
        method: 'post',
        data,
    });
};

/**
 * 更新单条的请求方法
 * @param data - 请求参数，类型为任意类型
 * @returns 返回一个请求 Promise
 */

export const updateRequest = (data: any) => {
    return request({
        url: `/api/xxx/xxx`,
        method: 'put',
        data,
    });
};

/**
 * 删除单条的请求方法
 * @param data - 请求参数，类型为id列表
 * @returns 返回一个请求 Promise
 */

export const deleteRequest = (data: any[]) => {
    return request({
        url: `/api/xxx/xxx`,
        method: 'delete',
        data,
    });
};
