<template>
    <div>
        <div class="main">
            <router-view transition="fade" transition-mode='out-in'>
            </router-view>
        </div>
        <div>
            <topbar v-bind:class="{ 'displayNone':ishide }"></topbar>
        </div>
        <div class="chooserandswitchclass">
            <div class="chooserclass">
                <my-chooser v-bind:class="{ 'displayNone':chooserishide }"></my-chooser>
            </div>
            <div class="dimswitchclass">
                <dim-switch></dim-switch>
            </div>
        </div>
        <div class="zhezhao" v-bind:class="{ 'displayNone':zhezhaohide }">
            <span class="zhezhaolabel">数据加载中,请稍等...</span>
        </div>
    </div>
</template>

<style>
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: "Microsoft Yahei", "Arial";
        font-size: 12px;
        color: #333;
        box-sizing: border-box;
    }

    .zhezhao{
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.6);
        position: absolute;
        z-index: 100000;
    }

    .zhezhaolabel{
        display: inline-block;
        width: 126px;
        margin: auto;
        text-align: center;
        font-size: 12px;
        line-height: 44px;
        font-family: "microsoft yahei";
        color: #333333;
        font-weight: bold;
        position: absolute;
        margin: auto;
        top: 50%;
        height: 44px;
        left: 45%;
        border: 2px solid #95B8E7;
    }

    .displayNone{
        display: none
    }

    .dimswitchclass{
        position: absolute;
        width: 540px;
        height: 45px;
        right: 10px;
        top: 42px;
    }

    .chooserclass{
        width: 150px;
        height: 150px;
        position: absolute;
        z-index: 10;
        left: 265px;
        top: 40px;
    }

    .main{
        background-color: #fff;
        width: 1247px;
        top: 31px;
        margin: auto;
        position: relative;
    }

    .chooserandswitchclass{
        width: 1247px;
        margin: auto;
        position: relative;
    }
</style>
<script>
    import easyUI from './libs/easyui/jquery.easyui.min';
    import easyUILang from './libs/easyui/locale/easyui-lang-zh_CN';
    import chooser from './components/chooser.vue';
    import dimswitch from './components/dimswitch.vue';
    import topbar from "./components/topbar.vue";
    import store from './vuex/store';
    import {changePagebyChooer,changeorganid,getDatabyDate,changeCSRFToken} from './vuex/actions';
    import {getshowhideflag,getchoosershowhideflag,getzhezhaohidestate,getCSRFToken} from './vuex/getters';
    export default{
        data(){
            return {
                ishide:true,
                chooserishide:true,
                zhezhaohide:true
            }
        },
        components:{
            'my-chooser':chooser,
            'dim-switch':dimswitch,
            'topbar':topbar
        },
        store:store,
        vuex:{
            actions:{
                changeCSRFToken
            },
            getters:{
                getshowhideflag,
                getchoosershowhideflag,
                getzhezhaohidestate,
                getCSRFToken
            }
        },
        watch:{
            getshowhideflag:function(val){
                this.ishide =val;
            },
            getchoosershowhideflag:function(val){
                this.chooserishide =val;
            },
            getzhezhaohidestate:function(val){
                this.zhezhaohide = val;
            }
        },
        methods:{

        },ready(){
            this.changeCSRFToken();
        }
    }
</script>
