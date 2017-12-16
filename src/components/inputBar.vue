<template>
	<div class="search-input relative">
		<input @blur="onBlur_accountInput" :type="type" @focus="onFocus_inputFocus" class="input-con"
			   :placeholder="placeholder" @input="onInput_value" @keyup.enter="onKeyupEnter_searchInput"
			   v-model="inputContent" :maxLength="maxLength" :readonly="readonly" autocomplete="off">
		<i v-show="inputContent.length>0 && isShowClearBtn" class="close-search-btn ani-time pointer absolute" alt=""
			  @click="onClick_closeBtn"></i>
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
				default:""
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
	.search-input {
		width: 100%;
		height: 100%;
		display: inline-block;
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

	}
</style>