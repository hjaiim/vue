<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="detail-container">
			<p class="note-tit">商机详情</p>
			<div class="note-content opp-content">
				<div class="company-message no-border opp-content" is="scroll-group">
					<div>
						<h3 class="opp-title">商机内容</h3>
						<!--CTD业务-->
						<div v-if="oppType ==1">
							<p class="from-group left detail-custer-msg">
								<span class="form-title">业务名称</span>
								<span class="form-trap">CTD业务</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户公司名称</span>
								<span class="form-trap">杭州幻舞科技</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户联系人</span>
								<span class="form-trap">马云</span>
							</p>
							<p class="from-group left detail-custer-msg">

								<span class="form-title">客户联系电话</span>
								<span class="form-trap">135****1234</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司地址</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum,consectetur adipiscing elit. Aenean euismod bibendum </span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司介绍</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">客户类别</span>
								<span class="form-trap">代理类</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">业务用途及场景</span>
								<span class="form-trap left address-width">办公电话</span>
							</p>
							<p class="from-group">
								<span class="form-title">对接方式</span>
								<span class="form-trap">总部对接</span>
							</p>
							<p class="from-group">
								<span class="form-title">呼叫模式</span>
								<span class="form-trap">双呼</span>
							</p>
							<p class="from-group">
								<span class="form-title">发起方式</span>
								<span class="form-trap">APP发起sit amet, consectetur adipiscing elit. Aenean euismod bibe</span>
							</p>
							<p class="from-group">
								<span class="form-title">呼叫范围</span>
								<span class="form-trap">全国三网手机和固话，开通本地、长途，不开通国际权限</span>
							</p>
							<p class="from-group">
								<span class="form-title">是否呼叫</span>
								<span class="form-trap">是</span>
							</p>
							<p class="from-group">
								<span class="form-title">是否转接</span>
								<span class="form-trap">否</span>
							</p>
							<p class="from-group">
								<span class="form-title">测试码号需求</span>
								<span class="form-trap">**地市**个号码</span>
							</p>
							<p class="from-group">
								<span class="form-title">预计业务规模</span>
								<span class="form-trap"> **万分钟/月  **万分钟/月 </span>
							</p>
							<p class="from-group">
								<span class="form-title">报价</span>
								<span class="form-trap">本地**元/分钟</span>
							</p>
							<p class="from-group">
								<span class="form-title left">其他说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap file-download pointer">合同文件.doc</span>
								<span class="form-trap file-download pointer">合同细节.doc</span>
							</p>
						</div>
						<!--续联业务-->
						<div v-if="oppType ==2">
							<p class="from-group left detail-custer-msg">
								<span class="form-title">业务名称</span>
								<span class="form-trap">续联业务</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户公司名称</span>
								<span class="form-trap">杭州幻舞科技</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户联系人</span>
								<span class="form-trap">马云</span>
							</p>
							<p class="from-group left detail-custer-msg">

								<span class="form-title">客户联系电话</span>
								<span class="form-trap">135****1234</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司地址</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum,consectetur adipiscing elit. Aenean euismod bibendum </span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司介绍</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">客户类别</span>
								<span class="form-trap">代理类</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">业务用途及场景</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group">
								<span class="form-title">预计业务规模</span>
								<span class="form-trap">的飞洒发大厦</span>
							</p>
							<p class="from-group">
								<span class="form-title">报价</span>
								<span class="form-trap">续联使用费</span>
							</p>
							<p class="from-group">
								<span class="form-title left">其他说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap file-download pointer">合同文件.doc</span>
								<span class="form-trap file-download pointer">合同细节.doc</span>
							</p>
						</div>
						<!--声音名片业务-->
						<div v-if="oppType ==3">
							<p class="from-group left detail-custer-msg">
								<span class="form-title">业务名称</span>
								<span class="form-trap">声音名片业务</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户公司名称</span>
								<span class="form-trap">杭州幻舞科技</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户联系人</span>
								<span class="form-trap">马云</span>
							</p>
							<p class="from-group left detail-custer-msg">

								<span class="form-title">客户联系电话</span>
								<span class="form-trap">135****1234</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司地址</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum,consectetur adipiscing elit. Aenean euismod bibendum </span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司介绍</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">业务用途及场景</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group">
								<span class="form-title">预计开通数量</span>
								<span class="form-trap">10000</span>
							</p>
							<p class="from-group">
								<span class="form-title">报价</span>
								<span class="form-trap">123</span>
							</p>
							<p class="from-group">
								<span class="form-title">付费方式</span>
								<span class="form-trap">预付费</span>
							</p>
							<p class="from-group">
								<span class="form-title left">其他说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap file-download pointer">合同文件.doc</span>
								<span class="form-trap file-download pointer">合同细节.doc</span>
							</p>
						</div>
						<!--全数通业务-->
						<div v-if="oppType ==4">
							<p class="from-group left detail-custer-msg">
								<span class="form-title">业务名称</span>
								<span class="form-trap">全数通业务</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户公司名称</span>
								<span class="form-trap">杭州幻舞科技</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户联系人</span>
								<span class="form-trap">马云</span>
							</p>
							<p class="from-group left detail-custer-msg">

								<span class="form-title">客户联系电话</span>
								<span class="form-trap">135****1234</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司地址</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum,consectetur adipiscing elit. Aenean euismod bibendum </span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司介绍</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">客户类别</span>
								<span class="form-trap">代理类</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">业务用途及场景</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group">
								<span class="form-title">产品类型</span>
								<span class="form-trap">三要素验证</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">使用数据类别</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">预计业务规模</span>
								<span class="form-trap left address-width">对法拉伐</span>
							</p>
							<p class="from-group">
								<span class="form-title">报价</span>
								<span class="form-trap">123</span>
							</p>
							<p class="from-group">
								<span class="form-title">付费方式</span>
								<span class="form-trap">预付费</span>
							</p>
							<p class="from-group">
								<span class="form-title left">其他说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap file-download pointer">合同文件.doc</span>
								<span class="form-trap file-download pointer">合同细节.doc</span>
							</p>
						</div>
						<!--全流通业务-->
						<div v-if="oppType ==5">
							<p class="from-group left detail-custer-msg">
								<span class="form-title">业务名称</span>
								<span class="form-trap">全流通业务</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户公司名称</span>
								<span class="form-trap">杭州幻舞科技</span>
							</p>
							<p class="from-group left detail-custer-msg">
								<span class="form-title">客户联系人</span>
								<span class="form-trap">马云</span>
							</p>
							<p class="from-group left detail-custer-msg">

								<span class="form-title">客户联系电话</span>
								<span class="form-trap">135****1234</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司地址</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum,consectetur adipiscing elit. Aenean euismod bibendum </span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">客户公司介绍</span>
								<span class="form-trap left address-width">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">客户类别</span>
								<span class="form-trap">代理类</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">业务用途及场景</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group">
								<span class="form-title">对接方式</span>
								<span class="form-trap">总部对接</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">使用流量类别</span>
								<span class="form-trap left address-width">办公电话的咖啡广东省高科技股份反而覅而且热if二天河口儿童房卡IE我日特我定个蛋糕费到</span>
							</p>
							<p class="from-group clear">
								<span class="form-title left">预计入账收入</span>
								<span class="form-trap left address-width">发哦发放卡怪费按房间酒瓯噶该法规发生</span>
							</p>
							<p class="from-group">
								<span class="form-title left">折扣说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title left">其他说明</span>
								<span class="form-trap left address-width">其他说明, consectetur adipiscing elit. Aenean euismod bibendum 商公司地址杭州市, consectetur</span>
							</p>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap file-download pointer">合同文件.doc</span>
								<span class="form-trap file-download pointer">合同细节.doc</span>
							</p>
						</div>
					</div>
					<div>
						<h3 class="opp-title">审核详情</h3>
						<div v-if="type==1">
							<p class="from-group  clear">
								<span class="form-title">  <i class="leader"></i>商机管理员</span>
								<span class="form-trap">大头</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title left">签批意见</span>
								<span class="form-trap left address-width">通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级通过，交付下一级</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title">结果</span>
								<span class="form-trap">已通过 2017.13.13 20:20:01</span>
							</p>
						</div>
						<div v-if="type==1">
							<p class="from-group  clear">
								<span class="form-title">  <i class="leader"></i>总部领导</span>
								<span class="form-trap">张帅</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title">附件下载</span>
								<span class="form-trap">无</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title left">签批意见</span>
								<span class="form-trap left address-width">通过，交付下一级梵蒂冈和费电话费是多喝点水东方红是东方红松岛枫合肥市管会发生</span>
							</p>
							<p class="from-group clear">
								<span class="form-title">结果</span>
								<span class="form-trap">已通过 2017.13.13 20:20:01</span>
							</p>
						</div>
						<div v-if="type==1 ||type==2 ||type ==3 ||type==4">
							<p class="from-group clear">
								<span class="form-title left">  <i class="leader"></i>签批意见</span>
								<textarea class="examine left"></textarea>
							</p>
							<p class="from-group clear">
								<span class="form-title">上传附件</span>
                                <span class="form-trap up-btn pointer">点击上传
                                    <input type="file" class="upload-file">
                                </span>
							</p>
						</div>
						<div v-if="type==2">
							<p class="from-group">
								<span class="form-title left">我的审核</span>
                                <span class="action-box status-type left" @click="onClick_statusItem(0)">
                                    <i class="pointer" :class="status == 0?'action':''"></i>
                                    <span>通过</span>
                                </span>
                                <span class="action-box status-type left" @click="onClick_statusItem(0)">
                                    <i class="pointer" :class="status == 0?'action':''"></i>
                                    <span>返回</span>
                                </span>
							</p>
						</div>
						<div v-if="type==1 ||type ==3">
							<p class="examine-people">
								<span class="exam-btn" v-if="type==1">结束审核</span>
								<span class="exam-btn">选择后续人</span>
                                <span class="choose-people">李小龙
                                    <img :src="g.path.images+'/del-head.png'" alt="" class="delete-choose pointer">
                                </span>
                                <span class="choose-people">李小龙
                                    <img :src="g.path.images+'/del-head.png'" alt="" class="delete-choose pointer">
                                </span>
								<span class="exam-btn end-exam" v-if="type==1">结束审核</span>
							</p>
						</div>

					</div>
				</div>
			</div>
			<div class="detail-wrap clear">
				<div class="pop-btn top-btn right pointer cancel-btn ani-time">关闭</div>
				<div class="btn-submit pop-btn top-btn right pointer action-btn ani-time">提交</div>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import ScrollGroup from "../scrollGroup.vue"
	export default{
		data(){
			return {
				g: g,
				type: 1,
				oppType: 1,
			}
		},
		components: {
			ViewPopup,
			ScrollGroup
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClose_pop(){
				this.$emit('close');

			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.detail-container {
		color: #333333;
		.note-content {
			padding: 15px 10px 20px;
			line-height: 36px;
			font-size: 14px;
		}
		.opp-content {
			max-height: 600px;
			overflow: hidden;
		}
		.detail-wrap{
			padding-bottom: 45px;
		}
	}

	.company-message .from-group {
		.form-title, .form-trap {
			font-weight: normal !important;
			line-height: 30px;
		}
		.up-btn {
			line-height: 22px;
			font-size: 12px;
		}
		.file-download {
			color: #2c85d3;
			text-decoration: underline;
			margin-right: 20px;
		}

	}


</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>