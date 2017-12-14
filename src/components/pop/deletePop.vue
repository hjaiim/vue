<template>
	<div class="delete-pop absolute gray-shadow" v-show="isDeletePop">
		<div class="sure-content absolute">
			<div class="quesiton-txt">
				<img :src="g.path.images+'/quesiton-icon.png'" alt="">
				<slot></slot>
			</div>
			<div class="btn-wrap clear">
				<span class="action-btn right cancel-btn ani-time pointer"
					  @click.stop="onClick_cancelBtn(index+1)">取消</span>
				<span class="action-btn right delete-btn ani-time pointer"
					  @click.stop="onClick_removeBtn(index+1)">删除
				</span>
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
			isDeletePop: false,
		},
		components: {},
		methods: {
			onClick_cancelBtn(){
				this.$emit('cancel');
			},
			onClick_removeBtn(){
				this.$emit('remove');

			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
