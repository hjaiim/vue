<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView" class="mod-company-pop">
        <div class="mod-company-container">
            <p class="mod-tit">修改公司信息</p>
            <div class="mod-company-content">
                <div class="company-message">
                    <p class="from-group">
                        <span class="form-title">公司名称</span>
                        <input type="text" class="form-control">
                        <span class="requied">*</span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">公司电话</span>
                        <input type="text" class="form-control">
                        <span class="requied">*</span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">公司负责人</span>
                        <input type="text" class="form-control">
                        <span class="requied">*</span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">负责人电话</span>
                        <input type="text" class="form-control">
                        <span class="requied">*</span>
                    </p>
                    <div class="pop-btn right pointer">保存</div>

                </div>
                <div class="company-message">
                    <img :src="g.path.images+'/del.png'" alt="" class="del-depart">
                    <p class="from-group">
                        <span class="form-title">部门名称</span>
                        <span>
                            <span class="form-trap">研发部</span>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer"
                                 @click="onClick_editBtn">
                        </span>
                        <span v-show="isShowEdit">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">职务名称</span>
                        <span class="form-trap">研发部主管</span>
                        <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                </div>
                <div class="company-message">
                    <img :src="g.path.images+'/del.png'" alt="" class="del-depart">
                    <p class="from-group">
                        <span class="form-title">部门名称</span>
                        <span>
                            <span class="form-trap">销售部</span>
                            <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
                        </span>
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">职务名称</span>
                        <span class="form-trap">销售部经理</span>
                        <img :src="g.path.images+'/edit.png'" alt="" class="edit-icon pointer">
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                        <img :src="g.path.images+'/del-depart.png'" alt="" class="edit-icon pointer">
                    </p>
                    <p class="from-group">
                        <span class="form-title">职务名称</span>
                        <span>
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                </div>
                <div class="company-message">
                    <p class="from-group">
                        <span class="form-title">部门名称</span>
                        <span>
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">职务名称</span>
                        <span>
                            <input type="text" class="form-control">
                            <span class="pointer btn-save">保存</span>
                        </span>
                    </p>
                </div>
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
                isShowEdit: false
            }
        },
        components: {
            ViewPopup
        },
        props: {
            isShowPopView: {
                type: Boolean,
                default: false,
                isShowDefault: true,
            }
        },
        methods: {
            onClose_pop(){
                this.$emit('close');
            },
            onClick_editBtn(){
                this.isShowEdit = true;
            }
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
    .mod-company-container {
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
            height: 790px;

        }
    }

    .company-message {
        border-bottom: 1px solid #e4e4e4;
        overflow: hidden;
        padding: 20px 0;
        position: relative;
        .del-depart {
            position: absolute;
            top: 20px;
            right: 18px;
        }
        .from-group {
            margin-bottom: 18px;
            &:last-child {
                margin-bottom: 0;
            }
            .form-title {
                width: 125px;
                height: 30px;
                line-height: 30px;
                text-align: right;
                font-weight: bold;
                color: #000000;
                margin-right: 20px;
                display: inline-block;
            }
            .form-control {
                width: 150px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #dddddd;
                border-radius: 4px;
                box-shadow: 0 0 2px #f5f5f5 inset;
                padding: 0 12px;
                box-sizing: border-box;
                margin-right: 10px;
            }
            .form-trap {
                font-weight: bold;
                color: #000000;
            }
            .edit-icon {
                vertical-align: middle;
                margin: 0 0 0 8px;
                border: 3px solid transparent;
            }
            .requied {
                height: 30px;
                line-height: 30px;
                color: #ed5564;
            }
            .btn-save {
                color: #fe6e05;
            }
        }

    }
    .pop-btn {
        width: 90px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        background: #f9f9f9;
        margin-right: 18px;
    }
    .btn-submit {
        border: none;
        background: #ed5564;
        color: #fff;
        margin: 25px 18px 0 0;
    }
</style>
