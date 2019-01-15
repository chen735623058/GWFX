<template> 
	<div>
		<div class="boardTitle">资金运作</div>
		<div class="boardContent">
			<div id="zjyzzediv" class="numFont numLeft"></div>
			<div id="yzsydiv" class="numFont numCenter"></div>
			<div id="zhcdkzediv" class="numFont numRight"></div>
		</div>
	</div>
</template>
<style scoped>
	.boardContent{
		width: 540px;
		height: 160px;
		background: url("../static/gwjtboarddownbj.png") center no-repeat;
	}

	.boardTitle{
		font-weight: bold;
		font-size: 16px;
		color: #00706b;
		text-align: center;
		letter-spacing: 2px;
		width: 540px;
		height: 25px;
	}

	.numFont {
		width: 150px;
		height: 24px;
		position: absolute;
		top: 65px;
		font-size: 22px;
		color: #00706b;
		font-family: "Oswald medium";
		text-align: center;
	}

	.numLeft{
		left: 25px;
	}

	.numCenter{
		left: 196px;
	}

	.numRight{
		left: 372px;
	}

</style>
<script>
	import mycountup from '../libs/countUp/countUp'
	import {getgwzjzjyzdata,getzongbuzjyzdata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from '../vuex/getters'
	export default{
		data(){
			return{
				zjyzze:0,
				yzsy:0,
				zhcdkze:0
			}
		},
		vuex:{
			getters:{
				getgwzjzjyzdata,
				getNyrstatevalue:getNyrstate,
				getdwstate,
				getnowpagestate,
				getzongbuzjyzdata,
				getorganidstate
			}
		},
		watch:{
			getgwzjzjyzdata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="zb"  ){
					if(this.mypagestate == "jt"){
						setTimeout(() => { 
							this.changekpinum(val);
						}, 700)
					}
					
				}
				
			},
			getzongbuzjyzdata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="zb"  ){
					if(this.mypagestate == "zb"){
						setTimeout(() => { 
							this.changekpinum(val);
						}, 700)
					}
					
				}	
			},
			getNyrstatevalue:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="zb"  ){
					if(this.mypagestate == "jt"){
						this.changekpinum(this.getgwzjzjyzdata);
					}else if(this.mypagestate == "zb"){
						this.changekpinum(this.getzongbuzjyzdata);
					}
				
				}	
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="zb"  ){
					if(this.mypagestate == "jt"){
						this.changekpinum(this.getgwzjzjyzdata);
					}else if(this.mypagestate == "zb"){
						this.changekpinum(this.getzongbuzjyzdata);
					}
				
				}
			},
			getnowpagestate:function(val){
				if( val=="jt" || val=="zb"  ){ //这个地方赋值以后会分开是过往集团还是网省
					if(this.mypagestate == "jt"){
						this.changekpinum(this.getgwzjzjyzdata);
					}else if(this.mypagestate == "zb"){
						this.changekpinum(this.getzongbuzjyzdata);
					}
				}
			},
			getorganidstate:function(val){
				if( this.getnowpagestate=="jt" || this.getnowpagestate=="zb"  ){ //这个地方赋值以后会分开是过往集团还是网省
					if(this.mypagestate == "jt"){
						this.changekpinum(this.getgwzjzjyzdata);
					}else if(this.mypagestate == "zb"){
						this.changekpinum(this.getzongbuzjyzdata);
					}
				}
			}
		},
		methods:{
			changekpinum(dataarr){
				if(document.getElementById('zjyzzediv')!=null){
					this.zjyzze = 0;
					this.yzsy = 0;
					this.zhcdkze = 0;
					for(let i=0 ; i<dataarr.length;i++){
						var getgwjtkpidataitem = dataarr[i];
						if(this.getNyrstatevalue == "isnian"){
							if(this.getdwstate == "wanyuan"){
								this.zjyzze = getgwjtkpidataitem.thisyearoperateamountw;
								this.yzsy = getgwjtkpidataitem.thisyearoperateprofitw;
								this.zhcdkze = getgwjtkpidataitem.thisyearzdcamountw;
							}else{
								this.zjyzze = getgwjtkpidataitem.thisyearoperateamounty;
								this.yzsy = getgwjtkpidataitem.thisyearoperateprofity;
								this.zhcdkze = getgwjtkpidataitem.thisyearzdcamounty;
							}
						}else if(this.getNyrstatevalue == "isyue"){
							if(this.getdwstate == "wanyuan"){
								this.zjyzze = getgwjtkpidataitem.thismonthoperateamountw;
								this.yzsy = getgwjtkpidataitem.thismonthoperateprofitw;
								this.zhcdkze = getgwjtkpidataitem.thismonthzdcamountw;
							}else{
								this.zjyzze = getgwjtkpidataitem.thismonthoperateamounty;
								this.yzsy = getgwjtkpidataitem.thismonthoperateprofity;
								this.zhcdkze = getgwjtkpidataitem.thismonthzdcamounty;
							}
						}else{
							if(this.getdwstate == "wanyuan"){
								this.zjyzze = getgwjtkpidataitem.operateamountw;
								this.yzsy = getgwjtkpidataitem.operateprofitw;
								this.zhcdkze = getgwjtkpidataitem.zdcamountw;
							}else{
								this.zjyzze = getgwjtkpidataitem.operateamounty;
								this.yzsy = getgwjtkpidataitem.operateprofity;
								this.zhcdkze = getgwjtkpidataitem.zdcamounty;
							}
						}
					}
					var options = {useEasing : true, useGrouping : true, separator : ',', decimal : '.', prefix : '', suffix : ''};
					var zjyzzedivcountup =  new mycountup.CountUp("zjyzzediv", 0, this.zjyzze, 2, 1, options);
					zjyzzedivcountup.start()
					var yzsydivcountup =  new mycountup.CountUp("yzsydiv", 0, this.yzsy, 2, 1, options);
					yzsydivcountup.start()
					var zhcdkzedivcountup =  new mycountup.CountUp("zhcdkzediv", 0, this.zhcdkze, 2, 1, options);
					zhcdkzedivcountup.start()
				}
			}
		},
		props:["mypagestate"],
		ready(){
			 // this.changekpinum();
		}
	}
</script>