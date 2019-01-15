<template>
	<div class="jrzjfbdivclass">
		<div class="jrzjfbtitle">资金分布</div>
		<hr class="jrzjfbhr">
		<hr class="jrzjfbright">
		<div id="jrzjfbchartbar" class="jrzjfbchartbarclass"></div>
		<div id="jrzjytpie" class="jrzjytpieclass"></div>
		<div class="jrzjytpietitle">账户用途</div>
	</div>
		
</template>
<style scoped>
	.jrzjfbdivclass{
		width: 1200px;
		height: 296px;
	}
	.jrzjfbtitle{
		font-family: "microsoft yahei";
		font-size: 16px;
		font-weight: bold;
		color: #00706b;
		width: 1200px;
		text-align: center;
	}
	.jrzjfbhr{
		border: 0px;
        border-bottom: 1px dashed #62bfb5;
		position: absolute;
		width: 535px;
		top: 5px;
	}
	.jrzjfbright{
		border: 0px;
        border-bottom: 1px dashed #62bfb5;
		position: absolute;
		width: 530px;
		top: 5px;
		left: 665px;
	}
	.jrzjfbchartbarclass{
		width: 800px;
		height: 275px;
	}
	.jrzjytpieclass{
		width: 380px;
		height: 240px;
		position: absolute;
		top: 40px;
		left: 817px;
	}

	.jrzjytpietitle{
		font-family: "microsoft yahei";
		font-size: 16px;
		font-weight: bold;
		color: #00706b;
		width: 200px;
		position: absolute;
		text-align: center;
		top: 146px;
		left: 879px;
	}
		
</style>
<script>
	import echarts from 'echarts'
	import {getjinrongzjfbdata,getjinrongzjytdata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from "../vuex/getters"
	export default{
		data(){
			return{
				myzjfbbarchart:null,
				myzjytpiechar:null,
				myzjfbbaroption:{
					color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            
							type : 'none'       
						},
						formatter:function (params, ticket, callback) {
							var ret ;
							if(Number(params[0].percent)<10){
								
							}else{
								ret = params.percent+"%";
							}
							ret = params[0].name +"<br>"+params[0].seriesName+":"+(Number(params[0].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
							return ret;
						}
					},
					title:{
						text:"金融机构",
						textAlign:"center",
						textStyle:{
							color:'#007068',
							fontWeight:'bold',
							fontFamily:"microsoft yahei",
							fontSize:"16"

						},
						left:'413px',
						top:'15px'
					},
					grid: {
						left: '3%',
						right: '0',
						bottom: '20px',
						top:"45px",
						containLabel: true
					},
					xAxis : [
					{
						type : 'category',
						data : ['工行', '农行', '中行', '建行', '其他'],
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
						data:[70000000, 67000000, 61000000, 58000000, 50000000],
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
						},
					}
					]
				},
				myzjytpieoption:{
					tooltip: {
						trigger: 'item',
						formatter:function (params, ticket, callback) {
							var ret = params.name+": "+ (Number(params.value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"("+params.percent+"%)"
							return ret;
						}
					},
					color:['#40beaa','#60cfbd','#ffca61','#f6aa00','#a28a3d','#ab673a'],
					legend: {
						orient: 'vertical',
						right: '0',
						top:'50',
						textStyle:{
							fontFamily:'宋体',
							fontSize:12,
						},
						data:['收入账户','结算账户','贷款账户','社会保险','投资账户','其他账户']
					},
					series: [
					{
						name:'账户用途',
						type:'pie',
						radius: ['60', '110'],
						center:['160','50%'],
						avoidLabelOverlap: true,
						minAngle:3,
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter:function (params, ticket, callback) {
									var ret ;
									if(Number(params.percent)<10){
										ret = ""
									}else{
										ret = params.percent+"%";
									}
									return ret;
								},
								textStyle: {
									fontSize: '14',
									fontfamily: 'Oswald medium',
									color:'#005344'
								}
							},
							emphasis: {
								show: true
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
						{value:335, name:'收入账户'},
						{value:310, name:'结算账户'},
						{value:234, name:'贷款账户'},
						{value:135, name:'社会保险'},
						{value:1548, name:'投资账户'},
						{value:310, name:'其他账户'}
						],
						itemStyle: {normal: {borderWidth: 1,
							borderColor: '#ffffff'}},
					}
					]
				}
			}
		},
		vuex:{
			getters:{
				getjinrongzjfbdata,
				getjinrongzjytdata,
				getNyrstatevalue:getNyrstate,
				getdwstate,
				getnowpagestate,
				getorganidstate
			}
		},
		watch:{
			getjinrongzjfbdata:function(val){
				if(this.mypagestate == "jr" && this.getnowpagestate == "jr"){
					this.makeoption(val);
					this.changechartbar();
				}
			},
			getjinrongzjytdata:function(val){
				if(this.mypagestate == "jr" && this.getnowpagestate == "jr"){
					this.makepieoption(val);
					this.changepiechartbar();
				}
			},
			getNyrstatevalue:function(val){
				if(this.mypagestate == "jr" && this.getnowpagestate == "jr"){
					this.makeoption(this.getjinrongzjfbdata);
					this.changechartbar();
					this.makepieoption(this.getjinrongzjytdata);
					this.changepiechartbar();
				}			
			},
			getdwstate:function(val){
				if(this.mypagestate == "jr" && this.getnowpagestate == "jr"){
					this.makeoption(this.getjinrongzjfbdata);
					this.changechartbar();
					this.makepieoption(this.getjinrongzjytdata);
					this.changepiechartbar();
				}
			},
			getorganidstate:function(val){
				if(this.mypagestate == "jr" && this.getnowpagestate == "jr"){
					this.makeoption(this.getjinrongzjfbdata);
					this.changechartbar();
					this.makepieoption(this.getjinrongzjytdata);
					this.changepiechartbar();
				}
			}
		},
		methods:{
			changechartbar(){
				if(document.getElementById('jrzjfbchartbar')!=null){
					document.getElementById('jrzjfbchartbar').innerHTML = "";
					if (this.myzjfbbarchart != null && this.myzjfbbarchart != undefined) {
						this.myzjfbbarchart.clear();
					}
					this.myzjfbbarchart = echarts.init(document.getElementById('jrzjfbchartbar'));
					this.myzjfbbarchart.setOption(this.myzjfbbaroption);
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
				this.myzjfbbaroption.xAxis[0].data = _xAxisdataarr;
				this.myzjfbbaroption.series[0].data = _dataarr;
				
			},
			makepieoption(piedataarr){
				var dataarr = [];
				var legenddata = [];
				for(let i=-0;i<piedataarr.length;i++){
					if(piedataarr[i].organid == this.getorganidstate){
						legenddata.push(piedataarr[i].username);
						var qtvalobj = {};
						if(this.getdwstate === "wanyuan"){
							qtvalobj.value = piedataarr[i].balancew;
						}else{
							qtvalobj.value = piedataarr[i].balancey
						}
						
						qtvalobj.name = piedataarr[i].username;
						dataarr.push(qtvalobj)
					}
				}

				this.myzjytpieoption.legend.data = legenddata;
				this.myzjytpieoption.series[0].data = dataarr;
			},
			changepiechartbar(){
				if(document.getElementById('jrzjytpie') != null){
					document.getElementById('jrzjytpie').innerHTML = "";
					if (this.myzjytpiechar != null && this.myzjytpiechar != undefined) {
						this.myzjytpiechar.clear();
					}
					this.myzjytpiechar = echarts.init(document.getElementById('jrzjytpie'));
					this.myzjytpiechar.setOption(this.myzjytpieoption);
				}
			},
		},
		props:["mypagestate"],
		ready(){
			// this.changechartbar(this.makeoption());
			// this.changepiechartbar(this.makepieoption());
		}
	}
</script>