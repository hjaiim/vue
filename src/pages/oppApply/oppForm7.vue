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
				<span class="personal-title left">申请的95业务类别</span>
                 <span class="action-box status-type left" @click="onClick_prodType('客户自带95码号落地')">
                        <i class="draw-round pointer" :class="formData.prodType=='客户自带95码号落地'?'action':''"></i>
                        <span>客户自带95码号落地</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_prodType('客户自带95码号落地')">
                    <i class="draw-round pointer" :class="formData.prodType=='客户自带95码号落地'?'action':''"></i>
                    <span>使用联通已有的95号</span>
                </span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text"
						   v-model="formData.prodType"
						   :errmsg="errData.prodType"
						   @focus="onFocus_inputBar('telNum')"></input-bar>
				<span class="explain lang-explain">需要落地的具体号码</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">业务用途及场景</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text"
						   v-model="formData.businessDesc"
						   :errmsg="errData.businessDesc"
						   @focus="onFocus_inputBar('businessDesc')"></input-bar>
				<span class="explain lang-explain">务必描述清楚，使用95业务用来做什么，说明是办公电话/客户服务/快递物流还是其他业务场景</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">接入方式</span>
                 <span class="action-box status-type left" @click="onClick_accessType('API')">
                        <i class="draw-round pointer" :class="formData.accessType == 'API'?'action':''"></i>
                        <span>API</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_accessType('SIP')">
                    <i class="draw-round pointer" :class="formData.accessType == 'SIP'?'action':''"></i>
                    <span>SIP</span>
                </span>
				<span class="explain">API/SIP（请选择一种）</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">呼叫范围</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.callRange"
						   :errmsg="errData.callRange"
						   @focus="onFocus_inputBar('callRange')"></input-bar>
				<span class="explain lang-explain">请填写被叫权限（例：全国三网手机和固话，开通本地、长途，不开通国际权限）</span>
			</div>


			<div class="personal-form">
				<span class="personal-title left">呼入呼出</span>
                 <span class="action-box status-type left" @click="onClick_checkCallInOut('呼入')">
                        <i class="draw-round pointer" :class="formData.callInList.indexOf('呼入')>=0?'action':''"></i>
                        <span>是</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_checkCallInOut('呼出')">
                    <i class="draw-round pointer"
					   :class="formData.callInList.indexOf('呼出')>=0?'action':''?'action':''"></i>
                    <span>否</span>
                </span>
				<span class="explain">呼入呼出</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">预计业务规模</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.businessScale"
						   :errmsg="errData.businessScale"
						   @focus="onFocus_inputBar('businessScale')"></input-bar>
				<span class="explain lang-explain">**万分钟/月</span>
			</div>
			<div class="personal-form">
				<span class="personal-title left">报价</span>
				<input-bar class="personal-content pensonal-input left large-input apply-input" placeholder=""
						   type="text" v-model="formData.budget"
						   :errmsg="errData.budget"
						   @focus="onFocus_inputBar('budget')"></input-bar>
				<span class="explain lang-explain">例：本地**元/分钟，异地**元/分钟</span>
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
						:src="g.path.base+'upload.html?type=file&redirectUrl='+g.path.base+'uploadApi.html?subType=oppApply'"></iframe>
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
	var _type = 7, _isValid = true, _formData = {};
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				errData: {},
				formData: {},
				hasIframe: true
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
						cusCompName: "95业务",
						customer: "95业务",
						cusPhone: "95业务",
						cusCompAdd: "95业务",
						cusCompIntro: "95业务",
						prodType: "95业务",
						telNum: "95业务",
						businessDesc: "95业务",
						accessType: "API",
						callRange: "95业务",
						callInList: ["呼入"],
						businessScale: "95业务",
						budget: "95业务",
						remark: "95业务"
					};
					this.errData = {
						cusCompName: "",
						customer: "",
						cusPhone: "",
						cusCompAdd: "",
						cusCompIntro: "",
						prodType: "",
						telNum: "",
						businessDesc: "",
						accessType: "",
						callRange: "",
						callInList: "",
						businessScale: "",
						budget: "",
						remark: "",
					};
				}
				window.uploadComplete = this.uploadComplete;
			},
			uploadComplete($data)
			{
				this.hasIframe = false;
				var attach = {
					size: $data.size,
					name: $data.fileName
				};
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
			onClick_accessType($type)
			{
				this.formData.accessType = $type;
				this.$forceUpdate();
			},
			onClick_prodType($type)
			{
				this.formData.prodType = $type;
				this.$forceUpdate();
			},
			onClick_checkCallInOut($type)
			{
				var index = this.formData.callInList.indexOf($type);
				if (index >= 0)
				{
					this.formData.callInList.splice(index, 1)
				}
				else
				{
					this.formData.callInList.push($type);
				}
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