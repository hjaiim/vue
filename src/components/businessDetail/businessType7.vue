<template>
	<!--声音名片业务-->
	<div>
		<p class="from-group detail-custer-msg">
			<span class="form-title">业务名称</span>
			<span class="form-trap">95业务</span>
		</p>

		<p class="from-group detail-custer-msg" v-for="(value,key) in formInfo">
			<span class="form-title">{{key}}</span>
			<span class="form-trap">{{value}}</span>
		</p>

	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				formInfo: {}
			}
		},
		props: {
			formData: {}
		},
		methods: {
			init()
			{
				this.formInfo = __merge({}, this.formData);
				for(var key in this.formInfo)
				{
					if(key == "客户联系方式")
					{
						this.formInfo[key] = this.formInfo[key].split("*")[0];
					}
					if(key == "申请的95业务类别" && this.formInfo[key] != "使用联通已有的95号")
					{
						this.formInfo[key] = this.formInfo[key].split("num*").join("/95号码：");
					}
				}
				this.$forceUpdate();

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>