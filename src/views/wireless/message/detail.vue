<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getMessageInfo } from '../../../api/wireless/message';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
import { timeFormat } from '../../../utils/timeFormat';

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
        <el-table v-loading="loading" :data="buildingGroups" style=" margin-bottom: 20px;" :row-key="judgeRowKey" border
            :tree-props="{ children: 'apList' }">
            <el-table-column prop="building" label="楼栋" width="220" />
            <el-table-column label="所属区域" align="center" >
                <template #default="scope">
                    <div>
                        {{ judgeBuildingType(scope.row.buildingType) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="apName" label="AP名称" align="center" width="390" />
            <el-table-column label="AP状态" align="center" width="250">
                <template #default="scope">
                    <el-tag type="primary" v-if="scope.row.isRecover">已恢复</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.isRecover === false">掉线中</el-tag>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column label="掉线时间" align="center" width="350">
                <template #default="scope">
                    <div>
                        {{ timeFormat(scope.row.dropTime) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="恢复时间" align="center" width="350">
                <template #default="scope">
                    <div v-if="scope.row.recoverTime">
                        {{ timeFormat(scope.row.recoverTime) }}
                    </div>
                    <div v-if="scope.row.recoverTime === null">
                        无
                    </div>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<style scoped></style>