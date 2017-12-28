<template>

	<div>
		<div>
			<div class="personal-form">
				<span class="personal-title left">客户公司名称</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder="" type="text"
						   v-model="formData.cusCompName"
						   :errmsg="errData.cusCompName"
						   @focus="onFocus_inputBar('cusCompName')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">客户联系人</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder="" type="text"
						   v-model="formData.customer"
						   :errmsg="errData.customer"
						   @focus="onFocus_inputBar('customer')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">客户联系方式</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder="" type="text"
						   v-model="formData.cusPhone"
						   :errmsg="errData.cusPhone"
						   @focus="onFocus_inputBar('cusPhone')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">客户公司地址</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text"
						   v-model="formData.cusCompAdd"
						   :errmsg="errData.cusCompAdd"
						   @focus="onFocus_inputBar('cusCompAdd')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">客户公司介绍</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text"
						   v-model="formData.cusCompIntro"
						   :errmsg="errData.cusCompIntro"
						   @focus="onFocus_inputBar('cusCompIntro')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">业务用途及场景</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text"
						   v-model="formData.businessDesc"
						   :errmsg="errData.businessDesc"
						   @focus="onFocus_inputBar('businessDesc')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">预计开通数量</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder=""
						   type="text" v-model="formData.accessNum"
						   :errmsg="errData.accessNum"
						   @focus="onFocus_inputBar('accessNum')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">报价</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder=""
						   type="text" v-model="formData.budget"
						   :errmsg="errData.budget"
						   @focus="onFocus_inputBar('budget')"></input-bar>
				<span class="explain lang-explain">标准价：60元/户/年</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">付款方式</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder=""
						   type="text" v-model="formData.payway"
						   :errmsg="errData.payway"
						   @focus="onFocus_inputBar('payway')"></input-bar>
				<span class="explain lang-explain">预付费/后付费</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">其他说明</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.remark"
						   :errmsg="errData.remark"
						   @focus="onFocus_inputBar('remark')"></input-bar>
			</div>

		</div>
		<div>
			<div class="personal-form">
				<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
               	<iframe class="iframe-wrap" name="fileUpload" v-if="hasIframe"
						:src="g.path.base+'/upload.html?type=file&redirectUrl='+g.path.base+'uploadApi.html?subType=oppApply'"></iframe>
                </span>
				<span class="complate-upload-file"
					  v-for="(attach,index) in attachList">{{attach.name}}/{{attach.size}}kB;
					<i class="del-file pointer"
					   @click="onClick_delBtn(attach.name,index)">删除</i></span>
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
				formData: {},
				hasIframe: true,
				attachList: []
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
					var formData = g.data.searchBusinessPool.getDataById(this.currId).formData;
					var hash = g.data.staticTypePool.getDataById(_type).hash;
					for (var key in formData)
					{
						this.formData[hash[key]] = formData[key];
						if (key == "客户联系方式")
						{
							this.formData[hash[key]] = formData[key].split("*")[0];
						}
					}
					this.attachList = g.data.searchBusinessPool.getDataById(this.currId).attachList;
					this.$forceUpdate();
				}
				else
				{
					this.initForm();
				}
				window.uploadComplete = this.uploadComplete;
			},
			initForm()
			{
				this.formData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					businessDesc: "",
					accessNum: "",
					budget: "",
					payway: "",
					remark: ""
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
			},
			uploadComplete($data)
			{
				this.hasIframe = false;
				var attach = {size: $data.size, name: $data.fileName};
				this.attachList.push(attach);
				setTimeout(()=>
				{
					this.hasIframe = true;
				}, 200)
			},
			onFocus_inputBar($type)
			{
				this.errData[$type] = "";
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
				var data = {
					formData: _formData,
					attachList: this.attachList
				};
				this.$emit("submit", data);
			},
			onClick_delBtn($name, $index)
			{
				g.net.call(g.param.delPicAccess, {fileName: $name}).then(($data) =>
				{
				}, (err) =>
				{
					this.attachList.splice($index, 1);
				})
			},
			checkValid()
			{
				var titles = g.data.staticTypePool.getDataById(_type).titles;
				for (var item of titles)
				{
					for (var key in item)
					{
						if (!this.formData[item[key]] && item[key] != "remark")
						{
							this.errData[item[key]] = "请填写" + key;
							_isValid = false;
						}
						if (item[key] == "cusPhone"
								&& !g.param.phoneReg.test(this.formData[item[key]])
								&& !g.param.telphoneReg.test(this.formData[item[key]]))
						{
							this.errData[item[key]] = "联系电话格式有误";
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
				return _formData;
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