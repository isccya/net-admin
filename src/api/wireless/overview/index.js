import request from '../../../utils/request';

// 获取当前AP在线数
export function getApInfo(scope){
    return request({
        method:'get',
        url:`/overview/info`,
        params:{
            scope
        }
    })
}

// 获取掉线上线事件
export function getEventList(scope,buildingType,size,current){
    return request({
        method:"get",
        url:`/overview/event`,
        params:{
            scope,
            buildingType,
            size,
            current
        }
    })
}