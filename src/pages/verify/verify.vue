<template>
	<com-layout currId="percenter" currPath="/verify">
		<div class="percenter-wrap">
			<div class="percenter-inner" :class="canEdit?'':'disabled'">
				<div class="icon-collect clear">

					<div class="relative upload-head right pointer">
						<img class="default-img" :src="g.param.ossUrl+avatar" alt="">
						<p class="err-msg absolute">{{errData.avatar}}</p>
						<div class="absolute upload-btn">
							<p class="load-text">修改头像</p>
							<iframe class="iframe-btn" name="fileUpload"
									:src="g.path.base+'/upload.html?type=pic&subType=avatar&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"
									id="avatar" v-if="avatar == 'default.png'"
							></iframe>
							<img v-if="avatar != 'default.png'" :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer" @click="onClick_deleteImg('avatar')">
						</div>
					</div>
				</div>
			</div>
			<div class="personal-message">
				<div class="personal-form diff-personal diff-margin"><span class="personal-title ">登录用户名</span><span
						class="personal-content">{{userInfo.username}}
				</span>

				</div>
				<div class="personal-form diff-personal diff-margin"><span class="personal-title">姓名</span><span
						class="personal-content">{{userInfo.name}}</span></div>
				<div class="personal-form diff-personal relative diff-margin">
					<span class="personal-title left">所属公司</span>
					<p class="err-msg absolute"> {{errData.currCompany}}</p>
					<div class="personal-content left relative form-list pointer"
						 :class="canEdit?'':'disabled'"
						 @click.stop="onClick_dropListBtn('Company')">
						{{currCompanyData.name}}
						<i :class="['icon-trangle', isShowCompanyList?'rotate':'']"></i>
						<drop-list :dropList="companyList" :isShowDropList="isShowCompanyList"
								   @change="onClick_company" ref="company"></drop-list>
					</div>
					<span class="required" v-show="authStatus == 0">*</span>
				</div>
				<div class="personal-form diff-personal relative">
					<span class="personal-title left">所属部门</span>
					<p class="err-msg absolute"> {{errData.currDepartment}}</p>
					<div class="personal-content left relative form-list pointer"
						 :class="canEdit?'':'disabled'"
						 @click.stop="onClick_dropListBtn('Department')">
						{{currDepartData.name}}
						<i class="pointer" :class="['icon-trangle', isShowDepartmentList?'rotate':'']"></i>
						<drop-list :dropList="departmentList" :isShowDropList="isShowDepartmentList"
								   @change="onClick_department" ref="depart"></drop-list>
					</div>
					<span class="required" v-show="canEdit">*</span>
				</div>
				<div class="personal-form diff-personal relative">
					<span class="personal-title left">职务名称</span>
					<p class="err-msg absolute"> {{errData.currDuty}}</p>
					<div class="personal-content left relative form-list pointer"
						 :class="canEdit?'':'disabled'"
						 @click.stop="onClick_dropListBtn('Duty')">
						{{currDutyData.name}}
						<i class="pointer" :class="['icon-trangle', isShowDutyList?'rotate':'']"></i>
						<drop-list :dropList="dutyList" :isShowDropList="isShowDutyList"
								   @change="onClick_duty" ref="duty"></drop-list>
					</div>
					<span class="required" v-show="canEdit">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">手机</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="phone" @focus="onFocus_inputBar('phone')" :errmsg="errData.phone"
							   :readonly="!canEdit"></input-bar>
					<span class="required" v-show=canEdit>*</span>
				</div>
				<div class="personal-form" v-if="canEdit">
					<span class="personal-title left">验证码</span>
					<input-bar class="personal-content pensonal-input code left" placeholder="" type="text"
							   v-model="code" @focus="onFocus_inputBar('code')" :errmsg="errData.code"></input-bar>
					<span class="btn-send pointer left ani-time" @click="onClick_sendCodeBtn"
						  :class="isClicked?'disabled':''">{{limit == g.param.timeoutClock ?'获取验证码':'倒计时'+limit+'秒'}}
					</span>
				</div>
				<div class="personal-form"><span class="personal-title left">固定电话</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   :readonly="!canEdit"
							   v-model="telphone" @focus="onFocus_inputBar('telphone')"
							   :errmsg="errData.telphone"></input-bar>
				</div>

				<div class="personal-form"><span class="personal-title left">电子邮箱</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   :readonly="!canEdit"
							   v-model="email" @focus="onFocus_inputBar('email')" :errmsg="errData.email"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title left">备注</span>
					<input-bar class="personal-content pensonal-input note left" placeholder="" type="text"
							   :readonly="!canEdit"
							   v-model="remark" @focus="onFocus_inputBar('remark')"
							   :errmsg="errData.remark"></input-bar>
				</div>
				<div class="personal-form relative" :class="!canEdit ?'disabled':''">
					<span class="personal-title left">身份证照</span>
					<p class="err-msg absolute"> {{errData.idCardBack || errData.idCardFront}}</p>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">正面</p>
						</div>
						<div class="img-contain absolute" v-show="idCardFront">
							<img class="img-url " :src="idCardFront?g.param.ossUrl+idCardFront:''" alt="">
						</div>
						<iframe class="pointer" name="fileUpload"
								:src="g.path.base+'/upload.html?type=pic&subType=idCardFront&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"
								v-if="!idCardFront" id="idCardFront"></iframe>
						<span class="del-img pointer" :class="idCardFront?'hover-img':''"
							  @click="onClick_deleteImg('idCardFront')"></span>
					</div>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">反面</p>
						</div>
						<div class="img-contain absolute" v-show="idCardBack">
							<img class="img-url " :src="idCardBack?g.param.ossUrl+idCardBack:''" alt="">
						</div>
						<iframe class="pointer" name="fileUpload"
								:src="g.path.base+'/upload.html?type=pic&subType=idCardBack&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"
								v-if="!idCardBack" id="idCardBack"></iframe>
						<span class="del-img pointer" :class="idCardBack?'hover-img':''"
							  @click="onClick_deleteImg('idCardBack')"></span>
					</div>

				</div>
				<div class="personal-form relative" :class="!canEdit?'disabled':''">
					<p class="err-msg absolute"> {{errData.workCard}}</p>
					<span class="personal-title left">工作证照</span>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">
								点击上传工作证照片<br>
								支持jpg/png格式</br>
								不超过5M</br>
								</span>
							</p>

						</div>
						<div class="img-contain absolute" v-show="workCard">
							<img class="img-url " :src="workCard?g.param.ossUrl+workCard:''" alt="">
						</div>
						<iframe class="pointer" name="fileUpload"
								:src="g.path.base+'/upload.html?type=pic&subType=workCard&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"
								id="workCard" v-if="!workCard"></iframe>
						<span class="del-img pointer" :class="workCard?'hover-img':''"
							  @click="onClick_deleteImg('workCard')"></span>
					</div>
				</div>
				<div class="btn btn-save pointer action-btn ani-time " @click="onClick_submitBtn"
					 v-if="canEdit">提交
				</div>
			</div>
			<right-pop :isShowPopView="isShowRightPop"></right-pop>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import UploadBtn from "../../components/upload.vue";
	import InputBar from "../../components/inputBar.vue";
	import DropList from "../../components/dropList.vue";
	import RightPop from "../../components/pop/rightPop.vue"
	var _isValid = true, _params = null, _attach = {}, _timer = 0;
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				errData: {},
				userInfo: {},
				phone: '',
				remark: "",
				email: '',
				code: '',
				telphone: '',
				avatar: '',
				idCardBack: '',
				idCardFront: '',
				workCard: '',
				companyList: [],
				currCompanyData: {},
				departmentList: [],
				currDepartData: {},
				dutyList: [],
				currDutyData: {},
				isVerified: false,
				isShowDepartmentList: false,
				isShowCompanyList: false,
				isShowDutyList: false,
				isSubmit: false,
				limit: g.param.timeoutClock,
				isClicked: false

			}
		},
		components: {
			ComLayout,
			UploadBtn,
			InputBar,
			DropList,
			RightPop
		},
		computed: {
			isShowRightPop()
			{
				if (this.isSubmit)
				{
					return true;
				}
				return this.authStatus == 1;
			},
			canEdit()
			{
				return this.authStatus == 0 || this.authStatus == 3;
			}
		},
		methods: {
			init()
			{

				this.userInfo = g.data.userInfo;
				this.authStatus = this.userInfo.authStatus;
				this.companyList = g.data.companyPool.list;
				this.departmentList = [];
				this.dutyList = [];
				if (this.authStatus != 0)
				{
					this.phone = this.userInfo.phone;
					this.remark = this.userInfo.remark;
					this.email = this.userInfo.email;
					this.telphone = this.userInfo.telphone;
					this.avatar = this.userInfo.avatar;
					this.idCardBack = this.userInfo.idCardBack;
					this.idCardFront = this.userInfo.idCardFront;
					this.workCard = this.userInfo.workCard;
					this.currCompanyData = g.data.companyPool.getDataById(this.userInfo.companyId);
					this.currDepartData = g.data.departmentPool.getDataById(this.userInfo.departmentId);
					this.currDutyData = g.data.dutyPool.getDataById(this.userInfo.dutyId);
				}
				else
				{
					this.phone = "";
					this.remark = "";
					this.email = "";
					this.telphone = "";
					this.avatar = "default.png";
					this.currCompanyData = "";
					this.currDepartData = "";
					this.currDutyData = "";
				}
				this.code = "";
				this.initEvents();
				window.uploadComplete = this.uploadComplete;
				window.sendMsg = this.sendMsg;
			},
			sendMsg($type, $info)
			{
				if ($type == "error")
				{
					this.errData[$info.type] = $info.msg;
					this.$forceUpdate();
				}
				else
				{
					this.errData[$info.type] = "";
					this.$forceUpdate();
					_attach.type = $info.type;
				}
			},
			uploadComplete($data)
			{
				this[_attach.type] = $data.fileName;
				this.errData[_attach.type] = "";
				this.$forceUpdate();
			},
			initEvents()
			{
				document.addEventListener('click', this.onClick_doc);
			},
			onClick_doc(e)
			{
				if (this.$refs.company && !this.$refs.company.$el.contains(e.target))
				{
					this.isShowCompanyList = false;
				}
				if (this.$refs.depart && !this.$refs.depart.$el.contains(e.target))
				{
					this.isShowDepartmentList = false;
				}
				if (this.$refs.duty && !this.$refs.duty.$el.contains(e.target))
				{
					this.isShowDutyList = false;
				}
			},
			onClick_company($id)
			{
				this.isShowCompanyList = false;
				this.currCompanyData = g.data.companyPool.getDataById($id);
				this.departmentList = this.currCompanyData.children;
				this.currDepartData = {};
				this.currDutyData = {};
			},
			onClick_department($id)
			{
				this.isShowDepartmentList = false;
				this.currDepartData = g.data.departmentPool.getDataById($id);
				this.dutyList = this.currDepartData.children;
				this.currDutyData = {};
			},
			onClick_duty($id)
			{
				this.isShowDutyList = false;
				this.currDutyData = g.data.dutyPool.getDataById($id);
				this.currDuty = this.currDutyData.name;
			},
			onClick_dropListBtn($type)
			{

				if ($type == "Company")
				{
					this.isShowDepartmentList = false;
					this.isShowDutyList = false;
				}

				if ($type == "Department")
				{
					this.isShowCompanyList = false;
					this.isShowDutyList = false;
				}

				if ($type == "Duty")
				{
					this.isShowDepartmentList = false;
					this.isShowCompanyList = false;
				}

				if (this["isShow" + $type + "List"])
				{
					this["isShow" + $type + "List"] = false;
				}
				else
				{
					this["isShow" + $type + "List"] = true;
				}
				this.errData["curr" + $type] = "";
				this.$forceUpdate();
			},
			onClick_sendCodeBtn()
			{

				this.checkPhoneData();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				this.isClicked = true;
				this.setClock();
				_params = {mobile: this.phone};
				g.net.call("user/applyUserAuthSendCode", _params).then(($data) =>
				{
					g.ui.toast("验证码发送成功!");
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			setClock()
			{
				_timer = setTimeout(()=>
				{
					this.limit--;
					if (this.limit == 0)
					{
						clearTimeout(_timer);
						this.isClicked = false;
						this.limit = g.param.timeoutClock;
					}
					else
					{
						this.setClock();
					}
				}, 1000)
			},
			onClick_deleteImg($type)
			{
				g.net.call(g.param.delPicAccess, {fileName: this[$type]}).then(() =>
				{
				}, (err) =>
				{
					this[$type] = "";
					this.avatar = "default.png";
				})
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
				_params = {
					companyId: this.currCompanyData.id,
					departmentId: this.currDepartData.id,
					dutyId: this.currDutyData.id,
					avatar: this.avatar,
					idcardImgA: this.idCardFront,
					idcardImgB: this.idCardBack,
					workCardImg: this.workCard,
					mobile: this.phone,
					code: this.code,
					telphone: this.telphone,
					email: this.email,
					remark: this.remark
				};
				g.ui.showLoading();
				g.net.call("user/applyUserAuth", _params).then(($data) =>
				{
					g.ui.hideLoading();
					this.isSubmit = true;
					g.ui.toast('申请提交成功！');
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			checkPhoneData()
			{
				if (!this.phone)
				{
					this.errData.phone = "手机号码不能为空";
					_isValid = false;
				}
				else if (!g.param.phoneReg.test(this.phone))
				{
					this.errData.phone = "手机格式有误";
					_isValid = false;
				}
				this.$forceUpdate();

			},
			checkValid()
			{
				this.checkPhoneData();
				if (!this.avatar)
				{
					this.errData.avatar = "请选择用户头像";
					_isValid = false;
				}

				if (!this.code)
				{
					this.errData.code = "请输入验证码";
					_isValid = false;
				}
				else if (!g.param.codeReg.test(this.code))
				{
					this.errData.code = "验证码格式有误";
					_isValid = false;
				}

				if (!this.idCardBack)
				{
					this.errData.idCardBack = "请上传身份证照片";
					_isValid = false;
				}
				if (!this.idCardFront)
				{
					this.errData.idCardFront = "请上传身份证照片";
					_isValid = false;
				}
				if (!this.workCard)
				{
					this.errData.workCard = "请上传工作证件照";
					_isValid = false;
				}
				if (!this.currCompanyData.name)
				{
					this.errData.currCompany = "请选择所属公司";
					_isValid = false;
				}
				if (!this.currDepartData.name)
				{
					this.errData.currDepartment = "请选择所属部门";
					_isValid = false;
				}
				if (!this.currDutyData.name)
				{
					this.errData.currDuty = "请选择所属职务";
					_isValid = false;
				}

				if (this.telphone && !g.param.telphoneReg.test(this.telphone))
				{
					this.errData.telphone = "固话号码格式不正确";
					_isValid = false;
				}

				if (this.email && !g.param.emailReg.test(this.email))
				{
					this.errData.email = "邮箱格式不正确";
					_isValid = false;
				}
				this.$forceUpdate();

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 1;
	}

	.err-msg {
		color: #ed5564;
	}
</style>
