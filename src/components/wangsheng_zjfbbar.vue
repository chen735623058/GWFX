<template>
	<div id="zjfbbarchart" class="zjfbbarchartclass"></div>
</template>
<style scoped>
	.zjfbbarchartclass{
		width: 100%;
		height: 100%;
	}
</style>
<script>
	import echarts from 'echarts'
	import {getwangshengzjfbdata,getchanyezjfbdata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from '../vuex/getters'
	export default{
		data(){
			return{
				myzjfbbarchart:null,
				zjfbbaroption :{
					color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            
							type : 'shadow',
							shadowStyle:{
								color: 'rgba(229,229,229,0.3)'
							}       
						},
						formatter:function (params, ticket, callback) {
							var ret ;
							if(Number(params[0].percent)<10){
								
							}else{
								ret = params.percent+"%";
							}
							ret = params[0].name +"<br>"+params[0].seriesName+":"+(Number(params[0].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
							return ret;
						},
					},
					title:{
						text:"资金分布",
						textStyle:{
							color:'#007068',
							fontWeight:'bold',
							fontFamily:"microsoft yahei",
							fontSize:"16"
						},
						left:"center"
					},
					grid: {
						left: '0',
						right: '0',
						bottom: '10px',
						top: '40px',
						containLabel: true
					},
					xAxis : [
					{
						type : 'category',
						data : [],
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							interval:0
						}
					}
					],
					yAxis : [
					{
						type : 'value',
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						},
						splitLine:{
							show:true,
							lineStyle:{
								color: ['#DFDFD7']
							}
						}
					}
					],
					series : [
					{
						name:'资金分布',
						type:'bar',
						barWidth: '30px',
						data:[],
						itemStyle:{
							normal:{
								color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
									offset: 0,
									color: 'rgb(0,156,132)'
								}, {
									offset: 1,
									color: 'rgb(246,170,0)'
								}])
							}
						}
					}
					]
				}
			}
		},
		vuex:{
			getters:{
				getwangshengzjfbdata,
				getNyrstate,
				getdwstate,
				getnowpagestate,
				getorganidstate,
				getchanyezjfbdata
			}
		},
		watch:{
			getwangshengzjfbdata:function(val){
				if(this.getnowpagestate=="ws" && this.mypagestate=="ws"){
					this.makeoption(val);
					this.changechartbar();
				}
			},			
			getchanyezjfbdata:function(val){
				if(this.getnowpagestate=="cy" && this.mypagestate=="cy"){
					this.makeoption(val);
					this.changechartbar();
				}
			},
			getNyrstate:function(val){
				if(this.getnowpagestate=="ws" || this.getnowpagestate=="cy" ){
					if(this.mypagestate=="ws"){
						this.makeoption(this.getwangshengzjfbdata);
						this.changechartbar();
					}
					if(this.mypagestate=="cy"){
						this.makeoption(this.getchanyezjfbdata);
						this.changechartbar();
					}
				}				
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="ws" || this.getnowpagestate=="cy" ){
					if(this.mypagestate=="ws"){
						this.makeoption(this.getwangshengzjfbdata);
						this.changechartbar();
					}
					if(this.mypagestate=="cy"){
						this.makeoption(this.getchanyezjfbdata);
						this.changechartbar();
					}
				}			
			},
			getorganidstate:function(val){
				if(this.getnowpagestate=="ws" || this.getnowpagestate=="cy" ){
					if(this.mypagestate=="ws"){
						this.makeoption(this.getwangshengzjfbdata);
						this.changechartbar();
					}
					if(this.mypagestate=="cy"){
						this.makeoption(this.getchanyezjfbdata);
						this.changechartbar();
					}
				}	
			}

		},
		methods:{
			changechartbar(option){
				if(document.getElementById('zjfbbarchart') != null){
					document.getElementById('zjfbbarchart').innerHTML = "";
					if (this.myzjfbbarchart != null && this.myzjfbbarchart != undefined) {
						this.myzjfbbarchart.clear();
					}
					this.myzjfbbarchart = echarts.init(document.getElementById('zjfbbarchart'));
					this.myzjfbbarchart.setOption(this.zjfbbaroption);
				}	
			},
			makeoption(objdataarr){
				var _dataarr = [];
				var _xAxisdataarr = [];
				for(let i=-0;i<objdataarr.length;i++){
					if(objdataarr[i].organid == this.getorganidstate){
						_xAxisdataarr.push(objdataarr[i].bankshortname);
						if(this.getdwstate === "wanyuan"){
							_dataarr.push(objdataarr[i].balancew);
						}else{
							_dataarr.push(objdataarr[i].balancey);
						}
					}
				}
				this.zjfbbaroption.xAxis[0].data = _xAxisdataarr;
				this.zjfbbaroption.series[0].data = _dataarr;
			}
		},
		props:["mypagestate"],
		ready(){
			// this.makeoption(this.getwangshengzjfbdata);
			// this.changechartbar();
		}
	}
</script>