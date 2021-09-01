<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.url" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.permission }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.url" :key="subItem.url">
                                <template #title>{{ subItem.permission }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.url">
                                    {{ threeItem.permission }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">{{ subItem.permission }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.permission }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {computed, watch} from "vue";
    import {useStore} from "vuex";
    import {useRoute} from "vue-router";

    export default {
        setup() {
            let items = [];

            const route = useRoute();

            const store = useStore();

            const onRoutes = computed(() => {
                return route.path;
            });

            const collapse = computed(() => store.state.component.collapse);

            const getMenus = () => {
                items = store.state.login.menus
            }
            getMenus();

            return {
                items,
                onRoutes,
                collapse,
                getMenus
            };
        },
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
