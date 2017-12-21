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
			<span class="personal-title left">客户类别</span>
			<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
					   v-model="formData.cusType"
					   :errmsg="errData.cusType"
					   @focus="onFocus_inputBar('cusType')"></input-bar>
			<span class="explain">直客/平台类客户</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">业务用途及场景</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
					   v-model="formData.businessDesc"
					   :errmsg="errData.businessDesc"
					   @focus="onFocus_inputBar('businessDesc')"></input-bar>
		</div>

		<div class="personal-form">
			<span class="personal-title left">对接方式</span>
			<input-bar class="personal-content pensonal-input left" placeholder=""
					   type="text" v-model="formData.accessMethod"
					   :errmsg="errData.accessMethod"
					   @focus="onFocus_inputBar('accessMethod')"></input-bar>
			<span class="explain">接口发起还是Web发起（零售方式）</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">使用流量类型</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.flowType"
					   :errmsg="errData.flowType"
					   @focus="onFocus_inputBar('flowType')"></input-bar>
			<span class="explain">单网还是三网，单网是哪个网别，三网各多少额度</span>
		</div>
		<div class="personal-form">
			<span class="personal-title left">预计入账收入</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.income"
					   :errmsg="errData.income"
					   @focus="onFocus_inputBar('income')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">折扣说明</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.discount"
					   :errmsg="errData.discount"
					   @focus="onFocus_inputBar('discount')"></input-bar>
		</div>
		<div class="personal-form">
			<span class="personal-title left">其他说明</span>
			<input-bar class="personal-content pensonal-input left large-input" placeholder=""
					   type="text" v-model="formData.remark"
					   :errmsg="errData.remark"
					   @focus="onFocus_inputBar('remark')"></input-bar>
			<span class="explain">是否需要配置流量营销活动，如大转盘等</span>
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
			onClick_uploadBtn($type)
			{

			},
			onClick_delBtn($type)
			{

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
				_params = {
					businessId: this.type,
					custComName: this.formData.cusCompName,
					boFormData: JSON.stringify(_formData)
				};
				g.net.call("/bo/orderApply", _params).then(($data) =>
				{
					g.ui.toast("商机提交成功");
					this.routerUpdated();
				})
			},
			checkValid()
			{
				var titles = g.data.staticTypePool.getDataById(this.type).titles;
				for (var item of titles)
				{
					for (var key in item)
					{
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
				var titles = g.data.staticTypePool.getDataById(this.type).titles;
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