<template>
	<com-layout currPath="/oppapply">
		<div class="apply-wrap">
			<div class="personal-form">
				<span class="personal-title left font-weight">业务名称</span>
				<div class="personal-content left relative form-list font-weight pointer"
					 @click.stop="onClick_dropListBtn">
					幻舞科技
					<i :class="['icon-trangle', isShowTypeList?'rotate':'']"></i>
					<drop-list :dropList="businessList" :isShowDropList="isShowTypeList"
							   @change="onChange_typeItem" ref="typeList"></drop-list>
				</div>
			</div>
			<!--CTD业务-->
			<div v-if="type==1">
				<div class="personal-form">
					<span class="personal-title left">客户公司名称</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompName"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系人</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customer"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerContact"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司地址</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerComp"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司介绍</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerCompIntro"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户类别</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompType"></input-bar>
					<span class="explain">直客/平台类客户</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">业务用途及场景</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="businessDesc"></input-bar>
					<span class="explain lang-explain">务必描述清楚，使用CTD业务用来做什么，说明是办公电话/客户服务/快递物流还是其他业务场景</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">接入方式</span>
                 <span class="action-box status-type left" @click="onClick_accessType('API')">
                        <i class="pointer action"></i>
                        <span>API</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_accessType('SIP')">
                    <i class="pointer"></i>
                    <span>SIP</span>
                </span>
					<span class="explain">API/SIP（请选择一种）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">呼叫模式</span>
                 <span class="action-box status-type left" @click="onClick_callType('双呼')">
                        <i class="pointer action"></i>
                        <span>双呼</span>
                 </span>
                <span class="action-box status-type left" @click="onClick_callType('单呼')">
                    <i class="pointer"></i>
                    <span>单呼</span>
                </span>
					<span class="explain">双呼/单呼（请选择一种或多种）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">发起方式</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain lang-explain">APP发起还是台席发起（如果是台席发起，注明台席发起数量）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">呼叫范围</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain lang-explain">请填写被叫权限（例：全国三网手机和固话，开通本地、长途，不开通国际权限）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">是否回呼</span>
                 <span class="action-box status-type left">
                        <i class="pointer action"></i>
                        <span>是</span>
                 </span>
                <span class="action-box status-type left">
                    <i class="pointer"></i>
                    <span>否</span>
                </span>
					<span class="explain">是否回呼</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">是否转接</span>
                 <span class="action-box status-type left">
                        <i class="pointer action"></i>
                        <span>是</span>
                 </span>
                <span class="action-box status-type left">
                    <i class="pointer"></i>
                    <span>否</span>
                </span>
					<span class="explain">是否转接</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">测试号码需求</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">**地市**个号码</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">预计业务规模</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">**万分钟/月</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">报价</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">例：本地**元/分钟，异地**元/分钟</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
                    <input type="file" class="upload-file">
                </span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
				</div>
			</div>
			<!--续联业务-->
			<div v-if="type==2">
				<div class="personal-form">
					<span class="personal-title left">客户公司名称</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompName"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系人</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customer"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerContact"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司地址</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerComp"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司介绍</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerCompIntro"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户类别</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompType"></input-bar>
					<span class="explain">直客/平台类客户</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">业务用途及场景</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="businessDesc"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">预计业务规模</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">报价</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">续联使用费和CTD分开报价（续联使用费：5元/次；CTD指导报价：本地0.1元/分钟，异地0.15元/分钟）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
                    <input type="file" class="upload-file">
                </span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
				</div>
			</div>
			<!--声音名片业务-->
			<div v-if="type==3">
				<div class="personal-form">
					<span class="personal-title left">客户公司名称</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompName"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系人</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customer"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerContact"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司地址</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerComp"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司介绍</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerCompIntro"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">业务用途及场景</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="businessDesc"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">预计开通数量</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">报价</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">标准价：60元/户/年</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">付款方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">预付费/后付费</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
                    <input type="file" class="upload-file">
                </span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
				</div>
			</div>
			<!--全数通业务-->
			<div v-if="type==4">
				<div class="personal-form">
					<span class="personal-title left">客户公司名称</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompName"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系人</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customer"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerContact"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司地址</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerComp"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司介绍</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerCompIntro"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户类别</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"></input-bar>
					<span class="explain">直客/代理类客户</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">业务用途及场景</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="businessDesc"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">产品类型</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">三要素验证/用户在网状态校验/用户在网时长/其他</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">使用数据类别</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">单网还是三网，单网是哪个网别，三网各多少额度</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">预计业务规模</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">报价</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">付款方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">预付费/后付费</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
                    <input type="file" class="upload-file">
                </span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
				</div>
			</div>
			<!--全流通业务-->
			<div v-if="type==5">
				<div class="personal-form">
					<span class="personal-title left">客户公司名称</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompName"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系人</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customer"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户联系方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerContact"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司地址</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerComp"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户公司介绍</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="customerCompIntro"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">客户类别</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="customerCompType"></input-bar>
					<span class="explain">直客/平台类客户</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">业务用途及场景</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"
							   v-model="businessDesc"></input-bar>
				</div>

				<div class="personal-form">
					<span class="personal-title left">对接方式</span>
					<input-bar class="personal-content pensonal-input left" placeholder=""
							   type="text"></input-bar>
					<span class="explain">接口发起还是Web发起（零售方式）</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">使用流量类型</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">单网还是三网，单网是哪个网别，三网各多少额度</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">预计入账收入</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">折扣说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">其他说明</span>
					<input-bar class="personal-content pensonal-input left large-input" placeholder=""
							   type="text"></input-bar>
					<span class="explain">是否需要配置流量营销活动，如大转盘等</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">上传附件</span>
                        <span class="form-trap up-btn pointer opp-up-btn">点击上传
                            <input type="file" class="upload-file">
                        </span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
					<span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
				</div>
			</div>
		</div>
		<div class="btn btn-save pointer action-btn ani-time ">提交</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				type: 5,
				isShowTypeList: false,
				businessList: [
					{id: 1, name: 'hehe'},
					{id: 2, name: '幻舞'},
					{id: 3, name: 'hehe'},
					{id: 4, name: '幻舞'},
					{id: 5, name: 'hehe'}
				]
			}
		},
		components: {
			ComLayout,
			DropList,
			InputBar
		},
		methods: {
			routerUpdated()
			{
				this.type = g.vue.getQuery('type', 1);
				this.initEvents()
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

			},
			onClick_callType($type)
			{

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
			document.removeEventListener('click',this.onClick_doc);
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 44px;
	}

	@import "../../css/oppApply.scss";
</style>