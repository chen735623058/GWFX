<template>
    <div>
        <!--境外地图 -->
        <div class="myJwMapClass">
             <my-jwmap></my-jwmap>   
        </div>
       <!--资金总览-->
        <div class="myBoardUpDiv">
            <my-boardup :jnjwshow="false" mypagestate="jw"></my-boardup>
        </div>
        <!-- 资金分布 -->
        <div class="myBoardDownDiv">
            <my-boarddown ></my-boarddown>
        </div>

        <!-- 融资境外资金总览 -->
        <div class="rzzecblpiedivclass">
            <my-rzzecblpie mypagestate="jw"></my-rzzecblpie>
        </div>
        <!--账户总览-->
        <div class="jwzhzlvclass">
            <my-jwzhzl></my-jwzhzl>
        </div>
         <!--主要币种概览-->
        <div class="jwbzzlvclass">
            <my-jwbzgl></my-jwbzgl>
        </div>
    </div>
</template>
<style scoped>
    @import '../libs/easyui/themes/gray/easyui.css';
    .myBoardUpDiv{
        position: absolute;
        top: 65px;
        right: 10px;
    }

    .myBoardDownDiv{
      position: absolute;
      top: 269px;
      right: 10px;
    }

    .rzzecblpiedivclass{
        position: absolute;
        top: 476px;
    }

    .myJwMapClass{
        position: absolute;
        top: 30px;
        left: 66px;
    }

    .jwzhzlvclass{
       position: absolute;
       top: 496px;
       left: 391px;
   }

   .jwbzzlvclass{
      position: absolute;
      top: 498px;
      left: 757px;
   }

</style>
<script>
    import myBoardUp from  '../components/boardup.vue';
    import myBoardDown from '../components/jw_zjfb.vue'
    import myrzzecblpie from '../components/jw_rzzl.vue'
    import myjwmap from '../components/os_map.vue'
    import myjwzhzl from '../components/jw_zhzl.vue'
    import myjwbzgl from '../components/jw_bzzl.vue'
    import {changeshowhideflag} from '../vuex/actions'
    export default{
        data(){
            return {

            }
        },
        vuex:{
            actions:{
                changeshowhideflag
            }
        },
        components:{
            'my-boardup':myBoardUp,
            'my-boarddown':myBoardDown,
            'my-rzzecblpie':myrzzecblpie,
            "my-jwmap":myjwmap,
            "my-jwzhzl":myjwzhzl,
            "my-jwbzgl":myjwbzgl
        },
        methods:{

        },
        ready(){
            this.changeshowhideflag(true);
        }
    }
</script>