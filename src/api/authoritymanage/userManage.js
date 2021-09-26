import service from '../../utils/request'

export function getUserList(data){
    return service.request({
        url: '/user/getUserList',
        method: 'post',
        data,
    })
}

export function updateUserData(data){
    return service.request({
        url: '/user/updateUserData',
        method: 'post',
        data,
    })
}