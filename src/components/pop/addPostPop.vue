<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="detail-container">
			<p class="note-tit">{{currId >0 ?'编辑岗位':'新增岗位'}}</p>
			<div class="note-content">
				<div class="company-message no-border add-post">
					<p class="from-group">
						<span class="form-title">名称</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="positionName"></input-bar>
					</p>
					<p class="from-group">
						<span class="form-title">类型</span>
                        <span class="action-box post-type pointer" v-show="currId ==  0"
							  @click="onClick_selectPosition(1)">
                            <i class="pointer draw-round" :class="type== 1?'action':''"></i>
                            <span>商机提交岗</span>
                        </span>
                        <span class="action-box post-type pointer" v-show="currId ==  0"
							  @click="onClick_selectPosition(2)">
                            <i class="pointer draw-round" :class="type== 2?'action':''"></i>
                            <span>商机审核岗</span>
                        </span>
						<span class="form-trap form-type" v-show="currId !=  0">{{positionData.typeDesc}}</span>
					</p>
				</div>
			</div>
			<div class="btn-wrap clear">
					<span class="action-btn right pop-del-btn cancel-btn ani-time pointer"
						  @click.stop="onClick_cancelBtn">取消</span>
					<span class="action-btn right pop-del-btn delete-btn ani-time pointer"
						  @click.stop="onClick_confirmBtn">确定
					</span>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import InputBar from "../inputBar.vue";
	var _params = null;
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				positionName: "",
				type: 1,
				positionData: {}
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
			currId: {
				default: 0
			}
		},
		watch: {
			isShowPopView()
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				if (this.currId)
				{
					this.positionData = __merge({}, g.data.searchPositionPool.getDataById(this.currId), true);
					this.positionName = this.positionData.name;
					this.type = this.positionData.type;
				}
				else
				{
					this.positionName = "";
					this.type = 1;
				}
			},
			onClick_selectPosition($num)
			{
				this.type = $num;
			},
			onClose_pop()
			{
				this.$emit('close', false);
			},
			onClick_cancelBtn()
			{
				this.onClose_pop();
			},
			onClick_confirmBtn()
			{
				_params = {
					stationId: this.currId,
					stationName: this.positionName,
					stationType: this.type
				};
				g.ui.showLoading()
				g.net.call("organizeOpt/editStation", _params).then(($data) =>
				{
					g.ui.hideLoading();
					this.init();
					if (this.currId != 0)
					{
						g.data.searchPositionPool.getDataById(this.currId).update($data)
					}
					g.ui.toast("岗位编辑成功！");
					this.$emit('close', true);
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.detail-container {
		color: #333333;
		.note-content {
			padding: 35px 72px 10px;
			line-height: 36px;
			font-size: 14px;
		}
	}

	.add-post {
		margin-bottom: 15px;
	}

	.post-type {
		margin-left: 0;
		margin-right: 20px;
	}

</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop";
</style>