<template>
	<div>
		<!-- 地图 -->
		<div class="zongbumapclass">
			<zongbu-map mypagestate="zb"></zongbu-map>
		</div>
		<!-- 资金流入流出看板 -->
        <div class="myBoardUpDiv">
            <my-boardup :jnjwshow="false" mypagestate="zb"></my-boardup>
        </div>
        <!-- 资金运作看板 -->
        <div class="myBoardDownDiv">
            <my-boarddown mypagestate="zb"></my-boarddown>
        </div>
        <!-- 融资境外资金总览 -->
        <div class="rzzecblpiedivclass">
        	<my-rzzecblpie mypagestate="zb"></my-rzzecblpie>
        </div>
        <!-- 统一发债bar -->
        <div class="zongbubardivclass">
        	<my-zongbubartyfz titlelable="统一发债"></my-zongbubartyfz>
        </div>
        <!-- 统借统还bar -->
        <div class="tjthbardivclass">
        	<my-myzongbubartjth titlelable="统借统还"></my-myzongbubartjth>
        </div>
	</div>
</template>
<script>
	import zongbumap from '../components/zongbu_map.vue'
 	import myboardup from  '../components/boardup.vue'
 	import myboarddown from '../components/gwjtboarddown.vue'
 	import myrzzecblpie from '../components/rzzecblpie.vue'
 	import myzongbubartyfz from '../components/zongbu_bar_tyfz.vue'
 	import myzongbubartjth from '../components/zongbu_bar_tjth.vue'
	export default{
		data(){
			return {}
		},
		components:{
			'zongbu-map':zongbumap,
			'my-boardup':myboardup,
			'my-boarddown':myboarddown,
			'my-rzzecblpie':myrzzecblpie,
			'my-zongbubartyfz':myzongbubartyfz,
			'my-myzongbubartjth':myzongbubartjth
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
    }

    .rzzecblpiedivclass{
    	position: absolute;
    	top: 520px;
    }

    .zongbubardivclass{
    	position: absolute;
    	left: 468px;
    	top: 521px;
    }

    .tjthbardivclass{
    	position: absolute;
    	left: 862px;
    	top: 521px;
    }
</style>