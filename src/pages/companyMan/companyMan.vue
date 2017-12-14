<template>
	<com-layout currPath="/companyman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
				<div class="search-wrap clear left">
					<span class="left">公司名称</span>
					<div class="search-bar left relative">
						<input type="text" class="search-name">
						<img class="close-btn absolute pointer" :src="g.path.images+'/close-popup.png'" alt="">
					</div>
				</div>
				<span class="search-btn action-btn ani-time left pointer">查询</span>
			</div>
			<div class="table-content">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>公司名称</th>
						<th>部门总监</th>
						<th>职务总数</th>
						<th>公司负责人</th>
						<th>负责人电话</th>
						<th>公司电话</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(n,index) in 10">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td><span :class="[index==2?'is-picked':'', index==5?'wait-pick':'']">广宁分公司</span></td>
						<td>6</td>
						<td>26</td>
						<td>王鑫</td>
						<td>15555555555</td>
						<td>88888888</td>
						<td>
							<p class="action-menu clear"><span class="left pointer draw-line ani-time"
															   @click="onClick_detailBtn">编辑
							</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(index+1)">删除
									<delete-pop :isDeletePop="(index+1)=== currIndex"
												@cancel="onClick_cancelBtn(index+1)"
												@remove="onClick_removeBtn(index+1)">
										<span>您是否真的要删除该角色？</span>
									</delete-pop>
							</span>
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
	import DeletePop from "../../components/pop/deletePop.vue"
	export default{
		created(){
		},
		data(){
			return {
				g: g,
				currIndex: '',
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop
		},
		methods: {
			onClick_deleteBtn($index){
				this.currIndex = $index;
			},
			onClick_cancelBtn($index){
				this.currIndex = "";
			},
			onClick_removeBtn($index){
				this.currIndex = "";
			},
			onClick_detailBtn(){

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/platManage.scss";
</style>