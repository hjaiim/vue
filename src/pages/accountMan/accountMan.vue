<template>
	<com-layout currPath="/accountman">
		<div class="staff-wrap">
			<div class="status-wrap clear">
				<span class="total-nums left">岗位类别</span>
				<div class="action-box left">
					<i class="pointer"></i>
					<span>未分配</span>
				</div>
				<div class="action-box left">
					<i class="pointer action"></i>
					<span>提交员</span>
				</div>
				<div class="action-box left">
					<i class="pointer action"></i>
					<span>审核员</span>
				</div>
				<div class="verify-btn total-btn right pointer" @click="onClick_unVerifyBtn">待认证>></div>
				<div class="option-wrap left">
					<div class="staff-option left clear">
						<span class="left staff-name">平台角色</span>
						<div class="option-content relative left" @click="onClick_dropListBtn">
							所有<i class="icon-trangle pointer" :class="isShowStatusList?'rotate':''"></i>
							<drop-list :dropList=statusList :isShowDropList="isShowStatusList"
									   @change="onClick_StatusItem"></drop-list>
						</div>
					</div>
					<div class="search-name left clear">
						<span class="left">姓名</span>
						<input-bar class="search-input left relative" placeholder="" type="text"
								   v-model="email"></input-bar>
					</div>
					<div class="action-wrap left clear">
						<span class="left action-btn ani-time pointer">查询</span>
						<span class="left total-btn ani-time pointer">全部</span>
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
					<tr v-for="(n,index) in 10">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>蒋怡君</td>
						<td>广州分公司</td>
						<td>客户部</td>
						<td>部门经理</td>
						<td>客户经理</td>
						<td>提交员</td>
						<td>人员管理权</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time" @click="onClick_workBtn">岗位设置</span>
								<span class="left pointer draw-line ani-time" @click="onClick_roleBtn">角色设置</span>
								<span class="left pointer draw-line ani-time" @click="onClick_stopBtn">停用</span>
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
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue"
	export default{
		created(){
		},
		data(){
			return {
				g: g,
				isShowStatusList: false,
				statusList: []
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DropList,
			InputBar
		},
		methods: {
			onClick_StatusItem($id){

			},
			onClick_dropListBtn(){
				if (this.isShowStatusList)
				{
					this.isShowStatusList = false;
				}
				else
				{
					this.isShowStatusList = true;
				}
			},
			onClick_workBtn(){

			},
			onClick_roleBtn(){

			},
			onClick_stopBtn(){

			},
			onClick_unVerifyBtn(){
				g.url="/unverifyman";
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/accountman.scss";
</style>