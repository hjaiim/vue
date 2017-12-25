<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="mod-company-pop">
		<div class="mod-company-container">
			<p class="mod-tit">{{currId>0?'编辑公司信息':'新建公司信息'}}</p>
			<div class="mod-company-content">
				<div class="company-message">
					<p class="from-group">
						<span class="form-title">公司名称</span>
						<input-bar class="form-control " :class="currentId != 0?'company-input':''" placeholder=""
								   type="text"
								   :readonly="currentId != 0"
								   v-model="name" :errmsg="errData.name" @focus="onFocus_inputBar('name')"></input-bar>
						<span class="requied" v-show="currentId == 0">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司电话</span>
						<input-bar class="form-control" placeholder="" type="text" :readonly="currentId != 0"
								   v-model="telphone" :errmsg="errData.telphone"
								   @focus="onFocus_inputBar('telphone')"></input-bar>
						<span class="requied" v-show="currentId == 0">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司负责人</span>
						<input-bar class="form-control" placeholder="" type="text" :readonly="currentId != 0"
								   v-model="leader" :errmsg="errData.leader"
								   @focus="onFocus_inputBar('leader')"></input-bar>
						<span class="requied" v-show="currentId == 0">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">负责人电话</span>
						<input-bar class="form-control" placeholder="" type="text" :readonly="currentId != 0"
								   v-model="phone" :errmsg="errData.phone"
								   @focus="onFocus_inputBar('phone')"></input-bar>
						<span class="requied" v-show="currentId == 0">*</span>
					</p>
					<div class="btn-wrap clear">
						<div class="pop-btn right pointer" @click="onClick_saveCompany" v-if="currentId == 0">保存
						</div>
						<div class="pop-btn right pointer" @click="onClick_editCompany" v-if="currentId != 0">编辑
						</div>
					</div>
				</div>
				<div class="message-wrap">
					<div class="message-wrap" is="scroll-group">
						<div class="company-message" v-for="item in departmentList">
							<img :src="g.path.images+'/del.png'" alt="" class="del-depart pointer"
								 @click="onClick_deleteDepart(item)">
							<p class="from-group">
								<span class="form-title">部门名称</span>
                        <span v-show="currentId != 0">
							<input-bar class="form-control" placeholder="" type="text" :readonly="!item.isEdit"
									   v-model="item.name"></input-bar>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
								 @click="onClick_editDepart(item)" v-if="!item.isEdit">
							<span class="pointer btn-save" @click="onClick_saveDepart(item)"
								  v-if="item.isEdit">保存</span>
						</span>
							</p>
							<p class="from-group" v-for="duty in item.children">
								<span class="form-title">职务名称</span>
							<span v-show="currentId != 0">
								<input-bar class="form-control" placeholder="" type="text"
										   v-model="duty.name" :readonly="!duty.isEdit"></input-bar>
								<img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
									 @click="onClick_editDuty(duty)" v-if="!duty.isEdit">
								<span class="pointer btn-save  ani-time" @click="onClick_saveDuty(duty,'duty')"
									  v-if="duty.isEdit">保存</span>
								<img :src="g.path.images+'/del-depart.png'" alt="" class="edit-icon pointer"
									 @click="onClick_deleteDuty(duty)">
							</span>
							</p>
							<p class="from-group">
								<span class="form-title">职务名称</span>
								<span>
								<input-bar class="form-control" placeholder="" type="text"
										   v-model="item.dutyName"></input-bar>
                            	<span class="pointer btn-save  ani-time" @click="onClick_saveDuty(item,'depart')">保存
								</span>
								</span>
							</p>
						</div>
						<div class="company-message">
							<p class="from-group">
								<span class="form-title">部门名称</span>
                        <span>
							<input-bar class="form-control" placeholder="" type="text"
									   v-model="departName"></input-bar>
                        	<span class="pointer btn-save" @click="onClick_saveDepart()">保存</span>
						</span>

							</p>

						</div>

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
				currentId: "",
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
				this.currentId = this.currId;
				if (this.currId)
				{
					this.companyData = g.data.searchCompanyPool.getDataById(this.currId);
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
					this.errData = {};
				}
			},
			onClose_pop()
			{
				this.init();
				this.$emit('close', false);
			},
			onFocus_inputBar($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			onClick_saveDepart($depart)
			{
				if (!$depart)
				{
					$depart = {
						id: 0,
						name: this.departName,
						parentId: this.currId
					}
				}

				_params = {
					departmentId: $depart.id,
					departmentName: $depart.name,
					companyId: $depart.parentId
				};
				g.net.call("organizeOpt/editDepartment", _params).then(($data) =>
				{
					_departId = $data.departmentId;
					if ($depart.id == 0)
					{
						g.data.departmentPool.add($data);
						this.departName = "";
					}
					else
					{
						g.data.departmentPool.getDataById($depart.id).update($data);
					}
					g.data.departmentPool.getDataById($data.departmentId).update({isEdit: false});

				})
			},
			onClick_saveDuty($duty, $type)
			{
				if ($type != "duty")
				{
					$duty = {
						id: 0,
						name: $duty.dutyName,
						parentId: $duty.id,
						companyId: $duty.parentId
					}
				}
				_params = {
					dutyId: $duty.id,
					dutyName: $duty.name,
					departmentId: $duty.parentId,
					companyId: $duty.companyId
				};
				g.net.call("organizeOpt/editDuty", _params).then(($data) =>
				{
					if ($duty.id == 0)
					{
						g.data.dutyPool.add($data);
						g.data.departmentPool.getDataById($data.departmentId).update({dutyName: ""});
					}
					else
					{
						g.data.dutyPool.getDataById($duty.id).update($data);
					}
					g.data.dutyPool.getDataById($data.dutyId).update({isEdit: false});
				})
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
				g.data.departmentPool.getDataById($depart.id).update({isEdit: true})
			},
			onClick_editDuty($duty)
			{
				g.data.dutyPool.getDataById($duty.id).update({isEdit: true})
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
					_isValid = true;
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
					this.currentId = $data.comId;
					if (this.currId != 0)
					{
						g.data.searchCompanyPool.getDataById(this.currId).update($data);
					}
				})
			},
			onClick_editCompany()
			{
				this.currentId = 0;
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
				else if (!g.param.nameReg.test(this.leader))
				{
					this.errData.leader = "负责人格式不正确";
					_isValid = false;
				}
				if (!this.phone)
				{
					this.errData.phone = "请输入负责人电话";
					_isValid = false;
				}
				else if (!g.param.phoneReg.test(this.phone) && !g.param.telphoneReg.test(this.phone))
				{
					this.errData.phone = "号码格式不正确";
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
