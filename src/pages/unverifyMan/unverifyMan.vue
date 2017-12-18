<template>
	<com-layout currPath="/accountman" :isInited="false">
		<div class="staff-wrap">
			<div class="status-wrap clear">
				<div class="verify-btn total-btn right pointer" @click="onClick_verifyBtn">已认证</div>
				<div class="option-wrap left">
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
			<div class="table-content verify-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>姓名</th>
						<th>所属公司</th>
						<th>所属部门</th>
						<th>职务名称</th>
						<th>提交时间</th>
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
						<td>2017.12.12 12:12:12</td>
						<td>
							<p class="clear diff-action">
								<span class="right pointer draw-line ani-time">详情</span>
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
			onClick_verifyBtn(){
				g.url = "/accountman";
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/accountman.scss";
</style>