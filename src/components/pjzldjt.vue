<template>
	<div id="pjzlDiv" class="pjzldjtclass">
		<div class="pjzltitle"><span class="typeText" @click="showDetail()">票据总览</span></div>
		<hr class="titleHr left">
		<hr class="titleHr right">

		<div id="ysdjt" class="chart left"></div>
		<div id="yfdjt" class="chart right"></div>

		<div class="totalDiv left ysFont">
			<div class="firstLabel">应收</div>
			<div class="firstValue numFont">{{ysslval}}</div>
			<div class="firstUnit">(数量)</div>
			<div class="secondValue numFont">{{ysjeval}}</div>
			<div class="secondUnit">(金额)</div>
			<hr class="hrUp ysHr">
			<hr class="hrDown ysHr">
		</div>

		<div class="totalDiv right yfFont">
			<div class="firstLabel">应付</div>
			<div class="firstValue numFont">{{yfslval}}</div>
			<div class="firstUnit">(数量)</div>
			<div class="secondValue numFont">{{yfjeval}}</div>
			<div class="secondUnit">(金额)</div>
			<hr class="hrUp yfHr">
			<hr class="hrDown yfHr">
		</div>
		<my-dialog v-show="showDialog" page-name="pjzlDetail" v-ref:detail></my-dialog>
	</div>
</template>
<style scoped>
	.pjzldjtclass{
		width: 280px;
		height: 270px;
	}

	.pjzltitle{
		font-size: 16px;
		font-weight: bold;
		color: #00706b;
		width: 280px;
		text-align: center;
	}

	.totalDiv {
		position: absolute;
		width: 130px;
		height: 70px;
		top: 208px;
	}

	.left {
		left: 0px;
	}

	.right {
		right: 0px;
	}

	.numFont {
		font-family: "Oswald Medium";
		font-size: 14px;
	}

	.hrUp {
		position: absolute;
		width: 100%;
		top: 15px;
	}

	.hrDown {
		position: absolute;
		width: 100%;
		top: 45px;
	}

	.ysHr {
		border-top: 1px solid #62bfb5;
		border-left: 0 solid #62bfb5;
		border-bottom: 0 solid #62bfb5;
	}

	.yfHr {
		border-top: 1px solid #d78500;
		border-left: 0 solid #d78500;
		border-bottom: 0 solid #d78500;
	}

	.ysFont {
		color: #00706b;
	}

	.yfFont {
		color: #684A00;
	}

	.firstLabel {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 0px;
		font-weight: bold;
	}

	.firstValue {
		position: absolute;
		width: 65px;
		height: 30px;
		top: 0px;
		right: 35px;
		text-align: right;
	}

	.firstUnit {
		position: absolute;
		width: 35px;
		height: 30px;
		top: 0px;
		right: 0px;
	}

	.secondValue {
		position: absolute;
		min-width: 65px;
		height: 30px;
		top: 30px;
		right: 35px;
		text-align: right;
	}

	.secondUnit {
		position: absolute;
		width: 35px;
		height: 30px;
		top: 30px;
		right: 0px;
	}

	.typeText {
		display: block;
		letter-spacing: 2px;
		border: 2px solid #97D5CF;
		background-color: #FFF;
		width: 120px;
		margin: auto;
		cursor: pointer;
		border-radius: 15px;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px;
	}

	.typeText:hover {
		background-color: #97D5CF;
	}

	.titleHr {
		border: 0px;
		border-bottom: 1px dashed #62bfb5;
		position: absolute;
		width: 80px;
		top: 5px;
	}

	.chart {
		position: absolute;
		width: 130px;
		height: 165px;
		top: 32px;
	}
</style>
<script>
	import detailDialog from '../components/detailDialog.vue'
	import echarts from 'echarts'
	import {getgwjtpjzldata,getchanyepjzldata,getNyrstate,getdwstate,getnowpagestate,getwangshengpjzldata,getorganidstate} from "../vuex/getters"
	export default{
		data(){
			return{
				showDialog: false,
				dialogHtml: "",
				myyschar:null,
				myyfchar:null,
				ysarr:[],
				yfarr:[],
				ysjeval:0,
				ysslval:0,
				yfjeval:0,
				yfslval:0
			}
		},
		components:{
			'my-dialog':detailDialog
		},
		vuex:{
			getters:{
				getgwjtpjzldata,
				getdjtNyrstate:getNyrstate,
				getdwstate,
				getnowpagestate,
				getwangshengpjzldata,
				getorganidstate,
				getchanyepjzldata
			}
		},
		watch:{
			getdjtNyrstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"  || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changedjtchart(this.getgwjtpjzldata);
					}else if(this.mypagestate == "ws"){
						this.changedjtchart(this.getwangshengpjzldata);
					}else if(this.mypagestate == "cy"){
						this.changedjtchart(this.getchanyepjzldata);
					}
					
				}				
			},
			getgwjtpjzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"  || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changedjtchart(this.getgwjtpjzldata);
					}
				}
			},
			getchanyepjzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"  || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "cy"){
						this.changedjtchart(val);
					}
				}
			},
			getwangshengpjzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"  || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "ws"){
						this.changedjtchart(this.getwangshengpjzldata);
					}
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changedjtchart(this.getgwjtpjzldata);
					}else if(this.mypagestate == "ws"){
						this.changedjtchart(this.getwangshengpjzldata);
					}else if(this.mypagestate == "cy"){
						this.changedjtchart(this.getchanyepjzldata);
					}
				}
			},
			getorganidstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changedjtchart(this.getgwjtpjzldata);
					}else if(this.mypagestate == "ws"){
						this.changedjtchart(this.getwangshengpjzldata);
					}else if(this.mypagestate == "cy"){
						this.changedjtchart(this.getchanyepjzldata);
					}
				}
			}
		},
		methods:{
			getoption(dataarr,type){
				var xAxisData = [];
				var seriesdata = [];
				var option = {
					backgroundColor: '#ffffff',
					tooltip: {
						show:true,
						formatter:function (params, ticket, callback) {
							var ret ;
							ret = params.seriesName;
							return ret;

						 // Number(params[0].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
						}
					},
					color:['#00706b','#009c84','#62bfb5','#c2e4e6'],
					xAxis: {
						data: [],
						name: '',
						silent: false,
						axisLine:{show:false},
						axisTick:{show:false},
						axisLabel:{show:false},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					yAxis: {
						boundaryGap: ['0%', '0%'],
						splitArea: {show: false},
						axisLine:{show:false},
						axisTick:{show:false},
						axisLabel:{show:false
						},splitLine:{show:false},
						max:'dataMax'
					},
					grid: {left: '0',right: '0',bottom: '0',top:'4'},
					series: []
				};
				var sumallvalue = 0;
				for(var k=0;k<dataarr.length;k++){
					sumallvalue = sumallvalue +Number(dataarr[k].value);
				}

				for(var j=0;j<dataarr.length;j++){
					let colora = '#ffffff';
					//最后三层字不是白色
					if(j>=2&&type ==='yspj'){
						colora = '#00706b';
					}else if(j>=2&&type ==='yfpj'){
						colora = '#684a00';
					}
					if(Number(dataarr[j].value) > 0 ){
						var bardataval =0;
						if(Number(dataarr[j].value) / sumallvalue >0.07){
							bardataval = Number(dataarr[j].value)
						}else{
							bardataval = sumallvalue *0.07;
						}
						let seriesitem ={name: dataarr[j].name+":"+(Number(dataarr[j].value).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'),
							type: 'bar',
							stack: 'one',
							barWidth: 130,
							itemStyle: {normal: {barBorderWidth: 1}},
							data: [bardataval],
							label: {
								normal: {
									show: true,
									position: 'inside',
									// formatter:"{a}",
									formatter:function (params, ticket, callback) {
										var ret =  params.seriesName ;
										ret = ret.split(":")[0];
										return ret;
									},  //这个地方主要是处理数值过小的问题，取了个巧 赋值给赋值大了 然后显示小的
									textStyle: {
										fontSize: '12',
										fontfamily: '宋体',
										color:colora
									}
								},
								emphasis: {
									show: true
								}
							}
						};
						seriesdata.push(seriesitem);
					}
				}
				var newoption = $.extend(true, {}, option);
				if(type === "yspj"){
					newoption.color = ['#00706b','#009c84','#62bfb5','#92d2ce','#c2e4e6'];
				}else{
					newoption.color = ['#d78500','#f6aa00','#ffc257','#ffe18f','#ffefc4'];
				}
				newoption.series = seriesdata;
				return newoption;
			},
			changedjtchart(objarr){
				this.ysarr = [];
				this.yfarr = [];
				this.ysjeval=0;
				this.ysslval=0;
				this.yfjeval=0;
				this.yfslval=0;
				for(let i=0;i<objarr.length;i++){
					if(objarr[i].organid == this.getorganidstate){
						var ysitem = {};
						var yfitem = {};
						ysitem.name = yfitem.name = objarr[i].accepttimes;
						if(this.getdwstate === "wanyuan"){
							ysitem.value = Number(objarr[i].recsummoneyw).toFixed(2);
							yfitem.value = Number(objarr[i].paysunmoneyw).toFixed(2);
							this.ysjeval = this.ysjeval + Number(objarr[i].recsummoneyw) ;
							this.yfjeval = this.yfjeval + Number(objarr[i].paysunmoneyw) ;

						}else{
							ysitem.value = Number(objarr[i].recsummoneyy).toFixed(2);
							yfitem.value = Number(objarr[i].paysunmoneyy).toFixed(2);
							this.ysjeval = this.ysjeval + Number(objarr[i].recsummoneyy) ;
							this.yfjeval = this.yfjeval + Number(objarr[i].paysunmoneyy) ;
						}
						this.ysslval =  this.ysslval + Number(objarr[i].recbillnum);
						this.yfslval =  this.yfslval + Number(objarr[i].paybillnum);
						this.ysarr.push(ysitem);
						this.yfarr.push(yfitem);
					}
				};

				this.ysslval =  (this.ysslval+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				this.yfslval =  (this.yfslval+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				this.ysjeval = (this.ysjeval.toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				this.yfjeval = (this.yfjeval.toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				if(document.getElementById('ysdjt') !=null && document.getElementById('yfdjt') != null){
					document.getElementById('ysdjt').innerHTML = "";
					document.getElementById('yfdjt').innerHTML = "";
					if (this.myyschar != null && this.myyschar != undefined) {
						this.myyschar.clear();
					}
					this.myyschar = echarts.init(document.getElementById('ysdjt'));
					this.myyschar.setOption(this.getoption(this.ysarr,"yspj"));


					if (this.myyfchar != null && this.myyfchar != undefined) {
						this.myyfchar.clear();
					}
					this.myyfchar = echarts.init(document.getElementById('yfdjt'));
					this.myyfchar.setOption(this.getoption(this.yfarr,"yfpj"));
				}
			},
			showDetail(){
				if (this.$refs.detail.$el.innerHTML) {
					this.dialogHtml = this.$refs.detail.$el.outerHTML;
				}else {
					$("#pjzlDiv").append(this.dialogHtml);
				}
				this.showDialog = true;
				this.$refs.detail.openDialog("票据总览明细");
			}
		},
		props:["mypagestate"],
		ready(){
			if(this.mypagestate == "jt"){
				this.changedjtchart(this.getgwjtpjzldata);
			}
			// }else if(this.mypagestate == "ws"){
			// 	this.changedjtchart(this.getwangshengpjzldata);
			// }
		}

	}
	
</script>