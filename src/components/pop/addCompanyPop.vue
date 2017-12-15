<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="mod-company-pop">
		<div class="mod-company-container">
			<p class="mod-tit">新建公司信息</p>
			<div class="mod-company-content">
				<div class="company-message">
					<p class="from-group">
						<span class="form-title">公司名称</span>
						<input type="text" class="form-control" v-model="name">
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司电话</span>
						<input type="text" class="form-control" v-model="telphone">
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">公司负责人</span>
						<input type="text" class="form-control" v-model="leader">
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title">负责人电话</span>
						<input type="text" class="form-control" v-model="phone">
						<span class="requied">*</span>
					</p>
					<div class="pop-btn right pointer">保存</div>

				</div>
				<div class="company-message">
					<img :src="g.path.images+'/del.png'" alt="" class="del-depart">
					<p class="from-group">
						<span class="form-title">部门名称</span>
                        <span v-show="currId != 0">
                            <span class="form-trap">研发部</span>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
								 @click="onClick_editBtn">
                        </span>
                        <span v-show="currId == 0">
                            <input type="text" class="form-control" v-model="departName">
                            <span class="pointer btn-save">保存</span>
                        </span>
					</p>
					<p class="from-group">
						<span class="form-title">职务名称</span>
						<span v-show="currId != 0">
							<span class="form-trap">研发部主管</span>
							<img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
						</span>
                        <span v-show="currId == 0">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
					</p>
				</div>
				<div class="company-message">
					<img :src="g.path.images+'/del.png'" alt="" class="del-depart">
					<p class="from-group">
						<span class="form-title">部门名称</span>
                       	<span v-show="currId != 0">
                            <span class="form-trap">销售部</span>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
                        </span>
                     <span v-show="currId == 0">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
					</p>
					<p class="from-group">
						<span class="form-title">职务名称</span>
						<span v-show="currId != 0">
							<span class="form-trap">销售部经理</span>
						<img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
						</span>
                         <span v-show="currId == 0">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
						<img :src="g.path.images+'/del-depart.png'" alt="" class="edit-icon pointer">
					</p>
				</div>

				<div class="btn-submit pop-btn top-btn right pointer" @click="onClick_submitBtn">提交</div>
			</div>


		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue"
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				isShowEdit: false
			}
		},
		components: {
			ViewPopup
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			currId: {
				type: Number
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
				trace("this.currId",this.currId);
				if (!this.currId)
				{
					this.companyData = g.data.companyPool.getDataById(this.currId)
				}
			},
			onClose_pop(){
				this.$emit('close', false);
			},
			onClick_editBtn(){
				this.isShowEdit = true;
			},
			onClick_submitBtn()
			{
				this.$emit('close', true);
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>
