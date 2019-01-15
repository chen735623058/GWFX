<template>
	<div>
		<!--境外的地图-->
		<div id="jwmap" class="jwmapcalss"></div>
		<!--刷新按钮 -->
		<div id="refbutton" class="refbuttondiv">
			<div class="refbutton" @click="refmap()"></div>
		</div>
		<!--地图title-->
		<div id="maptitle" class="mapTitleDiv">{{maptitle}}</div>

	</div>
</template>
<style scoped>
	.jwmapcalss{
		width: 546px;
		height: 372px;
		border-bottom: 3px solid #c2e4e6;
	}

	.mapTitleDiv{
		width: 190px;
		height: 34px;
		border-bottom: 3px solid #c2e4e6;
		position: absolute;
		top: 0px;
		left: 0px;
		font-family: "Microsoft YaHei";
		font-size: 18px;
		font-weight: bold;
		color: #00706b;
		line-height: 34px;
	}

	.refbutton{
		background: url("../static/refbutton.png") center no-repeat;
		width: 28px;
		height: 28px;
		position: absolute;
		right: 0px;
		cursor: pointer;
	}

	.refbutton:hover{
		background: url("../static/refbuttonhover.png") center no-repeat;
	}

	.refbuttondiv{
		width: 190px;
		height: 34px;
		border-bottom: 3px solid #c2e4e6;
		position: absolute;
		top: 0px;
		right: 0px;
	}
</style>
<script>
	import echarts from 'echarts'
	import word  from '../libs/world'
	import {getjingwaimapdata,getnowpagestate,getdwstate,getjingwaimapbankdata,getjwmapdatatype,getjwchangeyhorbzid,getjwchangeyhorbzname,getjingwaimapmtypedata} from '../vuex/getters'
	import {changejwmapdatatype,changejwmapyhorbz,changejwmapyhorbzname} from '../vuex/actions'
	export default{ 
		data(){
			return{
				myChart:null,
				nowmaparr:[],
				mapoption:{
					backgroundColor: '#ffffff',
					tooltip: {
						trigger: 'item',
						formatter:this.formattertootip
					},
					geo: {
						map: 'world',
						roam: false,
						zoom: 1.25,
						top: 110,
						label: {
							emphasis: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								areaColor: '#62BFB5',
								borderColor: '#ffffff'
							},
							emphasis: {
								areaColor: '#62BFB5',
								borderColor: '#ffffff'
							}
						},
						regions:this._regions
					},
					series: [
					{
						name: 'pm2.5',
						type: 'scatter',
						coordinateSystem: 'geo',
						data: [],
						symbol:'pin',
						symbolSize: [40, 40],
						label: {
							normal: {
								show: true,
								textStyle:{
									color:"#00706B"
								}
							},
							emphasis: {
								show: true
							}
						},
						itemStyle: {
							normal:{
								show:true,
								color :'#ffdc00',
								borderColor: '#308B87',
							},
							emphasis: {
								borderColor: '#fff',
								borderWidth: 1
							}
						}
					}
					]
				},
				maptitle:"账户分布"
			}
		},
		vuex:{
			getters:{
				getjingwaimapdata,
				getnowpagestate,
				getdwstate,
				getjwmapdatatype,
				getjwchangeyhorbzid,
				getjingwaimapbankdata,
				getjwchangeyhorbzname,
				getjingwaimapmtypedata
			},
			actions:{
				changejwmapdatatype,
				changejwmapyhorbz,
				changejwmapyhorbzname
			},
		},
		watch:{
			getjingwaimapdata:function(val){
				if(this.getjwmapdatatype == "all"){
					this.nowmaparr = val;
					this.changepoint(null);
					this.getMapbyoption();
				}
		
			},
			getjingwaimapbankdata:function(val){
				if(this.getjwmapdatatype == "bank"){
					this.nowmaparr = val;
					this.changepoint(this.getjwchangeyhorbzid);
					this.getMapbyoption();
				}
			},
			getjingwaimapmtypedata:function(val){
				if(this.getjwmapdatatype == "mtype"){
					this.nowmaparr = val;
					this.changepoint(this.getjwchangeyhorbzid);
					this.getMapbyoption();
				}
			},
			getjwchangeyhorbzid:function(val){
				if(this.getjwmapdatatype == "bank"){
					this.nowmaparr = this.getjingwaimapbankdata;
				}else if(this.getjwmapdatatype == "mtype"){
					this.nowmaparr = this.getjingwaimapmtypedata;
				}else{
					this.nowmaparr = this.getjingwaimapdata;
				}
				this.maptitle = this.getjwchangeyhorbzname +"账户分布";
				this.changepoint(val);
				this.getMapbyoption();
			}
		},
		methods:{
			//刷新还原地图
			refmap(){
				this.changejwmapdatatype("all");
				this.changejwmapyhorbz("");
				this.changejwmapyhorbzname("");
			},
			//根据option绘制世界地图
			getMapbyoption(){
				if(document.getElementById('jwmap')!=null){
					document.getElementById('jwmap').innerHTML = "";
					//判断之前生成过echart对象则清空避免绘制两次
					if(this.myChart != null && this.myChart != undefined){
						this.myChart.clear();
					}
					this.myChart = echarts.init(document.getElementById('jwmap'));
					this.myChart.setOption(this.mapoption);
				}
			},
			//根据修改地图点数据
			changepoint(objdata){
				this.mapoption.series[0].data = this.convertData(this.convertpointData(this.nowmaparr,objdata));
			},
			//生成地图上的marker点数据（聚合国家相同的点）
			convertpointData(danweiarr,filterid){
				var pointarr = [];
				for(var i=0;i<danweiarr.length;i++){
					if(this.getjwmapdatatype == "all" || filterid == danweiarr[i].filterid){
						var flag = true;
						for(var j=0;j<pointarr.length;j++){
							if(danweiarr[i].areaname === pointarr[j].name){
								pointarr[j].value = pointarr[j].value + Number(danweiarr[i].accountnum);
								pointarr[j].organarr.push(danweiarr[i]);
								flag = false;
							}
						}
						if(flag){
							var pointitem = {};
							pointitem.name = danweiarr[i].areaname;
							pointitem.value = Number(danweiarr[i].accountnum);
							pointitem.organarr =[danweiarr[i]];
							pointitem.arealatiude =danweiarr[i].arealatiude;
							pointitem.arealongitude =danweiarr[i].arealongitude;
							pointarr.push(pointitem)
						}
					}
				}
				return pointarr;
			},
			//生成地图点
			convertData(itemdata){
				var res = [];
				for (var i = 0; i < itemdata.length; i++) {
					res.push({
						name: itemdata[i].name,
						value: [itemdata[i].arealatiude,itemdata[i].arealongitude,itemdata[i].value],
						organarr:itemdata[i].organarr
					});
				}
				return res;
			},
			formattertootip(params, ticket, callback){
				var ret = "";
				ret += '<tr><td class="tooltipName">' + params.name + '</td></tr>';
				ret += '<tr><td class="tooltipName">银行账户总个数:</td><td class="tooltipNum">' + params.value[2] + '个</td></tr>';
				let _dwarr = params.data.organarr;
					for(var i=0 ; i<_dwarr.length;i++){
						let num = 0
						if(this.getdwstate == "wanyuan"){
							num = Number(_dwarr[i].balance)/10000;
						}else{
							num = Number(_dwarr[i].balance)/100000000;
						}
						//区别是默认全局还是筛选的
						if(this.getjwmapdatatype == "all"){
							ret += '<tr><td class="tooltipName">资金总额:</td><td class="tooltipNum">' + num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '</td></tr>';
						}else{
							ret += '<tr><td class="tooltipName">' + _dwarr[i].name + ':</td><td class="tooltipNum">' + num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '</td></tr>';
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
			this.getMapbyoption();
		}	
	}
</script>
