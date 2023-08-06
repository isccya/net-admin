<script setup lang='ts'>
import { nextTick, reactive, ref, toRefs } from 'vue';

const data = reactive({
   form: {},
   queryParams: {
      apPlace: undefined,//apmc
      status: "",//ap状态
   },
   // 搜索规则
   // rules: {
   //    menuName: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
   //    orderNum: [{ required: true, message: "菜单顺序不能为空", trigger: "blur" }],
   //    path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }]
   // },
});
const { queryParams, form, } = toRefs(data);

interface AP {
   id: number,
   name: string,
   status?: boolean,
}

const apList = ref([
   {
      id: 1,
      date: '2016-05-02',
      name: 'wangxiaohu',
      address: '宿舍区',
      status: 1,
   },
   {
      id: 2,
      date: '2016-05-04',
      name: 'wangxiaohu',
      address: '教学区',
      children: [
         {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'Los Angeles',
            status: 1,
         },
         {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'Los Angeles',
            status: 1,
         },
      ],
   },
   {
      id: 3,
      date: '2016-05-01',
      name: 'wangxiaohu',
      address: '办公区',
      children: [
         {
            id: 33,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'Los Angeles',
            status: 1,
         },
         {
            id: 34,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'Los Angeles',
            children: [
               {
                  id: 35,
                  date: '2016-05-01',
                  name: 'wangxiaohu',
                  address: 'Los Angeles',
                  status: 1,
               },
               {
                  id: 36,
                  date: '2016-05-01',
                  name: 'wangxiaohu',
                  address: 'Los Angeles',
                  status: 1,
               },
            ],
         },
      ],
   },
]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const menuOptions = ref([]);
const isExpandAll = ref(false);//是否展开所有数据
const refreshTable = ref(true);
const showChooseIcon = ref(false);
const iconSelectRef = ref(null);
const judgStatus = [{ value: '0', label: '未在线' }, { value: '1', label: '在线' }]

/** 查询AP列表 */
function getList() {
   loading.value = true;
   loading.value = false;
}
/** 搜索按钮操作 */
function handleQuery() {
   getList();
}
/** 重置按钮操作 */
function resetQuery() {
   handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {

}
/** 展开/折叠操作 */
function toggleExpandAll() {
   refreshTable.value = false;
   isExpandAll.value = !isExpandAll.value;
   nextTick(() => {
      refreshTable.value = true;
   });
}
getList();
</script>


<template>
   <div class="app-container">
      <el-form :model="queryParams" :inline="true" v-show="showSearch">
         <el-form-item label="AP名称" prop="apPlace">
            <el-input v-model="queryParams.apPlace" placeholder="请输入地址名称" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
         <el-form-item label="AP状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="AP状态" clearable style="width: 200px">
               <el-option v-for="status in judgStatus" :key="status.value" :label="status.label" :value="status.value" />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb-8">
         <!-- <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
         </el-col> -->
         <el-col :span="1.5">
            <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
         </el-col>
         <!-- 隐藏搜索和刷新按钮 -->
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-if="refreshTable" v-loading="loading" :data="apList" row-key="id" :default-expand-all="isExpandAll"
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
         <!-- row-key是行数据的key,优化表格的渲染 -->
         <el-table-column prop="address" label="AP地址" />
         <el-table-column prop="status" label="AP状态">
            <template #default="scope">
               <div v-if="scope.row.status">
                  <el-tag type="success">正常</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="name" label="AP名称" align="center" />
         <el-table-column prop="name" label="AP型号" align="center" />
         <el-table-column prop="date" label="Mac地址" align="center" />
         <el-table-column prop="date" label="IP地址" align="center" />
         <el-table-column prop="name" label="楼" align="center" />
         <el-table-column prop="name" label="栋" align="center" />
         <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="console.log(123)">修改</el-button>
               <el-button link type="primary" icon="Plus" @click="console.log(123)">新增</el-button>
               <el-button link type="primary" icon="Delete" @click="console.log(123)">删除</el-button>
            </template>
         </el-table-column> -->
      </el-table>
   </div>
</template>

<style scoped></style>