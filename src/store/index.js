import {createStore} from 'vuex'
import component from './modules/component'
import login from './modules/login'


export default createStore({
    modules:{
        component,
        login
    }
})