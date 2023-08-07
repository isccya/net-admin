<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { getApTree, getApList } from '../../../api/wireless/all';


const queryParams = reactive({
   apName: "", //ap名称
   state: "",  //ap状态
})

interface AP {
   Building: string,
   commonState: boolean,
   apName: string,
   apModel: string,
   mac: string,
   ip: string,
   platform: number
}

const apTree = reactive([
   {
      sn: 1,
      Building: '宿舍区',
      children: [],
      hasChildren: true,
   },
   {
      sn: 2,
      Building: '办公区',
      children: [],
      hasChildren: true
   },
   {
      sn: 3,
      Building: '教学区',
      children: [
         {
            "Building": "2q_11d"
         },
         {
            "Building": "2q_8d"
         },
         {
            "Building": "2q_8-9d"
         },
         {
            "Building": "2q_6d"
         },
         {
            "Building": "2q_5d"
         },
         {
            "Building": "2q_9d"
         },
         {
            "Building": "2q_7d"
         },
         {
            "Building": "2q_10d"
         }
      ]
   },
]);

const loading = ref(true); // 控制列表加载
const showSearch = ref(true);
const isExpandAll = ref(false);//是否展开所有数据
const refreshTable = ref(true);
const judgeStatus = [{ value: ' ', label: '全部' }, { value: '1', label: '正常' }, { value: '2', label: '故障' }]

// 获取ap树
function queryApTree() {
   loading.value = true;
   getApTree(queryParams).then((res: any) => {
      if (res.code === 200) {
         apTree[0].children = res.data.dormBuilding;
         apTree[1].children = res.data.officeBuilding;
      }
      loading.value = false;
   })
}
// ap树懒加载
// function load(row, treeNode, resolve) {
//    for (let items in row) {
//       if (items === 'children') {
//          for (let items1 in row.children) {
//             if (items === 'children') {
//                console.log(row.children);

//             }
//          }
//       }

//    }

   // getApList(row.children[0].Building).then((res) => {
   //   console.log(res);

   // })


// }
// const load = (
//    row: AP,
//    treeNode: unknown,
//    resolve: (date) => void
// ) => {
//    setTimeout(() => {
//       getApList().then(() => {
//          resolve([
//             {
//                id: 31,
//                date: '2016-05-01',
//                name: 'wangxiaohu',
//                address: 'No. 189, Grove St, Los Angeles',
//             },
//             {
//                id: 32,
//                date: '2016-05-01',
//                name: 'wangxiaohu',
//                address: 'No. 189, Grove St, Los Angeles',
//             },
//          ])
//       })
//    }, 1000)
// }
/** 查询AP列表 */
function getList() {
   loading.value = true;
   loading.value = false;
}
/** 搜索按钮操作 */
function handleQuery() {
   getApTree();
}
/** 重置按钮操作 */
function resetQuery() {

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

onMounted(() => {
   queryApTree();
})
</script>


<template>
   <div class="app-container">
      <el-form :model="queryParams" :inline="true" v-show="showSearch">
         <el-form-item label="AP名称" prop="apPlace">
            <el-input v-model="queryParams.apName" placeholder="请输入AP名称" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
         <el-form-item label="AP状态" prop="status">
            <el-select v-model="queryParams.state" placeholder="请选择AP状态" clearable style="width: 200px">
               <el-option v-for="status in judgeStatus" :key="status.value" :label="status.label" :value="status.value" />
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
         <right-toolbar v-model:showSearch="showSearch" @queryTable="queryApTree"></right-toolbar>
      </el-row>

      <el-table v-if="refreshTable" v-loading="loading" :data="apTree" row-key="Building" :default-expand-all="isExpandAll"
         lazy  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
         <!-- row-key是行数据的key,优化表格的渲染 -->
         <el-table-column prop="Building" label="AP地址" width="200" align="center" />
         <el-table-column prop="status" label="AP状态" align="center">
            <template #default="scope">
               <div v-if="scope.row.state === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="scope.row.state === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="name" label="AP名称" align="center" />
         <el-table-column prop="name" label="AP型号" align="center" />
         <el-table-column prop="date" label="Mac地址" align="center" />
         <el-table-column prop="date" label="IP地址" align="center" />
         <el-table-column prop="name" label="平台类型" align="center" />
         <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
                  <el-button link type="primary" icon="Edit" @click="console.log(123)">查看</el-button>
            </template>
         </el-table-column> -->
      </el-table>
   </div>
</template>

<style scoped></style>