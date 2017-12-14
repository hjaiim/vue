<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView">
        <div class="add-role-container">
            <p class="mod-tit">设置新角色</p>
            <div class="mod-company-content">
                <div class="company-message no-border">
                    <p class="from-group">
                        <span class="form-title left">角色名称</span>
                        <input type="text" class="form-control">
                        <span class="requied">*</span>
                    </p>
                    <p class="from-group">
                        <span class="form-title left">角色说明</span>
                        <textarea type="text" class="form-control role-explain"></textarea>
                    </p>
                    <p class="from-group">
                        <span class="form-title left">平台权限</span>

                    </p>
                  </div>
                <div class="pop-btn right pointer">取消</div>
                <div class="btn-submit pop-btn right pointer">提交</div>
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
                default: false,
            }
        },
        methods: {
            onClose_pop(){
                this.$emit('close');
            },

        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
    .add-role-container {
        color: #333333;
        .mod-tit {
            line-height: 64px;
            height: 64px;
            padding-left: 25px;
            margin: 0 10px;
            font-size: 15px;
            border-bottom: 1px solid #eaeaea;
        }
        .mod-company-content {
            padding: 20px 10px 40px;
            line-height: 36px;
            font-size: 14px;
            height: 560px;

        }
    }

</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss" >
    @import "../../css/pop.scss";
</style>
