<template>
	<com-layout currId="percenter" currPath="/verify">
		<div class="percenter-wrap">
			<div class="percenter-inner">
				<div class="icon-collect clear">
					<div class="relative upload-head right pointer">
						<img class="default-img" :src="avatar?avatar:g.path.images+'/default-icon.png'" alt="">
						<div class="upload-btn absolute">
							<p class="load-text">修改头像</p>
							<upload-btn @change="onChange_upload" resultType="base64"></upload-btn>
							<img :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer">
						</div>
					</div>
				</div>
			</div>
			<div class="personal-message">
				<div class="personal-form"><span class="personal-title ">登录用户名</span><span
						class="personal-content">{{userInfo.username}}
				</span>
				</div>
				<div class="personal-form"><span class="personal-title">姓名</span><span
						class="personal-content">{{userInfo.name}}</span></div>
				<div class="personal-form">
					<span class="personal-title left">所属公司</span>
					<div class="personal-content left relative form-list pointer"
						 @click="onClick_dropListBtn('Company')">
						{{currCompany}}
						<i :class="['icon-trangle', isShowCompanyList?'rotate':'']"></i>
						<drop-list :dropList="companyList" :isShowDropList="isShowCompanyList"
								   @change="onClick_company"></drop-list>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">所属部门</span>
					<div class="personal-content left relative form-list pointer"
						 @click="onClick_dropListBtn('Department')">
						{{currDepartment}}
						<i class="pointer" :class="['icon-trangle', isShowDepartmentList?'rotate':'']"></i>
						<drop-list :dropList="departmentList" :isShowDropList="isShowDepartmentList"
								   @change="onClick_department"></drop-list>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">职务名称</span>
					<div class="personal-content left relative form-list" @click="onClick_dropListBtn('Post')">
						{{currDuty}}
						<span :class="['icon-trangle', isShowPostList?'rotate':'']"></span>
						<drop-list :dropList="dutyList" :isShowDropList="isShowPostList"
								   @change="onClick_duty"></drop-list>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">手机</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="phone"></input-bar>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">验证码</span>
					<input-bar class="personal-content pensonal-input code left" placeholder="" type="text"
							   v-model="code"></input-bar>
					<span class="btn-send pointer left">发送验证码</span>
				</div>
				<div class="personal-form"><span class="personal-title left">固定电话</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="telphone"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title left">电子邮箱</span>
					<input-bar class="personal-content pensonal-input left" placeholder="" type="text"
							   v-model="email"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title left">备注</span>
					<input-bar class="personal-content pensonal-input note left" placeholder="" type="text"
							   v-model="remark"></input-bar>
				</div>
				<div class="personal-form">
					<span class="personal-title left">身份证照</span>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">正面</p>
						</div>
						<img class="img-url absolute" :src="idCardFront?idCardFront:''" alt="">
						<span class="del-img pointer" :class="idCardFront?'hover-img':''"></span>
						<upload-btn class="input-file" @change="onChange_uploadPros" resultType="base64"></upload-btn>
					</div>
					<div class="left relative upload-box pointer">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">反面</p>
						</div>
						<img class="img-url absolute" :src="idCardBack?idCardBack:''" alt="">
						<span class="del-img pointer" :class="idCardBack?'hover-img':''"></span>
						<upload-btn class="input-file" @change="onChange_uploadCons" resultType="base64"></upload-btn>
					</div>
				</div>
				<div class="personal-form">
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
						<img class="img-url absolute" :src="workCard?workCard:''" alt="">
						<span class="del-img pointer" :class="workCard?'hover-img':''"></span>
						<upload-btn class="input-file" @change="onChange_uploadWork" resultType="base64"></upload-btn>

					</div>
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
	import DropList from "../../components/dropList.vue"
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
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
				currCompany: "",
				departmentList: [],
				currDepartment: "",
				dutyList: [],
				currDuty: "",
				isVerified:false,
				isShowDepartmentList: false,
				isShowCompanyList: false,
				isShowPostList: false
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
				this.isVerified = (this.userInfo.authSatus == 2);
				if(this.isVerified)
				{
					this.phone = this.userInfo.phone;
					this.remark = this.userInfo.remark;
					this.email = this.userInfo.email;
					this.telphone = this.userInfo.telphone;
					this.avatar = this.userInfo.avatar;
					this.idCardBack = this.userInfo.idCardBack;
					this.idCardFront = this.userInfo.idCardFront;
					this.workCard = this.userInfo.workCard;
					this.currCompany = this.userInfo.companyName;
					this.currDepartment = this.userInfo.departmentName;
					this.currDuty = this.userInfo.dutyName;
				}
				else
				{
					this.phone = "";
					this.remark = "";
					this.email = "";
					this.telphone = "";
					this.avatar = "";
					this.idCardBack = "";
					this.idCardFront = "";
					this.workCard = "";
					this.currCompany = "";
					this.currDepartment = "";
					this.currDuty = "";
					this.code = "";
					this.companyList = g.data.companyPool.list;
				}

			},
			onClick_company($id)
			{
				this.isShowCompanyList = false;
				var companyData = g.data.companyPool.getDataById($id);
				this.departmentList = companyData.children;
				this.currCompany = companyData.name;
			},
			onClick_department($id)
			{
				this.isShowDepartmentList = false;
				var departmentData = g.data.departmentPool.getDataById($id);
				this.dutyList = departmentData.children;
				this.currDepartment = departmentData.name;
			},
			onClick_duty($id)
			{
				this.isShowPostList = false;
				var dutyData = g.data.dutyPool.getDataById($id);
				this.currDuty = dutyData.name;
			},
			onClick_dropListBtn($type){
				if (this["isShow" + $type + "List"])
				{
					this["isShow" + $type + "List"] = false;
				}
				else
				{
					this["isShow" + $type + "List"] = true;
				}
			},
			onChange_upload($list)
			{
				trace("onChange_upload", $list);
				this.imgUrl = $list;
			},
			onChange_uploadPros($list){
				trace("onChange_upload", $list);
				this.imgProsUrl = $list;
			},
			onChange_uploadCons($list){
				trace("onChange_upload", $list);
				this.imgConsUrl = $list;
			},
			onChange_uploadWork($list){
				trace("onChange_upload", $list);
				this.imgWorkUrl = $list;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
<!--<style type="text/css" lang="sass" rel="stylesheet/css">-->
<!--@import "../../css/personal.scss";-->
<!--</style>-->
