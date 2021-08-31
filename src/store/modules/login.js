import {getUserInfo, login, logout} from '../../api/login'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {useRouter} from "vue-router";

export default ({
    namespaced:true,
    state: {
        id: 0,
        username:"",
        locked: false,
        token: getToken(),
        roles: [],
        permissions: [],
        expire: false,
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        // SET_TOKEN: (state, token) => {
        //     state.token = getToken()
        // },
        SET_LOCKED: (state, locked) => {
            state.locked = locked
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        },
        SET_EXPIRE: (state, expire) => {
            state.expire = expire
        },
    },

    actions: {
        // 登出
        logout({commit, state}) {
            return logout().then(() => {
                commit('SET_ID', '');
                commit('SET_ROLES', []);
                // 注销QQ
                // QC.Login.signOut();
                removeToken();
            }).catch(error => {
                alert(error)
                // reject(error)
            })
        },
        getUserInfo({commit, state}){
            return getUserInfo().then(res => {
                let data = res.data.data;
                let user = data.user;
                commit('SET_ID', user.id);
                commit('SET_USERNAME', user.username);
                commit('SET_LOCKED', user.locked);
                commit('SET_ROLES', user.roles);
                commit('SET_PERMISSIONS', user.permissions);
                // const router = useRouter();
                // router.push('/');
            }).catch(error => {
                commit('SET_EXPIRE', true);
                window.localStorage.removeItem('token');
            })
        }
    }
})


