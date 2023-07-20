<script setup lang='ts'>
import * as echarts from "echarts";
import { onMounted } from "vue";
// 展示AP掉线事件
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

let percentDormitory = {
    title: {
        text: '宿舍区在线情况',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 100, name: '未在线' },
                { value: 2000, name: '在线' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
let percentEducation = {
    title: {
        text: '教学区在线情况',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 100, name: '未在线' },
                { value: 2000, name: '在线' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
let percentOffice = {
    title: {
        text: '办公区在线情况',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 100, name: '未在线' },
                { value: 2000, name: '在线' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

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
})
</script>


<template>
    <div class="home app-container">
        <div class="flex justify-between mx-6">
            <div class="flex flex-wrap items-center">
                <span class="text-lg font-medium">AP在线情况:</span>
                <el-dropdown class="ml-3">
                    <el-button type="primary">
                        时间
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>1天内</el-dropdown-item>
                            <el-dropdown-item>3天内</el-dropdown-item>
                            <el-dropdown-item>7天内</el-dropdown-item>
                            <el-dropdown-item>30天内</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>

        <el-row :gutter="12" class="mt-3">
            <el-col :span="8" :xs="24" :sm="24" :lg="8">
                <div class="h-35 shadow-md rounded-lg bg-blue-500">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        宿舍区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="86" width="56">
                            <el-icon color="rgb(87, 161, 240)" size="1.5rem">
                                <School />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="98500">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线人数
                                        <el-tooltip effect="dark"
                                            content="宿舍区"
                                            placement="top">
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
                                        123
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        345
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

            <el-col :span="8" :xs="12" :sm="12" :lg="8">
                <div class="h-35 shadow-md rounded-lg bg-green-500">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        教学区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="75.33" width="56" status="success">
                            <el-icon color="rgb(16, 185, 129)" size="1.5rem">
                                <OfficeBuilding />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="98500">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线人数
                                        <el-tooltip effect="dark"
                                            content="宿舍区"
                                            placement="top">
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
                                        2344
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        1234
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

            <el-col :span="8" :xs="12" :sm="12" :lg="8">
                <div class="h-35 shadow-md rounded-lg bg-yellow-500">
                    <div class="flex justify-around items-center h-15 text-lg" style="color: white;">
                        办公区
                    </div>
                    <div class="flex justify-evenly items-center h-20" style="background-color: white;">
                        <el-progress type="circle" :percentage="97" width="56" status="warning">
                            <el-icon color="rgb(255, 204, 62)" size="1.5rem">
                                <Memo />
                            </el-icon>
                        </el-progress>
                        <div>
                            <el-statistic :value="98500">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        在线人数
                                        <el-tooltip effect="dark"
                                            content="宿舍区"
                                            placement="top">
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
                                        5
                                        <el-icon>
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                    <span class="red">
                                        2
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

        <div class="mt-8">
            <el-table :data="tableData" height="400" style="width: 100%;">
                <el-table-column prop="date" label="AP名称" />
                <el-table-column prop="date" label="AP状态" />
                <el-table-column prop="name" label="用户掉线率" />
                <el-table-column prop="name" label="AP类型" />
                <el-table-column prop="name" label="AP版本" />
                <el-table-column prop="name" label="Mac地址" />
                <el-table-column prop="address" label="AP组" />
                <el-table-column label="详情" width="120">
                    <el-button link type="primary" size="small">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </el-table-column>
            </el-table>
        </div>

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
}</style>