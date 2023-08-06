import request from '../../../utils/request';

// 获取ap列表
export function getApList(){
    return request({
        method:'get',
        url:"/ap/tree",
    })
}

// 获取详细ap信息
export function getApDetail(){
    return request({
        method:'get',
        url:"/ap/detail/{sn}",
    })
}