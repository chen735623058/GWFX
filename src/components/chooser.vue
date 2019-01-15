<template>
	<div>
		<div class="chooserlabel" style="display:none" id="chooserlabel" @click="labelclick()" >{{chooserlabel}}</div>
		<div id="targetMenu" class="nicemenu" ></div>
		<div id="gwjt" class="gwjt_chooser" v-link="{path:'/gwjt', activeClass:'active'}" @click="gwjtclick()"></div>
	</div>	
</template>
<style scoped>
	@import '../libs/nicemenu/css/nicemenu.css';
	@import '../libs/nicemenu/css/sytle.css';
	.chooserlabel{
		font-family: "Microsoft yahei";
		font-weight: bold;
		font-size: 12px;
		position: absolute;
		left: -186px;
		cursor: pointer;
	}
	.chooserlabel:hover{
		color: #F6AA00;
	}
</style>
<script>
	import nicemenu from '../libs/nicemenu/js/menu';
	import {changePagebyChooer,changeorganid,changeOrganName,getDatabyDate,changeshowhideflag,changezhezhaohide,changejwmapdatatype,changejwmapyhorbz,changejwmapyhorbzname} from '../vuex/actions'
	export default{
		data(){
			return{
				chooservalue:{"jt":"国网集团","jw":"境外","jr":"金融","cy":"产业","ws":"网省","zb":"总部"},
				startid :"jt",
				chooserlabel:"国网集团",
				labelforid:{"国网集团":"1","网省":"0","产业":"-1","金融":"-2","境外":"-3","总部":"2"}
			}
		},
		vuex:{
			actions:{
				changePagebyChooer,
				changeorganid,
				changeOrganName,
				getDatabyDate,
				changeshowhideflag,
				changezhezhaohide,
				changejwmapdatatype,
				changejwmapyhorbz,
				changejwmapyhorbzname
			}
		},
		methods:{
			currentLabel(){
				if(this.labelforid[this.chooserlabel] != ""){
					this.changeorganid(this.labelforid[this.chooserlabel]);
					this.changeOrganName(this.chooserlabel);
				}	
			},
			gwjtclick(){
				$("#targetMenu").removeClass(this.startid+"_chooser");
				this.startid = "jt";
				this.chooserlabel = this.chooservalue["jt"];
				this.currentLabel();
				$("#targetMenu").addClass(this.startid+"_chooser");
				$('#gwjt').removeClass("gwjt_wxz_chooser");
				$("#gwjt").addClass("gwjt_chooser");
				this.changePagebyChooer(this.startid);
				this.changeshowhideflag(false);
				this.changezhezhaohide(false);
				setTimeout(() => {this.getDatabyDate("null")}, 600);//在切屏动画以后再进行Dom更新
			},
			addCSS(){
            	var link = document.createElement('link');
            	link.type = 'text/css';
            	link.rel = 'stylesheet';
            	link.href = '../../html/cabpage/dist/gray/easyui.css';
            	document.getElementsByTagName("head")[0].appendChild(link);
            },
            removecss(filename){
            	var targetelement = "link";
            	var targetattr = "href";
            	var allsuspects = document.getElementsByTagName(targetelement);
            	for(var k=0 ; k<allsuspects.length ; k++){
            		if(allsuspects[k]&& allsuspects[k].getAttribute(targetattr)!=null && allsuspects[k].getAttribute(targetattr).indexOf(filename)!=-1){
            			allsuspects[k].parentNode.removeChild(allsuspects[k]);
            		}
            	}

            },
			qtclick(event){
				$("#targetMenu").removeClass(this.startid+"_chooser");
				this.startid = event.currentTarget.id;
				this.chooserlabel = this.chooservalue[event.currentTarget.id];
				this.currentLabel();
				this.removecss("gray/easyui.css");
				$("#gwjt").removeClass("gwjt_chooser");
				$('#gwjt').addClass("gwjt_wxz_chooser");
				$("#targetMenu").addClass(event.currentTarget.id+"_chooser");
				if(this.startid === "zb"){
					this.$route.router.go({
                        path:'/zongbu',
                        activeClass:'active'
                    });
                    this.changeshowhideflag(false);
                    this.changezhezhaohide(false);
				}else if(this.startid === "cy"){
					this.$route.router.go({
                        path:'/chanye',
                        activeClass:'active'
                    });
                    this.changeorganid("-1");
                    this.changeshowhideflag(false);
                    this.changezhezhaohide(false);
				}else if(this.startid === "jr"){
					this.$route.router.go({
                        path:'/jinrong',
                        activeClass:'active'
                    });
                    this.changeshowhideflag(false);
                    this.changezhezhaohide(false);
				}else if(this.startid === "ws"){
					this.$route.router.go({
                        path:'/wangsheng',
                        activeClass:'active'
                    });
                    this.changeshowhideflag(false);
                    this.changezhezhaohide(false);
				}else if(this.startid ==="jw"){
					//为了解决表格样式冲突在进入境外时候加入样式，到其他主题时候删除样式
					this.addCSS();
					this.$route.router.go({
                        path:'/jingwai',
                        activeClass:'active'
                    });
                    this.changeshowhideflag(false);
                    this.changezhezhaohide(false);
                    this.changejwmapdatatype("all");
                    this.changejwmapyhorbz("");
                    this.changejwmapyhorbzname("");
				}
				this.changePagebyChooer(this.startid);
				
				setTimeout(() => { this.getDatabyDate("null") }, 600);//在切屏动画以后再进行Dom更新
				
				return false
			}
		},
		ready(){
			this.currentLabel();
			var targetDom = document.getElementById("targetMenu");
			var	nm = new nicemenu.nice_menu(targetDom);
				nm.distributionType = 0;
				nm.delay = 50;
				nm.gap = 2;
				nm.nm_ItemsData = [
					["zb", "#", "_self"],
					["jw", "#", "_self"],
					["jr", "#", "_self"],
					["cy", "#", "_self"],
					["ws", "#", "_self"],
				];	
				nm.chooserclick = this.qtclick;
				nm.nm_createMenu();
		}
	}
</script>