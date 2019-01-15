<template>
	<div class="zongbubarclass">
		<div class="zongbubartitle">
			<div class="titlelebelfont">{{titlelable}}</div>
			<div id="tyfzbartitleleft" class="titlenumfont titlenumleftclass"></div>
			<div id="tyfzbartitlemiddle" class="titlenumfont titlenummiddleclass"></div>
			<div id="tyfzbartitleright" class="titlenumfont tltlenumrightclass"></div>
		</div>
		<div id="tyfzzbbarchart" class="zongbuchartbar"></div>
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
		left: 254px;
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
	import {getzongbutyfzdata,getzongbutyfztopfivedata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from '../vuex/getters'
	export default{
		data(){
			return{
				titleleft:2123456,
				titlemiddle:2123456,
				titleright:2123456,
				myzbbarchart:null,
				mytyfzoption :{
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
							data : ['山东', '浙江', '山西', '冀北', '北京'],
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
				getzongbutyfzdata,
				getzongbutyfztopfivedata,
				getNyrstatevalue:getNyrstate,
				getdwstate,
				getnowpagestate,
				getorganidstate
			}
		},
		watch:{
			getzongbutyfztopfivedata:function(val){
				this.makeoption(val);
				this.changebarchart();
			},
			getzongbutyfzdata:function(val){
				this.changetitlenum(val)
			},
			getNyrstatevalue:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutyfztopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutyfzdata);
				}				
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutyfztopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutyfzdata);
				}		
			},
			getorganidstate:function(val){
				if(this.getnowpagestate=="zb"){
					this.makeoption(this.getzongbutyfztopfivedata);
					this.changebarchart();
					this.changetitlenum(this.getzongbutyfzdata);
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
											this.titlemiddle = getgwjtkpidataitem.thisyearbondsamountw;
											this.titleright = getgwjtkpidataitem.thisyearxbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.thisyearzlamounty;
											this.titlemiddle = getgwjtkpidataitem.thisyearbondsamounty;
											this.titleright = getgwjtkpidataitem.thisyearxbamounty;
										}
									}else if(this.getNyrstatevalue == "isyue"){
										if(this.getdwstate == "wanyuan"){
											this.titleleft = getgwjtkpidataitem.thismonthzlamountw;
											this.titlemiddle = getgwjtkpidataitem.thismonthbondsamountw;
											this.titleright = getgwjtkpidataitem.thismonthxbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.thismonthzlamounty;
											this.titlemiddle = getgwjtkpidataitem.thismonthbondsamounty;
											this.titleright = getgwjtkpidataitem.thismonthxbamounty;
										}
									}else{
										if(this.getdwstate == "wanyuan"){
											this.titleleft = getgwjtkpidataitem.zlamountw;
											this.titlemiddle = getgwjtkpidataitem.bondsamountw;
											this.titleright = getgwjtkpidataitem.xbamountw;
										}else{
											this.titleleft = getgwjtkpidataitem.zlamounty;
											this.titlemiddle = getgwjtkpidataitem.bondsnamounty;
											this.titleright = getgwjtkpidataitem.xbamounty;
										}
									}
							}	
						}
						var options = {useEasing : true, useGrouping : true, separator : ',', decimal : '.', prefix : '', suffix : ''};
						var _bartitleleft =  new mycountup.CountUp("tyfzbartitleleft", 0, this.titleleft, 2, 1, options);
						_bartitleleft.start();
						var _bartitlemiddle =  new mycountup.CountUp("tyfzbartitlemiddle", 0, this.titlemiddle, 2, 1, options);
						_bartitlemiddle.start();
						var _bartitleright =  new mycountup.CountUp("tyfzbartitleright", 0, this.titleright, 2, 1, options);
						_bartitleright.start();
					}
				},
				changebarchart(){
					if(document.getElementById('tyfzzbbarchart') !=null){
						document.getElementById('tyfzzbbarchart').innerHTML = "";
						if (this.myzbbarchart != null && this.myzbbarchart != undefined) {
							this.myzbbarchart.clear();
						}
						this.myzbbarchart = echarts.init(document.getElementById('tyfzzbbarchart'));
						this.myzbbarchart.setOption(this.mytyfzoption);
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
									_dataarr.push(objdataarr[i].thisyearbondsamountw)
								}else{
									_dataarr.push(objdataarr[i].thisyearbondsamounty)
								}
							}else if(this.getNyrstatevalue == "isyue"){
								if(this.getdwstate == "wanyuan"){
									_dataarr.push(objdataarr[i].thismonthbondsamountw)
								}else{
									_dataarr.push(objdataarr[i].thismonthbondsamounty)
								}
							}else{
								if(this.getdwstate == "wanyuan"){
									_dataarr.push(objdataarr[i].bondsamountw)
								}else{
									_dataarr.push(objdataarr[i].bondsnamounty)
								}
							}
						}
					}
					this.mytyfzoption.xAxis[0].data = _xAxisdataarr;
					this.mytyfzoption.series[0].data = _dataarr;
				}
		},
		props:["titlelable","idtype"],
		ready(){
				// this.changetitlenum();
				// this.changebarchart(this.makeoption());
		}

	}
	
</script>