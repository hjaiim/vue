<template>
	<div class="delete-pop absolute gray-shadow" v-show="isDeletePop">
		<div class="sure-content absolute">
			<div class="quesiton-txt">
				<img :src="g.path.images+'/quesiton-icon.png'" alt="">
				<slot></slot>
			</div>
			<div class="btn-wrap clear">
				<i class="action-btn right cancel-btn ani-time pointer"
					  @click.stop="onClick_cancelBtn">取消</i>
				<i class="action-btn right delete-btn ani-time pointer"
					  @click.stop="onClick_confirmBtn">删除
				</i>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global"
	export default{
		data(){
			return {
				g: g
			}
		},
		props: {
			isDeletePop: false
		},
		components: {},
		methods: {
			onClick_cancelBtn(){
				this.$emit('close', false);
			},
			onClick_confirmBtn(){
				this.$emit('close', true);
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
