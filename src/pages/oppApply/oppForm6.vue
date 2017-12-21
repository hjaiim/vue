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
				<span class="explain lang-explain">务必描述清楚，使用CTD业务用来做什么，说明是办公电话/客户服务/快递物流还是其他业务场景</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">接入方式</span>
                 <span class="action-box status-type left" @click="onClick_accessType('API')">
                        <i class="pointer" :class="formData.accessType == 'API'?'action':''"></i>
                        <span>API</span>
                 </span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">呼叫范围</span>
				<input-bar class="personal-content pensonal-input left large-input" placeholder=""
						   type="text" v-model="formData.callRange"
						   :errmsg="errData.callRange"
						   @focus="onFocus_inputBar('callRange')"></input-bar>
				<span class="explain lang-explain">请填写被叫权限（例：全国三网手机和固话，开通本地、长途，不开通国际权限）</span>
			</div>


			<div class="personal-form">
				<span class="personal-title left">是否回呼</span>
                 <span class="action-box status-type left" @click="onClick_checkCallBack('是')">
                        <i class="pointer" :class="formData.callBack=='是'?'action':''"></i>
                        <span>是</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_checkCallBack('否')">
                    <i class="pointer" :class="formData.callBack=='否'?'action':''"></i>
                    <span>否</span>
                </span>
				<span class="explain">是否回呼</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">是否转接</span>
                 <span class="action-box status-type left" @click="onClick_checkTransfer('是')">
                        <i class="pointer" :class="formData.transfer=='是'?'action':''"></i>
                        <span>是</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_checkTransfer('否')">
                    <i class="pointer" :class="formData.transfer=='否'?'action':''"></i>
                    <span>否</span>
                </span>
				<span class="explain">是否转接</span>
			</div>

			<div class="personal-form">
				<span class="personal-title left">测试号码需求</span>
				<input-bar class="personal-content pensonal-input left large-input" placeholder=""
						   type="text" v-model="formData.testNum"
						   :errmsg="errData.testNum"
						   @focus="onFocus_inputBar('testNum')"></input-bar>
				<span class="explain">**地市**个号码</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">预计业务规模</span>
				<input-bar class="personal-content pensonal-input left large-input" placeholder=""
						   type="text" v-model="formData.businessScale"
						   :errmsg="errData.businessScale"
						   @focus="onFocus_inputBar('businessScale')"></input-bar>
				<span class="explain">**万分钟/月</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">报价</span>
				<input-bar class="personal-content pensonal-input left large-input" placeholder=""
						   type="text" v-model="formData.budget"
						   :errmsg="errData.budget"
						   @focus="onFocus_inputBar('budget')"></input-bar>
				<span class="explain">例：本地**元/分钟，异地**元/分钟</span>
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
	var _type = 6, _isValid = true, _formData = {};
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
						cusCompName: "CTD小号业务",
						customer: "CTD小号业务",
						cusPhone: "CTD小号业务",
						cusCompAdd: "CTD小号业务",
						cusCompIntro: "CTD小号业务",
						cusType: "CTD小号业务",
						businessDesc: "CTD小号业务",
						accessType: "API",
						callRange: "CTD小号业务",
						callBack: "是",
						transfer: "是",
						testNum: "CTD小号业务",
						businessScale: "CTD小号业务",
						budget: "CTD小号业务",
						remark: "CTD小号业务"
					};
					this.errData = {
						cusCompName: "",
						customer: "",
						cusPhone: "",
						cusCompAdd: "",
						cusCompIntro: "",
						cusType: "",
						businessDesc: "",
						accessType: "",
						callRange: "",
						callBack: "",
						transfer: "",
						testNum: "",
						businessScale: "",
						budget: "",
						remark: ""
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
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 44px;
	}

	@import "../../css/oppApply.scss";
</style>