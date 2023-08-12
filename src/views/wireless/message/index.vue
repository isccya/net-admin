<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getMessageList } from '../../../api/wireless/message';
import { getMessageInfo } from '../../../api/wireless/message';
import { useRouter } from 'vue-router';


const router = useRouter();
const current = ref(1);//当前页数
const total = ref(0)//一共多少条消息通知
const size = ref(5)//每一页有多少数据
const loading = ref(true)
let messageData: any = reactive([]) //消息列表
// 请求消息列表
function queryMessageList() {
  loading.value = true;
  getMessageList(size.value, current.value).then((res: any) => {
    if (res.code === 200) {
      total.value = res.data.total;
      messageData.length = 0;
      messageData.push(...res.data.list);
      loading.value = false;
    }
  });
}
function jumpTo(messageId) {
  router.push({
    name: 'MessageDetail',
    query: {
      messageId,
    }
  })
}

// 页数改变时候触发
function currentChange(choosePage) {
  current.value = choosePage;
  queryMessageList();
}
// 将日期格式化为指定格式
function formatDate(val) {
  return new Date(val).toLocaleString();
}

onMounted(() => {
  queryMessageList();
  window.setInterval(() => {
    queryMessageList();
  }, 180000)
})
</script>


<template>
  <div v-loading="loading" class="app-container flex justify-center">
    <div class="w-1/2 messageData border-3">
      <div class="p-5">
        <el-timeline>
          <el-timeline-item v-for="item in messageData" :timestamp="formatDate(item.eventTime)" placement="top">
            <el-card>
              <div v-if="item.messageType === 1"> <el-tag class="ml-2 w-26" type="info" effect="dark"
                  size="large">新掉线通知</el-tag>
                <div class="p-3 mt">
                  <el-row>
                    <el-col :xs="12" :sm="12" :lg="12">
                      <el-statistic title="新掉线AP数" :value="item.apTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                      <el-statistic title="新掉线AP楼栋数" :value="item.buildingTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="4" class="flex items-center">
                      <div class="mt-6">
                        <el-button type="primary" @click="jumpTo(item.messageId)">查看详情</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="item.messageType === 2"><el-tag class="ml-2 w-26" type="danger" effect="dark"
                  size="large">持续掉线通知</el-tag>
                <div class="p-1 mt">
                  <el-row>
                    <el-col :xs="11" :sm="11" :lg="12">
                      <el-statistic title="持续掉线AP数" :value="item.apTotal" />
                    </el-col>
                    <el-col :xs="13" :sm="13" :lg="8">
                      <el-statistic title="持续掉线AP楼栋数" :value="item.buildingTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="4" class="flex items-center">
                      <div class="mt-6">
                        <el-button type="primary" @click="jumpTo(item.messageId)">查看详情</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="item.messageType === 3"><el-tag class="ml-2 w-26" type="success" effect="dark"
                  size="large">恢复通知</el-tag>
                <div class="p-3 mt">
                  <el-row>
                    <el-col :xs="12" :sm="12" :lg="12">
                      <el-statistic title="恢复AP数" :value="item.apTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                      <el-statistic title="恢复AP楼栋数" :value="item.buildingTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="4" class="flex items-center">
                      <div class="mt-6">
                        <el-button type="primary" @click="jumpTo(item.messageId)">查看详情</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="mt-3"></div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <!-- 分页 -->
      <div class=" pb-5 flex justify-end">
        <el-pagination background layout=" pager, next" :total="total" :page-size="size" v-model:current-page="current"
          @current-change="currentChange" :pager-count="5" />
      </div>
    </div>
  </div>
</template>4


<style lang="scss" scoped>
@media screen and (min-width: 10px) and (max-width: 980px) {
  .messageData {
    width: 100%;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-col {
  text-align: center;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>