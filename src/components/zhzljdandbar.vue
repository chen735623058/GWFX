<template>
	<div id="zhzlDiv" class="zhzljdtandbarclass">
		<div class="zhzlTitle"><span class="typeText" @click="showDetail()">账户总览</span></div>
		<hr class="zhTitleHr left">
		<hr class="zhTitleHr right">
		<div id="zhjklyuan" class="zhjklyuanclass" data-dimension="155" data-text="{{huantudata}}" data-info="监控账户率" data-width="13" data-fontsize="22" data-percent="{{huantudataval}}" data-fgcolor="#009C84" data-bgcolor="#ddd"></div>
		<div id="zhslbar" class="zhslbarclass"></div>
		<my-dialog v-show="showDialog" page-name="zhzlDetail" v-ref:detail></my-dialog>
	</div>
</template>
<style scoped>
	@import "../libs/huantu/css/jquery.circliful.css";
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

	.zhslbarclass{
		width: 305px;
		height: 180px;
		top: 15px;
		left: 165px;
	}

	.left {
		left: 0px;
	}

	.right {
		right: 0px;
	}

	.zhTitleHr {
		border: 0px;
		border-bottom: 1px dashed #62bfb5;
		position: absolute;
		width: 180px;
		top: 5px;
	}

	.zhjklyuanclass{
		position: absolute;
		top: 40px;
	}

	.zhzljdtandbarclass{
		width: 100%;
		height: 100%;
	}
</style>
<script>
	import detailDialog from '../components/detailDialog.vue'
	import huantu from "../libs/huantu/js/jquery.circliful"
	import echarts from 'echarts'
	import {getgwjtzhzldata,getchanyezhzldata,getjinrongzhzldata,getNyrstate,getdwstate,getnowpagestate,getwangshengzhzldata,getorganidstate} from '../vuex/getters'

	export  default{
		data(){
			return{
				showDialog: false,
				dialogHtml: "",
				huantudata:"82.49%",
				huantudataval:"82.49",
				myzhzlbarchar:null,
				barmaxnum:0,
				baroption:{
				title: {
					text: '',
					subtext: ''
				},
				tooltip: {
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
					left: '15',
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
					data: ['全部账户','监控账户','集团账户','中电账户'],
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
					data: [18203, 23489, 29034, 104970]
				}
				]
			}
			}
		},
		components:{
			'my-dialog':detailDialog
		},
		vuex:{
			getters:{
				getgwjtzhzldata,
				getPieNyrstate:getNyrstate,
				getdwstate,
				getnowpagestate,
				getwangshengzhzldata,
				getorganidstate,
				getchanyezhzldata,
				getjinrongzhzldata
			}
		},
		watch:{

			getPieNyrstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changebarcharandjtt(this.getgwjtzhzldata);
					}else if(this.mypagestate == "ws"){
						this.changebarcharandjtt(this.getwangshengzhzldata);
					}else if(this.mypagestate == "cy"){
						this.changebarcharandjtt(this.getchanyezhzldata);
					}else if(this.mypagestate == "jr"){
						this.changebarcharandjtt(this.getjinrongzhzldata);
					}
					
				}				
			},
			getgwjtzhzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changebarcharandjtt(val);
					}		
				}
			},
			getjinrongzhzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jr"){
						this.changebarcharandjtt(val);
					}		
				}
			},
			getchanyezhzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "cy"){
						this.changebarcharandjtt(val);
					}		
				}
			},
			getwangshengzhzldata:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "ws"){
						this.changebarcharandjtt(val);
					}		
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changebarcharandjtt(this.getgwjtzhzldata);
					}else if(this.mypagestate == "ws"){
						this.changebarcharandjtt(this.getwangshengzhzldata);
					}else if(this.mypagestate == "cy"){
						this.changebarcharandjtt(this.getchanyezhzldata);
					}else if(this.mypagestate == "jr"){
						this.changebarcharandjtt(this.getjinrongzhzldata);
					}
					
				}
			},
			getorganidstate:function(val){
				if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws" || this.getnowpagestate=="jr" || this.getnowpagestate=="cy" ){
					if(this.mypagestate == "jt"){
						this.changebarcharandjtt(this.getgwjtzhzldata);
					}else if(this.mypagestate == "ws"){
						this.changebarcharandjtt(this.getwangshengzhzldata);
					}else if(this.mypagestate == "cy"){
						this.changebarcharandjtt(this.getchanyezhzldata);
					}else if(this.mypagestate == "jr"){
						this.changebarcharandjtt(this.getjinrongzhzldata);
					}
					
				}
			}
		},
		methods:{
			changelabelforbar(params, ticket, callback){	
				var ret ;	
				if(Number(params.value)/Number(this.barmaxnum)<0.18){
					ret=""
				}else{
					ret = (Number(params.value).toFixed(0)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				}
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
				}
			},
			makebarcharoption(objdata){
				var dataarr = [];
				var yAxisdataarr = [];
				this.huantudataval = 0;
				this.huantudata = "0%";
				for(let i=0;i<objdata.length;i++){	
						var objdataitem = objdata[i];
						if(objdataitem.organid == this.getorganidstate){
							this.huantudataval = (Number(objdataitem.accountjkrate)*100).toFixed(2);
							this.huantudata =(Number(objdataitem.accountjkrate)*100).toFixed(2)+"%";
							dataarr.push(objdataitem.wbzhs);
							yAxisdataarr.push("外部账户数");
							dataarr.push(objdataitem.zdcaccountnum);
							yAxisdataarr.push("内部账户数");
							dataarr.push(objdataitem.gjdcaccountnum);
							yAxisdataarr.push("归集账户数");
							dataarr.push(objdataitem.jkaccountnum);
							yAxisdataarr.push("监控账户数");	
							dataarr.push(objdataitem.accountnum);
							this.barmaxnum = objdataitem.accountnum;
							yAxisdataarr.push("全部账户数");
						}
				};
				this.baroption.yAxis.data = yAxisdataarr;
				this.baroption.series[0].data = dataarr;
				$('#zhjklyuan').empty();
				$("#zhjklyuan").data("percent",this.huantudataval); 
				$("#zhjklyuan").data("text",this.huantudata); 
				$('#zhjklyuan').circliful();
			},
			changebarcharandjtt(alldataarr){
				this.makebarcharoption(alldataarr);
				this.changebarchar();
			},
			testAnim2(x,id) {
				$(id).addClass(x+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(id).removeClass(x+' animated');
				})
			},
			showDetail(){
				if (this.$refs.detail.$el.innerHTML) {
					this.dialogHtml = this.$refs.detail.$el.outerHTML;
				}else {
					$("#zhzlDiv").append(this.dialogHtml);
				}
				this.showDialog = true;
				this.$refs.detail.openDialog("账户总览明细");
			}
		},
		props:["mypagestate"],
		ready(){
			if(this.mypagestate == "jt"){
				this.changebarcharandjtt(this.getgwjtzhzldata);
			}
			var _self = this;
			$("#zhjklyuan").mouseover(
				function(){ 
					_self.testAnim2("pulse","#zhjklyuan");
				});

			$(".zhTitleHr").width(($(".zhzlTitle").width()-120)/2);
			$("#zhslbar").width($("#zhzlDiv").width()-175);
		}
	}
</script>