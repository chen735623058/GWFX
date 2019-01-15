<template>
	<div>
		<div class="louclass"></div>
		<div class="dwitemscalss" id="dwitems">
		</div>
	</div>
</template>
<style>
	@import '../libs/animate.min.css';
	.louclass{
		width: 284px;
		height: 445px;
		background-image: url("../static/lou.png");
		position: absolute;
		z-index: 10;
	}

	.dwitemscalss{
		width: 350px;
		height: 280px;
		position: absolute;
		left: 246px;
		top: 66px;
	}

	.dwitem{
		width: 260px;
		height: 30px;
		border: 1px solid #009C84;
		background-color: #CCEBE6;
		color: #00706b;
		border-radius: 100px;
		font-weight: bold;
		font-size: 16px;
		font-family: "microsoft yahei";
		line-height: 30px;
		padding-left:60px; 
		margin-top: 2px;
		cursor: pointer;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-o-transition: all 0.3s;
		transition: all 0.3s;
		opacity: 0;
	}
	.dwitem:hover{
		background-color: #B8A621;
		border: 1px solid #B8A621;
		color: #fff;
		width: 290px;
	}

	.dwitem:active{
		width: 290px;
		border: 1px solid #009C84;
		background-color: #009C84;
		color: #fff;
	}

	.dwitemxuanzhong{
		width: 290px;
		border: 1px solid #009C84;
		background-color: #009C84;
		color: #fff;
	}
</style>
<script>
	import {getnowpagestate,getuserinfostate,getchoosershowhideflag,getjinrongdsstate} from "../vuex/getters"
	import {changeorganid,changeOrganName} from '../vuex/actions'
	export default{
		data(){
			return{
				jrdwdataarr:[{
					"name":"英大集团本部","organid":"4023"
				},{
					"name":"中国电力财务有限公司","organid":"2997"
				},{
					"name":"英大泰和人寿保险股份有限公司","organid":"3261"
				},{
					"name":"英大泰和财产保险股份有限公司","organid":"3042"
				},{
					"name":"英大国际信托有限责任公司","organid":"3354"
				},{
					"name":"英大证券有限责任公司","organid":"3359"
				},{
					"name":"长安责任保险股份有限公司","organid":"3398"
				},{
					"name":"英大商务服务有限公司","organid":"3433"
				}
				]
			}
		},
		vuex:{
			getters:{
				getnowpagestate,
				getuserinfostate,
				getchoosershowhideflag,
				getjinrongdsstate
			},
			actions:{
				changeorganid,
				changeOrganName
			}
		},
		watch:{
			getnowpagestate:function(val){
				if( val=="jr" ){ //
					$("#dwitems").empty();
					setTimeout(() => { this.initlouitem(this.jrdwdataarr); }, 700);
				}
				if(val!="jr"){
					$("#dwitems").empty();
				}
			},
			getjinrongdsstate:function(val){
				this.jrdwdataarr = val;
				this.initlouitem(this.jrdwdataarr);
			}
		},
		methods:{
			itemclick(event){
				$(".dwitem").removeClass("dwitemxuanzhong");
				$(event.target).addClass("dwitemxuanzhong");
				var _organId = event.target.id;
				_organId = _organId.split("_")[1];
				let _organName = "";
				let len = this.getjinrongdsstate.length;
				for(let i=0;i<len;i++){
					if(this.getjinrongdsstate[i].organid == _organId){
						_organName = this.getjinrongdsstate[i].name;
					}
				}
				this.changeorganid(_organId);
				this.changeOrganName(_organName);
			},
			initlouitem(dataarr){
				let len = dataarr.length;
				$("#dwitems").empty();
				for(var i=0; i<len;i++){
					let itemid = "jrdw_"+dataarr[i].organid;
					var selectedflag = false;
					if(this.getchoosershowhideflag){
						if(dataarr[i].organid == this.getuserinfostate.organid ){
							var htmlstr='<div class="dwitem dwitemxuanzhong" id="'+itemid+'" @click="itemclick">'+dataarr[i].name+'</div>'
							$("#dwitems").append(htmlstr);
							setTimeout(() => { this.testAnim2("rotateInUpLeft","#"+itemid); }, (i+1)*100);
						}
					}else{
						var htmlstr='<div class="dwitem" id="'+itemid+'" @click="itemclick">'+dataarr[i].name+'</div>'
						$("#dwitems").append(htmlstr);
						setTimeout(() => { this.testAnim2("rotateInUpLeft","#"+itemid); }, (i+1)*100);
					}
					var _self = this;
				}
						
				$('.dwitem').on('click', function(e, params) {
					_self.itemclick(e);
				});
			},
			testAnim2(x,id) {
				$(id).addClass(x+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(id).removeClass(x+' animated');
					$(id).css("opacity",1);
				});
			}
		},
		ready(){

		}
	}
	
</script>