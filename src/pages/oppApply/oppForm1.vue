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