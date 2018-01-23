<template>
	<com-layout currPath="/oppman" :class="isShowDetailPop?'diff-oppman-wrap':''">
		<div class="oppman-wrap">
			<div class="oppman-banner clear">
				<div class="business-form left" ref="businessType">
					<span class="personal-title business-title  left">业务名称</span>
					<div class="personal-content left relative form-list business-list pointer"
						 @click.stop="onClick_dropListBtn">
						{{currType}}
						<span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
						<drop-list class="absolute drop-list" :dropList="typeList" ref="typeList"
								   :isShowDropList="isShowBusinessList"
								   @change="onClick_typeItem"></drop-list>
					</div>
				</div>
				<div class="from-group status-form p-left left">
					<span class="form-title left">状态</span>
                    <span class="action-box status-type left pointer" @click="onClick_statusItem(1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(1) >= 0?'action':''"></i>
                        <span class="pointer">审核中</span>
                    </span>
                    <span class="action-box status-type left pointer" @click="onClick_statusItem(-1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(-1)>= 0?'action':''"></i>
                        <span class="pointer">未通过</span>
                    </span>
                      <span class="action-box status-type left pointer" @click="onClick_statusItem(2)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(2)>= 0?'action':''"></i>
                        <span class="pointer">已通过</span>
                    </span>
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
				<div class="search-box search-size left clearfix">
					<span class="customer-name left">客户经理</span>
					<input-bar class="search-input left relative" placeholder="" type="text"
							   v-model="creatorName"></input-bar>
				</div>
				<div class="search-box search-size left p-left">
					<span class="customer-name left">所属公司</span>
					<input-bar class="search-input left relative " placeholder="" type="text"
							   v-model="comName"></input-bar>
				</div>
				<div class=" search-box search-size p-left left">
					<span class="customer-name">客户公司名称</span>

					<input-bar class="search-input relative" placeholder="" type="text"
							   v-model="companyName" @keyenter="onKeyEnter_searchInput"></input-bar>
					<span class=" active-btn ani-time pointer action-btn" @click="onClick_searchBtn">搜索</span>
					<span class=" active-btn ani-time pointer cancel-btn" @click="onClick_selectAllBtn">全部</span>
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
					<tr v-for="(item,index) in businessList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td><span>{{item.orderNo}}</span></td>
						<td class="creator-name pointer" @click.stop="onClick_creatorName(item.id)">
							<common-tip :isCommonTip="item.isShowTel" @close="onClick_closeBtn('tel')" ref="telTip">电话：{{item.mobile}}</common-tip>
							{{item.creatorName}}
						</td>

						<td>{{item.companyName}}</td>
						<td>{{item.customerCompName}}</td>

						<td>{{item.typeName}}</td>
						<td>{{item.createTime}}</td>
						<td class="audit-status-desc pointer" :class="{'is-picked':item.auditStatusDesc=='审核退回','font-weight':item.operation== 2&&item.auditStatusDesc!='审核退回'}"
							@click.stop="onClick_auditStatus(item.id,item.auditStatus)">
							<common-tip :isCommonTip="item.isShowNextExamine" @close="onClick_closeBtn('auditor')" ref="auditorStatus" >下级审核人：{{nextExamine}}</common-tip>
							{{item.auditStatusDesc}}
						</td>
						<td>
							<p class="action-menu clear" v-if="item.operation== 0">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_detailBtn(item.id)">详情</span>
							</p>

							<p class="action-menu clear" v-if="item.operation== 1">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_editBtn(item)">重新编辑</span>
							</p>

							<p class="action-menu clear" v-if="item.operation== 2">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_auditBtn(item.id)">审核</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<empty-pop v-show="businessList.length==0"></empty-pop>
				<div class="show-page clear" v-if="g.data.searchBusinessPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchBusinessPool.total" :currPage="currPage"
								 :showPageSize="false"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"
					></common-page>
				</div>
			</div>
			<business-detail-pop :isShowPopView="isShowDetailPop" :currId="currId"
								 @close="onClose_detailPop"></business-detail-pop>
		</div>

	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import * as func from "../../js/func"
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import BusinessDetailPop from "../../components/pop/businessDetail.vue";
	import InputBar from "../../components/inputBar.vue";
	import CommonDate from "../../components/dateBox.vue";
	import DropList from "../../components/dropList.vue";
	import EmptyPop from "../../components/pop/emptyPop.vue";
	import CommonTip from "../../components/pop/commonTip.vue";
	import {searchBusinessList} from "./oppMan"
	var _dateType = "", _params = null,_showTelId = "",_showNextExamineId="";
	export default{
		created(){
			this.typeList = __merge([], g.data.staticTypePool.list);
			this.typeList.unshift({
				name: "全部",
				id: -1
			})
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				businessList: [],
				typeList: [],
				isShowDetailPop: false,
				isShowBusinessList: false,
				currPage: 1,
				isShowStartDate: false,
				isShowEndDate: false,
				type: -1,
				statusList: [],
				startTime: 1483200000,
				endTime: g.timeTool.getNowStamp(),
				creatorName: "",
				companyName: "",
				comName:"",
				nextExamine:"",
				currId: 0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			BusinessDetailPop,
			InputBar,
			CommonDate,
			DropList,
			EmptyPop,
			CommonTip
		},
		computed: {
			currType()
			{
				if (this.type > 0)
				{
					return g.data.staticTypePool.getDataById(this.type) &&
							g.data.staticTypePool.getDataById(this.type).name;
				}
				return "全部";
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
				this.type = -1;
				this.statusList = [1, -1, 2];
				this.startTime = 1483200000;
				this.endTime = g.timeTool.getNowStamp();
				this.creatorName = "";
				this.companyName = "";
				this.comName = "";
			},
			routerUpdated()
			{
				this.businessList = g.data.searchBusinessPool.list;
				this.currPage = int(g.vue.getQuery("page", 1));
				this.type = g.vue.getQuery("type", -1);
				var statusList = g.vue.getQuery("statusList", "[1,-1,2]");
				this.statusList = JSON.parse(statusList).map(function (item)
				{
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
				if (this.$refs.startDate && !this.$refs.startDate.$el.contains(e.target))
				{
					this.isShowStartDate = false;
				}
				if (this.$refs.endDate && !this.$refs.endDate.$el.contains(e.target))
				{
					this.isShowEndDate = false;
				}
				if (this.$refs.typeList && !this.$refs.typeList.$el.contains(e.target))
				{

					this.isShowBusinessList = false;
				}
				if (this.$refs.telTip )
				{
					let content = g.data.searchBusinessPool.getDataById(_showTelId);
					content&&content.update({isShowTel: false});
				}
				if (this.$refs.auditorStatus )
				{
					let content = g.data.searchBusinessPool.getDataById(_showNextExamineId);
					content&&content.update({isShowNextExamine: false});
				}
			},
			onClick_dropListBtn()
			{
				if (this.isShowBusinessList)
				{
					this.isShowBusinessList = false;
				}
				else
				{
					this.isShowBusinessList = true;
				}
				this.isShowStartDate = false;
				this.isShowEndDate = false;
			},
			onClick_typeItem($type)
			{
				this.type = $type;
				this.isShowBusinessList = false;
			},
			onClick_statusItem($status)
			{
				var index = this.statusList.indexOf($status);
				if (index >= 0)
				{
					this.statusList.splice(index, 1);
				}
				else
				{
					this.statusList.push($status);
				}
			},
			onClick_dateSelect($type)
			{
				_dateType = $type;
				this['isShow' + $type + 'Date'] = true;
				if ($type == "Start")
				{
					this.isShowEndDate = false;
				}
				else
				{
					this.isShowStartDate = false;
				}
			},
			onKeyEnter_searchInput()
			{
				this.onClick_searchBtn();
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
				this.currPage = $page;
				this.updateUrl();
			},
			onClick_detailBtn($id)
			{
				if (g.data.searchBusinessPool.hasDetail($id))
				{
					this.currId = $id;
					this.isShowDetailPop = true;
				}
				else
				{
					_params = {orderId: $id};
					g.ui.showLoading();
					g.net.call("bo/viewOrderDetail", _params).then(($data) =>
					{
						g.ui.hideLoading();
						g.data.searchBusinessPool.getDataById($id).update($data);
						this.currId = $id;
						this.isShowDetailPop = true;
					}, (err) =>
					{
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
						type: $item.type
					}
				}
			},
			onClick_auditBtn($id)
			{
				var businessData = g.data.searchBusinessPool.getDataById($id);
				_params = {
					orderId: $id,
					todoId: businessData.todoId
				};
				g.ui.showLoading();
				g.net.call("bo/auditOrderDetail", _params).then(($data) =>
				{
					g.ui.hideLoading();
					g.data.searchBusinessPool.getDataById($id).update($data);
					this.currId = $id;
					this.isShowDetailPop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClose_detailPop($result){

				this.isShowDetailPop = false;
				if ($result)
				{
					searchBusinessList(g.currentRoute.query).then(($data) =>
					{
						this.routerUpdated();
					})
				}
			},
			onClick_closeBtn($type){
				if($type == "tel"){
					g.data.searchBusinessPool.getDataById(_showTelId).update({isShowTel: false});
				}
				if($type == "auditor"){
					g.data.searchBusinessPool.getDataById(_showNextExamineId).update({isShowNextExamine: false});
				}
			},
			onClick_creatorName($id){
				if(_showTelId){
					let content = g.data.searchBusinessPool.getDataById(_showTelId)
					content&&content.update({isShowTel: false});
				}
				_showTelId = $id;
				g.data.searchBusinessPool.getDataById(_showTelId).update({isShowTel: true});
			},
			updateUrl()
			{
				g.url = {
					path: "/oppman",
					query: {
						page: this.currPage,
						type: this.type,
						statusList: JSON.stringify(this.statusList),
						startTime: this.startTime,
						endTime: this.endTime,
						creatorName: this.creatorName,
						companyName: this.companyName,
						comName:this.comName
					}
				};
			},
			onChange_date($timeStamp)
			{
				this[_dateType.toLowerCase() + 'Time'] = $timeStamp;
				if (this.endTime < this.startTime)
				{
					this.endTime = this.startTime + 86400;
				}
				this.isShowStartDate = false;
				this.isShowEndDate = false;
				_dateType = "";
			},
			onClick_auditStatus($id,$auditStatus){

				if($auditStatus ==-1||$auditStatus ==2){
					return ;
				}
				g.net.call("bo/getOrderAuditUser", {
					orderId : $id
				}).then(($data) =>
				{
					this.nextExamine = $data.auditNames;
					if(_showNextExamineId){
						let content = g.data.searchBusinessPool.getDataById(_showNextExamineId)
						content&&content.update({isShowNextExamine: false});
					}
					g.data.searchBusinessPool.getDataById($id).update({isShowNextExamine: true});
					_showNextExamineId = $id;
				}, (err) =>
				{
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
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/oppMan.scss";

</style>