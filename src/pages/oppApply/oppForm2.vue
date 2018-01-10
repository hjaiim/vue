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
				<span class="personal-title left">客户类别</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder="" type="text"
						   v-model="formData.cusType"
						   :errmsg="errData.cusType"
						   @focus="onFocus_inputBar('cusType')"></input-bar>
				<span class="explain lang-explain">直客/平台类客户</span>
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
				<span class="personal-title left">对接方式</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder=""
						   type="text" v-model="formData.accessMethod"
						   :errmsg="errData.accessMethod"
						   @focus="onFocus_inputBar('accessMethod')"></input-bar>
				<span class="explain lang-explain">接口发起还是Web发起（零售方式）</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">使用流量类型</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.flowType"
						   :errmsg="errData.flowType"
						   @focus="onFocus_inputBar('flowType')"></input-bar>
				<span class="explain lang-explain">单网还是三网，单网是哪个网别，三网各多少额度</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">预计入账收入</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.income"
						   :errmsg="errData.income"
						   @focus="onFocus_inputBar('income')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">折扣说明</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.discount"
						   :errmsg="errData.discount"
						   @focus="onFocus_inputBar('discount')"></input-bar>
			</div>
			<div class="personal-form">
				<span class="personal-title left">其他说明</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.remark"
						   :errmsg="errData.remark"
						   @focus="onFocus_inputBar('remark')"></input-bar>
				<span class="explain lang-explain">是否需要配置流量营销活动，如大转盘等</span>
			</div>
		</div>

		<div>
			<div class="personal-form">
				<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
       			<iframe class="iframe-wrap absolute pointer" name="fileUpload" v-if="hasIframe"
						:class="isUpload?'disabled':''" :disabled="isUpload"
						:src="g.path.base+'/upload.html?type=file&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"></iframe>
                </span>
				<span class="err-msg">{{errData.attach}}</span>
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
	var _type = 2, _isValid = true, _formData = {}, _attach = {},_hash = {};
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				errData: {},
				formData: {},
				attachList: [],
				hasIframe: true,
				isUpload: false
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
		watch: {
			currId()
			{
				this.init();
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
				_hash = {};
				this.isUpload = false;
				window.uploadComplete = this.uploadComplete;
				window.sendMsg = this.sendMsg;
			},
			initForm()
			{
				this.formData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					cusType: "",
					businessDesc: "",
					accessMethod: "",
					flowType: "",
					income: "",
					discount: "",
					remark: ""
				};
				this.errData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					cusType: "",
					businessDesc: "",
					accessMethod: "",
					flowType: "",
					income: "",
					discount: "",
					remark: "",
					attach: ""
				};
			},
			sendMsg($type, $info)
			{
				if ($type == "error")
				{
					this.errData.attach = $info.msg;
					this.$forceUpdate();
				}
				else
				{
					g.ui.showLoading();
					this.isUpload = true;
					this.errData.attach = "";
					this.$forceUpdate();
					_attach.name = $info.name;
				}
			},
			uploadComplete($data)
			{
				g.ui.hideLoading();
				this.isUpload = false;
				this.hasIframe = false;
				var attach = {
					size: $data.size,
					fileName: $data.fileName,
					name: _attach.name
				};
				_attach.name = "";

				if (this.attachList.length >= 10)
				{
					this.errData.attach = "您已到达附件上传上限，无法继续上传";
					return;
				}
				else if (!_hash[attach.name])
				{
					_hash[attach.name] = attach;
					this.attachList.push(attach);
				}
				else
				{
					this.errData.attach = "该文件已上传，请勿重复上传";
				}
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
					this.errData.attach = "";
					this.hasIframe = true;
				})
			},
			checkValid()
			{
				var titles = g.data.staticTypePool.getDataById(_type).titles;
				for (var item of titles)
				{
					for (var key in item)
					{
						if (typeof this.formData[item[key]] == "string" && !trim(this.formData[item[key]]) && item[key] != "remark")
						{
							this.errData[item[key]] = "内容不能为空";
							_isValid = false;
						}
						if (item[key] == "cusPhone"
								&& !g.param.phoneReg.test(this.formData[item[key]])
								&& !g.param.telphoneReg.test(this.formData[item[key]]))
						{
							this.errData[item[key]] = "联系电话格式有误";
							_isValid = false;
						}
						if (item[key] == "cusCompName" && this.formData[item[key]].length > 30)
						{
							this.errData[item[key]] = "公司名称过长";
							_isValid = false;
						}
					}
				}
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
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 24px;
	}

	@import "../../css/oppApply.scss";
</style>