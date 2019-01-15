<template>
	<div>
		<!-- 金融大楼 -->
		<div class="jinrongdalouclass">
            <my-jinronglou></my-jinronglou>
		</div>
		<!-- 资金流入流出看板 -->
        <div class="myBoardUpDiv">
            <my-boardup :jnjwshow="false" mypagestate="jr"></my-boardup>
        </div>
         <!-- 账户总览 -->
        <div class="zhzldivclass">
            <my-zhzljdandbar mypagestate="jr"></my-zhzljdandbar>
        </div>
        <!-- 资金分布 -->
        <div class="zjfbdivclass">
        	<my-jrzjfb mypagestate="jr"></my-jrzjfb>
        </div>
	

	</div>
</template>
<script>
 	import myboardup from  '../components/boardup.vue'
 	import myzhzljdandbar from '../components/zhzljdandbar.vue'
    import myjinronglou from  '../components/jinrong_dasha.vue'
    import myjrzjfb from '../components/jinrong_zjfb.vue'
	export default{
		data(){
			return {}
		},
		components:{
			'my-boardup':myboardup,
			'my-zhzljdandbar':myzhzljdandbar,
            'my-jinronglou':myjinronglou,
            'my-jrzjfb':myjrzjfb
		},
		methods:{

		}
	}
</script>
<style scoped>
	.jinrongdalouclass{
		position: absolute;
		left: -22px;
		top: 112px;
	}

    .myBoardUpDiv{
        position: absolute;
        top: 65px;
        right: 10px;
    }

    .zhzldivclass{
    	position: absolute;
        top: 300px;
        right: 10px;
        width: 540px;
        height: 200px;
    }

    .zjfbdivclass{
    	position: absolute;
    	top: 513px;
    	left: 41px;
    }
</style>