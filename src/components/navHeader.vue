<template>
	<ul class="header-options clear">
		<li class="left relative pointer ani-time"
			:class="currId==item.id?'high-active':'' "
			v-for="item in navList"
			@click="onClick_navItem(item.id)">{{item.name}}
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	import ComHeader from "./header.vue"
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				currId: ""
			}
		},
		components: {
			ComHeader
		},
		methods: {
			init()
			{
				this.navList = g.data.staticNavPool.list;
			},
			update($id)
			{
				this.currId = $id
			},
			onClick_navItem($id)
			{
				if (this.currId != $id)
				{
					this.currId = $id;
					this.$emit("click", this.currId);
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>