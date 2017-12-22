<template>
	<div class="search-input relative">
		<input @blur="onBlur_accountInput" :type="type" @focus="onFocus_inputFocus" class="input-con"
			   :placeholder="placeholder" @input="onInput_value" @keyup.enter="onKeyupEnter_searchInput"
			   v-model="inputContent" :maxLength="maxLength" :readonly="readonly" autocomplete="off"
			   :class="readonly?'only-read':''">
		<i v-show="inputContent.length>0 && isShowClearBtn && !readonly"
		   class="close-search-btn ani-time pointer absolute"
		   @click="onClick_closeBtn"></i>
		<p class="error-msg absolute">{{errmsg}}</p>
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
				type: String,
				default: ""
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
			},
			readonly: {
				type: Boolean,
				default: false
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
				this.inputContent = this.value || "";
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
	.search-input {
		width: 100%;
		height: 100%;
		display: inline-block;
		.error-msg {
			height: 25px;
			line-height: 25px;
			font-size: 14px;
			color: #ed5564;
			width: 100%;
			left: 0;
			top: 100%;
		}
		.input-con {
			width: 100%;
			height: 100%;
			display: block;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 6px 20px 6px 6px;
			border: 1px solid #dedede;
			-webkit-border-radius: 4px;
			-moz-border-radius: 4px;
			border-radius: 4px;
			box-shadow: 0 0 2px #f5f5f5 inset;
			box-sizing: border-box;
			font-size: 14px;
			&:focus {
				border: 1px solid #cccccc;
			}
		}
		.only-read {
			border: 1px solid transparent;
			box-shadow: none;
			&:focus {
				border: 1px solid transparent;
			}

		}
		.close-search-btn {
			width: 12px;
			height: 12px;
			right: 5px;
			top: 50%;
			padding: 4px;
			margin-top: -10px;
			background: transparent;
			-moz-border-radius: 50%;
			-webkit-border-radius: 50%;
			border-radius: 50%;
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
				background-color: #9d9d9d;
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
				background-color: #9d9d9d;
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
				opacity: 0;
			}
		}
	}

</style>