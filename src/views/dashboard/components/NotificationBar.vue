<script setup>
import { ref } from 'vue'
const props = defineProps({
    autoplay: {
        type: Boolean,
        default: true
    },
    list: {
        type: Object,
        default: () => [{ title: '暂无数据', id: 0 }]
    },
    interval: {
        type: Number,
        default: 3000
    }
})

let dialogVisible = ref(false)


let getDetail = item => {
    dialogVisible.value = true
}

</script>
<template>
    <div class="notificationBar-wrapper flex-start">
        <el-icon color="#409EFC" class="icon">
        </el-icon>
        <el-carousel class="carousel" height="100%" :interval="interval" direction="vertical" autoplay>
            <el-carousel-item v-for="item in list" :key="item.id" @click="getDetail(item)">
                <p class="title">{{ item.title }}</p>
            </el-carousel-item>
        </el-carousel>
        <!-- detail -->
        <el-dialog v-model="dialogVisible" title="公告详情" width="50%">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        关闭
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
.notificationBar-wrapper {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    color: #353535;
    box-shadow: 2px 1px 8px 1px rgb(228, 232, 235);

    .carousel {
        flex: 1;
        height: 100%;

        .title {
            line-height: 50px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
        }
    }

    .icon {
        width: 20px;
        height: 20px;
    }
}
</style>