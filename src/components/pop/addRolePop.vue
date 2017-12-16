<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="add-role-container">
			<p class="mod-tit">设置新角色</p>
			<div class="mod-company-content">
				<div class="company-message no-border">
					<p class="from-group">
						<span class="form-title left">角色名称</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="roleName"></input-bar>

						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title left">角色说明</span>
						<textarea type="text" class="form-control role-explain ani-time"></textarea>
					</p>
					<p class="from-group">
						<span class="form-title left">平台权限</span>
					</p>
				</div>
				<div class="pop-btn right pointer" @click="onClick_cancelBtn">取消</div>
				<div class="btn-submit pop-btn right pointer" @click="onClick_confirmBtn">提交</div>
			</div>

		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import InputBar from "../inputBar.vue"
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				roleData: {}
			}
		},
		components: {
			ViewPopup,
			InputBar
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			currId: {}
		},
		watch: {
			currId($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				if (!this.currId)
				{
					this.roleData = g.data.searchRolePool.getDataById(this.currId);
				}
			},
			onClose_pop()
			{
				this.$emit('close', false);
			},
			onClick_cancelBtn()
			{
				this.$emit('close', false);
			},
			onClick_confirmBtn()
			{
				this.$emit('close', true);
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.add-role-container {
		color: #333333;
		.mod-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			margin: 0 10px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.mod-company-content {
			padding: 20px 10px 40px;
			line-height: 36px;
			font-size: 14px;
			height: 560px;

		}
	}

</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>
