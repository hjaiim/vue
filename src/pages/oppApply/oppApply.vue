<template>
	<com-layout currPath="/oppapply">
		<div class="apply-wrap">
			<div class="personal-form">
				<span class="personal-title left font-weight">业务名称</span>
				<div class="personal-content left relative form-list font-weight pointer"
					 @click.stop="onClick_dropListBtn">
					{{currType}}
					<i :class="['icon-trangle', isShowTypeList?'rotate':'']"></i>
					<drop-list :dropList="typeList" :isShowDropList="isShowTypeList"
							   @change="onChange_typeItem" ref="typeList"></drop-list>
				</div>
			</div>

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
			<!--CTD业务-->
			<div v-if="type==1">
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
                <span class="action-box status-type left" @click="onClick_accessType('SIP')">
                    <i class="pointer" :class="formData.accessType == 'SIP'?'action':''"></i>
                    <span>SIP</span>
                </span>
					<span class="explain">API/SIP（请选择一种）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">呼叫模式</span>
                 <span class="action-box status-type left" @click="onClick_callType('双呼')">
                        <i class="pointer" :class="formData.callType== '双呼'?'action':''"></i>
                        <span>双呼</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_callType('单呼')">
                    <i class="pointer" :class="formData.callType== '单呼'?'action':''"></i>
                    <span>单呼</span>
                </span>
					<span class="explain">双呼/单呼（请选择一种或多种）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">发起方式</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text" v-model="formData.launchMethod"
							   :errmsg="errData.launchMethod"
							   @focus="onFocus_inputBar('launchMethod')"></input-bar>
					<span class="explain lang-explain">APP发起还是台席发起（如果是台席发起，注明台席发起数量）</span>
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
			<!--全流通业务-->
			<div v-if="type==2">
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
			<!--全数通业务-->
			<div v-if="type==3">
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
			<!--续联业务-->
			<div v-if="type==4">
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
					<span class="explain">续联使用费和CTD分开报价（续联使用费：5元/次；CTD指导报价：本地0.1元/分钟，异地0.15元/分钟）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text" v-model="formData.remark"
							   :errmsg="errData.remark"
							   @focus="onFocus_inputBar('remark')"></input-bar>
				</div>
			</div>
			<!--声音名片业务-->
			<div v-if="type==5">

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
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import OppForm1 from "./oppForm1.vue";
	import OppForm2 from "./oppForm2.vue";
	import OppForm3 from "./oppForm3.vue";
	import OppForm4 from "./oppForm4.vue";
	import OppForm5 from "./oppForm5.vue";
	import OppForm6 from "./oppForm6.vue";
	import OppForm7 from "./oppForm7.vue";
	var _params = null, _formData = {}, _isValid = true;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				typeList: [],
				type: 1,
				errData: {},
				isShowTypeList: false,
				formData: {}
			}
		},
		components: {
			ComLayout,
			DropList,
			InputBar,
			OppForm1,
			OppForm2,
			OppForm3,
			OppForm4,
			OppForm5,
			OppForm6,
			OppForm7
		},
		computed: {
			currType()
			{
				return g.data.staticTypePool.getDataById(this.type) &&
						g.data.staticTypePool.getDataById(this.type).name;
			}
		},
		methods: {
			routerUpdated()
			{
				this.formData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					cusType: "",
					businessDesc: "",
					launchMethod: "",
					callRange: "",
					testNum: "",
					budget: "",
					remark: "",
					accessNum: "",
					payway: "",
					flowType: "",
					income: "",
					discount: "",
					accessType: "API",
					accessMethod: "",
					callType: "双呼",
					callBack: "是",
					transfer: "是",
					businessScale: "",
					prodType: "",
					dataType: "",
					transactionType: "",
					callInOut: ""
				};
				this.errData = {
					cusCompName: "",
					customer: "",
					cusPhone: "",
					cusCompAdd: "",
					cusCompIntro: "",
					cusType: "",
					businessDesc: "",
					launchMethod: "",
					callRange: "",
					testNum: "",
					budget: "",
					accessNum: "",
					payway: "",
					flowType: "",
					income: "",
					discount: "",
					accessType: "",
					accessMethod: "",
					callType: "",
					callBack: "",
					transfer: "",
					businessScale: "",
					prodType: "",
					dataType: "",
					transactionType: "",
					callInOut: ""
				};
				this.typeList = g.data.staticTypePool.list;
				this.type = g.vue.getQuery('type', 1);
				this.initEvents()
			},
			onFocus_inputBar($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			initEvents()
			{
				document.addEventListener('click', this.onClick_doc)
			},
			onClick_doc(e)
			{
				if (this.$refs.typeList && !this.$refs.typeList.$el.contains(e.target))
				{
					this.isShowTypeList = false;
				}
			},
			onClick_dropListBtn()
			{
				if (this.isShowTypeList)
				{
					this.isShowTypeList = false;
				}
				else
				{
					this.isShowTypeList = true;
				}
			},
			onChange_typeItem($id)
			{
				if (this.type != $id)
				{
					this.type = $id;
					this.updateUrl();
					this.isShowTypeList = false;
				}
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
			updateUrl()
			{
				g.url = {
					path: "/oppapply",
					query: {
						type: this.type
					}
				}
			}
		},
		beforeDestroy()
		{
			document.removeEventListener('click', this.onClick_doc);
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 44px;
	}

	@import "../../css/oppApply.scss";
</style>