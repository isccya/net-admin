<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps(['apInfo']);

let apDetail: any = props.apInfo;

const dialogVisible = ref(false) //ap详细信息弹出框

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

defineExpose({
    dialogVisible,
})

</script>


<template>
    <!-- H3C详细信息弹出框 -->
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
</template>

<style scoped></style>
