<template>

	<div>
		<div class="personal-form">
			<span class="personal-title left">客户公司名称</span>
			<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
					   v-model="formData.cusCompName"
					   :errmsg="errData.cusCompName"
					   @focus="onFocus_inputBar('cusCompName')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">客户联系人</span>
			<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
					   v-model="formData.customer"
					   :errmsg="errData.customer"
					   @focus="onFocus_inputBar('customer')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">客户联系方式</span>
			<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
					   v-model="formData.cusPhone"
					   :errmsg="errData.cusPhone"
					   @focus="onFocus_inputBar('cusPhone')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">客户公司地址</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
					   v-model="formData.cusCompAdd"
					   :errmsg="errData.cusCompAdd"
					   @focus="onFocus_inputBar('cusCompAdd')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">客户公司介绍</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
					   v-model="formData.cusCompIntro"
					   :errmsg="errData.cusCompIntro"
					   @focus="onFocus_inputBar('cusCompIntro')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">业务用途及场景</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
					   v-model="formData.businessDesc"
					   :errmsg="errData.businessDesc"
					   @focus="onFocus_inputBar('businessDesc')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">预计开通数量</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.accessNum"
					   :errmsg="errData.accessNum"
					   @focus="onFocus_inputBar('accessNum')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">报价</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.budget"
					   :errmsg="errData.budget"
					   @focus="onFocus_inputBar('budget')"></input-bar>
			<span class="explain">标准价：60元/户/年</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">付款方式</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.payway"
					   :errmsg="errData.payway"
					   @focus="onFocus_inputBar('payway')"></input-bar>
			<span class="explain">预付费/后付费</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">其他说明</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.remark"
					   :errmsg="errData.remark"
					   @focus="onFocus_inputBar('remark')"></input-bar>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import InputBar from "../../components/inputBar.vue";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				errData: {},
				formData: {}
			}
		},
		components: {
			InputBar
		},
		methods: {
			init()
			{

			},
			update()
			{
			},
			render()
			{
			},
			clear()
			{
			},
			destroy()
			{
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 44px;
	}

	@import "../../css/oppApply.scss";
</style>