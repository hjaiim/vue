<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView">
        <div class="detail-container">
            <p class="note-tit">新增岗位</p>
            <div class="note-content">
                <div class="company-message no-border add-post">
                    <p class="from-group">
                        <span class="form-title">名称</span>
                        <input type="text" class="form-control">
                    </p>
                    <p class="from-group">
                        <span class="form-title">类型</span>
                        <span class="action-box post-type">
                            <i class="pointer action"></i>
                            <span>商机提交岗</span>
                        </span>
                        <span class="action-box post-type">
                            <i class="pointer"></i>
                            <span>商机审核岗</span>
                        </span>
                        <span class="form-trap form-type" v-show="">商机审核岗</span>
                    </p>
                </div>
                <div class="btn-wrap clear">
				<span class="action-btn right pop-del-btn cancel-btn ani-time pointer"
                      @click.stop="onClick_cancelBtn(index+1)">取消</span>
				<span class="action-btn right pop-del-btn delete-btn ani-time pointer"
                      @click.stop="onClick_removeBtn(index+1)">删除
				</span>
                </div>
            </div>
        </div>
    </view-popup>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ViewPopup from "../viewPop.vue"
    export default{
        data(){
            return {
                g: g,
            }
        },
        components: {
            ViewPopup
        },
        props: {
            isShowPopView: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onClose_pop(){
                this.$emit('close');

            }
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
    .detail-container {
        color: #333333;
        .note-tit {
            line-height: 64px;
            height: 64px;
            padding-left: 25px;
            margin: 0 15px;
            font-size: 15px;
            border-bottom: 1px solid #eaeaea;
        }
        .note-content {
            padding: 35px 72px 40px;
            line-height: 36px;
            font-size: 14px;

        }
    }

    .add-post {
        margin-bottom: 30px;
    }

    .post-type {
        margin-left: 0;
        margin-right: 20px;
    }

</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
    @import "../../css/pop";
</style>