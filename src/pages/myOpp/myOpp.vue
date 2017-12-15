<template>
    <com-layout currPath="/myopp">
        <div class="opp-wrap">
            <div class="opp-banner">
                <div class="business-form left">
                    <span class="personal-title business-title  left">业务名称</span>
                    <div class="personal-content left relative form-list business-list" @click="onClick_dropListBtn">
                        <span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
                        <ul class="absolute drop-list" v-show="isShowBusinessList">
                            <li>所有</li>
                        </ul>
                    </div>
                </div>
                <div class="from-group status-form p-left left">
                    <span class="form-title left">状态</span>
                    <span class="action-box status-type left">
                        <i class="pointer action"></i>
                        <span>审核中</span>
                    </span>
                    <span class="action-box status-type left">
                        <i class="pointer"></i>
                        <span>未通过</span>
                    </span>
                      <span class="action-box status-type left">
                        <i class="pointer"></i>
                        <span>已通过</span>
                    </span>
                </div>
                <div class="right search-box p-left">
                    <span class="customer-name">客户公司名称</span>
                    <input type="text" class="search-input">
                    <span class="search-btn active-btn ani-time pointer">搜索</span>
                    <span class="all-btn active-btn ani-time pointer">全部</span>
                </div>
                <div class="date-box p-left left clear">
                    <span class="create-time left">创建时间</span>
                    <div class="date-form left relative">
                        2017-12-25 00:00:00
                        <img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
                    </div>
                    <span class="date-line left">-</span>
                    <div class="date-form left relative">
                        2017-12-25 00:00:00
                        <img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
                    </div>
                </div>

            </div>

        </div>
    </com-layout>

</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ComLayout from "../../components/comLayout.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g,
                isShowBusinessList: false,
            }
        },
        components: {
            ComLayout
        },
        methods: {
            onClick_dropListBtn(){
                if (this.isShowBusinessList) {
                    this.isShowBusinessList = false;
                } else {
                    this.isShowBusinessList = true;
                }
            }
        }
    }
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
    @import "../../css/oppList.scss";
</style>