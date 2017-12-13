<template>
    <com-layout>
        <div class="percenter-wrap">
            <div class="menu-wrap">
                <ul class="per-menu clear">
                    <li class="left ani-time relative pointer ">个人信息</li>
                    <li class="left ani-time relative pointer high-active">修改密码</li>
                </ul>
            </div>
            <div class="personal-message">
                <p class="personal-form"><span class="personal-title">手机</span><input class="personal-content pensonal-input"></p>
                <p class="personal-form"><span class="personal-title">固定电话</span><input class="personal-content pensonal-input"></p>
                <p class="personal-form"><span class="personal-title">电子邮箱</span><input class="personal-content pensonal-input"></p>
                <div class="btn btn-save pointer">保存</div>
            </div>
        </div>
    </com-layout>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ComLayout from "../../components/comLayout.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g,
            }
        },
        components: {
            ComLayout
        },
        methods: {}
    }
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
    @import "../../css/mixin.scss";
    @import "../../css/percenter.scss";
</style>
<style type="text/css" lang="sass" rel="stylesheet/css">
    @import "../../css/personal.scss";
</style>
