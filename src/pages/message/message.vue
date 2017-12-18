<template>
	<com-layout currPath="/message">
		<div class="message-wrap">
			<div class="msg-content">
				<div class="action-wrap clear">
					<i class="more-delete left border-gray pointer">
						<img :src="g.path.images+'/delete-icon.png'" alt="">
						<span>批量删除</span>
					</i>
					<div class="action-box left">
						<i class="pointer action"></i>
						<span>已读</span>
					</div>
					<div class="action-box left">
						<i class="pointer"></i>
						<span>未读</span>
					</div>
					<div class="text-msg right">
						<p class="msg-txt">开启手机短信提醒</p>
						<div class="switch-con pointer">
							<label class="switch-label pointer">
								<input type="checkbox" class="mui-switch mui-switch-anim pointer">
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="table-content">
				<table class="inner-table">
					<thead>
					<tr>
						<th><i class="draw-tick relative pointer action"></i><span class="rank-num">序号</span></th>
						<th>标题</th>
						<th>来源</th>
						<th>发送时间</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in msgList">
						<td><i class="draw-tick relative pointer"></i><span class="rank-num">{{index+1}}</span></td>
						<td><span :class="[index==2?'is-picked':'', index==5?'wait-pick':'']">{{item.title}}</span></td>
						<td>{{item.source}}</td>
						<td>{{item.createTime}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">详情
								</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<span>您确定要删除该消息？</span>
									</delete-pop>
								</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.messagePool.totalPage > 1">
					<common-page class="right" :total="g.data.messagePool.total" :currPage="currPage"
								 :showPageSize="false"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"></common-page>
				</div>
				<detail-pop :isShowPopView="isShowDetailPop" :currId="currId" @close="onClose_detailPop"></detail-pop>

			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import DetailPop from "../../components/pop/detailPop.vue";
	import DeletePop from "../../components/pop/deletePop.vue"
	var _delId = 0;
	var _params = null;
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				currId: 0,
				isShowDetailPop: false,
				msgList: []
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DetailPop,
			DeletePop
		},
		methods: {
			init()
			{
				this.msgList = g.data.messagePool.list;
			},
			onClick_deleteBtn($id){
				_delId = $id;
				g.data.messagePool.getDataById(_delId).update({isShow: true});
			},
			onClose_deletePop($result){
				g.data.messagePool.getDataById(_delId).update({isShow: false});
				if ($result)
				{
					_params = {msgIds: _delId};
					g.net.call("message/delMessage",($data) => {
						g.ui.toast("消息删除成功！");
					})
				}
			},
			onClick_detailBtn($id){
				this.currId = $id;
				this.isShowDetailPop = true;
			},
			onClose_detailPop(){
				this.isShowDetailPop = false;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/message.scss";
</style>