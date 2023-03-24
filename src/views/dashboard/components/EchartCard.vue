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
                { value: 40, name: '电脑' },
                { value: 38, name: '季度' },
                { value: 32, name: '手机' },
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



let echartList = {
    nightingale: {
        dom: null,
        chart: null
    },
    linechart: {
        dom: null,
        chart: null
    },


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
})

</script>
<template>
    <div class="echart-wrapper">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="always">
                    <h3 class="title">季度销售数据</h3>
                    <div id="linechart" style="width:100%;height:400px"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always">
                    <h3 class="title">销售产品占比</h3>
                    <div id="nightingale" style="width:100%;height:400px"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style  lang="scss" scoped>
.echart-wrapper {
    margin: 20px auto;
    width: 100%;

    .title {
        padding: 0px;
        margin: 0px;
    }
}
</style>