<template>
    <view-popup @close="onClose_pop"
                :isShowPopView="isShowPopView" class="mod-company-pop">
        <div class="mod-company-container">
            <p class="mod-tit">修改公司信息</p>
            <div class="mod-company-content">
                <div class="company-message">
                    <p class="from-group">
                        <span class="form-title">公司名称</span>
                        <span class="form-trap">杭州分公司</span>
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="requied">*</span>
                        </span>

                    </p>
                    <p class="from-group">
                        <span class="form-title">公司电话</span>
                        <span class="form-trap">88888888</span>
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="requied">*</span>
                        </span>
                    </p>
                    <p class="from-group">
                        <span class="form-title">公司负责人</span>
                        <span class="form-trap">王大锤</span>
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="requied">*</span>
                        </span>

                    </p>
                    <p class="from-group">
                        <span class="form-title">负责人电话</span>
                        <span class="form-trap">130********</span>
                        <span v-show="">
                            <input type="text" class="form-control">
                            <span class="requied">*</span>
                        </span>
                    </p>
                    <div class="pop-btn right pointer">
                        <img :src="g.path.images+'/edit.png'" alt="" class="edit-company">编辑</div>

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
                <div class="btn-submit pop-btn top-btn right pointer">提交</div>
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
<style lang="sass" rel="stylesheet/scss" type="text/scss">
    @import "../../css/pop.scss";
</style>
