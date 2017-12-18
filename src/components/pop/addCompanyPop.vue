<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="mod-company-pop">
		<div class="mod-company-container">
			<p class="mod-tit">新建公司信息</p>
			<div class="mod-company-content">
				<div class="company-message">
					<p class="from-group">
						<span class="form-title">公司名称</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="name"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司电话</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="telphone"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司负责人</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="leader"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">负责人电话</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="phone"></input-bar>
						<span class="requied">*</span>
					</p>
					<div class="pop-btn right pointer">保存</div>

				</div>
				<div class="meaasge-wrap">
					<div class="company-message" v-for="item in departmentList">
						<img :src="g.path.images+'/del.png'" alt="" class="del-depart pointer"
							 @click="onClick_deleteDepart(item)">
						<p class="from-group">
							<span class="form-title">部门名称</span>
                        <span v-show="currId != 0">
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="item.name"></input-bar>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
								 @click="onClick_editDepart(item)">
                        	<span class="pointer btn-save">保存</span>
						</span>
						</p>
						<p class="from-group" v-for="duty in item.children">
							<span class="form-title">职务名称</span>
						<span v-show="currId != 0">
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="dutyName"></input-bar>
                            <span class="pointer btn-save  ani-time">保存</span>
							<img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
								 @click="onClick_editDuty(duty)">
							<img :src="g.path.images+'/del-depart.png'" alt="" class="edit-icon pointer"
								 @click="onClick_deleteDuty(duty)">
						</span>
						</p>
					</div>

					<div class="company-message">
						<p class="from-group">
							<span class="form-title">部门名称</span>
                        <span>
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="departName"></input-bar>
                        	<span class="pointer btn-save">保存</span>
						</span>
						</p>
						<p class="from-group">
							<span class="form-title">职务名称</span>
						<span>
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="dutyName"></input-bar>
                            <span class="pointer btn-save  ani-time">保存</span>
						</span>
						</p>

					</div>
					<div class="company-action clear">
						<div class="btn-submit pop-btn top-btn right pointer" @click="onClick_submitBtn">提交</div>
					</div>
				</div>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import InputBar from "../inputBar.vue";
	var _params = null;
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				name: "",
				telphone: "",
				leader: "",
				phone: "",
				departName: '',
				dutyName: "",
				departmentList: [],
				isShowEdit: false
			}
		},
		components: {
			ViewPopup,
			InputBar
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			currId: {
				type: Number,
				default: 0
			}
		},
		watch: {
			currId($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				trace("this.currId", this.currId);
				if (this.currId)
				{
					this.companyData = g.data.companyPool.getDataById(this.currId);
					this.name = this.companyData.name;
					this.telphone = this.companyData.telphone;
					this.leader = this.companyData.leader;
					this.phone = this.companyData.phone;
					this.departmentList = this.companyData.children;
				}
			},
			onClose_pop(){
				this.$emit('close', false);
			},
			onClick_deleteDepart($depart)
			{
				_params = {departmentId: $depart.id};
				g.net.call("organizeOpt/deleteDepartmentById", _params).then(() =>
				{
					g.data.departmentPool.remove($depart.id);
				})
			},
			onClick_editDepart($depart)
			{
				_params = {
					departmentId: $depart.id,
					departmentName: this.departName,
					companyId: $depart.parentId
				};
				g.net.call("organizeOpt/editDepartment", _params).then((data) =>
				{
					g.data.departmentPool.getDataById($depart.id).update(data);
				})
			},
			onClick_editDuty($duty)
			{
				_params = {
					dutyId: $duty.id,
					dutyName: this.dutyName,
					departmentId: $duty.parentId,
					companyId: $duty.companyId
				};
				g.net.call("organizeOpt/editDuty", _params).then((data) =>
				{
					g.data.dutyPool.getDataById($duty.id).update(data);
				})
			},
			onClick_deleteDuty($duty)
			{
				_params = {
					dutyId: $duty.id
				};
				g.net.call("organizeOpt/deleteDutyById", _params).then((data) =>
				{
					g.data.dutyPool.remove($duty.id);
				})
			},
			onClick_submitBtn()
			{
				_params = {
					comId: this.currId,
					comName: this.name,
					comLinkMan: this.leader,
					comLinkManTel: this.phone,
					comLinkTel: this.telphone
				};
				g.net.call("organizeOpt/editCompany", _params).then((data) =>
				{
					g.ui.toast("信息修改成功");
				})
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>
