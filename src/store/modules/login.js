import {login, logout} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        user: {},
        status: '',
        code: '',
        token: getToken(),
        id: 0,
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        menus: [], // 菜单权限
        // 按钮级权限管控 - ①新增 button 全局变量
        buttons: [], // 按钮权限
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus
        },
        // 按钮级权限管控 - ②新增 mutations 操作 button
        SET_BUTTONS: (state, buttons) => {
            state.buttons = buttons
        }
    },

    actions: {
        // 用户名登录
        login({commit}, userInfo) {
            const username = userInfo.username.trim();
            userInfo.username = username;
            return login(userInfo).then(response => {
                const data = response.data;
                console.log(response);
                commit('SET_TOKEN', data.token);// 将token保存到localstorage里 -> 作为前端用户已登录的标识
                setToken(response.data.token);
            }).catch(error => {
                // 登录失败，回传提示信息
                alert(error)
            })
        },
        // 登出
        logout({commit, state}) {
            return logout().then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                // 注销QQ
                // QC.Login.signOut();
                removeToken();
            }).catch(error => {
                alert(error)
                // reject(error)
            })
        }
    }
}

export default user
