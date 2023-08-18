/**
 * 时间处理
 * */


export function timeFormat(time) { 
    if(time == null){
        return ''
    }
    return new Date(time).toLocaleString();
}