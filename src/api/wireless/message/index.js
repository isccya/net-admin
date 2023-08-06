import request from '../../../utils/request';

// 获取消息列表
export function getMessageList(){
    return request({
        method:'get',
        url:"/message/list"
    })
}

// 获取消息详情
export function getMessageInfo(){
    return request({
        method:'get',
        url:"/message/info"
    })
}