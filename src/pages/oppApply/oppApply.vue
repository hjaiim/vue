<template>
	<com-layout currPath="/oppapply">
		<div class="apply-wrap">
			<div class="personal-form" >
				<span class="personal-title left">业务名称</span>
				<div class="personal-content left relative form-list pointer"
					 @click="onClick_dropListBtn">
					幻舞科技
					<i :class="['icon-trangle', isShowBusinessList?'rotate':'']"></i>
					<drop-list :dropList="businessList" :isShowDropList="isShowBusinessList" @change="onClick_business"></drop-list>
				</div>
			</div>
			<div class="personal-form">
				<span class="personal-title left">客户公司名称</span>
				<input-bar class="personal-content pensonal-input left" placeholder="" type="text"></input-bar>
			</div>
			<div class="personal-form">
                <span class="personal-title left">客户联系人</span>
                <input-bar class="personal-content pensonal-input left" placeholder="" type="text"></input-bar>
			</div>
            <div class="personal-form">
                <span class="personal-title left">客户联系方式</span>
                <input-bar class="personal-content pensonal-input left" placeholder="" type="text"></input-bar>
            </div>
            <div class="personal-form">
                <span class="personal-title left">客户公司地址</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
            </div>
            <div class="personal-form">
                <span class="personal-title left">客户公司介绍</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
            </div>
            <div class="personal-form">
                <span class="personal-title left">客户类别</span>
                <input-bar class="personal-content pensonal-input left" placeholder="" type="text"></input-bar>
                <span class="explain">直客/平台类客户</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">业务用途及场景</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
                <span class="explain lang-explain">务必描述清楚，使用CTD业务用来做什么，说明是办公电话/客户服务/快递物流还是其他业务场景</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">接入方式</span>
                 <span class="action-box status-type left">
                        <i class="pointer action"></i>
                        <span>API</span>
                 </span>
                <span class="action-box status-type left">
                    <i class="pointer"></i>
                    <span>SIP</span>
                </span>
                <span class="explain">API/SIP（请选择一种）</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">呼叫模式</span>
                 <span class="action-box status-type left">
                        <i class="pointer action"></i>
                        <span>双呼</span>
                 </span>
                <span class="action-box status-type left">
                    <i class="pointer"></i>
                    <span>单呼</span>
                </span>
                <span class="explain">双呼/单呼（请选择一种或多种）</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">发起方式</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
                <span class="explain lang-explain">APP发起还是台席发起（如果是台席发起，注明台席发起数量）</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">呼叫范围</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
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
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
                <span class="explain">**地市**个号码</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">预计业务规模</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
                <span class="explain">**万分钟/月</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">报价</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
                <span class="explain">例：本地**元/分钟，异地**元/分钟</span>
            </div>
            <div class="personal-form">
                <span class="personal-title left">其他说明</span>
                <input-bar class="personal-content pensonal-input left large-input" placeholder="" type="text"></input-bar>
            </div>
            <div class="personal-form">
                <span class="personal-title left">上传附件</span>
                <span class="form-trap up-btn pointer opp-up-btn">点击上传
                    <input type="file" class="upload-file">
                </span>
                <span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
                <span class="complate-upload-file">初步合同 <i class="del-file pointer">删除</i></span>
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

		},
		data(){
			return {
				g: g,
				isShowBusinessList:false,
				businessList:[{id:1,name:'hehe'},{id:2,name:'幻舞'}]
			}
		},
		components:{
			ComLayout,
			DropList,
			InputBar
		},
		methods: {
			onClick_dropListBtn(){
				if(this.isShowBusinessList){
					this.isShowBusinessList = false;
				}else{
					this.isShowBusinessList = true;
				}
			},
			onClick_business(){

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
.apply-wrap{
    padding: 20px 44px 50px 44px;
}
    @import "../../css/oppApply.scss";
</style>