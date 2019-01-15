<template>
	<div class="zongbubarclass">
		<div class="zongbubartitle">
			<div class="titlelebelfont">{{titlelable}}</div>
			<div id="tjthbartitleleft" class="titlenumfont titlenumleftclass"></div>
			<div id="tjthbartitlemiddle" class="titlenumfont titlenummiddleclass"></div>
			<div id="tjthbartitleright" class="titlenumfont tltlenumrightclass"></div>
		</div>
		<div id="tjthbarchart" class="zongbuchartbar"></div>
	</div>
</template>
<style scoped>
	.zongbubarclass{
		width: 380px;
		height: 286px
	}
	.zongbubartitle{
		width: 380px;
		height: 66px;
		background-image: url('../static/zongbubartitle.png');
	}
	.titlelebelfont{
		font-family: "microsoft yahei";
		font-size: 16px;
		color: #003a36;
		font-weight: bold;
		position: absolute;
		top: 10px;
		left: 159px;
	}
	.titlenumleftclass{
		position: absolute;
		width: 131px;
		height: 20px;
		text-align: center;
		top: 30px;
	}

	.tltlenumrightclass{
		position: absolute;
		width: 120px;
		height: 20px;
		text-align: center;
		top: 30px;
		left: 265px;
	}


	.titlenummiddleclass{
		position: absolute;
		width: 120px;
		height: 20px;
		text-align: center;
		top: 34px;
		left: 134px;
	}

	.titlenumfont{
		font-family: "Oswald medium";
		font-size: 16px;
		color: #003a36
	}

	.zongbuchartbar{
		width: 360px;
		height: 220px;
	}

</style>
<script>
	import echarts from 'echarts'
	import mycountup from '../libs/countUp/countUp'
	import {getzongbutjthdata,getzongbutjthtopfivedata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from '../vuex/getters'
	export default{
		data(){
			return{
				titleleft:2123456,
				titlemiddle:2123456,
				titleright:2123456,
				myzbbarchart:null,
				mytjthoption :{
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
								ret = params[0].name +":"+(Number(params[0].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
								return ret;

						 // Number(params[0].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
						}
						},
						grid: {
							left: '3%',
							right: '0',
							bottom: '2%',
							top:"15px",
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
							name:'发债金额',
							type:'bar',
							barWidth: '30px',
							data:[700, 670, 610, 580, 500],
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
					}
			}
		},
		vuex:{
			getters:{
				getzongbutjthdata,
				getzongbutjthtopfivedata,
				getNyrstatevalue:getNyrstate,
				getdwstate,
				getnowpagestate,
				getorganidstate
			}
		},
		watch:{
			getzongbutjthtopfivedata:function(val){
				this.makeoption(val);
				this.changebarchart();
			},
			getzongbutjthdata:function(val){
				this.changetitlenum(val)
			},
			getNyrstatevalue:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutjthtopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutjthdata);
				}				
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutjthtopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutjthdata);
				}		
			},
			getorganidstate:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutjthtopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutjthdata);
				}
			}
		},
		methods:{
				changetitlenum(dataobjarrtitle){
					this.titleleft =0;
					this.titlemiddle=0;
					this.titleright=0;
					if(document.getElementById('tjthbartitleleft')!=null){
						for(let i=0 ; i<dataobjarrtitle.length;i++){
							var getgwjtkpidataitem = dataobjarrtitle[i];
							if(getgwjtkpidataitem.organid == this.getorganidstate){
									if(this.getNyrstatevalue == "isnian"){
										if(this.getdwstate == "wanyuan"){
											this.titleleft = getgwjtkpidataitem.thisyearzlamountw;
											this.titlemiddle = getgwjtkpidataitem.thisyearloanreturnamount;
											this.titleright = getgwjtkpidataitem.thisyearxbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.yearzlamounty;
											this.titlemiddle = getgwjtkpidataitem.yearloanreturnamounty;
											this.titleright = getgwjtkpidataitem.yearxbamounty;
										}
									}else if(this.getNyrstatevalue == "isyue"){
										if(this.getdwstate == "wanyuan"){
											this.titleleft = getgwjtkpidataitem.thismonthzlamountw;
											this.titlemiddle = getgwjtkpidataitem.thismonthloanreturnamount;
											this.titleright = getgwjtkpidataitem.thismonthxbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.monthzlamounty;
											this.titlemiddle = getgwjtkpidataitem.monthloanreturnamounty;
											this.titleright = getgwjtkpidataitem.monthxbamounty;
										}
									}else{
										if(this.getdwstate == "wanyuan"){
											this.titleleft = getgwjtkpidataitem.zlamountw;
											this.titlemiddle = getgwjtkpidataitem.loanreturnamount;
											this.titleright = getgwjtkpidataitem.xbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.zlamounty;
											this.titlemiddle = getgwjtkpidataitem.loanreturnamounty;
											this.titleright = getgwjtkpidataitem.xbamounty;
										}
									}
							}	
						}
						var options = {useEasing : true, useGrouping : true, separator : ',', decimal : '.', prefix : '', suffix : ''};
						var _bartitleleft =  new mycountup.CountUp("tjthbartitleleft", 0, this.titleleft, 2, 1, options);
						_bartitleleft.start();
						var _bartitlemiddle =  new mycountup.CountUp("tjthbartitlemiddle", 0, this.titlemiddle, 2, 1, options);
						_bartitlemiddle.start();
						var _bartitleright =  new mycountup.CountUp("tjthbartitleright", 0, this.titleright, 2, 1, options);
						_bartitleright.start();
					}
				},
				changebarchart(){
					if(document.getElementById('tjthbarchart')!=null){
						document.getElementById('tjthbarchart').innerHTML = "";
						if (this.myzbbarchart != null && this.myzbbarchart != undefined) {
							this.myzbbarchart.clear();
						}
						this.myzbbarchart = echarts.init(document.getElementById('tjthbarchart'));
						this.myzbbarchart.setOption(this.mytjthoption);
					}
				},
				makeoption(objdataarr){
					var _dataarr = [];
					var _xAxisdataarr = [];
					for(let i=-0;i<objdataarr.length;i++){
						if(objdataarr[i].organid == this.getorganidstate){
								_xAxisdataarr.push(objdataarr[i].otherorgan);
							if(this.getNyrstatevalue == "isnian"){
								if(this.getdwstate == "wanyuan"){
									_dataarr.push(objdataarr[i].thisyearloanreturnamount)
								}else{
									_dataarr.push(objdataarr[i].yearloanreturnamounty)
								}
							}else if(this.getNyrstatevalue == "isyue"){
								if(this.getdwstate == "wanyuan"){
									_dataarr.push(objdataarr[i].thismonthloanreturnamount)
								}else{
									_dataarr.push(objdataarr[i].monthloanreturnamounty)
								}
							}else{
								if(this.getdwstate == "wanyuan"){
									_dataarr.push(objdataarr[i].loanreturnamount)
								}else{
									_dataarr.push(objdataarr[i].loanreturnamounty)
								}
							}
						}
					}
					this.mytjthoption.xAxis[0].data = _xAxisdataarr;
					this.mytjthoption.series[0].data = _dataarr;
				}
		},
		props:["titlelable","idtype"],
		ready(){
				// this.changetitlenum();
				// this.changebarchart(this.makeoption());
		}

	}
	
</script>