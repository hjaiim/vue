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
						<div class="switch-con">
							<label>
								<input type="checkbox" class="mui-switch mui-switch-anim">
							</label>
						</div>
					</div>
				</div>
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