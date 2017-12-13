<template>
	<com-layout>
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
					<tr v-for="(n,index) in 10">
						<td><i class="draw-tick relative pointer"></i><span class="rank-num">{{index+1}}</span></td>
						<td><span :class="[index==2?'is-picked':'', index==5?'wait-pick':'']">审批已通过</span></td>
						<td>系统消息</td>
						<td>2012.12.12 12:12:12</td>
						<td>
							<p class="action-menu clear"><span class="left pointer draw-line ani-time">详情</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(index+1)">删除
								<div class="delete-pop absolute gray-shadow" v-show="(index+1)=== currIndex">
									<div class="sure-content absolute">
										<div class="quesiton-txt">
											<img :src="g.path.images+'/quesiton-icon.png'" alt="">
											<span>您确定要删除该产品？</span>
										</div>
										<div class="btn-wrap clear">
											<span class="action-btn right cancel-btn ani-time pointer"
												  @click="onClick_cancelBtn(index+1)">取消</span>
											<span class="action-btn right delete-btn ani-time pointer"
												  @click="onClick_removeBtn(index+1)">删除</span>
										</div>
									</div>
								</div>
							</span></p>
						</td>
					</tr>
					</tbody>
				</table>
				<common-page :total="20" :currPage="10" :showPageSize="false" :showTotalCount="true"
							 :showElevator="true"
							 :showFirstAndEnd="true"></common-page>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue"
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				currIndex: 0,
			}
		},
		components: {
			ComLayout,
			CommonPage
		},
		methods: {
			onClick_deleteBtn($index){
				this.currIndex = $index;
			},
			onClick_cancelBtn($index){
				this.currIndex = null;
			},
			onClick_removeBtn($index){
				this.currIndex = null;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/message.scss";
</style>