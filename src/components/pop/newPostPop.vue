<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView">
        <div class="detail-container">
            <p class="note-tit">新增岗位</p>
            <div class="note-content">
                <div class="company-message">
                    <p class="from-group">
                        <span class="form-title">名称</span>
                        <input type="text" class="form-control">
                    </p>
                    <p class="from-group">
                        <span class="form-title">类型</span>
                        <label for=""><input type="checkbox">商机提交岗</label>
                        <label for=""><input type="checkbox">商机审核岗</label>
                    </p>
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
            padding: 35px 72px 0;
            line-height: 36px;
            font-size: 14px;

        }
    }
</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
    @import "../../css/pop";
</style>