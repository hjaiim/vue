<template>
	<com-layout currPath="/oppapply">
		<div class="apply-wrap">
			<div class="personal-form">
				<span class="personal-title left font-weight">业务名称</span>
				<div class="personal-content left relative form-list font-weight pointer"
					 @click.stop="onClick_dropListBtn">
					{{currType}}
					<i :class="['icon-trangle', isShowTypeList?'rotate':'']"></i>
					<drop-list :dropList="typeList" :isShowDropList="isShowTypeList"
							   @change="onChange_typeItem" ref="typeList"></drop-list>
				</div>
			</div>
			<opp-form-1 v-if="type == 1" :currId="currId" @submit="onSubmit_formData"></opp-form-1>
			<opp-form-2 v-if="type == 2" :currId="currId" @submit="onSubmit_formData"></opp-form-2>
			<opp-form-3 v-if="type == 3" :currId="currId" @submit="onSubmit_formData"></opp-form-3>
			<opp-form-4 v-if="type == 4" :currId="currId" @submit="onSubmit_formData"></opp-form-4>
			<opp-form-5 v-if="type == 5" :currId="currId" @submit="onSubmit_formData"></opp-form-5>
			<opp-form-6 v-if="type == 6" :currId="currId" @submit="onSubmit_formData"></opp-form-6>
			<opp-form-7 v-if="type == 7" :currId="currId" @submit="onSubmit_formData"></opp-form-7>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import OppForm1 from "./oppForm1.vue";
	import OppForm2 from "./oppForm2.vue";
	import OppForm3 from "./oppForm3.vue";
	import OppForm4 from "./oppForm4.vue";
	import OppForm5 from "./oppForm5.vue";
	import OppForm6 from "./oppForm6.vue";
	import OppForm7 from "./oppForm7.vue";
	var _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				typeList: [],
				type: 1,
				isShowTypeList: false
			}
		},
		components: {
			ComLayout,
			DropList,
			InputBar,
			OppForm1,
			OppForm2,
			OppForm3,
			OppForm4,
			OppForm5,
			OppForm6,
			OppForm7
		},
		computed: {
			currType()
			{
				return g.data.staticTypePool.getDataById(this.type) &&
						g.data.staticTypePool.getDataById(this.type).name;
			}
		},
		methods: {
			routerUpdated()
			{

				this.typeList = g.data.staticTypePool.list;
				this.type = g.vue.getQuery('type', 1);
				this.initEvents()
			},

			onSubmit_formData($data)
			{
				_params = {
					businessId: this.type,
					custComName: $data.formData["客户公司名称"],
					boFormData: JSON.stringify($data.formData),
					attachs: JSON.stringify($data.attachList)
				};
				g.net.call("/bo/orderApply", _params).then(($data) =>
				{
					g.ui.toast("商机提交成功");
					this.routerUpdated();
				})
			},
			initEvents()
			{
				document.addEventListener('click', this.onClick_doc)
			},
			onClick_doc(e)
			{
				if (this.$refs.typeList && !this.$refs.typeList.$el.contains(e.target))
				{
					this.isShowTypeList = false;
				}
			},
			onClick_dropListBtn()
			{
				if (this.isShowTypeList)
				{
					this.isShowTypeList = false;
				}
				else
				{
					this.isShowTypeList = true;
				}
			},
			onChange_typeItem($id)
			{
				if (this.type != $id)
				{
					this.type = $id;
					this.updateUrl();
					this.isShowTypeList = false;
				}
			},
			updateUrl()
			{
				g.url = {
					path: "/oppapply",
					query: {
						type: this.type
					}
				}
			}
		},
		beforeDestroy()
		{
			document.removeEventListener('click', this.onClick_doc);
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.apply-wrap {
		padding: 20px 44px 50px 44px;
	}

	@import "../../css/oppApply.scss";
</style>