import request from '../../../utils/request';

// 获取ap树
export function getApTree(params) {
    return request({
        method: 'get',
        url: "/ap/tree",
        // 搜索条件
        params,
    })
}

// 获取ap列表
export function getApList(building,params) {
    return request({
        url: `/ap/list/${building}`,
        method: 'GET',
        params,
    })
}

// 获取详细ap信息
export function getApDetail(uuid) {
    return request({
        method: 'get',
        url: `/ap/detail/${uuid}`,
    })
}