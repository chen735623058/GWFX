<template>
	<div>
	    <!-- 地图 -->
        <div class="gwjtmapclass">
            <gwjt-map mapselect="single" mypagestate="ws" myareacolor="#F6AA00"></gwjt-map>
        </div>
        <!-- 资金流入流出看板 -->
        <div class="myBoardUpDiv">
            <my-boardup  :jnjwshow="false" mypagestate="ws"></my-boardup>
        </div>
        <!-- 资金分布 -->
        <div class="myBoardDownDiv">
            <my-boarddown mypagestate="ws"></my-boarddown>
        </div>
        <!-- 融资境外资金总览 -->
        <div class="rzzecblpiedivclass">
            <my-rzzecblpie mypagestate="ws"></my-rzzecblpie>
        </div>
        <!-- 账户总览 -->
        <div class="zhzldivclass">
            <my-zhzljdandbar mypagestate="ws"></my-zhzljdandbar>
        </div>
        <!-- 票据总览 -->
        <div class="pjzldjtdivclass">
            <my-mypjzldjt mypagestate="ws"></my-mypjzldjt>
        </div>
	</div>
</template>
<script>
    import gwjtmap from '../components/gwjt_map.vue'
    import myboardup from  '../components/boardup.vue'
    import myboarddown from '../components/wangsheng_zjfbbar.vue'
    import myrzzecblpie from '../components/rzzecblpie.vue'
    import myzhzljdandbar from '../components/zhzljdandbar.vue'
    import mypjzldjt from '../components/pjzldjt.vue'
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
        methods:{

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
        top: 280px;
        right: 10px;
        width: 540px;
        height: 200px;
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