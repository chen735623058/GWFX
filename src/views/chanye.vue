<template>
	<div>
		<!-- 地图 -->
		<div class="zongbumapclass">
			<zongbu-map mypagestate="cy"></zongbu-map>
		</div>
		<!-- 资金流入流出看板 -->
        <div class="myBoardUpDiv">
            <my-boardup :jnjwshow="false" mypagestate="cy"></my-boardup>
        </div>
        <!-- 资金分布 -->
        <div class="myBoardDownDiv">
            <my-boarddown mypagestate="cy"></my-boarddown>
        </div>
        <!-- 融资境外资金总览 -->
        <div class="rzzecblpiedivclass">
        	<my-rzzecblpie mypagestate="cy"></my-rzzecblpie>
        </div>
        <!-- 账户总览 -->
        <div class="zhzldivclass">
            <my-zhzljdandbar mypagestate="cy"></my-zhzljdandbar>
        </div>
        <!-- 票据总览 -->
        <div class="pjzldjtdivclass">
            <my-mypjzldjt mypagestate="cy"></my-mypjzldjt>
        </div>
	</div>
</template>
<script>
	import zongbumap from '../components/zongbu_map.vue'
 	import myboardup from '../components/boardup.vue'
 	import myrzzecblpie from '../components/rzzecblpie.vue'
    import myboarddown from '../components/wangsheng_zjfbbar.vue'
    import myzhzljdandbar from '../components/zhzljdandbar.vue'
    import mypjzldjt from '../components/pjzldjt.vue'

	export default{
		data(){
			return {}
		},
		components:{
			'zongbu-map':zongbumap,
			'my-boardup':myboardup,
			'my-rzzecblpie':myrzzecblpie,
            'my-boarddown':myboarddown,
            'my-zhzljdandbar':myzhzljdandbar,
            'my-mypjzldjt':mypjzldjt
		},
		methods:{

		}
	}
</script>
<style scoped>
	.zongbumapclass{
		position: absolute;
		left: 40px;
		top: 30px;
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
        right: 0px;
    }
 
</style>