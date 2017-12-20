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
			<span class="personal-title left">客户类别</span>
			<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
					   v-model="formData.cusType"
					   :errmsg="errData.cusType"
					   @focus="onFocus_inputBar('cusType')"></input-bar>
			<span class="explain">直客/代理类客户</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">业务用途及场景</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
					   v-model="formData.businessDesc"
					   :errmsg="errData.businessDesc"
					   @focus="onFocus_inputBar('businessDesc')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">产品类型</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.prodType"
					   :errmsg="errData.prodType"
					   @focus="onFocus_inputBar('prodType')"></input-bar>
			<span class="explain">三要素验证/用户在网状态校验/用户在网时长/其他</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">使用数据类别</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.dataType"
					   :errmsg="errData.dataType"
					   @focus="onFocus_inputBar('dataType')"></input-bar>
			<span class="explain">单网还是三网，单网是哪个网别，三网各多少额度</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">预计业务规模</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.businessScale"
					   :errmsg="errData.businessScale"
					   @focus="onFocus_inputBar('businessScale')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">报价</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.budget"
					   :errmsg="errData.budget"
					   @focus="onFocus_inputBar('budget')"></input-bar>
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
		components:{
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
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>