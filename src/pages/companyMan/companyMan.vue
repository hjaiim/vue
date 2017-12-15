<template>
	<com-layout currPath="/companyman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer" @click="onClick_addCompanyBtn">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
				<div class="search-wrap clear left">
					<span class="left">公司名称</span>
					<input-bar class="search-bar left relative" placeholder="" type="text"
							   v-model="customerName"></input-bar>

				</div>
				<span class="search-btn action-btn ani-time left pointer" @click="onClick_searchBtn">查询</span>
			</div>
			<div class="table-content">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>公司名称</th>
						<th>部门总数</th>
						<th>职务总数</th>
						<th>公司负责人</th>
						<th>负责人电话</th>
						<th>公司电话</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in companyList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<!--:class="[index==2?'is-picked':'', index==5?'wait-pick':'']"-->
						<td><span>{{item.name}}</span></td>
						<td>{{item.departCount}}</td>
						<td>{{item.dutyCount}}</td>
						<td>{{item.leader}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.contact}}</td>
						<td>
							<p class="action-menu clear">
                                <span class="left pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">编辑
							</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<span>您是否真的要删除该角色？</span>
									</delete-pop>
							</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="totalPages > 1">
					<common-page class="right" :total="g.data.searchCompanyPool.total" :currPage="currPage"
								 :showTotalCount="true"
								 :showElevator="true" :showFirstAndEnd="true"></common-page>
				</div>
			</div>
		</div>
		<add-company-pop :isShowPopView="isShowCompanyPop"
						 @close="onClose_companyPop"
						 :currId="currId"></add-company-pop>

	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DeletePop from "../../components/pop/deletePop.vue"
	import AddCompanyPop from "../../components/pop/addCompanyPop.vue"
	import InputBar from "../../components/inputBar.vue"

	export default{
		created(){

			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				companyList: [],
				currId: 1,
				currPage: 1,
				customerName: "",
				isShowCompanyPop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddCompanyPop,
			InputBar
		},
		computed: {
			totalPages()
			{
				return Math.ceil(g.data.searchCompanyPool.total / 10);
			}
		},
		methods: {
			routerUpdated()
			{
				this.companyList = g.data.searchCompanyPool.list;
			},
			onClick_deleteBtn($id)
			{
				this.currId = $id;
				g.data.searchCompanyPool.getDataById(this.currId).update({isShow: true})
			},
			onClose_deletePop($result)
			{
				g.data.searchCompanyPool.getDataById(this.currId).update({isShow: false});
				if ($result)
				{

				}
			},

			onClick_detailBtn($id)
			{
				this.currId = $id;
				if (g.data.companyPool.hasDetail(this.currId))
				{
					this.isShowCompanyPop = true;
				}
				else
				{
					g.net.call("organizeQuery/organizeDetail", {comId: this.currId}).then(($data) =>
					{
						var companyData = g.data.companyPool.getDataById(this.currId);
						if (companyData)
						{
							companyData.update($data.companyResult);
						}
						else
						{
							g.data.companyPool.update([$data.companyResult]);
						}
						g.data.departmentPool.update($data.departmentResultList);
						g.data.dutyPool.update($data.dutyResultList);
						this.isShowCompanyPop = true;
					})
				}
			},
			onClick_addCompanyBtn()
			{
				this.currId = 0;
				this.isShowCompanyPop = true;
			},
			onClose_companyPop($result)
			{
				this.isShowCompanyPop = false;
				if ($result)
				{

				}
			},
			onClick_searchBtn()
			{

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/platManage.scss";
</style>