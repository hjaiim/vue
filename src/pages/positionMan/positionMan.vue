<template>
	<com-layout currPath="/positionman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer" @click="onClick_addPostBtn">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
			</div>
			<div class="table-content post-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>岗位名称</th>
						<th>类型</th>
						<th>设定人</th>
						<th>设定时间</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(n,index) in 10">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>商机管理员</td>
						<td>商机审核岗</td>
						<td>王鑫</td>
						<td>2017.12.15 10:10:10</td>
						<td>
							<p class="action-menu clear"><span class="left pointer draw-line ani-time"></span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="isShowDeletePop"
												@close="onClose_deletePop" >
										<span>您是否真的要删除该岗位吗？</span>
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
		<add-post-pop :isShowPopView="isShowNewPostPop"></add-post-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import DeletePop from "../../components/pop/deletePop.vue"
	import AddPostPop from "../../components/pop/newPostPop.vue"
	export default{
		created()
		{

		},
		data(){
			return {
				g: g,
				currIndex: '',
				isShowNewPostPop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddPostPop
		},
		methods: {
			onClick_addPostBtn()
			{

			},
			onClick_deleteBtn($index)
			{
				this.currIndex = $index;
			},
			onClose_deletePop()
			{

			},
			onClick_detailBtn()
			{

			},
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/platManage.scss";
</style>