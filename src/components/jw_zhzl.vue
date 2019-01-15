<template>
	<div id="zhzlDiv" class="zhzljdtandbarclass">
		<div class="zhzlTitle"><span class="typeText">账户总览</span></div>
		<div class="zhzlSum"><span class="zhzlSumtext">共{{zhsum}}个</span></div>
		<div id="zhslbar" class="zhslbarclass"></div>
	</div>
</template>
<style scoped>
	.zhzlTitle{
		font-family: "Microsoft YaHei";
		font-size: 16px;
		font-weight: bold;
		color: #00706b;
		width: 100%;
		text-align: center;
	}

	.typeText {
		display: block;
		letter-spacing: 2px;
		width: 120px;
		margin: auto;
	}

	.zhslbarclass{
		width: 290px;
		height: 190px;
		top: 15px;
		left: 31px;
	}


	.zhzlSumtext{
		font-family: "Microsoft yahei";
		font-size: 12px;
		color: #4a9996;	}
	.zhzlSum{
		position: absolute;
		width: 80px;
		right: -47px;
		top: 0px;
		text-align: right;
	}
	.zhzljdtandbarclass{
		width: 290px;
		height: 209px;
	}
</style>
<script>
	import echarts from 'echarts'
	import {getNyrstate,getdwstate,getnowpagestate,getjingwaizhzldata} from '../vuex/getters'
	import {changejwmapdatatype,changejwmapyhorbz,changejwmapyhorbzname} from '../vuex/actions'
	export default{
		data(){
			return{
				myzhzlbarchar:null,
				zhsum:0,
				baroption:{
					title: {
						text: '',
						subtext: ''
					},
					tooltip: {
						show:false,
						trigger: 'axis',
						axisPointer: {
							type: 'none'
						},
						formatter:function (params, ticket, callback) {
							var ret ;
							ret = params[0].name +":"+(Number(params[0].value).toFixed(0)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
							return ret;
						}
					},
					grid: {
						left: '20',
						right: '15',
						bottom: '0',
						top:'0',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01],
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							show:false
						},
						splitLine:{
							show:false
						},
						splitArea:{
							show:false
						}
					},
					yAxis: {
						type: 'category',
						data: ['XX银行1','xx银行2','xx银行3','xx银行4','xx银行5','xx银行6','xx银行7','xx银行8'],
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						},
						axisLabel:{
							textStyle:{
								color:'#00706b',
								fontFamily:'microsoft yahei',
								fontSize:'12',
								fontWeight:'bold'
							}
						}

					},
					dataZoom:[
						{
							type:'slider',
							show:true,
							yAxisIndex:[0],
							startValue:4,
							endValue:8,
							showDataShadow:false,
							height:167,
							width:12,
							right:15,
							backgroundColor:"#e5f1ed",
							fillerColor:"#a2ebd6",
							borderColor:"#e5f1ed",
							handleStyle:{
								color:"#3bbdb1"
							},
						}
					],
					series: [
					{
						name: '账户数量',
						type: 'bar',
						barWidth:'26',
						label:{
							normal:{
								show:true,
							// position: 'insideLeft',
							position: [5, 2],
							formatter:this.changelabelforbar,
							textStyle: {
								color:'#ffffff',
								fontSize: '16',
								fontFamily: 'Oswald medium'
							}

						}
					},
					itemStyle:{
						normal:{
							color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
								offset: 0,
								color: 'rgb(246,170,0)'
							}, {
								offset: 1,
								color: 'rgb(0,156,132)'
							}])
						}
					},
					data: [200,4000,5000,6000,7000,8000,9000,100000]
					}
					]
				},
				barmaxnum:0,
			}
		},
		vuex:{
			getters:{
				getNyrstate:getNyrstate,
				getdwstate,
				getnowpagestate,
				getjingwaizhzldata
			},
			actions:{
				changejwmapdatatype,
				changejwmapyhorbz,
				changejwmapyhorbzname
			},
		},
		watch:{
			getNyrstate:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changebarcharandjtt(this.getjingwaizhzldata);
				}				
			},
			getjingwaizhzldata:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changebarcharandjtt(val);
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changebarcharandjtt(this.getjingwaizhzldata);
				}
			},
		},
		methods:{
			//如果图形太短了就不显示label
			changelabelforbar(params, ticket, callback){	
				var ret ;	
				ret = (Number(params.value).toFixed(0)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				return ret;				
			},
			changebarchar(){
				if(document.getElementById('zhslbar') != null){
					document.getElementById('zhslbar').innerHTML = "";
					if (this.myzhzlbarchar != null && this.myzhzlbarchar != undefined) {
						this.myzhzlbarchar.clear();
					}
					this.myzhzlbarchar = echarts.init(document.getElementById('zhslbar'));
					this.myzhzlbarchar.setOption(this.baroption);
					var _self = this;
					this.myzhzlbarchar.on('click', function (params) {
						if(params.componentType ==="series"){
							_self.changejwmapdatatype("mtype");
							_self.changejwmapyhorbz(params.data.name);
							_self.changejwmapyhorbzname(params.name);
						}
					})
				}
			},
			makebarcharoption(objdata){
				var dataarr = [];
				var yAxisdataarr = [];
				this.barmaxnum = 0;
				this.zhsum = 0;
				for(let i=0;i<objdata.length;i++){	
					var objdataitem = objdata[i];
					this.zhsum += Number(objdataitem.value);
					dataarr.push({"name":objdataitem.bankid,"value":objdataitem.value});
					yAxisdataarr.push(objdataitem.bankname);
					//获取最多的数量用来格式化Label
					if(i==0){
						this.barmaxnum = objdataitem.value;
					}
				};
				this.baroption.dataZoom = [
						{
							type:'slider',
							show:true,
							yAxisIndex:[0],
							startValue:objdata.length-4,
							endValue:objdata.length,
							showDataShadow:false,
							height:167,
							width:12,
							right:0,
							backgroundColor:"#e5f1ed",
							fillerColor:"#a2ebd6",
							borderColor:"#e5f1ed",
							handleStyle:{
								color:"#3bbdb1"
							},
							showDetail:false
						},
						{
							type:'inside',
							yAxisIndex:[0],
							startValue:objdata.length-4,
							endValue:objdata.length
						}
					];
				this.baroption.yAxis.data = yAxisdataarr;
				this.baroption.series[0].data = dataarr;
			},
			changebarcharandjtt(alldataarr){
				this.makebarcharoption(alldataarr);
				this.changebarchar();
			},
		},
		ready(){
			// this.changebarchar();
		}
	}
</script>