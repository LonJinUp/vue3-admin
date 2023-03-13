<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import {
    ToolboxComponent,
    LegendComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    TitleComponent

} from 'echarts/components'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { UniversalTransition } from 'echarts/features';
import elementResizeDetectorMaker from 'element-resize-detector'

echarts.use([
    ToolboxComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    TitleComponent,
    UniversalTransition
])

let nightingaleOption = ref({
    legend: {
        top: 'bottom'
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
            ]
        }
    ]
})

let linechartOption = ref({
    legend: {
        top: 'bottom'
    },
    tooltip: {},
    dataset: {
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
        ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
    ]
})

let stackedAreaOptions = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
})

let echartList = {
    nightingale: {
        dom: null,
        chart: null
    },
    linechart: {
        dom: null,
        chart: null
    },
    stackedAreaChart: {
        dom: null,
        chart: null
    }

}
let erd = null;

//添加监听
let addEventListener = (element) => {
    !erd && (erd = elementResizeDetectorMaker())
    erd.listenTo(document.getElementById("container"), function () {
        element.resize()
    })
}

//初始化
let initChart = (key, element, option) => {
    let chartConfig = echartList[key]
    chartConfig.dom = document.getElementById(element)
    chartConfig.chart = echarts.init(chartConfig.dom)
    option.value && chartConfig.chart.setOption(option.value)
    addEventListener(chartConfig.chart)
}

onMounted(() => {
    initChart('nightingale', 'nightingale', nightingaleOption)
    initChart('linechart', 'linechart', linechartOption)
    initChart('stackedAreaChart', 'stackedAreaChart', stackedAreaOptions)
})

</script>
<template>
    <div class="echart-wrapper">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <div id="linechart" style="width:100%;height:400px"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <div id="nightingale" style="width:100%;height:400px"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <div id="stackedAreaChart" style="width:100%;height:400px"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
.echart-wrapper {
    margin: 20px auto;
}
</style>