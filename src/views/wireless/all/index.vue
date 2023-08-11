<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { getApTree, getApList, getApDetail } from '../../../api/wireless/all';
// 获取ap树,ap列表请求参数
const queryParams = reactive({
   apName: "", //ap名称
   state: "",  //ap状态
})
// ap树
const apTree = reactive([
   {
      Building: 'dormBuilding',
      children: reactive([]),
   },
   {
      Building: 'officeBuilding',
      children: reactive([]),
   },
   {
      Building: 'teachBuilding',
      children: reactive([]),
   },
]);
// ap详情
let apDetail: any = reactive({})


const loading = ref(true); // 控制列表加载
const showSearch = ref(true); //是否展示搜索区域
const isExpandAll = ref(false);//是否展开所有数据
const dialogVisible = ref(false) //H3Cap详细信息弹出框
const judgeState = [{ value: null, label: '全部' }, { value: '1', label: '正常' }, { value: '2', label: '故障' }]

// 获取ap树
function queryApTree() {
   loading.value = true;
   getApTree(queryParams).then((res: any) => {
      if (res.code === 200) {
         apTree[0].children = res.data.dormBuilding;
         apTree[1].children = res.data.officeBuilding;
      }
      // 添加hasChildren属性
      function traverse(building) {
         if (!building.children || building.children.length === 0) {
            if (building.Building !== 'dormBuilding' && building.Building !== 'officeBuilding' && building.Building !== 'teachBuilding') {
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
   dialogVisible.value = true;
   getApDetail(uuid).then((res: any) => {
      if (res.code == 200) {
         for (let item in res.data) {
            apDetail[item] = res.data[item];
         }
      }
   })
}
// 华为ap详细信息时间处理
function formateTime(second) {
   var duration
   var days = Math.floor(second / 86400);
   var hours = Math.floor((second % 86400) / 3600);
   var minutes = Math.floor(((second % 86400) % 3600) / 60);
   var seconds = Math.floor(((second % 86400) % 3600) % 60);
   if (days > 0) duration = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
   else if (hours > 0) duration = hours + "小时" + minutes + "分" + seconds + "秒";
   else if (minutes > 0) duration = minutes + "分" + seconds + "秒";
   else if (seconds > 0) duration = seconds + "秒";
   return duration;
}

/** 搜索按钮操作 */
function handleQuery() {
   queryApTree();
}
/** 重置按钮操作 */
function resetQuery() {
   queryParams.apName = '';
   queryParams.state = '';
}

onMounted(() => {
   queryApTree();
})
</script>


<template>
   <div class="app-container">
      <!-- 搜索 -->
      <!-- <el-form :model="queryParams" :inline="true" v-show="showSearch">
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

         <right-toolbar v-model:showSearch="showSearch" @queryTable="queryApTree"></right-toolbar>  隐藏搜索和刷新按钮
      </el-row> -->

      <el-table v-loading="loading" :data="apTree" row-key="Building" :default-expand-all="isExpandAll" lazy
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :load="load">
         <!-- row-key是行数据的key,优化表格的渲染 -->
         <el-table-column prop="Building" label="AP地址" width="200" align="center" />
         <el-table-column prop="status" label="AP状态"  align="center">
            <template #default="scope">
               <div v-if="scope.row.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="scope.row.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </template>
         </el-table-column>
         <el-table-column prop="apName" label="AP名称" align="center" width="300"/>
         <el-table-column prop="apModel" label="AP型号" align="center" width="180"/>
         <el-table-column prop="mac" label="Mac地址" align="center" width="200"/>
         <el-table-column prop="ip" label="IP地址" align="center" width="200" />
         <el-table-column prop="name" label="平台类型" align="center"  width="150">
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

      <!-- h3c详细信息弹出框 -->
      <el-dialog v-model="dialogVisible" title="AP详细信息" width="88%" align-center>
         <el-descriptions v-if="apDetail.platform === 0" direction="vertical" :column="3" border>
            <el-descriptions-item label="AP组">{{ apDetail.apGroup }}</el-descriptions-item>
            <el-descriptions-item label="AP型号">{{ apDetail.apModel }}</el-descriptions-item>
            <el-descriptions-item label="AP名称">{{ apDetail.apName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋">{{ apDetail.building }}</el-descriptions-item>
            <el-descriptions-item label="所属区域">
               <div v-if="apDetail.buildingType === 1">
                  宿舍区
               </div>
               <div v-else-if="apDetail.buildingType === 2">
                  办公区
               </div>
               <div v-else="apDetail.buildingType===3">
                  教学区
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="AP状态">
               <div v-if="apDetail.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="apDetail.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="IP地址">{{ apDetail.ip }}</el-descriptions-item>
            <el-descriptions-item label="上线/离线/版本下载时间">{{ apDetail.lastDropTime }}</el-descriptions-item>
            <el-descriptions-item label="MAC地址">{{ apDetail.mac }}</el-descriptions-item>
            <el-descriptions-item label="平台类型">
               <div v-if="apDetail.platform === 0">
                  H3C平台
               </div>
               <div v-if="apDetail.platform === 1">
                  HuaWei平台
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="SN">
               {{ apDetail['ap.sn'] }}
            </el-descriptions-item>
            <el-descriptions-item label="状态更新时间">
               {{ apDetail.statUpdMoment }}
            </el-descriptions-item>
         </el-descriptions>

         <!-- 华为详细信息弹出框 -->
         <el-descriptions v-if="apDetail.platform === 1" direction="vertical" :column="3" border>
            <el-descriptions-item label="AP接入失败率">{{ apDetail.accessFailureRate }}</el-descriptions-item>
            <el-descriptions-item label="AP组">{{ apDetail.apGroup }}</el-descriptions-item>
            <el-descriptions-item label="APId">{{ apDetail.apId }}</el-descriptions-item>
            <el-descriptions-item label="AP型号">{{ apDetail.apModel }}</el-descriptions-item>
            <el-descriptions-item label="AP名称">{{ apDetail.apName }}</el-descriptions-item>
            <el-descriptions-item label="楼栋">{{ apDetail.building }}</el-descriptions-item>
            <el-descriptions-item label="所属区域">
               <div v-if="apDetail.buildingType === 1">
                  宿舍区
               </div>
               <div v-else-if="apDetail.buildingType === 2">
                  办公区
               </div>
               <div v-else="apDetail.buildingType===3">
                  教学区
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="AP状态">
               <div v-if="apDetail.commonState === 1">
                  <el-tag type="success">正常</el-tag>
               </div>
               <div v-if="apDetail.commonState === 2">
                  <el-tag type="danger">故障</el-tag>
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="CPU使用率">{{ apDetail.cpuUseRatio }}</el-descriptions-item>
            <el-descriptions-item label="掉线率">{{ apDetail.dropRate }}</el-descriptions-item>
            <el-descriptions-item label="IP地址">{{ apDetail.ip }}</el-descriptions-item>
            <el-descriptions-item label="上线/离线/版本下载时间">{{ apDetail.lastDropTime }}</el-descriptions-item>
            <el-descriptions-item label="MAC地址">{{ apDetail.mac }}</el-descriptions-item>
            <el-descriptions-item label="内存使用率">{{ apDetail.memoryUseRatio }}</el-descriptions-item>
            <el-descriptions-item label="AP在线时间">{{ formateTime(apDetail.onlineTime) }}</el-descriptions-item>
            <el-descriptions-item label="在线用户数">{{ apDetail.onlineUserCount }}</el-descriptions-item>
            <el-descriptions-item label="平台类型">
               <div v-if="apDetail.platform === 0">
                  H3C平台
               </div>
               <div v-if="apDetail.platform === 1">
                  HuaWei平台
               </div>
            </el-descriptions-item>
            <el-descriptions-item label="重启次数">{{ apDetail.rebootCount }}</el-descriptions-item>
            <el-descriptions-item label="断电重启次数">{{ apDetail.rebootCountPowerOff }}</el-descriptions-item>
            <el-descriptions-item label="SN">
               {{ apDetail['ap.sn'] }}
            </el-descriptions-item>
            <el-descriptions-item label="状态更新时间">
               {{ apDetail.statUpdMoment }}
            </el-descriptions-item>
            <el-descriptions-item label="版本">{{ apDetail.version }}</el-descriptions-item>

         </el-descriptions>

         <template #footer>
            <span class="dialog-footer">
               <el-button @click="dialogVisible = false">取消</el-button>
               <el-button type="primary" @click="dialogVisible = false">
                  确定
               </el-button>
            </span>
         </template>

      </el-dialog>
   </div>
</template>

<style scoped></style>
