<template>
	<com-layout currPath="/accountman">
		<div class="staff-wrap">
			<div class="status-wrap clear">
				<span class="total-nums left">岗位类别</span>
				<div class="action-box left" @click="onClick_positionType(-1)">
					<i class="draw-tick relative pointer" :class="typeList.indexOf(-1) >= 0?'action':''"></i>
					<span>未分配</span>
				</div>
				<div class="action-box left" @click="onClick_positionType(1)">
					<i class="draw-tick relative pointer" :class="typeList.indexOf(1) >= 0?'action':''"></i>
					<span>提交员</span>
				</div>
				<div class="action-box left" @click="onClick_positionType(2)">
					<i class="draw-tick relative pointer" :class="typeList.indexOf(2) >= 0?'action':''"></i>
					<span>审核员</span>
				</div>
				<div class="verify-btn total-btn right pointer" @click="onClick_unVerifyBtn">待认证>></div>
				<div class="option-wrap left ani-time">
					<div class="staff-option left clear">
						<span class="left staff-name">平台角色</span>
						<div class="option-content relative left pointer" @click.stop="onClick_dropListBtn">
							{{roleName}}
							<i class="icon-trangle pointer" :class="isShowRoleList?'rotate':''"></i>
							<drop-list :dropList=roleList :isShowDropList="isShowRoleList"
									   @change="onChange_roleItem" ref="dropList"></drop-list>
						</div>
					</div>
					<div class="search-name left clear">
						<span class="left">姓名</span>
						<input-bar class="search-input left relative" placeholder="" type="text"
								   v-model="name" @keyenter="onKeyenter_inputBar"></input-bar>
					</div>
					<div class="action-wrap left clear">
						<span class="left action-btn ani-time pointer" @click="onClick_searchBtn">查询</span>
						<span class="left total-btn ani-time pointer" @click="onClick_selectAllBtn">全部</span>
					</div>
				</div>
			</div>
			<div class="table-content staff-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>姓名</th>
						<th>所属公司</th>
						<th>所属部门</th>
						<th>职务名称</th>
						<th>岗位名称</th>
						<th>岗位类型</th>
						<th>角色</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in accountList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>{{item.name}}</td>
						<td>{{item.companyName}}</td>
						<td>{{item.departmentName}}</td>
						<td>{{item.dutyName}}</td>
						<td>{{item.positionName}}</td>
						<td>{{item.positionTypeDesc}}</td>
						<td>{{item.roleName}}</td>
						<td>
							<p class="diff-menu ">
								<span class="pointer draw-line ani-time" @click="onClick_positionBtn(item)">岗位设置
								</span>
								<span class=" pointer draw-line ani-time" @click="onClick_roleBtn(item)">角色设置</span>
								<span class=" pointer draw-line ani-time"
									  @click="onClick_stopBtn(item)">{{item.status == 1?'停用':'启用'}}</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.searchAccountPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchAccountPool.total" :currPage="currPage"
								 :showPageSize="false" :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
			<set-role-pop @close="onClose_setRolePop" :currId="currId"
						  :isShowPopView="isShowSetRolePop"></set-role-pop>
			<order-work-pop @close="onClose_orderWorkPop"
							:currId="currId"
							:isShowPopView="isShowOrderWorkPop"></order-work-pop>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import SetRolePop from "../../components/pop/setRolePop.vue";
	import OrderWorkPop from "../../components/pop/orderWorkPop.vue";
	var _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				accountList: [],
				roleList: [],
				currPage: 1,
				currRole: 0,
				name: "",
				typeList: [-1, 1, 2],
				isShowRoleList: false,
				isShowSetRolePop: false,
				isShowOrderWorkPop: false,
				roleId: 0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DropList,
			InputBar,
			SetRolePop,
			OrderWorkPop
		},
		computed: {
			roleName()
			{
				if (this.currRole)
				{
					return g.data.searchRolePool.getDataById(this.currRole) &&
							g.data.searchRolePool.getDataById(this.currRole).name

				}
				return "全部";
			}
		},
		methods: {
			routerUpdated()
			{
				this.accountList = g.data.searchAccountPool.list;
				var typeList = g.vue.getQuery("typeList", "[1,-1,2]");
				this.typeList = JSON.parse(typeList).map(function (item)
				{
					return int(item);
				});
				this.currPage = int(g.vue.getQuery("page", 1));
				this.name = g.vue.getQuery("name", "");
				this.currRole = g.vue.getQuery("role", 0);
				this.roleList = g.data.searchRolePool.list.concat();
				this.roleList.unshift({
					name: "全部",
					id: 0
				});
				this.initEvents();
			},
			init()
			{
				this.typeList = [-1, 1, 2];
				this.currPage = 1;
				this.name = "";
				this.currRole = 0;
				this.updateUrl();
			},
			initEvents()
			{
				document.addEventListener("click", this.onClick_doc);
			},
			removeEvents()
			{
				document.removeEventListener("click", this.onClick_doc);
			},
			onClick_doc(e)
			{
				if (this.$refs.dropList && !this.$refs.dropList.$el.contains(e.target))
				{
					this.isShowRoleList = false;
				}
			},
			onClick_positionType($type)
			{
				var index = this.typeList.indexOf($type);
				if (index >= 0)
				{
					this.typeList.splice(index, 1);
				}
				else
				{
					this.typeList.push($type);
				}
				this.currPage = 1;
			},
			onChange_roleItem($id)
			{
				this.currRole = $id;
				this.currPage = 1;
				this.isShowRoleList = false;
			},
			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			onClick_dropListBtn()
			{
				if (this.isShowRoleList)
				{
					this.isShowRoleList = false;
				}
				else
				{
					this.isShowRoleList = true;
				}
			},
			onClick_selectAllBtn()
			{
				this.init();
				this.updateUrl()
			},
			onKeyenter_inputBar()
			{
				this.onClick_searchBtn();
			},
			onClick_searchBtn()
			{
				if (!this.name)
				{
					return;
				}
				this.currPage = 1;
				this.updateUrl();
			},
			onClick_positionBtn($item)
			{
				this.currId = $item.id;
				this.isShowOrderWorkPop = true;
			},
			onClick_roleBtn($item)
			{
				this.currId = $item.id;
				this.isShowSetRolePop = true;
			},
			onClick_stopBtn($item)
			{
				_params = {
					userId: $item.id,
					status: $item.status == 1 ? 0 : 1
				};
				g.net.call('user/freezeUser', _params).then(($data) =>
				{
					g.data.searchAccountPool.getDataById($item.id).update({
						status: $item.status == 1 ? 0 : 1
					})
				})
			},
			onClose_setRolePop()
			{
				this.isShowSetRolePop = false;
			},
			onClose_orderWorkPop(){
				this.isShowOrderWorkPop = false;
			},
			onClick_unVerifyBtn()
			{
				g.url = "/unverifyman";
			},
			updateUrl()
			{
				g.url = {
					path: "/accountman",
					query: {
						typeList: JSON.stringify(this.typeList),
						page: int(this.currPage),
						name: this.name,
						roleId: this.currRole
					}
				}
			}
		},
		beforeDestroy()
		{
			this.removeEvents();
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/accountman.scss";
</style>