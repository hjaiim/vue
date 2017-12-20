<template>
	<!--声音名片业务-->
	<div>
		<p class="from-group detail-custer-msg">
			<span class="form-title">业务名称</span>
			<span class="form-trap">M-CTD小号业务</span>
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
				trace("this.formInfo", this.formInfo);

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>