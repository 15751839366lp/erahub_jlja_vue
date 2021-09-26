const authorityManage = [
    {
        path: "/authoritymanage/permissionmanage",
        name: "permissionmanage",
        meta: {
            title: '资源管理'
        },
        component: () => import ("../../views/authoritymanage/permissionmanage/PermissionManage.vue"),
    }, {
        path: "/authoritymanage/rolemanage",
        name: "rolemanage",
        meta: {
            title: '角色管理'
        },
        component: () => import ("../../views/authoritymanage/rolemanage/RoleManage.vue"),
    }, {
        path: "/authoritymanage/usermanage",
        name: "usermanage",
        meta: {
            title: '用户管理'
        },
        component: () => import ("../../views/authoritymanage/usermanage/UserManage.vue"),
    },
]

export default authorityManage