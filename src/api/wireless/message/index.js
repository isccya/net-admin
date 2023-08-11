import request from '../../../utils/request';

// 获取消息列表
export function getMessageList(size,current){
    return request({
        method:'get',
        url:"/message/list",
        params:{
            size,
            current,
        }
    })
}

// 获取消息详情
export function getMessageInfo(messageId){
    return request({
        method:'get',
        url:`/message/info/${messageId}`
    })
}