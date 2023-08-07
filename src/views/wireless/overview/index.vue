<script setup lang='ts'>
import * as echarts from "echarts";
import { computed, onMounted, reactive, ref } from "vue";
import { getApInfo, getEventList } from "../../../api/wireless/overview";

// 总数
const dormCount = ref(0);
const dormTotal = ref(0);
const dormPercent = computed(() => {
    return dormCount.value / dormTotal.value * 100;
});
const officeCount = ref(0);
const officeTotal = ref(0);
const officePercent = computed(() => {
    return officeCount.value / officeTotal.value * 100;
})
const teachCount = ref(0);
const teachTotal = ref(0);
const teachPercent = computed(() => {
    return teachCount.value / teachTotal.value * 100;
});

// 上下线数
const dormDrop = ref(0);
const dormRecover = ref(0);
const officeDrop = ref(0);
const officeRecover = ref(0);
const teachDrop = ref(0);
const teachRecover = ref(0);

// 请求时间,区域,分页参数
const timeValue = ref(1);
const buildingType = ref(0);
const size = ref(10); //每页展示的数据
const current = ref(1);//当前所在页,默认为1

// 默认展示的组件
const activeIndex = ref("0")

// 展示AP掉线事件
let tableData: any = reactive([])
let total: any = ref(10);

let percentDormitory = {
    // 标题
    title: {
        text: '宿舍区'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
    },
    // 图例组件
    legend: {
        data: ['全部AP', '在线AP']
    },
    // 保存为图片
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 内置网格
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    //   申明一个X轴
    xAxis: [
        {
            // type: 'category',
            // boundaryGap: false,
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'time',
            splitLine: {
                show: false
            }
        }
    ],
    //   申明一个Y轴
    yAxis: [
        {
            type: 'value',

        }
    ],
    //   数据设置在series(系列)中
    series: [
        {
            // name: '全部AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FF005A',
                    lineStyle: {
                        color: '#FF005A',
                        width: 2
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [360, 360, 360, 360, 360, 360, 360],
        },
        {
            name: '在线AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#3888fa',
                    lineStyle: {
                        color: '#3888fa',
                        width: 2
                    },
                    areaStyle: {
                        color: '#f3f8ff'
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
    ]
};
let percentEducation = {
    // 标题
    title: {
        text: '教学区'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        //   padding: [5, 10]
    },
    // 图例组件
    legend: {
        data: ['全部AP', '在线AP']
    },
    // 保存为图片
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 内置网格
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    //   申明一个X轴
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    //   申明一个Y轴
    yAxis: [
        {
            type: 'value'
        }
    ],
    //   数据设置在series(系列)中
    series: [
        {
            name: '全部AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FF005A',
                    lineStyle: {
                        color: '#FF005A',
                        width: 2
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [360, 360, 360, 360, 360, 360, 360]
        },
        {
            name: '在线AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#3888fa',
                    lineStyle: {
                        color: '#3888fa',
                        width: 2
                    },
                    areaStyle: {
                        color: '#f3f8ff'
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
    ]
};
let percentOffice = {
    // 标题
    title: {
        text: '办公区'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
    },
    // 图例组件
    legend: {
        data: ['全部AP', '在线AP']
    },
    // 保存为图片
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 内置网格
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    //   申明一个X轴
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    //   申明一个Y轴
    yAxis: [
        {
            type: 'value'
        }
    ],
    //   数据设置在series(系列)中
    series: [
        {
            name: '全部AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#FF005A',
                    lineStyle: {
                        color: '#FF005A',
                        width: 2
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [360, 360, 360, 360, 360, 360, 360]
        },
        {
            name: '在线AP',
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#3888fa',
                    lineStyle: {
                        color: '#3888fa',
                        width: 2
                    },
                    areaStyle: {
                        color: '#f3f8ff'
                    }
                }
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
    ]
};
// 封装获取事件
function  queryEventList(){
    getEventList(timeValue.value, buildingType.value, size.value, current.value).then((res: any) => {
        total.value = res.data.total;
        tableData.length = 0;
        tableData.push(...res.data.list)
    })
}
// 时间筛选
function handleCommand(chooseTime) {
    timeValue.value = chooseTime;
    getApInfo(timeValue.value).then((res: any) => {
        if (res.code === 200) {
            dormCount.value = res.data.eventCount.dormCount,
                dormTotal.value = res.data.eventCount.dormTotal,
                officeCount.value = res.data.eventCount.officeCount,
                officeTotal.value = res.data.eventCount.officeTotal,
                teachCount.value = res.data.eventCount.teachCount,
                teachTotal.value = res.data.eventCount.teachTotal;
            dormDrop.value = res.data.latestStatus.dormDrop;
            dormRecover.value = res.data.latestStatus.dormRecover;
            officeDrop.value = res.data.latestStatus.officeDrop;
            officeRecover.value = res.data.latestStatus.officeRecover;
            teachDrop.value = res.data.latestStatus.teachDrop;
            teachRecover.value = res.data.latestStatus.teachRecover;
        }
    })
    queryEventList();
}
// 区域筛选
function handleSelect(chooseBuildingType) {
    console.log(chooseBuildingType);
    buildingType.value = chooseBuildingType;
    queryEventList();
}
// 时间格式化处理
function timeFormat(time) {
    const time1 = new Date(time);
    return time1.toLocaleString();
}
// 页数改变时候触发
function currentChange(choosePage){
    current.value = choosePage;
    queryEventList();
}
function initChart() {
    let chartDormitory = echarts.init(document.getElementById("dormitory"));
    let chartEducation = echarts.init(document.getElementById("education"));
    let chartOffice = echarts.init(document.getElementById("office"));

    // 把配置和数据放这里
    chartDormitory.setOption(percentDormitory);
    chartEducation.setOption(percentEducation);
    chartOffice.setOption(percentOffice);

    window.onresize = function () {
        //自适应大小
        chartDormitory.resize();
        chartEducation.resize();
        chartOffice.resize();
    };
}
onMounted(() => {
    initChart();
    getApInfo(timeValue.value).then((res: any) => {
        if (res.code === 200) {
            dormCount.value = res.data.eventCount.dormCount,
                dormTotal.value = res.data.eventCount.dormTotal,
                officeCount.value = res.data.eventCount.officeCount,
                officeTotal.value = res.data.eventCount.officeTotal,
                teachCount.value = res.data.eventCount.teachCount,
                teachTotal.value = res.data.eventCount.teachTotal;
            dormDrop.value = res.data.latestStatus.dormDrop;
            dormRecover.value = res.data.latestStatus.dormRecover;
            officeDrop.value = res.data.latestStatus.officeDrop;
            officeRecover.value = res.data.latestStatus.officeRecover;
            teachDrop.value = res.data.latestStatus.teachDrop;
            teachRecover.value = res.data.latestStatus.teachRecover;
        }
    })
    getEventList(timeValue.value, buildingType.value, size.value, current.value).then((res: any) => {
        total.value = res.data.total;
        tableData.push(...res.data.list)
    })

    window.setInterval(() => {
        getApInfo(timeValue.value).then((res: any) => {
            if (res.code === 200) {
                dormCount.value = res.data.eventCount.dormCount,
                    dormTotal.value = res.data.eventCount.dormTotal,
                    officeCount.value = res.data.eventCount.officeCount,
                    officeTotal.value = res.data.eventCount.officeTotal,
                    teachCount.value = res.data.eventCount.teachCount,
                    teachTotal.value = res.data.eventCount.teachTotal;
                dormDrop.value = res.data.latestStatus.dormDrop;
                dormRecover.value = res.data.latestStatus.dormRecover;
                officeDrop.value = res.data.latestStatus.officeDrop;
                officeRecover.value = res.data.latestStatus.officeRecover;
                teachDrop.value = res.data.latestStatus.teachDrop;
                teachRecover.value = res.data.latestStatus.teachRecover;
            }
        });
        queryEventList();
    }, 180000)
})



</script>


<template>
    <div class="home app-container">
        <div class="flex justify-between mx-6">
            <div class="flex flex-wrap items-center">
                <span class="text-lg font-medium">AP在线情况:</span>
                <el-dropdown class="ml-3" @command="handleCommand">
                    <el-button type="primary">
                        时间
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="1">1h内</el-dropdown-item>
                            <el-dropdown-item command="12">12h内</el-dropdown-item>
                            <el-dropdown-item command="24">1天内</el-dropdown-item>
                            <el-dropdown-item command="72">3天内</el-dropdown-item>
                            <el-dropdown-item command="168">7天内</el-dropdown-item>
                            <el-dropdown-item command="720">30天内</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>
        </div>

        <!-- ap实时信息 -->
        <el-row :gutter="12">
            <el-col :span="8" :xs="24" :sm="24" :lg="8" class="mt-3">
                <div class="h-35 shadow-md rounded-lg bg-blue-500">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        宿舍区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="dormPercent" width="56">
                            <el-icon color="rgb(87, 161, 240)" size="1.5rem">
                                <School />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="dormCount">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线AP数
                                        <el-tooltip effect="dark" content="宿舍区" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span class="green">
                                        {{ dormRecover }}
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        {{ dormDrop }}
                                        <el-icon>
                                            <CaretBottom />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="8" :xs="12" :sm="12" :lg="8" class="mt-3">
                <div class="h-35 shadow-md rounded-lg bg-green-500">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        办公区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="officePercent" width="56" status="success">
                            <el-icon color="rgb(16, 185, 129)" size="1.5rem">
                                <OfficeBuilding />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="officeCount">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线AP数
                                        <el-tooltip effect="dark" content="办公区" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span class="green">
                                        {{ officeRecover }}
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        {{ officeDrop }}
                                        <el-icon>
                                            <CaretBottom />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="8" :xs="12" :sm="12" :lg="8" class="mt-3">
                <div class="h-35 shadow-md rounded-lg bg-yellow-400">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        教学区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="teachPercent" width="56" color="rgb(252, 211, 77)">
                            <el-icon color="rgb(252, 211, 77)" size="1.5rem">
                                <Memo />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="teachCount">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线AP数
                                        <el-tooltip effect="dark" content="教学区" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span class="green">
                                        {{ teachRecover }}
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        {{ teachDrop }}
                                        <el-icon>
                                            <CaretBottom />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>

            <!-- <el-col :span="8" :xs="12" :sm="12" :lg="6">
                <el-card>
                    <template #header>
                        <div class="text-center font-600 text-1.25rem">
                            <span>系统更新公告</span>
                            <el-icon class="float-right">
                                <Edit />
                            </el-icon>
                        </div>
                    </template>
                    <div>
                        啦啦啦啦啦啦
                    </div>
                </el-card>
            </el-col> -->
        </el-row>

        <div class="flex mt-5 items-center">
            <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-menu-item index="0">全部</el-menu-item>
                <el-menu-item index="1">宿舍区</el-menu-item>
                <el-menu-item index="2">办公区</el-menu-item>
                <el-menu-item index="3">教学区</el-menu-item>
            </el-menu>
            <div class="flex-grow" />
            <!-- <el-radio-group v-model="isCollapse" >
                <el-radio-button :label="true">列表</el-radio-button>
                <el-radio-button :label="false">折线图</el-radio-button>
            </el-radio-group> -->
        </div>

        <div class="">
            <el-table :data="tableData" height="350" style="width: 100%;" stripe>
                <el-table-column prop="eventType" label="事件类型" align="center" width="100">
                    <template #default="scope">
                        <el-tag type="danger" v-if="scope.row.eventType === 0">掉线</el-tag>
                        <el-tag type="success" v-if="scope.row.eventType === 1">上线</el-tag>
                    </template>
                    <!-- <el-tag class="ml-2" type="success">上线</el-tag>
                    <el-tag class="ml-2" type="danger" v-if="">掉线</el-tag> -->
                </el-table-column>
                <el-table-column prop="eventTime" label="时间" align="center">
                    <template #default="scope">
                        <div>
                            {{ timeFormat(scope.row.eventTime) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="apName" label="AP名称" align="center" />
                <el-table-column prop="apModel" label="AP型号" align="center" />
                <el-table-column prop="mac" label="Mac地址" align="center" />
                <el-table-column prop="ip" label="IP地址" align="center" />
                <el-table-column prop="name" label="楼栋类型" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.buildingType === 1">
                            宿舍区
                        </div>
                        <div v-else-if="scope.row.buildingType === 2">
                            办公区
                        </div>
                        <div v-else="scope.row.buildingType===3">
                            教学区
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="平台类型" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.platform === 0">
                            H3C平台
                        </div>
                        <div v-if="scope.row.platform === 1">
                            HuaWei平台
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="mt-5 flex justify-end">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
                v-model:current-page="current" @current-change="currentChange"/>
        </div>

        <!-- ap变化折线图 -->
        <el-row :gutter="32" class="mt-10">
            <el-col :xs="24" :sm="24" :lg="8">
                <div id="dormitory" :style="{ height: '300px', backgroundColor: 'white', marginTop: '1rem' }"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div id="education" :style="{ height: '300px', backgroundColor: 'white', marginTop: '1rem' }"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div id="office" :style="{ height: '300px', backgroundColor: 'white', marginTop: '1rem' }"></div>
            </el-col>
        </el-row>

    </div>
</template>



<style lang="scss" scoped>
// 数据统计
.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}

.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-message {
            color: #36a3f7;
        }

        .icon-money {
            color: #f4516c;
        }

        .icon-shopping {
            color: #34bfa3
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}
</style>