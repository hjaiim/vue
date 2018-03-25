<template>
	<div class="upload-wrap absolute">
		<div class="upload-inner">
			<input type="file" :disabled="disabled" :accept="accept" class="upload-input pointer"
				   :multiple="multiple" ref="fileUpload" @change="onChange_upload" />
			<!--<span class="upload-label">{{text}}</span>-->
		</div>
		<div v-if="isShowNameList">
			<p v-for="name in nameList">{{name}}</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from '../js/func';
	export default{
		created(){

		},
		data(){
			return {
				nameList: []
			}

		},
		props: {
			text: {
				type: String,
				default: "点击上传"
			},
			disabled: {
				type: Boolean,
				default: false
			},
			isShowNameList: {
				type: Boolean,
				default: false
			},
			accept: {
				type: String,
				default: "image/png,image/gif"
			},
			multiple: {
				type: Boolean,
				default: true
			},
			resultType: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["file", "base64"])
				},
				default: "file"
			}
		},
		methods: {
			onChange_upload($event)
			{
				for (var item of $event.target.files)
				{
					this.nameList.push(item.name);
				}
				if (this.resultType == "file")
				{
					this.$emit('change', $event.target.files)
				}
				else if (this.resultType == "base64")
				{
					util.getBase64($event.target.files).then(($results) =>
					{
						this.$emit('change', $results)
					})
				}
				else
				{
					console.error('文件类型转换失效，请确保文件类型正确')
				}
			}
		}
	}
</script>
<style type="text/scss" lang="sass" rel="stylesheet/scss">
	.upload-wrap {
		width: 100%;
		height: 100%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		left: 0;
		top: 0;
		overflow: hidden;
		.upload-inner {
			width: 100%;
			height: 100%;
			position: relative;
		}
		.upload-label {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.upload-input {
			filter:alpha(opacity=0);
			opacity:0;
			@extend .upload-label;
			z-index: 1;
		}
	}
</style>