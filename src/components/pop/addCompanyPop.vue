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
								   v-model="name" :errmsg="errData.name"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司电话</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="telphone" :errmsg="errData.telphone"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司负责人</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="leader" :errmsg="errData.leader"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">负责人电话</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="phone" :errmsg="errData.phone"></input-bar>
						<span class="requied">*</span>
					</p>
					<div class="pop-btn right pointer" @click="onClick_saveCompany">保存</div>
				</div>
				<div class="message-wrap">
					<div class="message-wrap" is="scroll-group">
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
									   v-model="duty.name"></input-bar>

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
                        	<span class="pointer btn-save" @click="onClick_saveDepart">保存</span>
						</span>
							</p>
							<p class="from-group">
								<span class="form-title">职务名称</span>
						<span>
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="dutyName"></input-bar>
                            <span class="pointer btn-save  ani-time" @click="onClick_saveDuty">保存</span>
						</span>
							</p>

						</div>

					</div>
				</div>
				<div class="company-action clear">
					<div class="btn-submit pop-btn top-btn right pointer" @click="onClick_submitBtn">提交</div>
				</div>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import InputBar from "../inputBar.vue";
	import ScrollGroup from "../scrollGroup.vue"
	var _params = null, _isValid = true, _departId = 0, _companyId = 0;
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
				authStatus: 0,
				errData: {}
			}
		},
		components: {
			ViewPopup,
			InputBar,
			ScrollGroup
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
				this.authStatus = g.data.userInfo.authStatus;
				_companyId = this.currId;
				if (this.currId)
				{
					this.companyData = g.data.companyPool.getDataById(this.currId);
					this.name = this.companyData.name;
					this.telphone = this.companyData.telphone;
					this.leader = this.companyData.leader;
					this.phone = this.companyData.phone;
					this.departmentList = this.companyData.children;
				}
				else
				{
					this.name = "";
					this.telphone = "";
					this.leader = "";
					this.phone = "";
					this.departmentList = [];
				}
			},
			onClose_pop(){
				this.$emit('close', false);
			},
			onClick_saveDepart()
			{
				this.onClick_editDepart({id: 0});
			},
			onClick_saveDuty()
			{
				this.onClick_editDuty({
					id: 0,
					parentId: _departId,
					companyId: _companyId
				});
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
					companyId: _companyId
				};
				g.net.call("organizeOpt/editDepartment", _params).then(($data) =>
				{
					_departId = $data.departmentId;
					if ($depart.id == 0)
					{
						g.data.departmentPool.update([$data]);
					}
					else
					{
						g.data.departmentPool.getDataById($depart.id).update($data);
					}
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
				g.net.call("organizeOpt/editDuty", _params).then(($data) =>
				{
					if ($duty.id == 0)
					{
						g.data.dutyPool.update([$data]);
					}
					else
					{
						g.data.dutyPool.getDataById($duty.id).update($data);
					}
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
			onClick_saveCompany()
			{
				this.checkValid();
				if (!_isValid)
				{
					return;
				}
				_params = {
					comId: this.currId,
					comName: this.name,
					comLinkMan: this.leader,
					comLinkManTel: this.phone,
					comLinkTel: this.telphone
				};
				g.net.call("organizeOpt/editCompany", _params).then(($data) =>
				{
					_companyId = $data.comId;
					if (this.currId == 0)
					{
						g.data.companyPool.update([$data]);
					}
					else
					{
						g.data.companyPool.getDataById(this.currId).update($data);
					}
				})
			},
			onClick_submitBtn()
			{

			},
			checkValid()
			{

				if (!this.name)
				{
					this.errData.name = "请输入公司名称";
					_isValid = false;
				}
				if (!this.leader)
				{
					this.errData.leader = "请输入负责人姓名";
					_isValid = false;
				}
				if (!this.phone)
				{
					this.errData.phone = "请输入负责人电话";
					_isValid = false;
				}
				if (!this.telphone)
				{
					this.errData.telphone = "请输入公司电话";
					_isValid = false;
				}
				this.$forceUpdate();
//
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>
