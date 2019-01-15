<template>
	<div id="jwzjfbbarchart" class="zjfbbarchartclass"></div>
</template>
<style>
	.zjfbbarchartclass{
		width: 540px;
        height: 220px;
	}
	
	/*提示容器*/

	.tooltipDiv {
		overflow: auto;
		margin: 4px;
	}


	/*提示table*/

	.tooltipTable {
		border: none;
		padding: 0;
		margin: 0
	}

	.tooltipName,
	.tooltipJldw {
		font-size: 12px;
		font-family: "microsoft YaHei";
		color: #ffffff;
		text-align: left;
		line-height: 15px;
	}


	/*提示中数字*/

	.tooltipNum {
		/*font-size: 14px;*/
		/*font-family: arial;*/
		font-size: 12px;
		font-family: "microsoft YaHei";
		color: #ffffff;
		text-align: right;
		line-height: 15px;
		padding-left: 4px;
	}
</style>
<script>
	import {getjingwaizjfbdata,getjingwaizjfbmxdata,getdwstate,getnowpagestate} from "../vuex/getters"
	import echarts from 'echarts'
	export default{
		data(){
			return{
				zjfbchart:null,
				zjfboption:{
					color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            
							type : 'shadow',
							shadowStyle:{
								color: 'rgba(229,229,229,0.3)'
							}       
						},
						formatter:this.formattertootip
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
						bottom: '30px',
						top: '40px',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : [""],
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
					dataZoom:[
						{
							type:'slider',
							show:true,
							backgroundColor:"#e5f1ed",
							fillerColor:"#a2ebd6",
							borderColor:"#e5f1ed",
							handleStyle:{
								color:"#3bbdb1"
							},
							xAxisIndex:[0],
							startValue:0,
							endValue:4,
							showDataShadow:false,
							height:12,
							bottom:5,
							zoomLock:false,
							showDetail:false
						},
						{
							type:'inside',
							xAxisIndex:[0],
							startValue:0,
							endValue:4
						}
					],
					series : [
						{
							name:'资金分布',
							type:'bar',
							barWidth: '30px',
							data:[1500000,1300000,1200000,1100000,1000000,900000,800000,700000],
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
				getjingwaizjfbdata,
				getjingwaizjfbmxdata,
				getnowpagestate,
				getdwstate
			}
		},
		watch:{
			getjingwaizjfbdata:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changebarchartbydata(val);
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changebarchartbydata(this.getjingwaizjfbdata);
				}
			},
		},
		methods:{
			changechartbar(){
					if(document.getElementById('jwzjfbbarchart') != null){
						document.getElementById('jwzjfbbarchart').innerHTML = "";
						if (this.zjfbchart != null && this.zjfbchart != undefined) {
							this.zjfbchart.clear();
						}
						this.zjfbchart = echarts.init(document.getElementById('jwzjfbbarchart'));
						this.zjfbchart.setOption(this.zjfboption);
					}	
			},
			changebarchartbydata(alldataarr){
				this.makechartoption(alldataarr);
				this.changechartbar();
			},
			makechartoption(objdata){
				var dataarr = [];
				var xAxisdataarr = [];
				this.barmaxnum = 0;
				for(let i=0;i<objdata.length;i++){	
					var objdataitem = objdata[i];
					if(this.getdwstate == "wanyuan"){
						dataarr.push({"name":objdataitem.areaid,"value":Number(objdataitem.balance)/10000});
					}else{
						dataarr.push({"name":objdataitem.areaid,"value":Number(objdataitem.balance)/100000000});
					}
					
					xAxisdataarr.push(objdataitem.areaname);
				};
				this.zjfboption.xAxis[0].data = xAxisdataarr;
				this.zjfboption.series[0].data = dataarr;
			},
			formattertootip(params, ticket, callback){
				var ret="" ;
				ret += '<tr><td class="tooltipName">' + params[0].name + '</td></tr>';
				ret += '<tr><td class="tooltipName">资金总额:</td><td class="tooltipNum">' + params[0].value.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '</td></tr>';
				for(let j=0;j<this.getjingwaizjfbmxdata.length;j++){
					if(this.getjingwaizjfbmxdata[j].areaid == params[0].data.name){
						//单位换算
						let num = 0
						if(this.getdwstate == "wanyuan"){
							num = Number(this.getjingwaizjfbmxdata[j].balance)/10000;
						}else{
							num = Number(this.getjingwaizjfbmxdata[j].balance)/100000000;
						}
						

						ret += '<tr><td class="tooltipName">' + this.getjingwaizjfbmxdata[j].moneytype + ':</td><td class="tooltipNum">' + num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '</td></tr>';
					}
				}
				return ['<div class="tooltipDiv">',
				'<table class="tooltipTable"><tbody>',
					ret,
				'</tbody></table>'
				].join('');
			}

		},
		ready(){
			// this.changechartbar();
		}
	}
</script>