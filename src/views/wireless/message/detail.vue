<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getMessageInfo } from '../../../api/wireless/message';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'

const loading = ref(true);
const router = useRouter();
const route = useRoute();
const messageId = route.query.messageId; //获取消息列表传过来的id
console.log(messageId);

let buildingGroups: any = reactive([])//消息详情

// 请求消息详情
function queryMessageInfo() {
    loading.value = true;
    getMessageInfo(messageId).then((res: any) => {
        if (res.code === 200) {
            buildingGroups.length = 0;
            buildingGroups.push(...res.data.buildingGroups);
            loading.value = false;
        }
    })
    console.dir(buildingGroups);
}
function jumpBack() {
    router.push({ name: 'Message', });
}
function judgeBuildingType(index) {
    if (index === 1)
        return '宿舍区';
    else if (index === 2)
        return '办公区';
    else if (index === 3)
        return '教学区';
    else
        return '';
}
function judgeRowKey(row) {
    if (row.uuid) {
        return row.uuid;
    } else
        return row.building;
}
onMounted(() => {
    queryMessageInfo();
})
</script>

<template>
    <div class="app-container">
        <div class="p-3">
            <el-page-header :icon="ArrowLeft" @click="jumpBack">
                <template #content>
                    <span class="text-large font-600 mr-3"> 消息详情 </span>
                </template>
            </el-page-header>
        </div>
        <el-table v-loading="loading" :data="buildingGroups" style="width: 100%; margin-bottom: 20px" :row-key="judgeRowKey"
            border :tree-props="{ children: 'apList' }">
            <el-table-column prop="building" label="楼栋" />
            <el-table-column prop="eventTime" label="所属区域">
                <template #default="scope">
                    <div>
                        {{ judgeBuildingType(scope.row.buildingType) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="apName" label="AP名称" />
        </el-table>
    </div>
</template>

<style scoped></style>