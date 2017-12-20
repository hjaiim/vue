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
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
			}
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