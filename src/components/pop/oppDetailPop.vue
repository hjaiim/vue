<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView">
        <div class="detail-container">
            <p class="note-tit">商机详情</p>
            <div class="note-content">
                <div class="company-message no-border opp-pop-detail">
                    <p>商机内容</p>
                    <p class="from-group left detail-custer-msg">
                        <span class="form-title">业务名称</span>
                        <span class="form-trap">CTD业务</span>
                    </p>
                    <p class="from-group left detail-custer-msg">
                        <span class="form-title">客户公司名称</span>
                        <span class="form-trap">杭州幻舞科技</span>
                    </p>
                    <p class="from-group left detail-custer-msg">
                        <span class="form-title">客户联系人</span>
                        <span class="form-trap">马云</span>
                    </p>
                    <p class="from-group left detail-custer-msg">

                        <span class="form-title">客户联系电话</span>
                        <span class="form-trap">135****1234</span>
                    </p>
                    <p class="from-group left">
                        <span class="form-title">客户公司地址</span>
                        <span class="form-trap">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum </span>
                    </p>
                    <p class="from-group left">
                        <span class="form-title">客户公司介绍</span>
                        <span class="form-trap">商公司地址杭州市, consectetur adipiscing elit. Aenean euismod bibendum </span>
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
            padding: 35px 10px 40px;
            line-height: 36px;
            font-size: 14px;
        }
    }
    .from-group,.opp-pop-detail{
        .form-title,.form-trap{
            font-weight: normal;
        }
    }
    .detail-custer-msg{
        width: 45%;
    }
</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
    @import "../../css/pop.scss";
</style>