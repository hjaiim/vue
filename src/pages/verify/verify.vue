<template>
	<com-layout currId="percenter" currPath="/verify">
		<div class="percenter-wrap">
			<div class="percenter-inner" :class="authStatus != 0?'disabled':''">
				<div class="icon-collect clear">
					{{errData.avatar}}
					<div class="relative upload-head right pointer">
						<img class="default-img" :src="avatar?g.param.ossUrl+avatar:g.path.images+'/default-icon.png'"
							 alt="">
						<div class="absolute upload-btn">
							<p class="load-text">修改头像</p>
							<iframe name="fileUpload"
									:src="g.path.base+'upload.html?type=pic&redirectUrl='+g.path.base+'uploadApi.html?subType=avatar'"
									id="avatar" v-show="!avatar"
							></iframe>
							<img v-show="avatar" :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer" @click="onClick_deleteImg('avatar')">
						</div>
					</div>
				</div>
			</div>
			<div class="personal-message">
				<div class="personal-form diff-personal"><span class="personal-title ">登录用户名</span><span
						class="personal-content">{{userInfo.username}}
				</span>

				</div>
				<div class="personal-form diff-personal"><span class="personal-title">姓名</span><span
						class="personal-content">{{userInfo.name}}</span></div>
				<div class="personal-form diff-personal">
					<p class="err-msg"> {{errData.currCompany}}</p>
					<span class="personal-title left">所属公司</span>
					<div class="personal-content left relative form-list pointer"
						 :class="authStatus != 0 ?'disabled':''"
						 @click.stop="onClick_dropListBtn('Company')">
						{{currCompanyData.name}}
						<i :class="['icon-trangle', isShowCompanyList?'rotate':'']"></i>
						<drop-list :dropList="companyList" :isShowDropList="isShowCompanyList"
								   @change="onClick_company" ref="company"></drop-list>
					</div>
					<span class="required" v-show="authStatus == 0">*</span>
				</div>
				<div class="personal-form diff-personal">
					<p class="err-msg"> {{errData.currDepartment}}</p>
					<span class="personal-title left">所属部门</span>
					<div class="personal-content left relative form-list pointer"
						 :class="authStatus != 0 ?'disabled':''"
						 @click.stop="onClick_dropListBtn('Department')">
						{{currDepartData.name}}
						<i class="pointer" :class="['icon-trangle', isShowDepartmentList?'rotate':'']"></i>
						<drop-list :dropList="departmentList" :isShowDropList="isShowDepartmentList"
								   @change="onClick_department" ref="depart"></drop-list>
					</div>
					<span class="required" v-show="authStatus == 0">*</span>
				</div>
				<div class="personal-form diff-personal">
					<p class="err-msg"> {{errData.currDuty}}</p>
					<span class="personal-title left">职务名称</span>
					<div class="personal-content left relative form-list"
						 :class="authStatus != 0 ?'disabled':''"
						 @click.stop="onClick_dropListBtn('Duty')">
						{{currDutyData.name}}
						<span :class="['icon-trangle', isShowDutyList?'rotate':'']"></span>
						<drop-list :dropList="dutyList" :isShowDropList="isShowDutyList"
								   @change="onClick_duty" ref="duty"></drop-list>
					</div>
					<span class="required" v-show="authStatus == 0">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">手机</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="phone" @focus="onFocus_inputBar('phone')" :errmsg="errData.phone"
							   :readonly="authStatus != 0"></input-bar>
					<span class="required" v-show="authStatus == 0">*</span>
				</div>
				<div class="personal-form" v-if="authStatus == 0">
					<span class="personal-title left">验证码</span>
					<input-bar class="personal-content pensonal-input code left" placeholder="" type="text"
							   v-model="code" @focus="onFocus_inputBar('code')" :errmsg="errData.code"></input-bar>
					<span class="btn-send pointer left ani-time" @click="onClick_sendCodeBtn">发送验证码</span>
				</div>
				<div class="personal-form"><span class="personal-title left">固定电话</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   :readonly="authStatus != 0"
							   v-model="telphone" @focus="onFocus_inputBar('telphone')"
							   :errmsg="errData.telphone"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title left">电子邮箱</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   :readonly="authStatus != 0"
							   v-model="email" @focus="onFocus_inputBar('email')" :errmsg="errData.email"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title left">备注</span>
					<input-bar class="personal-content pensonal-input note left" placeholder="" type="text"
							   :readonly="authStatus != 0"
							   v-model="remark" @focus="onFocus_inputBar('remark')"
							   :errmsg="errData.remark"></input-bar>
				</div>
				<div class="personal-form" :class="authStatus != 0 ?'disabled':''">
					<p class="err-msg"> {{errData.idCardBack || errData.idCardFront}}</p>
					<span class="personal-title left">身份证照</span>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">正面</p>
						</div>
						<div class="img-contain absolute" v-show="idCardFront">
							<img class="img-url " :src="idCardFront?g.param.ossUrl+idCardFront:''" alt="">
						</div>
						<iframe class="pointer" name="fileUpload"
								:src="g.path.base+'upload.html?type=pic&redirectUrl='+g.path.base+'uploadApi.html?subType=idCardFront'"
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
								:src="g.path.base+'upload.html?type=pic&redirectUrl='+g.path.base+'uploadApi.html?subType=idCardBack'"
								v-if="!idCardBack" id="idCardBack"></iframe>
						<span class="del-img pointer" :class="idCardBack?'hover-img':''"
							  @click="onClick_deleteImg('idCardBack')"></span>
					</div>
				</div>
				<div class="personal-form" :class="authStatus != 0 ?'disabled':''">
					<p class="err-msg"> {{errData.workCard}}</p>
					<span class="personal-title left">工作证照</span>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">
								点击上传工作证照片<br>
                                <span>
                                    支持jpg/gif/png格式<br>
                                    不超过10M长<800,<br>
                                    宽<200
                                </span>
							</p>
						</div>
						<div class="img-contain absolute" v-show="workCard">
							<img class="img-url " :src="workCard?g.param.ossUrl+workCard:''" alt="">
						</div>
						<iframe class="pointer" name="fileUpload"
								:src="g.path.base+'upload.html?type=pic&redirectUrl='+g.path.base+'uploadApi.html?subType=workCard'"
								id="workCard" v-if="!workCard"></iframe>
						<span class="del-img pointer" :class="workCard?'hover-img':''"
							  @click="onClick_deleteImg('workCard')"></span>
					</div>
				</div>
				<div class="btn btn-save pointer action-btn ani-time " @click="onClick_submitBtn"
					 v-if="authStatus == 0">提交
				</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import UploadBtn from "../../components/upload.vue";
	import InputBar from "../../components/inputBar.vue";
	import DropList from "../../components/dropList.vue";
	var _isValid = true, _params = null, _type = "";
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
				isShowDutyList: false
			}
		},
		components: {
			ComLayout,
			UploadBtn,
			InputBar,
			DropList
		},
		computed: {},
		methods: {
			init()
			{
				this.userInfo = g.data.userInfo;
				this.authStatus = this.userInfo.authStatus;
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
					this.avatar = "default-icon.png";
					this.idCardBack = "";
					this.idCardFront = "";
					this.workCard = "";
					this.currCompanyData = "";
					this.currDepartData = "";
					this.currDutyData = "";
					this.companyList = g.data.companyPool.list;
				}
				this.code = "";
				this.initEvents();
				window.uploadComplete = this.uploadComplete;
			},
			initEvents()
			{
				document.addEventListener('click', this.onClick_doc);
			},
			uploadComplete($data)
			{
				trace("$data", $data);
				this[$data.subType] = $data.fileName;

			},
			onClick_upload($type)
			{
				trace("$type", $type)
				_type = $type;
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
			},
			onClick_department($id)
			{
				this.isShowDepartmentList = false;
				this.currDepartData = g.data.departmentPool.getDataById($id);
				this.dutyList = this.currDepartData.children;
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
			},

			onClick_sendCodeBtn()
			{
				this.checkPhoneData();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params = {mobile: this.phone};
				g.net.call("user/applyUserAuthSendCode", _params).then(($data) =>
				{
					g.ui.toast("验证码发送成功!");
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClick_deleteImg($type)
			{
				g.net.call(g.param.delPicAccess, {fileName: this[$type]}).then(() =>
				{
				}, (err) =>
				{
					this[$type] = "";
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

				g.net.call("user/applyUserAuth", _params).then(($data) =>
				{
					this.init();
					g.ui.toast('申请提交成功！')
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
</style>
