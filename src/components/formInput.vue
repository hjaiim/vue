<template>
	<div class="form-input ">
		<div class="relative">
			<input @blur="onBlur_accountInput" :type="type" @focus="onFocus_inputFocus" class="g-input"
				   :placeholder="placeholder" @input="onInput_value" @keyup.enter="onKeyupEnter_searchInput"
				   v-model="inputContent" :maxLength="maxLength" :readonly="readonly" autocomplete="off">
			<i v-show="inputContent.length>0 && isShowClearBtn"
			   class="close-search-btn ani-time pointer absolute" @click="onClick_closeBtn"></i>
			<p class="error-msg absolute">{{errmsg}}</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		props: {
			value: {
				type: [String, Number]
			},
			type: {
				type: String,
				default: "text"
			},
			errmsg: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			},
			maxLength: {
				type: Number
			},
			isShowClearBtn: {
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				g: g,
				isFocustips: false,
				inputContent: this.value
			}
		},
		watch: {
			value($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				this.inputContent = this.value;
			},
			onBlur_accountInput(e)
			{
				this.$emit("blur", e);
			},
			onFocus_inputFocus(e)
			{
				this.$emit("focus", e);
			},
			onKeyupEnter_searchInput(e)
			{
				this.$emit('keyenter', e);
			},
			onInput_value(e)
			{
				this.$emit('input', this.inputContent);
			},
			onClick_closeBtn()
			{
				this.inputContent = "";
				this.$emit('input', this.inputContent);
			}
		}
	}
</script>
<style type="text/scss" lang="sass" rel="stylesheet/scss">
	.form-input {
		margin: 0 auto 34px;
		width: 320px;
		img {
			left: 0;
			top: 0;
		}
		.error-msg {
			height: 34px;
			line-height: 34px;
			font-size: 14px;
			color: #ed5564;
			width: 100%;
			left: 0;
			top: 100%;
		}
		.g-input {
			display: block;
			height: 42px;
			line-height: 28px;
			padding: 6px 40px 6px 23px;
			width: 320px;
			font-size: 14px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			border: 1px solid #dbdee7;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
			font-size: 14px;
			caret-color: #999999;
			background: #f3f3f3;
			color: #333333;
			&:focus {
				border: 1px solid #cccccc;
			}
		}
		.close-search-btn {
			width: 18px;
			height: 18px;
			right: 16px;
			top: 10px;
			background: transparent;
			border: 2px solid #ed5564;
			-moz-border-radius: 50%;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			display: inline-block;
			-moz-transition: ease-in-out 100ms;
			-o-transition: ease-in-out 100ms;
			-webkit-transition: ease-in-out 100ms;
			transition: ease-in-out 100ms;
			&:before {
				left: 50%;
				top: 50%;
				margin-left: -7px;
				margin-top: -1px;
				width: 14px;
				height: 2px;
				background-color: #ed5564;
				content: "";
				position: absolute;
				-moz-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}
			&:after {
				width: 14px;
				height: 2px;
				background-color: #e91e63;
				content: "";
				left: 50%;
				top: 50%;
				margin-left: -7px;
				margin-top: -1px;
				position: absolute;
				-moz-transform: rotate(-45deg);
				-ms-transform: rotate(-45deg);
				-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
			}
			&:hover {
				-moz-transform: scale(0.9);
				-ms-transform: scale(0.9);
				-webkit-transform: scale(0.9);
				transform: scale(0.9);
			}
			&:active {
				-moz-transition: ease-in-out 200ms;
				-o-transition: ease-in-out 200ms;
				-webkit-transition: ease-in-out 200ms;
				transition: ease-in-out 200ms;
				-moz-transform: scale(1.6);
				-ms-transform: scale(1.6);
				-webkit-transform: scale(1.6);
				transform: scale(1.6);
				filter:alpha(opacity=0);
				opacity:0;
			}
		}
	}

	.sj-psd {
		margin: 0 auto;
	}

	.resetPwd-wrap {
		.form-input {
			margin: 0 auto 25px;
			.error-msg {
				height: 25px;
				line-height: 25px;
			}
		}
		.send-code {
			.close-search-btn {
				right: 136px;
			}
			.g-input {
				padding: 6px 165px 6px 23px;
			}

		}
	}

	.register-wrap {
		.form-input {
			margin: 0 auto 25px;
			.error-msg {
				height: 25px;
				line-height: 25px;
			}
		}
	}
</style>