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
			<div class="personal-form relative">
				<span class="personal-title left">预估金额</span>
				<input-bar class="personal-content pensonal-input left apply-input" placeholder=""
						   type="text" v-model="formData.budget"
						   :errmsg="errData.budget"
						   @focus="onFocus_inputBar('budget')"></input-bar>
				<span class="money-cash  absolute">万元</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">商机描述</span>
				<!--<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""-->
						   <!--type="textarea" v-model="formData.remark"-->
						   <!--:errmsg="errData.remark"-->
						   <!--@focus="onFocus_inputBar('remark')"></input-bar>-->

				<textarea class="" cols="100" rows="30" v-model="formData.remark" class="text-area left" @focus="onFocus_inputBar('remark')"></textarea>
				<span class="error-message">{{errData.remark}}</span>
			</div>
		</div>
		<div>
			<div class="personal-form">
				<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn relative">点击上传

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
	var _formData = {}, _isValid = true, _type = 8, _attach = {}, _hash = {};
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
			currId($val)
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
						if (key == "预估金额")
						{
							this.formData[hash[key]] = formData[key].split("万元")[0];
						}
					}
					this.attachList = g.data.searchBusinessPool.getDataById(this.currId).attachList;
					this.$forceUpdate();
				}
				else
				{
					this.initForm();
				}
				this.isUpload = false;
				_hash = {};
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
					budget: "",
					remark: ""
				};
				this.initError();
			},
			initError(){
				this.errData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					budget: "",
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
					_hash[$name] = "";
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
						if (typeof this.formData[item[key]] == "string"&& !trim(this.formData[item[key]]) )
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
						if (key == "预估金额")
						{
							_formData[key] = this.formData[item[key]] + "万元";
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
<style type="text/scss" lang="sass" rel="stylesheet/scss" scoped>

	@import "../../css/oppApply.scss";

	.apply-wrap {
		padding: 20px 44px 50px 24px;
	}
	.money-cash{
		line-height: 38px;
		margin-left: 10px;
		left: 325px;
		}
	.text-area{
		width: 58%;
		height: 200px;
		outline: none;
		resize: none;
		padding: 10px 6px;
		border: 1px solid #dedede;
		box-sizing: border-box;
		border-radius: 4px;
		}
	.error-message{
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		color: #ed5564;
		margin-left: 10px;
		}
</style>