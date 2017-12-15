<template>
	<com-layout currId="percenter" currPath="/verify">
		<div class="percenter-wrap">
			<div class="percenter-inner">
				<div class="icon-collect clear">
					<!--<div class="default-img right">-->
					<!--<img :src="g.path.images+'/default-icon.png'" alt="">-->
					<!--</div>-->
					<div class="relative upload-head right pointer">
						<img :src="userInfo.avatar?userInfo.avatar:g.path.images+'/del-head.png'" alt=""
							 class="del-head absolute">
						<input type="file" class="absolute load-head">
						<p class="load-text">上传头像</p>
					</div>
					<div class="relative upload-head right pointer">
						<img :src="g.path.images+'/del-head.png'" alt="" class="del-head absolute">
						<img :src="g.path.images+'/default-icon.png'" alt="">
						<div class="upload-btn">
							<upload-btn @change="onChange_upload" resultType="base64"></upload-btn>
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
					<div class="personal-content left relative form-list" @click="onClick_dropListBtn('Company')">
						{{currCompany}}
						<span :class="['icon-trangle', isShowCompanyList?'rotate':'']"></span>
						<ul class="absolute drop-list" v-show="isShowCompanyList">
							<li v-for="item in companylist" @click.stop="onClick_company(item.id)">{{item.name}}</li>
						</ul>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">所属部门</span>
					<div class="personal-content left relative form-list"
						 @click="onClick_dropListBtn('Department')">
						{{currDepartment}}
						<span :class="['icon-trangle', isShowDepartmentList?'rotate':'']"></span>
						<ul class="absolute drop-list" v-show="isShowDepartmentList">
							<li v-for="item in departmentList" @click.stop="onClick_department(item.id)">{{item.name}}
							</li>
						</ul>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">职务名称</span>
					<div class="personal-content left relative form-list" @click="onClick_dropListBtn('Post')">
						{{currDuty}}
						<span :class="['icon-trangle', isShowPostList?'rotate':'']"></span>
						<ul class="absolute drop-list" v-show="isShowPostList">
							<li v-for="item in dutyList" @click.stop="onClick_duty(item.id)">{{item.name}}</li>
						</ul>
					</div>
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">手机</span>
					<input class="personal-content pensonal-input left" :value="userInfo.phone">
					<span class="required">*</span>
				</div>
				<div class="personal-form">
					<span class="personal-title left">验证码</span>
					<input class="personal-content pensonal-input code left">
					<span class="btn-send pointer left">发送验证码</span>
				</div>
				<div class="personal-form"><span class="personal-title left">固定电话</span><input
						class="personal-content pensonal-input left" :value="userInfo.telphone"></div>
				<div class="personal-form"><span class="personal-title left">电子邮箱</span><input
						class="personal-content pensonal-input left" :value="userInfo.email"></div>
				<div class="personal-form"><span class="personal-title left">备注</span><input
						class="personal-content pensonal-input note left" :value="userInfo.remark"></div>
				<div class="personal-form">
					<span class="personal-title left">身份证照</span>
					<div class="left relative upload-box pointer">
						<img :src="g.path.images+'/del-icon.png'" alt="" class="del-img">
						<input type="file" class="input-file">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">正面</p>
						</div>
					</div>
					<div class="left relative upload-box pointer">
						<img :src="g.path.images+'/del-icon.png'" alt="" class="del-img">
						<input type="file" class="input-file">
						<div class="upload-btn flex">
							<img :src="g.path.images+'/upload.png'" alt="">
							<p class="upload-text">反面</p>
						</div>
					</div>
				</div>
				<div class="personal-form">
					<span class="personal-title left">工作证照</span>
					<div class="left relative upload-box pointer">
						<img :src="g.path.images+'/del-icon.png'" alt="" class="del-img">
						<input type="file" class="input-file">
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
	export default{
		created(){
			this.init();

		},
		data(){
			return {
				g: g,
				userInfo: {},
				companyList: [],
				currCompany: "",
				departmentList: [],
				currDepartment: "",
				dutyList: [],
				currDuty: "",
				isShowDepartmentList: false,
				isShowCompanyList: false,
				isShowPostList: false,
			}
		},
		components: {
			ComLayout,
			UploadBtn
		},
		computed: {},
		methods: {
			init()
			{
				this.userInfo = g.data.userInfo;
				this.companylist = g.data.companyPool.list;
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
