<template>
    <div>
        <!-- 地图 -->
        <div class="gwjtmapclass">
            <gwjt-map :mapselect="false" mypagestate="jt"></gwjt-map>
        </div>
        <!-- 资金流入流出看板 -->
        <div class="myBoardUpDiv">
            <my-boardup :jnjwshow="true" mypagestate="jt"></my-boardup>
        </div>
        <!-- 资金运作看板 -->
        <div class="myBoardDownDiv">
            <my-boarddown mypagestate="jt"></my-boarddown>
        </div>
        <!-- 融资境外资金总览 -->
        <div class="rzzecblpiedivclass">
            <my-rzzecblpie mypagestate="jt"></my-rzzecblpie>
        </div>
        <!-- 账户总览 -->
        <div class="zhzldivclass">
            <my-zhzljdandbar mypagestate="jt"></my-zhzljdandbar>
        </div>
        <!-- 票据总览 -->
        <div class="pjzldjtdivclass">
            <my-mypjzldjt mypagestate="jt"></my-mypjzldjt>
        </div>
    </div>
</template>

<script>
    import gwjtmap from '../components/gwjt_map.vue'
    import myboardup from  '../components/boardup.vue'
    import myboarddown from '../components/gwjtboarddown.vue'
    import myrzzecblpie from '../components/rzzecblpie.vue'
    import myzhzljdandbar from '../components/zhzljdandbar.vue'
    import mypjzldjt from '../components/pjzldjt.vue'
    import {getNyrstate} from '../vuex/getters'
    export default{
        data(){
            return {}
        },
        components:{
            'gwjt-map':gwjtmap,
            'my-boardup':myboardup,
            'my-boarddown':myboarddown,
            'my-rzzecblpie':myrzzecblpie,
            'my-zhzljdandbar':myzhzljdandbar,
            'my-mypjzldjt':mypjzldjt
        },
        vuex:{
            getters:{
                getNyrstatevalue:getNyrstate
            }
        },
        watch:{
            getNyrstatevalue: function( val ){
                console.log( 'name has been changed:', val );
            }
        },
        methods:{
            nrystatechange(nyrflag){
                this.changedimswitchNYR(nyrflag);
                this.isnian = false;
                this.isyue = false;
                this.isri = false;
                this[nyrflag] = true;
            }
        }
    }
</script>
<style scoped>
    .gwjtmapclass{
        position: absolute;
        left: 40px;
        top: 12px;
    }

    .myBoardUpDiv{
        position: absolute;
        top: 65px;
        right: 10px;
    }

    .myBoardDownDiv{
        position: absolute;
        top: 300px;
        right: 10px;
    }

   .rzzecblpiedivclass{
        position: absolute;
        top: 520px;
   }

    .zhzldivclass{
        position: absolute;
        top: 510px;
        left: 450px;
        width: 480px;
        height: 280px;
    }

    .pjzldjtdivclass{
        position: absolute;
        top: 510px;
        right: 10px;
    }
</style>
