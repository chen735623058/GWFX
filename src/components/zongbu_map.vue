<template>
	<div>
		<div class="zongbumapclass" id="zongbumap"></div>
		<div id="dwdiv" style="position: absolute;top: 32px;">
			<select name="dept" id="dwxz" data-placeholder="选择单位" style="width:200px;" class="dept_select"></select>
		</div>
		<div id='unitDialog' class="webui-popover left in unitDialog">
			<div class="arrow"></div>
			<div class="webui-popover-inner">
				<div @click="closeDialog(null)" class="close">x</div>
				<h3 class="webui-popover-title"><i class="glyphicon glyphicon-comment"></i>单位选择</h3>
					<div class="webui-popover-content">
						<ul id="unitList" class="unitList"></ul>
					</div>
				</div>
		</div>
	</div>
</template>
<style scoped>
	@import "../libs/tips/dist/jquery.webui-popover.css";
	@import "../libs/chosen/css/chosen.css";
	.zongbumapclass{
		width:600px;
		height:500px;
	}

	.unitDialog {
		position: absolute;
		z-index: 999;
		display: none;
		width: 280px;
		height: 300px;
		margin: 0px;
		background-color: #00706B;
	}

	.unitList {
		margin: 0px;
		padding: 0px;
		width: 270px;
		height: 260px;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
<script>
	import echarts from 'echarts'
	import china from '../libs/china2'
	import webui from '../libs/tips/dist/jquery.webui-popover.min'
	import dwchosen from  '../libs/chosen/js/chosen.jquery'
	import {getchanyemapdata,getzongbumapdata,getnowpagestate,getuserinfostate,getchoosershowhideflag} from '../vuex/getters'
	import {changeorganid,changeOrganName} from '../vuex/actions'
	export default{
		data(){
			return{
				myChart:null,
				noworgan:"",
				dwarr:[],
				_regions:[
					{
						name: '广东',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},
					{
						name: '广西',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},
					{
						name: '云南',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '贵州',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '海南',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '澳门',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '香港',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '台湾',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					},{
						name: '南海诸岛',
						itemStyle: {
							normal: {
								areaColor : '#bbbbbb'
							},
							emphasis: {
								areaColor: '#bbbbbb'
							}
						}
					}
				],
				geoCoordMap:{
					蒙东:[109.781327,39.608266],
					北京:[116.46,39.92],
					许昌:[113.853917,34.042096],
					南京:[118.823588,32.064001],
					平顶山:[113.199222,33.772651],
					济南:[116.998444,36.666301],
					上海:[121.466439,31.235564],
					武汉:[114.303782,30.598677],
					西安:[108.95148,34.340998],
					沈阳:[123.433224,41.812414],
					成都:[104.082139,30.652611],
					天津:[117.218562,39.145773]
				},
				mapoption:{
					backgroundColor: '#ffffff',
					tooltip: {
						trigger: 'item',
						formatter: function (params) {
							var rt = "";
							if(params.value[2] == 1){
								rt = params.data.organarr[0].name;
							}else{
								rt = params.name + ' : ' + params.value[2];
							}
							return rt;
						}
					},
					geo: {
						map: 'china',
						roam: false,
						zoom: 1.25,
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
								formatter:function(params){
									if(params.value[2] == 1){
										return ""
									}else{
										return params.value[2]
									}
								},
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
				}
			}
		},
		vuex:{
			getters:{
				getchanyemapdata,
				getnowpagestate,
				getzongbumapdata,
				getuserinfostate,
				getchoosershowhideflag
			},
			actions:{
				changeorganid,
				changeOrganName
			}
		},
		watch:{
			getchanyemapdata:function(val){
				if(this.mypagestate == "cy" && this.getnowpagestate == "cy"){
					this.dwarr = this.getchanyemapdata
				}
				this.refureshdwchosen();
				if(this.getchoosershowhideflag){
					this.changeSelectpoint(this.getuserinfostate.organclass2);
					this.getMapbyoption();
					this.changechosedchoose(this.getuserinfostate.organid+"_"+this.getuserinfostate.organname+"_"+this.getuserinfostate.organclass2);
				}else{
					this.changeSelectpoint(null);
					this.getMapbyoption();
				}
			},
			getzongbumapdata:function(val){
				if(this.mypagestate == "zb" && this.getnowpagestate == "zb"){
					this.dwarr = this.getzongbumapdata
				}
				this.refureshdwchosen();
				if(this.getchoosershowhideflag){
					this.changechosedchoose(this.getuserinfostate.organid+"_"+this.getuserinfostate.organname+"_"+this.getuserinfostate.organclass2);
					this.changeSelectpoint(this.getuserinfostate.organclass2);
					this.getMapbyoption();
				}else{
					this.changeSelectpoint(null);
					this.getMapbyoption();
					
				}
			}
		},
		methods:{
			//关闭弹出框
			closeDialog(mappointname){
				$('#unitDialog').hide();
				if(mappointname != null){
					this.changeSelectpoint(mappointname);
					this.getMapbyoption();
				}
				return false;
			},
			//生成单位点数据
			convertData(itemdata,nowchangpoint){
				var res = [];
				for (var i = 0; i < itemdata.length; i++) {
					var geoCoord = this.geoCoordMap[itemdata[i].name];
					if (geoCoord) {
						if(nowchangpoint ==itemdata[i].name){
							res.push({
								name: itemdata[i].name,
								value: geoCoord.concat(itemdata[i].value),
								itemStyle:{
									normal:{
										show:true,
										color :'#FF0000',
										borderColor: '#308B87',
									},
									emphasis: {
										borderColor: '#fff',
										borderWidth: 1
									}
								},
								organarr:itemdata[i].organarr
							});
						}else{
							res.push({
								name: itemdata[i].name,
								value: geoCoord.concat(itemdata[i].value),
								organarr:itemdata[i].organarr
							});
						}
						
					}
				}
				return res;
			},
			//生成地图上的marker点数据
			convertpointData(danweiarr){
				var pointarr = [];
				for(var i=0;i<danweiarr.length;i++){
					var flag = true;
					for(var j=0;j<pointarr.length;j++){
						if(danweiarr[i].qy === pointarr[j].name){
							pointarr[j].value++;
							pointarr[j].organarr.push(danweiarr[i]);
							flag = false;
						}
					}
					if(flag){
						var pointitem = {};
						pointitem.name = danweiarr[i].qy;
						pointitem.value = 1;
						pointitem.organarr =[danweiarr[i]];
						pointarr.push(pointitem)
					}
				}
				return pointarr;
			},
			//根据选择的单位点改变单位点样式
			changeSelectpoint(objdata){
				
				this.mapoption.series[0].data = this.convertData(this.convertpointData(this.dwarr),objdata);
			},
			//根据option生成地图
			getMapbyoption(){
				if(document.getElementById('zongbumap') !=null){
					document.getElementById('zongbumap').innerHTML = "";
					if (this.myChart != null && this.myChart != undefined) {
						this.myChart.clear();
					}
					this.myChart = echarts.init(document.getElementById('zongbumap'));
					this.myChart.setOption(this.mapoption);
					var _self = this;
					this.myChart.on('click', function (params) {
					//点击点触发的方法
					if(params.componentType ==="series"){

						if(params.data.organarr.length ===1){
							//如果是一个单位就直接选中
							_self.noworgan = params.data.organarr[0].organid;
							_self.organName = params.data.organarr[0].name;
							_self.changeSelectpoint(params.name);
							_self.getMapbyoption();
							_self.changeorganid(_self.noworgan);
							_self.changeOrganName(_self.organName);
							_self.changechosedchoose(_self.noworgan+"_"+_self.organName+"_"+params.name);
							_self.closeDialog(null);
						}else if(params.data.organarr.length >1){
							//如果是多个单位就打开列表
							let _dwarr = params.data.organarr;
							var htmlstr= '';
							var imgUrl = require("../static/xzimg.png");
							for(var i=0 ; i<_dwarr.length;i++){
								let liid = "dwli_"+_dwarr[i].organid;
								htmlstr+='<li id="'+liid+'" class="liclass">'
								+ '<img style="position: relative; top: 2px;" src="'+imgUrl+'"/>'+ _dwarr[i].name+'</li>';
							}
							$('#unitList').html(htmlstr);
							$(".liclass").click(params.name,_self.chooserclick);
							$('#unitDialog').css({
								left : params.event.offsetX-310,
								top : params.event.offsetY-145
							}).show()
						}
					}
				});
				}
				
			},
			//弹出框选择后触发的方法
			chooserclick(namestr) {
				this.noworgan = namestr.currentTarget.id.split("_")[1];
				this.changeorganid(this.noworgan);
				let organName = namestr.currentTarget.innerText;
				this.changeOrganName(organName);
				this.closeDialog(namestr.data);
				this.changechosedchoose(this.noworgan+"_"+organName+"_"+namestr.data);
			},
			//刷新单位选择控件
			refureshdwchosen(){
				let len = this.dwarr.length;
				$("#dwxz").empty();
				let dwchosenhtml = '<option value="-1"></option>';

				for(let i=0;i<len;i++){
					dwchosenhtml += '<option value="'+this.dwarr[i].organid+'_'+this.dwarr[i].name+'_'+this.dwarr[i].qy+'">'+this.dwarr[i].name+'</option>'
				}
				var _self = this;
				$("#dwxz").html(dwchosenhtml);
				$('#dwxz').on('change', function(e, params) {
					_self.chosendwchange(params);
				});

				$('.dept_select').chosen({
					no_results_text: "没有找到这个名字的单位", 
					placeholder_text : "请选择单位", 
					search_contains: true,
					disable_search_threshold: 5,
					allow_single_deselect:true
				});
				$("#dwxz").trigger('chosen:updated');
				$("#dwxz_chosen").click( 
					function () { 
						_self.closeDialog(null);
					}
					);
			},
			//选择器选择后触发的方法
			chosendwchange(paramsvalue){
				if(paramsvalue.selected!=null && paramsvalue.selected !=undefined){
					var _paramsvalue = paramsvalue.selected.split("_");
					if(_paramsvalue)
						this.organid = _paramsvalue[0];
					this.changeorganid(_paramsvalue[0]);
					this.changeOrganName(_paramsvalue[1]);
					this.changeSelectpoint(_paramsvalue[2]);
					this.getMapbyoption();
				}

			},
			//改变选择器中的选中单位
			changechosedchoose(optionvalue){
				$("#dwxz option[selected='selected']").attr('selected',false);
				$("#dwxz option[value='"+optionvalue+"']").attr("selected",true);
				$("#dwxz").trigger('chosen:updated');
			}
			

		},
		props:["mypagestate"],
		ready(){
		}
	}
</script>