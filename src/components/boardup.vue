<template>
	<div id="boardUp">
		<div class="boardTitle">资金总览</div>
		<div class="boardDimDiv">
			<span class="boardDim" v-bind:class="{ 'class-xz': qb }" @click="dimchooser('qb','1')">全部</span>
			<span class="boardDim boardDimBorder" v-bind:class="{ 'class-xz': jn }" @click="dimchooser('jn','2')">境内</span>
			<span class="boardDim boardDimBorder" v-bind:class="{ 'class-xz': jw }" @click="dimchooser('jw','3')">境外</span>
		</div>
		
		<div class="zjlrlcboard">
			<div class="zjlrdivclass" >
				<span id="zjlrdiv" class="num"></span>
				<span class="typeText">资金流入</span>
			</div>
			<div class="zjcldivclass">
				<span id="zjcldiv" class="num"></span>
				<span class="typeText zjclTextdisabled" id="jzclbtndisabled" style="display:none"  >资金存量</span>
				<span class="typeText zjclText" id="jzclbtn"  @click="showDetail()">资金存量</span>
			</div>
			<div class="zjlcdivclass">
				<span id="zjlcdiv" class="num"></span>
				<span class="typeText">资金流出</span>
			</div>
		</div>
		<my-dialog v-show="showDialog" page-name="zjclDetail" v-ref:detail></my-dialog>
	</div>
</template>
<style scoped>
	.zjlrdivclass{
		width: 140px;
		position: absolute;
		top: 50px;
		font-size: 22px;
		color: #006400;
		font-family: "Oswald medium";
		text-align: center;
		left: 60px;
	}

	.zjcldivclass{
		width: 180px;
		position: absolute;
		top: 50px;
		font-size: 30px;
		color: #00706b;
		font-family: "Oswald medium";
		text-align: center;
		left: 235px;
	}

	.zjlcdivclass{
		width: 140px;
		position: absolute;
		top: 50px;
		font-size: 22px;
		color: #993300;
		font-family: "Oswald medium";
		text-align: center;
		left: 442px;
	}

	.boardDimDiv{
		height: 20px;
		width: 120px;
		position: relative;
		margin: auto;
		text-align: center;
		display: table;
	}

	.boardDim{
		font-weight: bold;
		color: #00706b;
		margin: auto;
		padding-left: 5px;
		padding-right: 5px;
		cursor: pointer;
		line-height: 20px;
	}

	.boardDim:hover{
		background-color:#C2E4E6 
	}

    .boardDimBorder{
    	border-left: 1px solid #00706b;
    }

	.zjlrlcboard{
		width: 600px;
		height: 165px;
		background-image: url("../static/boardupbj.png");
		position: absolute;
        right: -10px;
	}

	.boardTitle{
		font-weight: bold;
		font-size: 16px;
		color: #00706b;
		text-align: center;
		letter-spacing: 2px;
		width: 540px;
		height: 25px;
	}

	.class-xz{
		color: #f6aa00;
	}

	.num {
		line-height: 45px;
		display: block;
	}

	.typeText {
		font-family: "Microsoft YaHei";
		font-weight: bold;
		font-size: 16px;
		line-height: 30px;
		display: block;
		letter-spacing: 2px;
	}

	.zjclText {
		border: 2px solid #97D5CF;
		background-color: #FFF;
		width: 120px;
		margin: auto;
		cursor: pointer;
		border-radius: 15px;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px;
	}


	.zjclTextdisabled {
		/* border: 2px solid #97D5CF; */
		/* background-color: #FFF; */
		width: 120px;
		margin: auto;
		border-radius: 15px;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px;
	}


	.zjclText:hover {
		background-color: #97D5CF;
	}
</style>
<script>
	import detailDialog from '../components/detailDialog.vue'
	import mycountup from '../libs/countUp/countUp'
	import {getgwzjzjzldata,getwangshengzjzldata,getchanyezjzldata,getjinrongzjzldata,getzongbuzjzldata,getNyrstate,getdwstate,getnowpagestate,getorganidstate,getjingwaizjzldata} from '../vuex/getters'
	export default{
		data(){
			return{
				showDialog: false,
				dialogHtml: "",
				qb:true,
				jn:false,
				jw:false,
				nowzbfl:"1",
				zjlrval:0,
				zjlcval:0,
				zjcl:0,
				options : {useEasing : true, useGrouping : true, separator : ',', decimal : '.', prefix : '', suffix : ''}
			}
		},
		components:{
			'my-dialog':detailDialog
		},
		vuex:{
			getters:{
				getgwzjzjzldata,
				getNyrstatevalue:getNyrstate,
				getdwstate,
				getnowpagestate,
				getwangshengzjzldata,
				getorganidstate,
				getchanyezjzldata,
				getzongbuzjzldata,
				getjinrongzjzldata,
				getjingwaizjzldata
			}
		},
		watch:{
			getgwzjzjzldata:function(val){
				if(this.mypagestate == "jt"){
					this.changekpinum(val);
				}
			},
			getzongbuzjzldata:function(val){
				if(this.mypagestate == "zb"){
					this.changekpinum(val);
				}
			},
			getjinrongzjzldata:function(val){
				if(this.mypagestate == "jr"){
					this.changekpinum(val);
				}
			},
			getjingwaizjzldata:function(val){
				if(this.mypagestate == "jw"){
					this.changekpinum(val);
				}
			},
			getNyrstatevalue:function(val){
				if(this.mypagestate == "jt"){
					this.changekpinum(this.getgwzjzjzldata);
				}else if(this.mypagestate == "ws"){
					this.changekpinum(this.getwangshengzjzldata); 
				}else if(this.mypagestate == "cy"){
					this.changekpinum(this.getchanyezjzldata); 
				}else if(this.mypagestate == "zb"){
					this.changekpinum(this.getzongbuzjzldata); 
				}else if(this.mypagestate == "jr"){
					this.changekpinum(this.getjinrongzjzldata);
				}else if(this.mypagestate == "jw"){
					this.changekpinum(this.getjingwaizjzldata);
				}
			},
			getdwstate:function(val){
				if(this.mypagestate == "jt"){
					this.changekpinum(this.getgwzjzjzldata);
				}else if(this.mypagestate == "ws"){
					this.changekpinum(this.getwangshengzjzldata); 
				}else if(this.mypagestate == "cy"){
					this.changekpinum(this.getchanyezjzldata); 
				}else if(this.mypagestate == "zb"){
					this.changekpinum(this.getzongbuzjzldata); 
				}else if(this.mypagestate == "jr"){
					this.changekpinum(this.getjinrongzjzldata);
				}else if(this.mypagestate == "jw"){
					this.changekpinum(this.getjingwaizjzldata);
				}
			},
			getwangshengzjzldata:function(val){
				if(this.mypagestate == "ws"){
					this.changekpinum(val);
				}
			},
			getchanyezjzldata:function(val){
				if(this.mypagestate == "cy"){
					this.changekpinum(val);
				}
			},
			getorganidstate:function(val){
				if(this.mypagestate == "ws"){
					this.changekpinum(this.getwangshengzjzldata);
				}else if(this.mypagestate == "cy"){
					this.changekpinum(this.getchanyezjzldata);
				}else if(this.mypagestate == "zb"){
					this.changekpinum(this.getzongbuzjzldata); 
				}else if(this.mypagestate == "jr"){
					this.changekpinum(this.getjinrongzjzldata);
				}
			}
		},
		methods:{
			dimchooser(dimflag,flagqbjnjw){
				this.nowzbfl = flagqbjnjw;
				this.qb = false;
				this.jn = false;
				this.jw = false;
				this[dimflag] = true;
				this.changekpinum(this.getgwzjzjzldata);
			},
			changekpinum(dataobjarr){
				this.zjlrval =0;
				this.zjlcval=0;
				this.zjcl=0;
				if(document.getElementById('zjlrdiv')!=null){
					for(let i=0 ; i<dataobjarr.length;i++){
						var getgwjtkpidataitem = dataobjarr[i];
						//如果是境外主题则没有组织机构也不区分境内境外
						if(getgwjtkpidataitem.organid == this.getorganidstate || this.mypagestate == "jw" ){
							if(getgwjtkpidataitem.classid == this.nowzbfl || this.mypagestate == "jw"){
								if(this.getNyrstatevalue == "isnian"){
									if(this.getdwstate == "wanyuan"){
										this.zjlrval = getgwjtkpidataitem.thisyearincomew;
										this.zjlcval = getgwjtkpidataitem.thisyearpayoutw;
										this.zjcl = getgwjtkpidataitem.thisyearbalancew;
									}else{
										this.zjlrval = getgwjtkpidataitem.thisyearincomey;
										this.zjlcval = getgwjtkpidataitem.thisyearpayouty;
										this.zjcl = getgwjtkpidataitem.thisyearbalancey;
									}
								}else if(this.getNyrstatevalue == "isyue"){
									if(this.getdwstate == "wanyuan"){
										this.zjlrval = getgwjtkpidataitem.thismonthincomew;
										this.zjlcval = getgwjtkpidataitem.thismonthpayoutw;
										this.zjcl = getgwjtkpidataitem.thismonthbalancew;
									}else{
										this.zjlrval = getgwjtkpidataitem.thismonthincomey;
										this.zjlcval = getgwjtkpidataitem.thismonthpayouty;
										this.zjcl = getgwjtkpidataitem.thismonthbalancey;
									}
								}else{
									if(this.getdwstate == "wanyuan"){
										this.zjlrval = getgwjtkpidataitem.incomew;
										this.zjlcval = getgwjtkpidataitem.payoutw;
										this.zjcl = getgwjtkpidataitem.balancew;
									}else{
										this.zjlrval = getgwjtkpidataitem.incomey;
										this.zjlcval = getgwjtkpidataitem.payouty;
										this.zjcl = getgwjtkpidataitem.balancey;
									}
								}
							}
						}	
					}
					var zjlrdivcountup = new mycountup.CountUp("zjlrdiv", 0, this.zjlrval, 2, 0.4, this.options);
					var zjcldivcountup = new mycountup.CountUp("zjcldiv", 0, this.zjcl, 2, 0.4, this.options);
					var zjlcdivcountup = new mycountup.CountUp("zjlcdiv", 0, this.zjlcval, 2, 0.4, this.options);
					zjcldivcountup.start();
					zjlrdivcountup.start();
					zjlcdivcountup.start();
				}
			},
			showDetail(){
				if (this.$refs.detail.$el.innerHTML) {
					this.dialogHtml = this.$refs.detail.$el.outerHTML;
				}else {
					$("#boardUp").append(this.dialogHtml);
				}
				this.showDialog = true;
				this.$refs.detail.openDialog("资金存量明细");
			}
		},
		props:['jnjwshow','mypagestate'],
		ready(){
			if(!this.jnjwshow){
				$(".boardDimDiv").css("display", "none");
			}
			if(this.mypagestate == "jw"){
				$("#jzclbtn").css("display", "none");
				$("#jzclbtndisabled").css("display", "");
			}
			if(this.mypagestate == "jt"){
				this.changekpinum(this.getgwzjzjzldata);
			}
		}
	}
</script>