<template>
    <div>
        <!--vue,is-->
        <di is="hjTestIs" class="test-is">
            我是内容
        </di>

        <!--slot-->
        <test-slot1 class="test-slot1">
            <span>我是父组件内容1</span>
            <span>我是父组件内容2</span>
        </test-slot1>

        <!--具名slot-->
        <test-slot2 class="test-slot2">
            <span>我是父组件内容1</span>
            <div name="header">
                <span>我是父组件header内容1</span>
            </div>
            <div name="footer">
                <span>我是父组件footer内容1</span>
            </div>
        </test-slot2>

        <!--组件传值-->
        <pass-value :age="27" @change="onCLik_getValue"><span>父组件的值为27</span></pass-value>
    </div>
</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import hjTestIs from "../../components/hjai-test/is/hjTestIs.vue"
    import testSlot1 from "../../components/hjai-test/slot/testSlot1.vue"
    import testSlot2 from "../../components/hjai-test/slot/testSlot2.vue"
    import passValue from "../../components/hjai-test/passValue/passValue.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g
            }
        },
        components: {
            hjTestIs,
            testSlot1,
            testSlot2,
            passValue
        },
        watch: {
        },
        methods:{
            onCLik_getValue($v){
                console.log($v);
            }
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
