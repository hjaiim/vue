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
					<tr v-for="(item,index) in positionList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>{{item.name}}</td>
						<td>{{item.type}}</td>
						<td>{{item.creator}}</td>
						<td>{{item.createTime}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time"
									  @click="onClick_detailBtn(item.id)">修改</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<span>您是否真的要删除该岗位吗？</span>
									</delete-pop>
							</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>

				<div class="show-page clear" v-if="g.data.searchPositionPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchPositionPool.total" :currPage="currPage"
								 :showTotalCount="true"
								 :showElevator="true" :showFirstAndEnd="true"></common-page>
				</div>
			</div>
		</div>
		<add-post-pop :isShowPopView="isShowPostPop" :currId="currId" @close="onClose_postPop"></add-post-pop>
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
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				positionList: [],
				currId: 0,
				currPage: 1,
				isShowPostPop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddPostPop
		},
		methods: {
			routerUpdated()
			{
				this.positionList = g.data.searchPositionPool.list;
			},
			onClick_addPostBtn()
			{
				this.currId = 0;
				this.isShowPostPop = true;
			},
			onClick_deleteBtn($id)
			{
				this.currId = $id;
				g.data.positionPool.getDataById(this.currId).update({isShow: true});
			},
			onClose_deletePop($result)
			{
				g.data.positionPool.getDataById(this.currId).update({isShow: false})
				if ($result)
				{

				}
			},
			onClick_detailBtn($id)
			{
				this.currId = $id;
				this.isShowPostPop = true;
			},
			onClose_postPop()
			{
				this.isShowPostPop = false;
			}

		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/platManage.scss";
</style>