<template>
    <div>
        <h1>我是首页</h1>
        <!--vue,is-->
        <di is="hjTestIs" class="test-is">
            我是内容
        </di>
    </div>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import hjTestIs from "../../components/hjai-test/is/hjTestIs.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g
            }
        },
        components: {
            hjTestIs
        },
        watch: {
        },
        methods:{

        }
    }

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
    @import "../../css/mixin.scss";
    @import "../../css/percenter.scss";

    .file-input {
        width: 120px;
        height: 120px;
        position:absolute;
        top: 0;
        left: 0;
        z-index: 2;
        filter: alpha(opacity=0);
        opacity: 0;

    }

    .err-msg {
        color: #ed5564;

    }
</style>
