<template>
    <div>
        我是首页
    </div>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    export default{
        created(){

        },
        data(){
            return {
                g: g
            }
        },
        components: {

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
