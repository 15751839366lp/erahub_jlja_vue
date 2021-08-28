import request from '@/utils/axios'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const login = (data) => {
    return request({
        url: '/account/login',
        method: 'post',
        data,
        config: {
            headers: {
                "Authorization": getToken
            },
            timeout: 10000
        }
    })
}

export const logout = () => {
    return request({
        url: '/account/logout',
        method: 'get',
        config: {
            headers: {
                "Authorization": getToken
            },
            timeout: 10000
        }
    })
}

// export default null;