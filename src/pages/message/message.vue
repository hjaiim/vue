<template>
	<com-layout currPath="/message">
		<div class="message-wrap">
			<div class="msg-content">
				<div class="action-wrap clear">
					<i class="more-delete left border-gray pointer" @click="onClick_allDeleteBtn">
						<img :src="g.path.images+'/delete-icon.png'" alt="">
						<span>批量删除</span>
					</i>
					<div class="action-box left pointer" @click="onClick_msgType(1)">
						<i class="draw-tick relative pointer" :class="typeList.indexOf(1)>=0?'action':''"></i>
						<span>已读</span>
					</div>
					<div class="action-box left pointer" @click="onClick_msgType(0)">
						<i class="draw-tick relative pointer" :class="typeList.indexOf(0)>=0?'action':''"></i>
						<span>未读</span>
					</div>
					<div class="text-msg right">
						<p class="msg-txt">开启手机短信提醒</p>
						<div class="switch-con pointer" @click="onClick_switch">
							<label class="switch-label pointer">
								<input type="checkbox" v-model="msgSwitch" class="mui-switch mui-switch-anim pointer">
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="table-content">
				<table class="inner-table">
					<thead>
					<tr>
						<th @click="onClick_checkedAll"><i class="draw-tick relative pointer"
														   :class="checkAll?'action':''"></i><span
								class="rank-num">序号</span></th>
						<th>标题</th>
						<th>来源</th>
						<th>发送时间</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in msgList">
						<td><i class="draw-tick relative pointer" :class="item.checked?'action':''"
							   @click="onClick_checkedItem(item.id)"></i><span
								class="rank-num">{{index+1}}</span></td>
						<td><span :class="[item.readStatus==1?'is-picked':'wait-pick']">{{item.title}}</span></td>
						<td>{{item.sourceDesc}}</td>
						<td>{{item.createTime}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">详情
								</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<i>您确定要删除该消息？</i>
									</delete-pop>
								</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.searchMessagePool.totalPage > 1">
					<common-page class="right" :total="g.data.searchMessagePool.total" :currPage="currPage"
								 :showPageSize="false"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
				<detail-pop :isShowPopView="isShowDetailPop" :currId="currId" @close="onClose_detailPop"></detail-pop>
			</div>
		</div>
		<total-delete-pop :isShowPopView="isShowAllDeletePop" @close="onClose_AllDeletePop"></total-delete-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import DetailPop from "../../components/pop/detailPop.vue";
	import DeletePop from "../../components/pop/deletePop.vue"
	import TotalDeletePop from "../../components/pop/totalDeletePop.vue"
	var _delId = 0;
	var _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				currId: 0,
				msgList: [],
				typeList: [],
				currPage: 1,
				delList: [],
				msgSwitch: true,
				checkedAll: false,
				isShowDetailPop: false,
				isShowAllDeletePop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DetailPop,
			DeletePop,
			TotalDeletePop
		},
		computed: {
			checkAll()
			{
				if (this.checkedAll)
				{
					return true;
				}
				for (var item of this.msgList)
				{
					if (!item.checked)
					{
						return false;
					}
				}
				return true;
			}
		},
		methods: {
			routerUpdated()
			{
				this.msgList = g.data.searchMessagePool.list;
				this.msgSwitch = g.data.userInfo.msgSwitch;
				var typeList = g.vue.getQuery('typeList', "[0,1]");
				this.typeList = JSON.parse(typeList).map(function (item)
				{
					return int(item);
				});

				this.currPage = int(g.vue.getQuery('page', 1));
			},
			onClick_deleteBtn($id)
			{
				_delId = $id;
				g.data.searchMessagePool.getDataById(_delId).update({isShow: true});
			},
			onClose_deletePop($result)
			{
				g.data.searchMessagePool.getDataById(_delId).update({isShow: false});
				if ($result)
				{
					_params = {msgIds: _delId};
					g.ui.showLoading()
					g.net.call("message/delMessage", {msgIds: _delId}).then(($data) =>
					{
						g.ui.hideLoading();
						g.data.searchMessagePool.remove(_delId);
						g.ui.toast("消息删除成功！");
					}, (err) =>
					{
						g.func.dealErr(err);
					})
				}
			},
			onClick_switch($status)
			{
				_params = {msgSwitch: $status == 1 ? 0 : 1};
				g.net.call("message/updateReceiveMobileMsg", _params).then(($data) =>
				{
					g.ui.toast("用户消息设置成功!");
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClick_msgType($type)
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
				this.updateUrl();
			},
			onClick_detailBtn($id)
			{
				var data = g.data.searchMessagePool.getDataById($id);
				if (data.readStatus == 0)
				{
					g.ui.showLoading()
					g.net.call('message/readMessage', {msgId: $id}).then(($data) =>
					{
						g.ui.hideLoading();
						this.currId = $id;
						this.isShowDetailPop = true;
					})
				}
				else
				{
					this.currId = $id;
					this.isShowDetailPop = true;
				}
			},
			onClick_checkedItem($id)
			{
				var data = g.data.searchMessagePool.getDataById($id);
				var index = this.delList.indexOf($id);
				if (data.checked)
				{
					data.update({checked: false});
					this.delList.splice(index, 1);
				}
				else
				{
					data.update({checked: true});
					this.delList.push($id);
				}
			},
			onClick_checkedAll()
			{
				if (this.checkedAll)
				{
					this.checkedAll = false;
					for (var item of this.msgList)
					{
						item.update({checked: false})
						this.delList = [];
					}
				}
				else
				{
					this.checkedAll = true;
					for (var item of this.msgList)
					{
						item.update({checked: true})
						this.delList.push(item.id);
					}
				}
			},
			onClose_detailPop()
			{
				this.isShowDetailPop = false;
			},
			onClick_allDeleteBtn()
			{
				if (this.delList.length > 0)
				{
					this.isShowAllDeletePop = true;

				}
				else
				{
					g.ui.toast("您当前未选中任何消息");
				}
			},
			onClose_AllDeletePop($result)
			{
				this.isShowAllDeletePop = false;
				if ($result)
				{
					g.ui.showLoading()
					g.net.call('message/delMessage', {msgIds: this.delList.join(',')}).then(($data) =>
					{
						g.ui.hideLoading();
						for (var id of this.delList)
						{
							g.data.searchMessagePool.remove(id);
						}
						g.ui.toast("消息删除成功！");
					})
				}

			},
			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			updateUrl()
			{
				g.url = {
					path: "/message",
					query: {
						page: this.currPage,
						typeList: JSON.stringify(this.typeList)
					}
				};
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/message.scss";
</style>