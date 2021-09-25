<template>
    <div class="login-wrap">
        <particles></particles>
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="param.password" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {ref, reactive} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {ElMessage, ElLoading} from "element-plus";
    import {login} from "../api/login";
    import Particles from '../components/particles/index.vue'

    export default {
        components: {
            "particles":Particles
        },

        setup() {
            const store = useStore();
            const router = useRouter();
            const param = reactive({
                username: "",
                password: "",
            });

            const rules = {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                ],
            };
            const loginForm = ref(null);
            const submitForm = () => {
                loginForm.value.validate((valid) => {
                    if (valid) {
                        let loading = ElLoading.service({
                            text: 'Loading',
                        });
                        login(param).then(res => {
                            localStorage.setItem("ms_username", param.username);
                            localStorage.setItem("token", res.headers.authorization);
                            ElMessage.success("登录成功");
                            store.dispatch("login/getUserInfo").then(() => {
                                router.push('/');
                                loading.close();
                            }).catch(() => {
                                ElMessage.error("数据错误");
                            });
                        }).catch(err => {
                            loading.close();
                        })
                    } else {
                        return false;
                    }
                });
            };

            store.commit("component/clearTags");

            return {
                param,
                rules,
                loginForm,
                submitForm,
            };
        },
    };
</script>

<style scoped>
    .login-wrap {
        background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
        /*background-image: url("../images/bg_login.png");*/
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        z-index:999;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>