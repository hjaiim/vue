<template>
	<transition name="sideInTop">
		<div class="map-view md-overlay ani-time" v-if="isShowPopView">
			<div class="md-modal md-effect-16 pop-content" ref="popCon">
				<div class="md-content">
					<div @click="onClick_closeBtn"
						 class="return-btn pointer ani-time">
						<img :src="g.path.images+'/close-popup.png'" alt="">
					</div>
					<div class="popup-content">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import g from "../global"
	export default{
		created()
		{

			this.init();

		},
		data(){
			return {
				g: g
			}
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			topTitle: {
				type: String
			}
		},
		watch: {
			isShowPopView($val)
			{
				this.init();
			}
		},
		components: {},
		methods: {
			init()
			{
				this.initEvent();
				this.$nextTick(()=>
				{
					this.initHeight();
				})
			},
			initHeight(){
				var popCon = this.$refs['popCon'];
				if (popCon)
				{
					popCon.style.height = (popCon.clientHeight - popCon.clientHeight % 2) + 'px';
				}
			},
			initEvent(e)
			{
				document.addEventListener('keydown', this.onKeyDown_doc)
			},
			onKeyDown_doc(e)
			{
				if (e.keyCode === 27)
				{
					this.$emit('close');
				}
			},
			onClick_closeBtn(e){
				this.$emit('close');
			}
		},
		beforeDestroy()
		{
			document.removeEventListener('keydown', this.onKeyDown_doc);
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	.map-view {
		&.md-overlay {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			width: 100%;
			min-height: 100%;
			z-index: 99;
			background: rgba(0, 0, 0, .2) none repeat 0 0 !important;
			background-size: 1920px 1080px;
			background-attachment: fixed;
			cursor: default;
		}
		.md-modal {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 99;
			-webkit-transform: translate(-50%, -50%);
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			-webkit-transform-origin: 50% 50%;
			-moz-transform-origin: 50% 50%;
			-ms-transform-origin: 50% 50%;
			-o-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}
		.md-content {
			color: #333333;
			position: relative;
			margin: 0 auto;
			width: 720px;
			border: 1px solid #e8e8e8;
			background: #ffffff;

			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
		}
	}

	.note-tit {
		line-height: 64px;
		height: 64px;
		padding-left: 25px;
		font-size: 15px;
		border-bottom: 1px solid #eaeaea;
	}

	.return-btn {
		position: absolute;
		right: 15px;
		top: 8px;
		padding: 10px;
		background: transparent;
		&:hover {
			-webkit-transform: translate(0, 5px);
			-moz-transform: translate(0, 5px);
			-ms-transform: translate(0, 5px);
			-o-transform: translate(0, 5px);
			transform: translate(0, 5px);
		}
	}

	.account-content .md-modal {
		position: absolute;
	}

	.account-content.md-overlay {
		position: absolute;
	}

	.diff-content-pop .md-modal {
		position: absolute;
	}

	.diff-content-pop.md-overlay {
		/*position: absolute;*/
	}

	.right-viewPop {
		.return-btn {
			display: none;
		}
	}

</style>
