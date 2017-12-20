<template>
	<com-layout currPath="/myopp">
		<div class="opp-wrap">
			<div class="opp-banner clear">
				<div class="business-form left">
					<span class="personal-title business-title  left">业务名称</span>
					<div class="personal-content left relative form-list business-list" @click="onClick_dropListBtn">
						{{currType}}
						<span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
						<ul class="absolute drop-list" v-show="isShowBusinessList">
							<li v-for="item in typeList" @click.stop="onClick_typeItem(item.id)">{{item.name}}</li>
						</ul>
					</div>
				</div>

				<div class="from-group status-form p-left left">
					<span class="form-title left">状态</span>
                    <span class="action-box status-type left" @click="onClick_statusItem(1)">
                        <i class="pointer" :class="statusList.indexOf(1) >= 0?'action':''"></i>
                        <span>审核中</span>
                    </span>
                    <span class="action-box status-type left" @click="onClick_statusItem(-1)">
                        <i class="pointer" :class="statusList.indexOf(-1)>= 0?'action':''"></i>
                        <span>未通过</span>
                    </span>
                      <span class="action-box status-type left" @click="onClick_statusItem(2)">
                        <i class="pointer" :class="statusList.indexOf(2)>= 0?'action':''"></i>
                        <span>已通过</span>
                    </span>
				</div>
				<div class="right search-box p-left clear">
					<span class="customer-name">客户公司名称</span>
					<input-bar class="search-input" placeholder="" type="text"
							   v-model="companyName"></input-bar>
					<span class="search-btn active-btn ani-time pointer" @click="onClick_searchBtn">搜索</span>
					<span class="all-btn active-btn ani-time pointer" @click="onClick_selectAllBtn">全部</span>
				</div>
				<div class="date-box p-left left">
					<span class="create-time left">创建时间</span>
					<div class="date-form left relative pointer" @click="onClick_dateSelect('Start')">
						{{startDate}}
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
						<common-date @change="onChange_date" :isShowDatePicker="isShowStartDate"
									 type="hour"></common-date>
					</div>
					<span class="date-line left">-</span>
					<div class="date-form left relative pointer" @click="onClick_dateSelect('End')">
						{{endDate}}
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
						<common-date @change="onChange_date" :isShowDatePicker="isShowEndDate"
									 type="hour"></common-date>
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
						<td>{{item.companyName}}</td>
						<td>{{item.typeName}}</td>
						<td>{{item.createTime}}</td>
						<td>{{item.auditStatusDesc}}</td>
						<td>
							<p class="action-menu clear">
                                <span class="left pointer draw-line ani-time" v-if="item.operation == 1"
									  @click="onClick_editBtn(item.id)">重新编辑</span>
                                <span class="right pointer draw-line ani-time" v-if="item.operation == 0"
									  @click="onClick_detailBtn(item.id)">详情</span>
							</p>

						</td>
					</tr>
					</tbody>
				</table>
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

	var _dateType = "", _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				typeList: [],
				businessList: [],
				isShowDetailPop: false,
				isShowStartDate: false,
				isShowEndDate: false,
				isShowBusinessList: false,
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
			InputBar
		},
		computed: {
			currType()
			{
				if (this.type > 0)
				{
					return g.data.staticTypePool.getDataById(this.type) &&
							g.data.staticTypePool.getDataById(this.type).name;
				}
				return "全部"
			},
			startDate()
			{
				return g.timeTool.getFullDate(this.startTime, true);
			},
			endDate()
			{
				return g.timeTool.getFullDate(this.endTime, true);
			}
		},
		watch: {
			isShowStartDate($val)
			{
				trace("$val", $val);
			}
		},
		methods: {
			init()
			{
				this.currPage = 1;
				this.statusList = [-1, 1, 2];
				this.type = -1;
				this.startTime = 1400000000;
				this.endTime = g.timeTool.getNowStamp();
				this.creatorName = "";
				this.companyName = "";
			},
			routerUpdated()
			{
				this.typeList = g.data.staticTypePool.list;
				this.businessList = g.data.searchBusinessPool.list;
				this.currPage = int(g.vue.getQuery("page", 1));
				this.type = g.vue.getQuery("type", -1);
				var statusList = g.vue.getQuery("statusList", "[1,-1,2]");
				this.statusList = JSON.parse(statusList).map(function (item)
				{
					return int(item);
				});
				this.startTime = g.vue.getQuery("startTime", 1400000000);
				this.endTime = g.vue.getQuery("endTime", g.timeTool.getNowStamp());
				this.creatorName = g.vue.getQuery("creatorName", "");
				this.companyName = g.vue.getQuery("companyName", "");
			},
			onClose_detailPop()
			{
				this.isShowDetailPop = false;
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
				this.isShowEndDate = false;
				this.isShowStartDate = false;

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
				this.isShowBusinessList = false;
				this['isShow' + $type + 'Date'] = true;
			},
			onClick_searchBtn()
			{
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
				if (g.data.searchBusinessPool.hasDetail($id))
				{
					this.currId = $id;
					this.isShowDetailPop = true;
				}
				else
				{
					_params = {orderId: $id};
					g.net.call("bo/viewOrderDetail", _params).then(($data) =>
					{
						g.data.searchBusinessPool.getDataById($id).update($data);
						this.currId = $id;
						this.isShowDetailPop = true;
					})
				}
			},
			onClick_editBtn($id)
			{
				g.url = {
					path: "/oppapply",
					query: {
						id: $id
					}
				}
			},
			updateUrl()
			{
				g.url = {
					path: "/myopp",
					query: {
						page: this.currPage,
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
				this.isShowStartDate = false;
				this.isShowEndDate = false;
				_dateType = "";
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/oppList.scss";
</style>