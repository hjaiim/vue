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
				currId: "",
				navList: []
			}
		},
		components: {
			ComHeader
		},
		methods: {
			init()
			{
				g.func.updateRightList();
				var navList = __merge([], g.data.staticNavPool.list);
				for (var item of navList)
				{
					if (g.data.rightPool.hasRight(item.rightId))
					{
						if (item.positionJudge)
						{
							if (g.data.userInfo.positionType != -1)
							{
								this.navList.push(item);
							}
						}
						else
						{
							this.navList.push(item);
						}
					}
				}
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