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
						<td><p class="action-menu clear"><span class="left">详情</span><span class="left">删除</span></p>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	export default{
		created(){

		},
		data(){
			return {
				g: g,
			}
		},
		components: {
			ComLayout
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/message.scss";
</style>