import service from '../utils/request'

export function login(data){
    return service.request({
        url: '/account/login',
        method: 'post',
        data,
    })
}

export function logout(){
    return service.request({
        url: '/account/logout',
        method: 'get',
    })
}

export function getUserInfo(){
    return service.request({
        url: '/account/getUserInfo',
        method: 'post',
    })
}