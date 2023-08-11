<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { getMessageList } from '../../../api/wireless/message';
import { getMessageInfo } from '../../../api/wireless/message';

const props = {
  value: "building",
  label: "building",
  children: "apList",
}

// 查看详情,
// ap详情搜索功能


const dialogVisible = ref(false)//是否展示对话框
const current = ref(1);//当前页数
const total = ref(0)//一共多少条消息通知
const size = ref(5)//每一页有多少数据
let messageData: any = reactive([]) //消息列表
let buildingGroups: any = reactive([])//消息详情
// 请求消息列表
function queryMessageList() {
  getMessageList(size.value, current.value).then((res: any) => {
    if (res.code === 200) {
      total.value = res.data.total;
      messageData.length = 0;
      messageData.push(...res.data.list);
    }
  });
}
// 请求消息详情
function queryMessageInfo(messageId: number) {
  getMessageInfo(messageId).then((res: any) => {
    if (res.code === 200) {
      buildingGroups.length = 0;
      buildingGroups.push(...res.data.buildingGroups);
    }
  })
  dialogVisible.value = true;
  console.dir(buildingGroups);
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
onMounted(() => {
  queryMessageList();
  window.setInterval(() => {
    queryMessageList();
  }, 180000)
})
</script>


<template>
  <div class="app-container flex justify-center">
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
                        <el-button type="primary" @click="queryMessageInfo(item.messageId)">查看详情</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="item.messageType === 2"><el-tag class="ml-2 w-26" type="danger" effect="dark"
                  size="large">持续掉线通知</el-tag>
                <div class="p-3 mt">
                  <el-row>
                    <el-col :xs="12" :sm="12" :lg="12">
                      <el-statistic title="持续掉线AP数" :value="item.apTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                      <el-statistic title="持续掉线AP楼栋数" :value="item.buildingTotal" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="4" class="flex items-center">
                      <div class="mt-6">
                        <el-button type="primary" @click="queryMessageInfo(item.messageId)">查看详情</el-button>
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
                        <el-button type="primary" @click="queryMessageInfo(item.messageId)">查看详情</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="mt-5"></div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <!-- 消息对话框 -->
        <el-dialog v-model="dialogVisible" title="通知详情" width="88%">
          <div>
            <el-tree :data="buildingGroups" :props="props" :height="208">
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div>{{ node.label }}</div>
                  <div>{{ data.apName }}</div>
                  <div>{{ data.dropId }}</div>

                  <div>{{ judgeBuildingType(data.buildingType) }}</div>
                </div>
              </template>
            </el-tree>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 分页 -->
        <div class=" mt-5 p-3 flex justify-end">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
            v-model:current-page="current" @current-change="currentChange" :pager-count="5" />
        </div>
      </div>
    </div>
  </div>
</template>



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