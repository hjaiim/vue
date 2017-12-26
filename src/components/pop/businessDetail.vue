<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="detail-container">
			<p class="note-tit">商机详情</p>
			<div class=" company-message note-content opp-content">
				<div class="no-border opp-content" is="scroll-group">
					<div>
						<h3 class="opp-title">商机内容</h3>
						<business-type-1 v-if="oppType==1" :formData="formData"></business-type-1>
						<business-type-2 v-if="oppType==2" :formData="formData"></business-type-2>
						<business-type-3 v-if="oppType==3" :formData="formData"></business-type-3>
						<business-type-4 v-if="oppType==4" :formData="formData"></business-type-4>
						<business-type-5 v-if="oppType==5" :formData="formData"></business-type-5>
						<business-type-6 v-if="oppType==6" :formData="formData"></business-type-6>
						<business-type-7 v-if="oppType==7" :formData="formData"></business-type-7>
						<div>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<i class="download-wrap clear">
									<a class="form-trap file-download pointer ani-time left"
									   v-for="attach in businessData.attachList" href="###" download>{{attach.name}}</a>
								</i>

							</p>
						</div>
					</div>

					<div>
						<h3 class="opp-title">审核详情</h3>
						<div v-for="item in businessData.recordList">
							<p class="from-group  clear">
								<span class="form-title">  <i class="leader"></i>{{item.positionName}}</span>
								<span class="form-trap">{{item.auditorName}}</span>
							</p>

							<p class="from-group  clear" v-if="item.attachList.length > 0">
								<span class="form-title">附件下载</span>
								<span class="form-trap">{{item.attachList}}</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title left">签批意见</span>
								<span class="form-trap left address-width">{{item.opinion}}</span>
							</p>
							<p class="from-group  clear">
								<span class="form-title">结果</span>
								<span class="form-trap">{{item.result}} {{item.auditTime}}</span>
							</p>
						</div>
						<div class="clear" v-if="businessData.operation == 2">
							<p class="from-group clear">
								<span class="form-title left">我的审核</span>
								<span class="action-box status-type left pointer" @click="onClick_statusItem(1)"
									  v-if="businessData.hasApproved">
									<i class="pointer draw-round pointer" :class="status == 1?'action':''"></i>
									<span class="pointer">通过</span>
								</span>
								<span class="action-box status-type left pointer" @click="onClick_statusItem(2)"
									  v-if="businessData.hasRejected">
									<i class="draw-round pointer" :class="status == 2?'action':''"></i>
									<span class="pointer">退回</span>
								</span>
							</p>
							<p class="from-group clear" v-if="businessData.hasOpinion">
								<span class="form-title left">  <i class="leader"></i>签批意见</span>
								<textarea class="examine iscroll-ref left ani-time" v-model="opinion"></textarea>
							</p>
							<p class="from-group clear examine-people" v-if="businessData.hasNext">
								<span class="exam-btn" @click="onClick_selectNext">选择后续人</span>
							</p>
							<p>
								<span v-for="item in childList">{{item.name}}</span>
							</p>

							<p class="from-group clear relative" v-if="businessData.hasAttaches">
								<span class="form-title">上传附件</span>
								 <span class="form-trap up-btn pointer opp-up-btn">点击上传
								<iframe name="fileUpload" v-if="hasIframe" class="iframe-wrap"
										:src="g.path.base+'upload.html?type=file&redirectUrl='+g.path.base+'uploadApi.html?subType=oppApply'"></iframe>
									 <span class="file-down"
										   v-for="attach in attachList">{{attach.name}}/{{attach
										 .size}}KB</span>
							</span>
							</p>

						</div>

					</div>
				</div>
			</div>
			<div class="detail-wrap clear" v-if="businessData.operation == 2">
				<div class="pop-btn top-btn right pointer cancel-btn ani-time" @click="onClick_closeBtn">关闭</div>
				<div class="btn-submit pop-btn top-btn right pointer action-btn ani-time" @click="onClick_submitBtn">提交
				</div>
			</div>
			<choose-man-pop :isShowViewPop="isShowOrderManPop" @close="onClose_orderManPop"
							:idList="idList"></choose-man-pop>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import ScrollGroup from "../scrollGroup.vue";
	import BusinessType1 from "../businessDetail/businessType1.vue";
	import BusinessType2 from "../businessDetail/businessType2.vue";
	import BusinessType3 from "../businessDetail/businessType3.vue";
	import BusinessType4 from "../businessDetail/businessType4.vue";
	import BusinessType5 from "../businessDetail/businessType5.vue";
	import BusinessType6 from "../businessDetail/businessType6.vue";
	import BusinessType7 from "../businessDetail/businessType7.vue";
	import ChooseManPop from "./chooseManPop.vue"
	var _params = null, _childName;
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				type: 1,
				oppType: 1,
				formData: {},
				status: 1,
				idList: [],
				opinion: "",
				hasIframe: true,
				attachList: [],
				isShowOrderManPop: false,
				businessData: {
					taskProperties: {}
				}
			}
		},
		components: {
			ViewPopup,
			ScrollGroup,
			BusinessType1,
			BusinessType2,
			BusinessType3,
			BusinessType4,
			BusinessType5,
			BusinessType6,
			BusinessType7,
			ChooseManPop
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			currId: {
				default: 0
			}
		},
		watch: {
			isShowPopView()
			{
				this.init();
			}
		},
		computed: {
			childList()
			{
				var list = [];
				for (var id of this.idList)
				{
					var data = g.data.staffPool.getChildById(id);
					list.push(data);
				}
				return list;
			}
		},
		methods: {
			init()
			{
				this.opinion = "";
				this.status = 1;
				if (this.currId)
				{
					this.businessData = g.data.searchBusinessPool.getDataById(this.currId);
					this.formData = this.businessData.formData;
					this.oppType = this.businessData.type;
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
			onClose_pop()
			{
				this.$emit('close', false);
			},
			onClick_statusItem($status)
			{
				this.status = $status;
			},
			onClick_closeBtn()
			{
				this.$emit("close", false);
			},
			onClick_selectNext()
			{
				g.net.call("organizeQuery/getAuditStationList", {orderId: this.currId}).then(($data) =>
				{
					g.data.staffPool.removeAll();
					g.data.staffPool.update($data.data);
					this.isShowOrderManPop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClick_submitBtn($status)
			{
				_params = {
					orderId: this.currId,
					auditResult: this.status,
					auditSuggest: this.opinion,
					todoId: this.businessData.todoId
				};
				if (this.idList.length > 0)
				{
					_params.pendingAuditorId = this.idList.join(';');
					_params.pendingAuditorName = _childName.join(';');
				}
				g.net.call("bo/saveAuditRecord", _params).then(($data) =>
				{
					this.$emit("close", true);
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClose_orderManPop($result, $list)
			{
				this.isShowOrderManPop = false;
				if ($result)
				{
					_childName = [];
					this.idList = __merge([], $list);
					for (var item of this.idList)
					{
						var data = g.data.staffPool.getChildById(item);
						_childName.push(data.name)
					}
				}
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.detail-container {
		color: #333333;
		.note-content {

			line-height: 36px;
			font-size: 14px;
		}
		.opp-content {
			max-height: 600px;
			overflow: hidden;
		}
		.detail-wrap {
			padding-bottom: 45px;
		}
	}

	.company-message .from-group {
		.form-title, .form-trap {
			font-weight: normal !important;
			line-height: 30px;
			vertical-align: top;
		}
		.up-btn {
			line-height: 22px;
			font-size: 12px;
			margin-top: 5px;
		}
		.file-down {
			color: #61a4de;
			text-decoration: underline;
			margin-right: 20px;
			&:hover {
				color: #2c85d3;;
			}
		}

	}


</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>