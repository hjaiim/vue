<template>
    <com-layout currPath="/oppman">
        <div class="oppman-wrap">
            <div class="oppman-banner clear">
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
                <div class="date-box p-left left">
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
                <div class="search-box search-size left clear clearfix">
                    <span class="customer-name left">客户经理</span>
                    <input type="text" class="search-input left">
                </div>
                <div class=" search-box search-size p-left left">
                    <span class="customer-name">客户公司名称</span>
                    <input type="text" class="search-input">
                    <span class="search-btn active-btn ani-time pointer">搜索</span>
                    <span class="all-btn active-btn ani-time pointer">全部</span>
                </div>


            </div>
            <div class="table-content oppman-table">
                <table class="inner-table">
                    <thead>
                    <tr>
                        <th><span class="rank-num">序号</span></th>
                        <th>单号</th>
                        <th>客户经理</th>
                        <th>所属公司</th>
                        <th>客户公司名称</th>
                        <th>业务名称</th>
                        <th>创建时间</th>
                        <th>审核状态</th>
                        <th><p class="action-menu">操作</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(n,index) in 10">
                        <td><span class="rank-num">{{index+1}}</span></td>
                        <td><span>CTD201711101520380003</span></td>
                        <td>习大大</td>
                        <td>幻舞网络科技</td>
                        <td>习大大的公司</td>
                        <td>ddt</td>
                        <td>2018-01-01 00:00:00</td>
                        <td>审核中</td>
                        <td>
                            <p class="action-menu clear">
                                <span class="right pointer draw-line ani-time"
                                      @click="onClick_detailBtn(index+1)">详情</span>
                            </p>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="show-page clear">
                    <common-page class="right" :total="200" :currPage="10" :showPageSize="false" :showTotalCount="true"
                                 :showElevator="true"
                                 :showFirstAndEnd="true"></common-page>
                </div>


            </div>
        </div>
        <examine-pop1 :isShowPopView="isShowExaminePop1"></examine-pop1>
    </com-layout>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ComLayout from "../../components/comLayout.vue"
    import CommonPage from "../../components/page.vue";
    import ExaminePop1 from "../../components/pop/examinePop1.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g,
                isShowExaminePop1:true
            }
        },
        components: {
            ComLayout,
            CommonPage,
            ExaminePop1
        },
        methods: {
            onClick_dropListBtn(){
                if (this.isShowBusinessList) {
                    this.isShowBusinessList = false;
                } else {
                    this.isShowBusinessList = true;
                }
            },
            onClick_recordBtn(){

            },
            onClick_detailBtn(){

            }
        }
    }
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
    @import "../../css/oppMan.scss";
</style>