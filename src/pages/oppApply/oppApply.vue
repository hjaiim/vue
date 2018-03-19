<template>
	<com-layout currPath="/oppapply">
		<div class="apply-wrap">
			<div class="personal-form">
				<span class="personal-title left font-weight">商机类型</span>
				  <span class="action-box status-type left pointer" v-for="item in busList" @click="onChange_BusTypeItem(item.id)">
                        <i class="draw-round " :class="currBusId==item.id?'action':''"></i>
                        <span>{{item.name}}</span>
                 </span>
			</div>
			<div class="personal-form" >
				<span class="personal-title left font-weight">业务小类</span>
				<div class="personal-content left relative form-list font-weight pointer"
					 @click.stop="onClick_dropListBtn" v-if="currBusId == 1">
					{{currType}}
					<i :class="['icon-trangle', isShowTypeList?'rotate':'']"></i>
					<drop-list :dropList="typeList" :isShowDropList="isShowTypeList"
							   @change="onChange_typeItem" ref="typeList"></drop-list>
				</div>
				 <span class="action-box status-type left pointer" v-if="currBusId != 1" v-for="item in typeList" @click="onChange_typeItem(item.id)">
                        <i class="draw-round " :class="type==item.id?'action':''"></i>
                        <span>{{item.name}}</span>
                 </span>
			</div>
			<div class="personal-form" >
				<span class="personal-title left font-weight">商机行业类型</span>
				 <span class="action-box status-type left pointer" v-for="item in tradeTypeList" @click="onChange_tradeTypeItem(item.codeId)">
                        <i class="draw-round " :class="tradeType==item.codeId?'action':''"></i>
                        <span>{{item.codeValue}}</span>
                 </span>
			</div>
			<opp-form-1 v-if="type == 11&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-1>
			<opp-form-2 v-if="type == 12&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-2>
			<opp-form-3 v-if="type == 13&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-3>
			<opp-form-4 v-if="type == 14&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-4>
			<opp-form-5 v-if="type == 15&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-5>
			<opp-form-6 v-if="type == 16&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-6>
			<opp-form-7 v-if="type == 17&&currBusId == 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-7>
			<opp-form-8 v-if="currBusId != 1" :currId="currId" @submit="onSubmit_formData" ref="oppForm"></opp-form-8>

			<system-tip :isShowViewPop="isShowSystemPop" msg="切换分类将清除未提交重要内容，确定切换分类吗？"
						@close="onClose_systemPop"></system-tip>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import SystemTip from "../../components/pop/systemTip.vue";
	import OppForm1 from "./oppForm1.vue";
	import OppForm2 from "./oppForm2.vue";
	import OppForm3 from "./oppForm3.vue";
	import OppForm4 from "./oppForm4.vue";
	import OppForm5 from "./oppForm5.vue";
	import OppForm6 from "./oppForm6.vue";
	import OppForm7 from "./oppForm7.vue";
	import OppForm8 from "./oppForm8.vue";
	var _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				busList:[],
				tradeTypeList:[],
				currId: 0,
				currBusId:0,
				type: 1,
				tradeType:1,
				currBusType:"",
				isShowTypeList: false,
				isShowSystemPop: false
			}
		},
		components: {
			ComLayout,
			DropList,
			SystemTip,
			InputBar,
			OppForm1,
			OppForm2,
			OppForm3,
			OppForm4,
			OppForm5,
			OppForm6,
			OppForm7,
			OppForm8
		},
		computed: {
			currType()
			{
				return g.data.staticTypePool.getDataById(this.type) &&
						g.data.staticTypePool.getDataById(this.type).name;
			},
			typeList(){
                return g.data.oppTypePool.getDataById(this.currBusId).child;
            }
		},
		watch:{
			currBusId($val){
				if($val != 1){
					this.$nextTick(this.$refs.oppForm.initError)
				}
			},
			type($val){
				if(this.currBusId != 1){
					this.$nextTick(this.$refs.oppForm.initError)
				}
			}
		},
		methods: {
			routerUpdated()
			{
                this.busList = g.data.oppTypePool.list;
                this.tradeTypeList = g.data.oppTypePool.tradeTypeList;
				this.currId = int(g.vue.getQuery("id", 0));
				this.currBusId = g.vue.getQuery('bus', this.busList[0].id);//商机类型
				let businessData = g.data.searchBusinessPool.getDataById(this.currId);
				if(g.vue.getQuery("type")){
					this.type = g.vue.getQuery("type")
				} else if(businessData){
					this.type = businessData.childBusinessId;
					this.tradeType = businessData.boTradeId

				} else{
					this.type = g.data.oppTypePool.getDataById(this.currBusId).child[0].id//业务小类 默认商机下的第一个小类
				}
				this.initEvents()
			},
			onClose_systemPop($result)
			{

			},
			onSubmit_formData($data)
			{

				_params = {
					oldOrderId: this.currId,
					businessId: this.currBusId,
                    childBusinessId:this.type,
					boTradeId:this.tradeType,
					custComName: $data.formData["客户公司名称"],
					boFormData: JSON.stringify($data.formData),
					attachs: JSON.stringify($data.attachList)
				};
				g.ui.showLoading();
				g.net.call("/bo/orderApply", _params).then(($data) =>
				{
					g.ui.hideLoading();
					this.$refs.oppForm.init();
					this.routerUpdated();
					g.ui.toast("商机提交成功");
					g.url = "/myopp";
				}, (err) =>
				{
					g.func.dealErr(err);
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
			onChange_tradeTypeItem($id){
				this.tradeType = $id
			},
			onChange_typeItem($id)
			{
				if (this.type != $id)
				{
					// var formData = this.$refs.oppForm.getFormData();
					this.type = $id;
					this.isShowTypeList = false;
					this.updateUrl();
					// this.routerUpdated();
				}
			},
			updateUrl()
			{
				var query = {
					bus:this.currBusId,
					type:this.type
				};
				if(this.currBusId != 1&&this.currId){
					query.id = this.currId
				}
				g.url = {
					path: "/oppapply",
					query: query
				}
			},
			onChange_BusTypeItem($id){
				this.currBusId = $id;
                this.type = g.data.oppTypePool.getDataById($id).child[0].id;
                this.updateUrl();
                this.routerUpdated();
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
		padding: 20px 44px 50px 24px;
	}

	@import "../../css/oppApply.scss";
</style>