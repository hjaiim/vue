<template>
    <com-layout currPath="/myopp">
        <div class="opp-wrap">
            <div class="opp-banner clear">
                <div class="business-form left">
                    <span class="personal-title business-title  left">商机类型</span>
                    <div class="personal-content left relative form-list business-list pointer"
                         @click.stop="onClick_dropListBtn('isShowBusinessList')">
                        {{currBusType}}
                        <span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
                        <drop-list :dropList="busList" :isShowDropList="isShowBusinessList"
                                   @change="onClick_busItem" ref="busList"></drop-list>
                    </div>
                </div>
                <div class="business-form  p-left left">
                    <span class="personal-title business-title  left">业务小类</span>
                    <div class="personal-content left relative form-list business-list pointer"
                         @click.stop="onClick_dropListBtn('isShowTypeList')">
                        {{currType}}
                        <span :class="['icon-trangle', isShowTypeList?'rotate':'']"></span>
                        <drop-list :dropList="typeList" :isShowDropList="isShowTypeList"
                                   @change="onClick_typeItem" ref="typeList"></drop-list>
                    </div>
                </div>
                <div class="from-group status-form p-left left">
                    <span class="form-title left">状态</span>
                    <span class="action-box status-type left" @click="onClick_statusItem(1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(1) >= 0?'action':''"></i>
                        <span class="pointer">审核中</span>
                    </span>
                    <span class="action-box status-type left" @click="onClick_statusItem(-1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(-1)>= 0?'action':''"></i>
                        <span class="pointer">未通过</span>
                    </span>
                      <span class="action-box status-type left" @click="onClick_statusItem(2)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(2)>= 0?'action':''"></i>
                        <span class="pointer">已通过</span>
                    </span>
                </div>
                <div class="search-box left ">
                    <span class="customer-name">客户公司名称</span>
                    <input-bar class="search-input" placeholder="" type="text"
                               v-model="companyName"></input-bar>
                    <span class="active-btn ani-time pointer action-btn" @click="onClick_searchBtn">搜索</span>
                    <span class="active-btn ani-time pointer cancel-btn" @click="onClick_selectAllBtn">全部</span>
                </div>
                <div class="date-box p-left left">
                    <span class="create-time left">创建时间</span>
                    <div class="date-form left relative pointer" @click.stop="onClick_dateSelect('Start')">
                        {{startDate}}
                        <img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
                        <common-date @change="onChange_date" :isShowDatePicker="isShowStartDate"
                                     type="hour" ref="startDate"></common-date>
                    </div>
                    <span class="date-line left">-</span>
                    <div class="date-form left relative pointer" @click.stop="onClick_dateSelect('End')">
                        {{endDate}}
                        <img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
                        <common-date @change="onChange_date" :isShowDatePicker="isShowEndDate"
                                     type="hour" ref="endDate"></common-date>
                    </div>
                </div>

            </div>
            <div class="table-content opp-table">
                <table class="inner-table">
                    <thead>
                    <tr>
                        <th><span class="rank-num">序号</span></th>
                        <th>单号</th>
                        <th>客户公司名称</th>
                        <th>商机类型</th>
                        <th>业务小类</th>
                        <th>创建时间</th>
                        <th>审核状态</th>
                        <th><p class="action-menu">操作</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in businessList">
                        <td><span class="rank-num">{{index+1}}</span></td>
                        <td><span>{{item.orderNo}}</span></td>
                        <td>{{item.customerCompName}}</td>
                        <td>{{item.typeName}}</td>
                        <td>{{item.childBusinessName}}</td>
                        <td>{{item.createTime}}</td>
                        <td class="audit-status-desc pointer"
                            @click.stop="onClick_auditStatus(item.id,item.auditStatus)">
                            <span :class="getColorByStatus(item.auditStatus)">{{item.auditStatusDesc}}</span>
                            <common-tip :isCommonTip="item.isShowNextExamine" @close="onClick_closeBtn('auditor')"
                                        ref="auditorStatus" class="tip-pop">下级审核人：{{nextExamine}}
                            </common-tip>
                        </td>
                        <td>
                            <p class="action-menu clear">
                                <span class="left pointer draw-line ani-time" v-if="item.operation == 1"
                                      @click="onClick_editBtn(item)">重新编辑</span>
                                <span class="right pointer draw-line ani-time"
                                      @click="onClick_detailBtn(item.id)">详情</span>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <empty-pop v-show="businessList.length==0"></empty-pop>
                <div class="show-page clear" v-if="g.data.searchBusinessPool.totalPage > 1">
                    <common-page class="right" :total="g.data.searchBusinessPool.total" :currPage="currPage"
                                 :showPageSize="false" :showTotalCount="true"
                                 :showElevator="true"
                                 :showFirstAndEnd="true"
                                 @change="onChange_pageCom"></common-page>
                </div>
            </div>
        </div>
        <business-detail-pop :isShowPopView="isShowDetailPop" @close="onClose_detailPop"
                             :currId="currId"></business-detail-pop>

    </com-layout>

</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import * as func from "../../js/func"
    import ComLayout from "../../components/comLayout.vue"
    import CommonPage from "../../components/page.vue";
    import BusinessDetailPop from "../../components/pop/businessDetail.vue";
    import CommonDate from "../../components/dateBox.vue";
    import InputBar from "../../components/inputBar.vue";
    import ChooseManPop from "../../components/pop/chooseManPop.vue";
    import DropList from "../../components/dropList.vue";
    import EmptyPop from "../../components/pop/emptyPop.vue";
    import CommonTip from "../../components/pop/commonTip.vue";

    var _dateType = "", _params = null, _showNextExamineId = "";
    export default{
        created(){
            this.busList = __merge([], g.data.oppTypePool.list);
            this.busList.unshift({name: "全部", id: -1});
            this.routerUpdated();
        },
        data(){
            return {
                g: g,
                typeList: [{name: "全部", id: -1}],
                busList : [],
                currBusId:-1,
                businessList: [],
                isShowDetailPop: false,
                isShowStartDate: false,
                isShowEndDate: false,
                isShowBusinessList: false,
                isShowTypeList:false,
                nextExamine: "",
                currPage: 1,
                type: -1,
                statusList: [],
                startTime: 1400000000,
                endTime: g.timeTool.getNowStamp(),
                companyName: "",
                currId: 0
            }
        },
        components: {
            ComLayout,
            CommonPage,
            BusinessDetailPop,
            CommonDate,
            InputBar,
            ChooseManPop,
            DropList,
            EmptyPop,
            CommonTip
        },
        computed: {
            currBusType()
            {
                if (this.currBusId > 0) {
                    return g.data.oppTypePool.getDataById(this.currBusId) &&
                            g.data.oppTypePool.getDataById(this.currBusId).name;
                }
                return "全部"
            },
            currType()
            {
                if (this.currBusId > 0&&this.type >0) {
                    return  g.data.oppTypePool.getChildNameById(this.currBusId,this.type)
                }
                return "全部"
            },
            startDate()
            {
                return g.timeTool.getFullDate(int(this.startTime), true);
            },
            endDate()
            {
                return g.timeTool.getFullDate(int(this.endTime), true);
            }
        },
        methods: {
            init()
            {
                this.currPage = 1;
                this.statusList = [-1, 1, 2];
                this.type = -1;

                this.currBusId = -1;
                this.startTime = 1483200000;
                this.endTime = g.timeTool.getNowStamp();
                this.creatorName = "";
                this.companyName = "";
            },
            routerUpdated()
            {
                this.businessList = g.data.searchBusinessPool.list;
                this.currPage = int(g.vue.getQuery("page", 1));
                this.type = g.vue.getQuery("type", -1);
                this.currBusId = g.vue.getQuery("busId", -1);
                this.onUpdate_typeList(this.currBusId )
                var statusList = g.vue.getQuery("statusList", "[1,-1,2]");
                this.statusList = JSON.parse(statusList).map(function (item) {
                    return int(item);
                });
                this.startTime = g.vue.getQuery("startTime", 1483200000);
                this.endTime = g.vue.getQuery("endTime", g.timeTool.getNowStamp());
                this.creatorName = g.vue.getQuery("creatorName", "");
                this.companyName = g.vue.getQuery("companyName", "");
                this.initEvents();
            },
            initEvents()
            {
                document.addEventListener('click', this.onClick_doc)
            },
            removeEvents()
            {
                document.removeEventListener('click', this.onClick_doc)
            },
            onClick_doc(e)
            {
                if (this.$refs.startDate && !this.$refs.startDate.$el.contains(e.target)) {
                    this.isShowStartDate = false;
                }
                if (this.$refs.endDate && !this.$refs.endDate.$el.contains(e.target)) {
                    this.isShowEndDate = false;
                }
                if (this.$refs.typeList && !this.$refs.typeList.$el.contains(e.target)) {
                    this.isShowTypeList = false;
                }
                if (this.$refs.busList && !this.$refs.busList.$el.contains(e.target)) {
                    this.isShowBusinessList = false;
                }
                if (this.$refs.auditorStatus) {
                    let content = g.data.searchBusinessPool.getDataById(_showNextExamineId);
                    content && content.update({isShowNextExamine: false});
                }
            },
            onClose_detailPop()
            {
                this.isShowDetailPop = false;
            },
            onClick_dropListBtn($showList)
            {
                if (this[$showList]) {
                    this[$showList] = false;
                }
                else {
                    this[$showList] = true;
                }
                this.isShowEndDate = false;
                this.isShowStartDate = false;

            },
            onClick_busDropList(){

            },
            onClick_closeBtn($type){

                if ($type == "auditor") {
                    g.data.searchBusinessPool.getDataById(_showNextExamineId).update({isShowNextExamine: false});
                }
            },
            onClick_typeItem($type)
            {
                this.type = $type;
                this.isShowTypeList = false;
            },
            onUpdate_typeList($busTypeId){
                let busTypeItem = g.data.oppTypePool.getDataById($busTypeId);
                this.typeList.splice(1);
                this.typeList = this.typeList.concat(busTypeItem?busTypeItem.child:[]) ;

            },
            onClick_busItem($id){
                this.currBusId = $id;
                this.type = -1;
                this.onUpdate_typeList($id);
                this.isShowBusinessList = false;

            },
            onClick_statusItem($status)
            {
                var index = this.statusList.indexOf($status);
                if (index >= 0) {
                    this.statusList.splice(index, 1);
                }
                else {
                    this.statusList.push($status);
                }
            },
            onClick_dateSelect($type)
            {
                _dateType = $type;
                this.isShowBusinessList = false;
                this['isShow' + $type + 'Date'] = true;
                if ($type == "Start") {
                    this.isShowEndDate = false;
                }
                else {
                    this.isShowStartDate = false;
                }
            },
            onClick_searchBtn()
            {
                this.currPage = 1;
                this.updateUrl();
            },
            onClick_selectAllBtn()
            {
                this.init();
                this.updateUrl();
            },
            onChange_pageCom($page)
            {
                this.currPage = $page;
                this.updateUrl();
            },
            onClick_detailBtn($id)
            {
                if (g.data.searchBusinessPool.hasDetail($id)) {
                    this.currId = $id;
                    this.isShowDetailPop = true;
                }
                else {
                    _params = {orderId: $id};
                    g.ui.showLoading();
                    g.net.call("bo/viewOrderDetail", _params).then(($data) => {
                        g.ui.hideLoading();
                        g.data.searchBusinessPool.getDataById($id).update($data);
                        this.currId = $id;
                        this.isShowDetailPop = true;
                    }, (err) => {
                        g.func.dealErr(err);
                    })
                }
            },
            onClick_editBtn($item)
            {
                g.url = {
                    path: "/oppapply",
                    query: {
                        id: $item.id,
                        bus:$item.type

                    }
                }
            },
            updateUrl()
            {
                g.url = {
                    path: "/myopp",
                    query: {
                        page: this.currPage,
                        type: this.type,
                        busId:this.currBusId,
                        statusList: JSON.stringify(this.statusList),
                        startTime: this.startTime,
                        endTime: this.endTime,
                        creatorName: this.creatorName,
                        companyName: this.companyName
                    }
                };
            },
            onChange_date($timeStamp)
            {
                this[_dateType.toLowerCase() + 'Time'] = $timeStamp;
                if (this.endTime < this.startTime) {
                    this.endTime = this.startTime + 86400;
                }
                this.isShowStartDate = false;
                this.isShowEndDate = false;
                _dateType = "";
            },
            getColorByStatus($status){
                if ($status == 2) {
                    return "wait-pick"
                } else if ($status == -1) {
                    return "is-picked"
                }
            },
            onClick_auditStatus($id, $auditStatus){

                if ($auditStatus == -1 || $auditStatus == 2) {
                    return;
                }
                g.net.call("bo/getOrderAuditUser", {
                    orderId: $id
                }).then(($data) => {
                    this.nextExamine = $data.auditNames;
                    if (_showNextExamineId) {
                        let content = g.data.searchBusinessPool.getDataById(_showNextExamineId)
                        content && content.update({isShowNextExamine: false});
                    }
                    g.data.searchBusinessPool.getDataById($id).update({isShowNextExamine: true});
                    _showNextExamineId = $id;
                }, (err) => {
                    g.func.dealErr(err);
                })
            },

        },
        beforeDestroy()
        {
            this.removeEvents();
        }
    }
</script>
<style type="text/css" lang="sass" rel="stylesheet/scss" scoped>
    @import "../../css/oppList.scss";

</style>