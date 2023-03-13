<script setup>
    import { ref , computed} from 'vue'
    import SecondaryNavbarItem from './SecondaryNavbarItem.vue'

    const props = defineProps(['primaryMenuItem'])
    const emit = defineEmits(['updateDalayClose'])

    let handleMouseEnter = ()=>{
        emit('updateDalayClose', false)
    }
    let handleMouseLeave =()=>{
        emit('updateDalayClose', true)
    }
   
    let defaultOpeneds = computed(()=>{
        let arr = []
        if(props.primaryMenuItem && props.primaryMenuItem.children && props.primaryMenuItem.children.length){
            props.primaryMenuItem.children.forEach(item=>{
                arr.push(item.path)
            })
        }
        return arr
    })
</script>
<template>
    <div class="secondSidebar-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <el-menu
            ref="elMenu"
            class="secondary-navbar"
            background-color="#F9FAFB"
            text-color="#111827"
            :default-openeds="defaultOpeneds"
            router
        >
            <template v-if="primaryMenuItem !== null">
                <!-- 一级菜单顶部 -->
                <div class="caption">
                    <span>{{ primaryMenuItem.title }}</span>
                </div>
                <template v-if="primaryMenuItem.children && primaryMenuItem.children.length">
                    <div class="menu-group">
                        <template v-if="primaryMenuItem.children">
                            <secondary-navbar-item :item="primaryMenuItem.children" />
                        </template>
                    </div>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<style lang="scss" scoped>
    .secondSidebar-wrapper{
        position: fixed;
        top: 0;
        left: 60px;
        bottom: 0;
        width: 146px;
        height: 100%;
        overflow: hidden;
        border-right: 1px solid #e6e6e6!important;
        background-color: rgb(249, 250, 251);
        .caption { 
            height: 48px; 
            line-height: 48px; 
            font-weight: 600; 
            padding-left: 20px; 
            box-shadow: inset 0px -1px 0px 0px rgba(229, 231, 235, 1); 
        }
        .caption span { 
            width: 48px; 
            height: 18px; 
            font-size: 12px; 
            font-weight: 600; 
            color: #111827; 
            line-height: 18px !important; 
            padding: 15px 18px 15px 0px !important; 
        }
    }
</style>
<style scoped>
    .secondSidebar-wrapper :deep() .el-menu{
        border-right: 0px;
    }
</style>