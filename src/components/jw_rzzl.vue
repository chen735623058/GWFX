<template>
	<div id="rzzlDiv">
		<div id="rzzecblpie" class="rzzecblpieclass"></div>
		<div id="rzzlcbl" class="rzzlcbldiv" @click="rzzlcblclick()">
			<div class="zrzltitle">融资总览</div>
			<hr  class="rzzlcblhr" />
			<div class="zrzlvalue">{{rzzlwcl}}</div>
			<div class="zrzlname">成本率</div>
		</div>
		<div id="rzzlrzze" class="rzzlcbldiv yincang" @click="rzzlrzzelclick()">
			<div class="zrzltitle">融资总览</div>
			<hr  class="rzzlcblhr" />
			<div class="zrzlvalue">{{rzzle | currency ''}}</div>
			<div class="zrzlname">融资总额</div>
		</div>
	</div>
</template>
<style scoped>
	@import '../libs/animate.min.css';
	.rzzecblpieclass{
		width: 433px;
		height: 272px;
	}
	.rzzlcbldiv{
		position: absolute;
		top: 61px;
		left: 115px;
		width: 150px;
		cursor: pointer;
		height: 150px;
		border-radius: 100px;
	}

	.yincang{
		display: none;
	}
	.rzzlcbldiv:hover{
		/* CSS3 inset shadow: */
		-moz-box-shadow:0 0 30px #999 inset;
		-webkit-box-shadow:0 0 30px #999 inset;
		box-shadow:0 0 30px #999 inset;
	}

	.rzzlcblhr{
    	border: 0px;
        border-bottom: 1px dashed #00706b;
   		width: 131px
    }

	.zrzltitle{
		font-family: 'microsoft yahei';
		font-size: 20px;
		font-weight: bold;
		color: #00706b;
		text-align: center;
		padding-top: 29px;
	}
	.zrzlvalue{
		font-family: 'Oswald medium';
		font-size: 22px;
		font-weight: bold;
		color: #00706b;
		text-align: center;
	}

	.zrzlname{
		font-family: 'microsoft yahei';
		font-size: 18px;
		color: #00706b;
		text-align: center;
	}

	.rzzecblpieclass{
		width: 433px;
		height: 272px;
	}


</style>
<script>
	import echarts from 'echarts'
	import {getjingwaipiedata,getNyrstate,getdwstate,getnowpagestate} from "../vuex/getters"
	export default{
		data(){
			return{
				myrzzecblpiechar:null,
				rzzle:0,
				rzzlwcl:0,
				pieoption:{
					tooltip: {
						trigger: 'item',
						formatter:function (params, ticket, callback) {
							var ret = params.name+": "+ (Number(params.value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"("+params.percent+"%)"
							return ret;
						}
						//formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					// color:['#009c84','#20ad97','#40beaa','#6dcfbd','#ffca61','#f6aa00'],
					color:['#40beaa','#60cfbd','#ffca61','#f6aa00','#a28a3d','#ab673a'],
					legend: {
						orient: 'vertical',
						left: '326',
						top:'65',
						textStyle:{
							fontFamily:'宋体',
							fontSize:12,
						},
						data:['银行借款','委托借款','信托借款','债务融资','融资租赁','其他融资']
					},
					series: [
					{
						name:'融资机构',
						type:'pie',
						radius: ['75', '125'],
						center:['190','50%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								position: 'inside',
								// formatter:"{d}%",
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
									fontFamily: 'Oswald medium',
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
						{value:335, name:'银行借款'},
						{value:310, name:'委托借款'},
						{value:234, name:'信托借款'},
						{value:135, name:'债务融资'},
						{value:1548, name:'融资租赁'},
						{value:310, name:'其他融资'}
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
				getPieNyrstate:getNyrstate,
				getdwstate,
				getnowpagestate,
				getjingwaipiedata
			}
		},
		watch:{
			getPieNyrstate:function(val){
				if(this.getnowpagestate=="jw"){
					if(this.mypagestate == "jw"){
						this.changepievalue(this.getjingwaipiedata);
					}	
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jw"){
					if(this.mypagestate == "jw"){
						this.changepievalue(this.getjingwaipiedata);
					}	
				}
			},
			getjingwaipiedata:function(val){
				if(this.getnowpagestate=="jw"){
					if(this.mypagestate == "jw"){
						this.changepievalue(val);
					}	
				}	
			},
		},
		methods:{
			rzzlcblclick(){
				$('#rzzlcbl').addClass('yincang');
				$('#rzzlrzze').removeClass('yincang');
				$('#rzzlrzze').addClass('flip animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('flip animated');
					
				})
			},
			rzzlrzzelclick(){
				$('#rzzlrzze').addClass('yincang');
				$('#rzzlcbl').removeClass('yincang');
				$('#rzzlcbl').addClass('flip animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('flip animated');
					
				})
			},
			changepiechartbar(){
				if(document.getElementById('rzzecblpie')!=null){
					document.getElementById('rzzecblpie').innerHTML = "";
					if (this.myrzzecblpiechar != null && this.myrzzecblpiechar != undefined) {
						this.myrzzecblpiechar.clear();
					}
					this.myrzzecblpiechar = echarts.init(document.getElementById('rzzecblpie'));
					this.myrzzecblpiechar.setOption(this.pieoption);
				}
			},
			makepieoption(objdata){
				this.rzzle = 0;
				var dataarr = [];
				var legenddata = [];
				var qtdatavalue = 0;
				var constbjyesum = 0;
				var constmoneysum = 0;
				var jndata = 0;
				var jwdata = 0;
				
				//这个地方现在就是先按照rzfsname分类汇总后展示前五 后面的归为其他
				var _endgroupdata = [];
					// var _objdata=objdata.slice();
					for(let i=0;i<objdata.length;i++){
						let groupflag = true;
						for(let j=0;j<_endgroupdata.length;j++){
							if(objdata[i].rzfsname == _endgroupdata[j].rzfsname){
								_endgroupdata[j].bjyew = Number(_endgroupdata[j].bjyew) +Number(objdata[i].bjyew);
								_endgroupdata[j].bjyey = Number(_endgroupdata[j].bjyey) +Number(objdata[i].bjyey);
								groupflag = false;
							}
						}
						if(groupflag){
							var endgroupitem = {};
							endgroupitem.rzfsname = objdata[i].rzfsname;
							endgroupitem.bjyew = objdata[i].bjyew;
							endgroupitem.bjyey = objdata[i].bjyey;
							_endgroupdata.push(endgroupitem);
						}
						_endgroupdata.sort(function(a,b){
							return Number(b.bjyew)-Number(a.bjyew);
						});	
					}
					for(let i=0;i<_endgroupdata.length;i++){
						if(i<5){
							legenddata.push(_endgroupdata[i].rzfsname);
							var valobj = {};
							if(this.getdwstate == "wanyuan"){
								valobj.value = _endgroupdata[i].bjyew;
							}else{
								valobj.value = _endgroupdata[i].bjyey;
							}
							valobj.name = _endgroupdata[i].rzfsname;
							dataarr.push(valobj);

						}else{
							if(this.getdwstate == "wanyuan"){
								qtdatavalue = qtdatavalue + Number(_endgroupdata[i].bjyew);
							}else{
								qtdatavalue = qtdatavalue + Number(_endgroupdata[i].bjyey);
							}
						}
					}

				//计算总数
				for(let i=0;i<objdata.length;i++){
					
					if(this.getdwstate == "wanyuan"){
						this.rzzle = this.rzzle  +  Number(objdata[i].bjyew);
					}else{
						this.rzzle = this.rzzle  + Number(objdata[i].bjyey);
					}

					constbjyesum = constbjyesum + Number(objdata[i].constbjye);
					constmoneysum = constmoneysum + Number(objdata[i].constmoney);

				};
				if(constbjyesum != 0){
					this.rzzlwcl = Number((constmoneysum/constbjyesum)*100).toFixed(2)+"%";
				}else{
					this.rzzlwcl = "0%";
				}
					
				if(qtdatavalue != 0){
					legenddata.push("其他融资");
					var qtvalobj = {};
					qtvalobj.value = qtdatavalue;
					qtvalobj.name = "其他融资";
					dataarr.push(qtvalobj)
				}
				this.pieoption.color = ['#40beaa','#60cfbd','#ffca61','#f6aa00','#a28a3d','#ab673a'];
				
				this.pieoption.legend.data = legenddata;
				this.pieoption.series[0].data = dataarr;
			},
			changepievalue(alldataarr){
				var afterarr = [];
				if(alldataarr != undefined){
					for(let i=0;i<alldataarr.length;i++){
						afterarr.push(alldataarr[i]);
					}
					this.makepieoption(afterarr);
					this.changepiechartbar();
				}
			},
		},
		props:["mypagestate"],
		ready(){
		}
	}
</script>