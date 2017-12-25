<template>
	<transition name="sideInTop">
		<div class="map-view md-overlay ani-time" v-if="isShowPopView">
			<div class="md-modal md-effect-16 pop-content">
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
		components: {},
		methods: {
			init()
			{
				this.initEvent();
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
			width: 100%;
			height: 100%;
			z-index: 99;
			background: rgba(0, 0, 0, .2) none repeat scroll 0 0 !important;
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
			cursor: default;
		}
		.md-modal {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 2000;
			-webkit-transform: translate3d(-50%, -50%, 0);
			-moz-transform: translate3d(-50%, -50%, 0);
			-ms-transform: translate3d(-50%, -50%, 0);
			transform: translate3d(-50%, -50%, 0);
			-webkit-transform-origin: 50% 50%;
			-moz-transform-origin: 50% 50%;
			-ms-transform-origin: 50% 50%;
			-o-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}

		.md-effect-16::after {
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		}
		.md-content {
			color: #333333;
			position: relative;
			margin: 0 auto;
			width: 720px;
			/*height: 288px;*/
			border: 1px solid #e8e8e8;
			background: #ffffff;
			/*-webkit-box-shadow: 0 0 10px  rgba(0, 0, 0, 0.25);*/
			/*-moz-box-shadow: 0 0 10px  rgba(0, 0, 0, 0.25);*/
			/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);*/
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
			-webkit-transform: translate3d(0, 5px, 0);
			-moz-transform: translate3d(0, 5px, 0);
			-ms-transform: translate3d(0, 5px, 0);
			-o-transform: translate3d(0, 5px, 0);
			transform: translate3d(0, 5px, 0);
		}
	}

	.account-content .md-modal {
		position: absolute;
	}

	.account-content.md-overlay {
		position: absolute;
	}

	.right-viewPop {
		.return-btn {
			display: none;
		}
	}

</style>
