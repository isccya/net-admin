<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getApTree, getApList, getApDetail } from '../../../api/wireless/all';
import ApDetail from './components/ApDetail.vue'

const apDetail: any = ref(null)

const showListByApName = ref(false);

// 获取ap树,ap列表请求参数
const queryParams = reactive({
   apName: "", 
   state: "",  
})
const tableData: any = reactive([])
// ap树
const apTree = reactive([
   {
      Building: '宿舍区',
      children: [],
   },
   {
      Building: '办公区',
      children: [],
   },
   {
      Building: '教学区',
      children: [],
   },
]);

//控制哪个ap树展示
const apShow = ref(true)

// 控制列表加载
const loading = ref(true); 

const showSearch = ref(true); //是否展示搜索区域

const judgeState = [{ value: null, label: '全部' }, { value: '1', label: '正常' }, { value: '2', label: '故障' }]

const apInfo =reactive({});

// 获取ap树
function queryApTree() {
   loading.value = true;
   getApTree(queryParams).then((res: any) => {
      if (res.code === 200) {
         apTree[0].children = res.data.dormBuilding;
         apTree[1].children = res.data.officeBuilding;
         apTree[2].children = res.data.teachBuilding;
      }
      // 添加hasChildren属性
      function traverse(building) {
         if (!building.children || building.children.length === 0) {
            if (building.Building !== '宿舍区' && building.Building !== '办公区' && building.Building !== '教学区') {
               Object.defineProperty(building, "hasChildren", {
                  value: true,
               })
            }
         } else {
            for (const child of building.children) {
               Object.defineProperty(building, "hasChildren", {
                  value: true,
               })
               traverse(child);
            }
         }
      }
      for (const building of apTree) {
         traverse(building);
      }
      loading.value = false;
   })
}

// ap树懒加载
function load(row, treeNode, resolve) {
   traverse(row);
   function traverse(building) {
      if (!building.children || building.children.length === 0) {
         getApList(building.Building, queryParams).then((res: any) => {
            if (res.code === 200) {
               if (res.data === null) {
                  res.data = [];
               }
               resolve(res.data)
            }
         })
      } else {
         for (const child of building.children) {
            resolve(building.children)
            // traverse(child);
         }
      }
   }
}

// 查看ap详细信息
function queryApDetail(uuid) {
   apDetail.value.dialogVisible = true;
   getApDetail(uuid).then((res: any) => {
      if (res.code == 200) {
         for (let item in res.data) {
            apInfo[item] = res.data[item];
         }
      }
   })
}

/** 搜索按钮操作 */
function handleQuery() {
   apShow.value = !apShow.value;
   if (queryParams.apName === '') {
      showListByApName.value = false;
      queryApTree();
   } else {
      showListByApName.value = true;
      getApTree(queryParams).then((res: any) => {
         tableData.length = 0;
         for (let item in res.data) {
            for (let item2 of res.data[item]) {
               test(item2);
            }
         }
      })
   }
}
function test(item2) {
   if (!item2.children) {
      getApList(item2.Building, queryParams).then((res) => {
         tableData.push(...res.data);
      })
   } else {
      for (const child of item2.children) {
         test(child);
      }
   }
}
/** 重置按钮操作 */
function resetQuery() {
   queryParams.apName = '';
   queryParams.state = '';
   showListByApName.value = false;
}

onMounted(() => {
   queryApTree();
})
</script>


<template>
   <div class="app-container">
      <!-- 搜索 -->
      <el-form :model="queryParams" :inline="true" v-show="showSearch">
         <el-form-item label="AP名称" prop="apName">
            <el-input v-model="queryParams.apName" placeholder="请输入AP名称" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
         <el-form-item label="AP状态" prop="state">
            <el-select v-model="queryParams.state" placeholder="请选择AP状态" clearable style="width: 200px">
               <el-option v-for="state in judgeState" :key="state.value" :label="state.label" :value="state.value" />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb-8">
         <right-toolbar v-model:showSearch="showSearch" @queryTable="queryApTree"></right-toolbar>
      </el-row>

      <el-table v-if="!apShow && !showListByApName" v-loading="loading" :data="apTree" row-key="Building" lazy
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :load="load" border>
         <!-- row-key是行数据的key,优化表格的渲染 -->
         <el-table-column prop="Building" label="AP地址" width="220" align="left" />
         <el-table-column prop="status" label="AP状态" align="center">
            <template #default="scope">
               <div v-if="scope.row.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="scope.row.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="apName" label="AP名称" align="center" width="300" />
         <el-table-column prop="apModel" label="AP型号" align="center" width="180" />
         <el-table-column prop="mac" label="Mac地址" align="center" width="200" />
         <el-table-column prop="ip" label="IP地址" align="center" width="200" />
         <el-table-column prop="name" label="平台类型" align="center" width="150">
            <template #default="scope">
               <div v-if="scope.row.platform === 0">
                  H3C平台
               </div>
               <div v-if="scope.row.platform === 1">
                  HuaWei平台
               </div>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <div v-if="scope.row.apName">
                  <!-- <el-button link type="primary" icon="Edit" @click="console.log(123)">查看</el-button> -->
                  <el-button type="primary" plain @click="queryApDetail(scope.row.uuid)">查看</el-button>
               </div>
            </template>
         </el-table-column>
      </el-table>

      <el-table v-if="apShow && !showListByApName" v-loading="loading" :data="apTree" row-key="Building" lazy
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :load="load" border>
         <!-- row-key是行数据的key,优化表格的渲染 -->
         <el-table-column prop="Building" label="AP地址" width="220" align="left" />
         <el-table-column prop="status" label="AP状态" align="center">
            <template #default="scope">
               <div v-if="scope.row.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="scope.row.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="apName" label="AP名称" align="center" width="300" />
         <el-table-column prop="apModel" label="AP型号" align="center" width="180" />
         <el-table-column prop="mac" label="Mac地址" align="center" width="200" />
         <el-table-column prop="ip" label="IP地址" align="center" width="200" />
         <el-table-column prop="name" label="平台类型" align="center" width="150">
            <template #default="scope">
               <div v-if="scope.row.platform === 0">
                  H3C平台
               </div>
               <div v-if="scope.row.platform === 1">
                  HuaWei平台
               </div>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <div v-if="scope.row.apName">
                  <!-- <el-button link type="primary" icon="Edit" @click="console.log(123)">查看</el-button> -->
                  <el-button type="primary" plain @click="queryApDetail(scope.row.uuid)">查看</el-button>
               </div>
            </template>
         </el-table-column>
      </el-table>

      <el-table v-if="showListByApName" v-loading="loading" :data="tableData" style="width: 100%" border>
         <el-table-column prop="Building" label="AP地址" width="220" align="left" />
         <el-table-column prop="status" label="AP状态" align="center">
            <template #default="scope">
               <div v-if="scope.row.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="scope.row.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="apName" label="AP名称" align="center" width="300" />
         <el-table-column prop="apModel" label="AP型号" align="center" width="180" />
         <el-table-column prop="mac" label="Mac地址" align="center" width="200" />
         <el-table-column prop="ip" label="IP地址" align="center" width="200" />
         <el-table-column prop="name" label="平台类型" align="center" width="150">
            <template #default="scope">
               <div v-if="scope.row.platform === 0">
                  H3C平台
               </div>
               <div v-if="scope.row.platform === 1">
                  HuaWei平台
               </div>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <div v-if="scope.row.apName">
                  <!-- <el-button link type="primary" icon="Edit" @click="console.log(123)">查看</el-button> -->
                  <el-button type="primary" plain @click="queryApDetail(scope.row.uuid)">查看</el-button>
               </div>
            </template>
         </el-table-column>
      </el-table>

      <!-- 详细信息弹出框 -->
      <ApDetail ref="apDetail" :apInfo="apInfo"/>
   </div>
</template>

<style scoped></style>
