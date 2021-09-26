<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户数据
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      height="500" style="width: 100%" row-style="height:30px" :cell-style="{padding:'2px 0'}"
                      header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column fixed prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column fixed prop="username" label="用户名" width="150" align="center"></el-table-column>
                <el-table-column prop="trueName" label="真实姓名" width="150" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column fixed="right" width="100" label="锁定" align="center">
                    <template #default="scope">
                        <el-switch :loading="scope.row.lockSwitchLoading" v-model="scope.row.lockedModel" @change="switchBeforeChange(scope)" active-color="#13ce66" inactive-color="#ff4949" />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="demo-pagination-block">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :page-sizes="[5, 10, 30, 50]" :total="pageTotal"
                    @size-change="handleSizeChange" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUserList,updateUserData } from "../../../api/authoritymanage/userManage";

export default {
    name: "usermanage",
    setup() {
        const query = reactive({
            id: "",
            username: "",
            locked: "",
            deleted: "",
            startCreateTime: "",
            endCreateTime: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            getUserList(query).then((res) => {
                res.data.data.records.forEach(function (userData) {
                    userData.lockedModel = !userData.locked;
                    userData.lockSwitchLoading = false;
                });
                tableData.value = res.data.data.records;
                pageTotal.value = res.data.data.total;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };
        const handleSizeChange = (val) => {
            query.pageSize = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: "",
            address: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        //锁定用户
        const switchBeforeChange = (scope) => {
            scope.row.lockSwitchLoading = true;
            let data = {
                "id": scope.row.id,
                "locked": !scope.row.locked,
            }
            updateUserData(data).then((res) => {
                scope.row.locked = !scope.row.locked;
                if(!scope.row.locked){
                    ElMessage.success(`解锁成功`);
                }else{
                    ElMessage.success(`锁定成功`);
                }
                scope.row.lockSwitchLoading = false;
            }).catch((error)=>{
                if(scope.row.locked){
                    ElMessage.error(`解锁失败`);
                }else{
                    ElMessage.error(`锁定失败`);
                }
                scope.row.lockSwitchLoading = false;
                return false;
            });
        };

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleSizeChange,
            handleDelete,
            handleEdit,
            saveEdit,
            switchBeforeChange
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
</style>
