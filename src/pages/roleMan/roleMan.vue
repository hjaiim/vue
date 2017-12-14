<template>
    <com-layout currPath="/roleman">
        <mod-company-pop :isShowPopView="isShowDetailPop"></mod-company-pop>
    </com-layout>

</template>
<script type="text/ecmascript-6">
    import g from "../../global";
    import ComLayout from "../../components/comLayout.vue"
    import ModCompanyPop from "../../components/pop/modCompanyPop.vue"
    export default{
        created(){

        },
        data(){
            return {
                g: g,
                isShowDetailPop: true
            }
        },
        components: {
            ComLayout,
            ModCompanyPop
        },
        methods: {}
    }
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>