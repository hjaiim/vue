<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="diff-content-pop">
		<div class="detail-container">
			<p class="note-tit">商机详情</p>
			<div class=" company-message note-content opp-content">
				<div class="no-border" is="scroll-group">
					<div>
						<h3 class="opp-title">商机内容</h3>
						<!--<business-type-1 v-if="oppType==1" :formData="formData"></business-type-1>-->
						<!--<business-type-2 v-if="oppType==2" :formData="formData"></business-type-2>-->
						<!--<business-type-3 v-if="oppType==3" :formData="formData"></business-type-3>-->
						<!--<business-type-4 v-if="oppType==4" :formData="formData"></business-type-4>-->
						<!--<business-type-5 v-if="oppType==5" :formData="formData"></business-type-5>-->
						<!--<business-type-6 v-if="oppType==6" :formData="formData"></business-type-6>-->
						<!--<business-type-7 v-if="oppType==7" :formData="formData"></business-type-7>-->
						<div>
							<p class="from-group detail-custer-msg">
								<span class="form-title">商机类型</span>
								<span class="form-trap">{{businessData.typeName}}</span>
							</p>
							<p class="from-group detail-custer-msg">
								<span class="form-title">业务小类</span>
								<span class="form-trap">{{businessData.childBusinessName}}</span>
							</p>
							<p class="from-group detail-custer-msg">
								<span class="form-title">商机行业类型</span>
								<span class="form-trap">{{businessData.boTradeName}}</span>
							</p>

							<p class="from-group detail-custer-msg" v-for="(value,key) in formInfo">
								<span class="form-title">{{key}}</span>
								<span class="form-trap">{{value}}</span>
							</p>

						</div>
						<div>
							<p class="from-group">
								<span class="form-title">附件下载</span>
								<span class="form-trap empty-txt"
									  v-show="businessData.attachList&&businessData.attachList.length==0">无</span>
								<i class="download-wrap clear">
									<a class="form-trap file-download pointer ani-time left"
									   v-for="attach in businessData.attachList"
									   :href="g.param.ossUrl + attach.fileName" download>{{attach.name}}</a>
								</i>
							</p>
						</div>
					</div>
					<div>
						<h3 class="opp-title dashed-border"  v-if="businessData.recordList && businessData.recordList.length > 0">
								审核详情</h3>
						<div v-for="item in businessData.recordList">
								<p class="from-group  clear">
									<span class="form-title">  <i class="leader"></i>{{item.positionName}}</span>
									<span class="form-trap">{{item.auditorName}}</span>
								</p>

								<p class="from-group clear" v-if="item.attachList.length > 0">
									<span class="form-title">附件下载</span>
								<span class="form-trap empty-txt"
									  v-show="item.attachList&&item.attachList.length==0">无</span>
									<i class="download-wrap clear">
										<a class="form-trap file-download pointer ani-time left"
										   v-for="attach in item.attachList" :href="g.param.ossUrl + attach.fileName"
										   download>{{attach.name}}</a>
									</i>

								</p>
								<p class="from-group  clear">
									<span class="form-title left">签批意见</span>

									<span class="form-trap left address-width">{{item.opinion?item.opinion:'无'}}</span>
								</p>
								<p class="from-group  clear">
									<span class="form-title">结果</span>
									<span class="form-trap">{{item.result}} &nbsp;&nbsp;&nbsp; {{item.createTime}}</span>
								</p>
									<!--初审员不显示-->
								<p class="from-group  clear" v-if="item.auditorId !=2">
									<span class="form-title left">已选审核人员</span>

									<span class="form-trap left address-width">{{item.pendingAuditorName?item.pendingAuditorName:'无'}}</span>
								</p>
							</div>
						<div class="clear" v-if="businessData.operation == 2">
							<p class="from-group clear">
								<span class="form-title left">我的审核</span>
								<span class="action-box status-type left pointer" @click="onClick_statusItem(1)"
									  v-if="businessData.hasApproved&&businessData.auditStatusDesc!='审核退回'">

									<i class="pointer draw-round" :class="status == 1?'action':''"></i>
									<span class="pointer">通过</span>
								</span>
								<span class="action-box status-type left pointer" @click="onClick_statusItem(2)"
									  v-if="businessData.hasRejected&&businessData.auditStatusDesc!='审核退回'">
									<i class="draw-round pointer" :class="status == 2?'action':''"></i>
									<span class="pointer">退回</span>
								</span>
								<span class="action-box status-type left pointer" @click="onClick_statusItem(3)"
										  v-if="businessData.hasFinished||businessData.auditStatusDesc=='审核退回'">
									<i class="draw-round pointer" :class="status == 3?'action':''"></i>
									<span class="pointer">结束</span>
								</span>
							</p>
							<p class="from-group clear" v-if="businessData.hasOpinion">
								<span class="form-title left">  <i class="leader"></i>签批意见</span>
								<textarea class="examine iscroll-ref left ani-time" v-model="opinion"
										  @focus="onFocus_textArea"></textarea>
							</p>

							<p class="from-group clear relative" v-if="businessData.hasAttaches">
								<span class="form-title">上传附件</span>
								 <span class="form-trap up-btn pointer opp-up-btn">点击上传
								<iframe name="fileUpload" v-if="hasIframe" class="iframe-wrap"
										:class="isUpload?'disabled':''" :disabled="isUpload"
										:src="g.path.base+'/upload.html?type=file&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"></iframe>
								</span>
								<span class="form-title error-msg">{{errMsg}}</span>
							</p>
							<p class="from-group clear relative file-wrap">
							<span class="file-down"
								  v-for="(attach,index) in attachList"><i class="file-name">{{attach.name}}</i><i>/{{attach.size}}KB</i><i
									class="del-txt pointer" @click="onClick_delBtn(attach.name,index)">删除</i></span>

							</p>
							<p class="from-group clear examine-people" v-if="businessData.hasNext && status == 1">
								<span class="exam-btn pointer" @click="onClick_selectNext">选择后续人</span>
								<span v-for="item in childList" class="choose-people">{{item.name}}<i
										class="close-search-btn absolute pointer"
										@click="onClick_delChild(item.id)"></i></span>
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
	import * as util from '../../js/func'
	import ViewPopup from "../viewPop.vue";
	import ScrollGroup from "../scrollGroup.vue";
	import BusinessType1 from "../businessDetail/businessType1.vue";
	import BusinessType2 from "../businessDetail/businessType2.vue";
	import BusinessType3 from "../businessDetail/businessType3.vue";
	import BusinessType4 from "../businessDetail/businessType4.vue";
	import BusinessType5 from "../businessDetail/businessType5.vue";
	import BusinessType6 from "../businessDetail/businessType6.vue";
	import BusinessType7 from "../businessDetail/businessType7.vue";
	import BusinessType from "../businessDetail/businessType.vue";
	import ChooseManPop from "./chooseManPop.vue";
	var _params = null, _childName = [], _attach = {}, _isValid = true, _hash = {};
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
				status: 1,
				idList: [],
				opinion: "",
				hasIframe: true,
				attachList: [],
				isShowOrderManPop: false,
				errMsg: "",
				businessData: {
					taskProperties: {}
				},
				isUpload: false,
				formInfo: {},
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
			BusinessType,
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
			isShowPopView($val)
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

				this.idList = [];
				this.attachList = [];
				this.errMsg = '';
				this.isUpload = false;
				this.isShowOrderManPop = false;
				if (this.currId)
				{
					this.businessData = g.data.searchBusinessPool.getDataById(this.currId);
					let formData = this.businessData.formData;
					this.formInfo = __merge({}, formData);
					for (var key in this.formInfo) {
						if (key == "客户联系方式") {
							this.formInfo[key] = this.formInfo[key].split("*")[0];
						}
						if (key == "申请的95业务类别" && this.formInfo[key] != "使用联通已有的95号") {
							this.formInfo[key] = this.formInfo[key].split("num*").join("/95号码：");
						}
					}
					this.oppType = this.businessData.type;
				}
				this.status = 1;
				if(this.businessData.auditStatusDesc=="审核退回"){
					this.status = 3;
				}
				_hash = {};
				window.uploadComplete = this.uploadComplete;
				window.sendMsg = this.sendMsg;
			},
			sendMsg($type, $info)
			{
				if ($type == "error")
				{
					this.errMsg = $info.msg;
				}
				else
				{
					g.ui.showLoading();
					this.isUpload = true;
					this.errMsg = "";
					_attach.name = $info.name;
				}
			},
			uploadComplete($data)
			{
				g.ui.hideLoading();
				this.hasIframe = false;
				this.isUpload = false;
				var attach = {
					size: $data.size,
					fileName: $data.fileName,
					name: _attach.name
				};
				_attach.name = "";
				if (this.attachList.length >= 10)
				{
					this.errMsg = "您已到达附件上传上限，无法继续上传";
					return;
				}
				else if (!_hash[attach.name])
				{
					_hash[attach.name] = attach;
					this.attachList.push(attach);
				}
				else
				{
					this.errMsg = "该文件已上传，请勿重复上传";
				}
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
				this.errMsg = "";
				this.status = $status;
			},
			onClick_closeBtn()
			{
				this.$emit("close", false);
			},
			onClick_selectNext()
			{
				g.ui.showLoading();
				g.net.call("organizeQuery/getAuditStationList", {orderId: this.currId}).then(($data) =>
				{
					g.ui.hideLoading();
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
				this.checkValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				this.getChildName();
				_params = {
					orderId: this.currId,
					auditResult: this.status,
					auditSuggest: this.opinion,
					todoId: this.businessData.todoId,
					attachs: JSON.stringify(this.attachList)
				};
				if (this.idList.length > 0)
				{
					_params.pendingAuditorId = this.idList.join(';');
					_params.pendingAuditorName = _childName.join(';');

				}
				if(this.businessData.hasOpinion&&this.opinion.trim()==""){
					this.errMsg = "请填写签批意见";
					return;
				}
				if (this.status == 1 && this.businessData.mustFill && this.idList.length == 0)
				{
					this.errMsg = "请至少选择一名候选人";
					return;
				}
				g.ui.showLoading();
				g.net.call("bo/saveAuditRecord", _params).then(($data) =>
				{
					g.ui.hideLoading();
					g.data.searchBusinessPool.getDataById(this.currId).update({optType: 0});
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
					this.idList = __merge([], $list);
					this.errMsg = "";
				}
			},
			onFocus_textArea()
			{
				this.errMsg = "";
			},
			onClick_delBtn($name, $index)
			{
				g.net.call(g.param.delPicAccess, {fileName: $name}).then(($data) =>
				{
				}, (err) =>
				{
					_hash[$name] = "";
					this.attachList.splice($index, 1);
					this.errMsg = "";
					this.hasIframe = true;
				})
			},
			onClick_delChild($id)
			{
				var index = this.idList.indexOf($id);
				this.idList.splice(index, 1);
				var data = g.data.staffPool.getChildById($id);
				data.update({checked: false});
			},
			checkValid()
			{
				if (trim(this.opinion) && trim(this.opinion).length > 250)
				{
					this.errMsg = "字符数超出限制,审批内容限定250个字";
					_isValid = false;
				}
			},
			getChildName()
			{
				_childName = [];
				for (var id of this.idList)
				{
					var data = g.data.staffPool.getChildById(id);
					_childName.push(data.name);
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
			margin: 20px 10px 40px;
			border-bottom: none;
			max-height: 450px;
			overflow: hidden;
		}
		.detail-wrap {
			padding-bottom: 45px;
		}
	}

	.company-message .from-group {
		width: 95%;
		.form-title, .form-trap {
			font-weight: normal !important;
			line-height: 30px;
			vertical-align: top;
		}
		.error-msg {
			font-size: 14px;
			color: #ed5564;
			width: auto;
			padding-left: 15px;
		}
		.detail-custer-msg {
			width: 95%;
		}
		.empty-txt {
			font-weight: bold !important;
		}
		.status-type {
			margin-left: 0;
		}
		.up-btn {
			line-height: 22px;
			font-size: 12px;
			margin-top: 3px;
		}
		.file-down {
			margin-right: 20px;
			font-size: 14px;
			padding-top: 0;
			display: block;
			vertical-align: top;
			i {
				display: inline-block;
				vertical-align: middle;
			}
			.file-name {
				max-width: 400px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.del-txt {
				padding-left: 15px;
				color: #fe6e29;
				&:hover {
					color: #ec4e08;
				}
			}
		}
		&.file-wrap {
			padding-left: 145px;
			position: relative;
			margin-bottom: 0;
			top: -20px;
		}
		.file-download {
			color: #61a4de;
			text-decoration: underline;
			margin-right: 20px;
			&:hover {
				color: #2c85d3;;
			}
		}
		.close-search-btn {
			width: 12px;
			height: 12px;
			right: -12px;
			top: 4px;
			padding: 4px;
			margin-top: -10px;
			background: transparent;
			-moz-border-radius: 50%;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			-moz-transition: ease-in-out 100ms;
			-o-transition: ease-in-out 100ms;
			-webkit-transition: ease-in-out 100ms;
			transition: ease-in-out 100ms;
			&:before {
				left: 50%;
				top: 50%;
				margin-left: -7px;
				margin-top: -1px;
				width: 14px;
				height: 2px;
				background-color: #9d9d9d;
				content: "";
				position: absolute;
				-moz-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}
			&:after {
				width: 14px;
				height: 2px;
				background-color: #9d9d9d;
				content: "";
				left: 50%;
				top: 50%;
				margin-left: -7px;
				margin-top: -1px;
				position: absolute;
				-moz-transform: rotate(-45deg);
				-ms-transform: rotate(-45deg);
				-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
			}
			&:hover {
				-moz-transform: scale(0.9);
				-ms-transform: scale(0.9);
				-webkit-transform: scale(0.9);
				transform: scale(0.9);
			}
			&:active {
				-moz-transition: ease-in-out 200ms;
				-o-transition: ease-in-out 200ms;
				-webkit-transition: ease-in-out 200ms;
				transition: ease-in-out 200ms;
				-moz-transform: scale(1.6);
				-ms-transform: scale(1.6);
				-webkit-transform: scale(1.6);
				transform: scale(1.6);
				filter: alpha(opacity=0);
				opacity: 0;
			}
		}

	}


</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>