<template>

	<div>
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
		<div>
			<div class="personal-form">
				<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn" @click="onClick_uploadBtn">点击上传
                    <input type="file" class="upload-file">
                </span>
					<span class="complate-upload-file">初步合同
						<i class="del-file pointer" @click="onClick_delBtn">删除</i></span>
			</div>
		</div>
		<div class="btn btn-save pointer action-btn ani-time" @click="onClick_submitBtn">提交</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import InputBar from "../../components/inputBar.vue";
	var _type = 5, _isValid = true, _formData = {};
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
		props: {
			currId: {
				default: 0
			}
		},
		methods: {
			init()
			{
				if (this.currId)
				{
					this.formData = JSON.parse(g.data.searchBusinessPool.getDataById(this.currId).formData);
				}
				else
				{
					this.formData = {
						cusCompName: "声音名片业务",
						customer: "声音名片业务",
						cusPhone: "声音名片业务",
						cusCompAdd: "声音名片业务",
						cusCompIntro: "声音名片业务",
						businessDesc: "声音名片业务",
						accessNum: "声音名片业务",
						budget: "声音名片业务",
						payway: "声音名片业务",
						remark: "声音名片业务"
					};
					this.errData = {
						cusCompName: "",
						customer: "",
						cusPhone: "",
						cusCompAdd: "",
						cusCompIntro: "",
						businessDesc: "",
						accessNum: "",
						budget: "",
						payway: "",
						remark: "",
					};
				}

			},
			onFocus_inputBar($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			onClick_accessType($type)
			{
				this.formData.accessType = $type;
				this.$forceUpdate();
			},
			onClick_callType($type)
			{
				this.formData.callType = $type;
				this.$forceUpdate();
			},
			onClick_checkCallBack($type)
			{
				this.formData.callBack = $type;
				this.$forceUpdate();
			},
			onClick_checkTransfer($type)
			{
				this.formData.transfer = $type;
				this.$forceUpdate();
			},
			onClick_submitBtn()
			{
				this.checkValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				this.getFormData();
				this.$emit("submit", _formData);
			},
			onClick_uploadBtn()
			{

			},
			onClick_delBtn()
			{

			},
			checkValid()
			{
				var titles = g.data.staticTypePool.getDataById(_type).titles;
				for (var item of titles)
				{
					for (var key in item)
					{
						trace("this.formData.cusCompName", this.formData.cusCompName);
						if (!this.formData[item[key]] && item[key] != "remark")
						{
							this.errData[item[key]] = "请填写" + key;
							_isValid = false;
						}
					}
				}
				trace("this.errData", this.errData);
				this.$forceUpdate();
			},
			getFormData()
			{
				var titles = g.data.staticTypePool.getDataById(_type).titles;
				for (var item of titles)
				{
					for (var key in item)
					{
						if (key == "客户联系方式")
						{
							_formData[key] = this.formData[item[key]] + "*tel";
						}
						else
						{
							_formData[key] = this.formData[item[key]];
						}
					}
				}
			},
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>