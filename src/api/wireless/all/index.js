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
export function getApList(building) {
    return request({
        url: `/ap/list/${building}`,
        method: 'GET',
    })
}

// 获取详细ap信息
export function getApDetail() {
    return request({
        method: 'get',
        url: "/ap/detail/{sn}",
    })
}