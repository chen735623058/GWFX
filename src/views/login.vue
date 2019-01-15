<template>
	<div class="messageclass"><span class="messagespanclass">{{message}}</span></div>
</template>
<style scoped>
	.messageclass{
		width: 100%;
		position: absolute;
		font-size: 12px;
		height: 827px;
		line-height: 100%;
		text-align: center;
		
	
	}

	.messagespanclass{
		display: inline-block;
		width: 200px;
		margin: auto;
		text-align: center;
		font-size: 12px;
		line-height: 44px;
		font-family: "microsoft yahei";
		color: #333333;
		font-weight: bold;
		position: absolute;
		margin: auto;
		top: 50%;
		height: 44px;
		left: 45%;
		border: 2px solid #95B8E7;
	}
</style>
<script>
	import {getDatabyDate,changeshowhideflag,changePagebyChooer,changeorganid,changeOrganName,changechoosershowhideflag,changeuserinfo,changenowdate,changedimswitchDW} from '../vuex/actions';
	import {getServerURL} from '../vuex/getters';
	export default{
		data(){
			return {
				message:"正在进行身份权限验证,请稍等...",
				usertype:{"集团":"/gwjt","总部":"/zongbu","网省":"/wangsheng","产业":"/chanye","金融":"/jinrong","境外":"/jingwai","境外用户":"/overseas"},
				userpagetype:{"集团":"jt","总部":"zb","网省":"ws","产业":"cy","金融":"jr","境外":"jw","境外用户":"jw"}
			}
		},
		vuex:{
			actions:{
				getDatabyDate,
				changeshowhideflag,
				changePagebyChooer,
				changeorganid,
				changeOrganName,
				changechoosershowhideflag,
				changeuserinfo,
				changenowdate,
				changedimswitchDW 
			},
			getters:{
				getServerURL
			}
		},
		methods:{
			getUserInfo(urlObj){
				var _self = this;
				var o = new Object();
				o.userid = urlObj.userid;
				var Parameter = JSON.stringify(o);
				var urlstr = this.getServerURL+"/cab/getUserInfoByIdAction?queryParams="+Parameter;
				$.ajax({
					async:true,
					url: urlstr,
					type: "GET",
					dataType: 'jsonp',
        			jsonp: 'callback',
					timeout: 50000,
					success: function (data) {
						if(data.organclass1 != ""){
							if (urlObj.userType == 'jw') {
								data.organclass1 = '境外用户';
							}
							_self.changeuserinfo(data);
							if (urlObj.organId) {
								_self.changeorganid(urlObj.organId);
								_self.changeOrganName(urlObj.organName);
							} else {
								_self.changeorganid(data.organid);
							}
							//_self.changePagebyChooer(_self.userpagetype["境外"]);
							//var pagetype = _self.usertype["境外"];
							_self.changePagebyChooer(_self.userpagetype[data.organclass1]);
							var pageType = _self.usertype[data.organclass1];
							_self.$route.router.go({
								path:pageType,
								activeClass:'active'
							});
							_self.getDatabyDate("null");
							_self.changeshowhideflag(false);
							if(data.organclass1 == "集团"){
								_self.changechoosershowhideflag(false);
							}
						}else{
							_self.message = "该用户没有使用驾驶舱的权限";
						}
					},
					error: function (err) {
						_self.message = "该用户没有使用驾驶舱的权限";
						console.log("查询出错");
					}
				});
				
			}
		},
		ready(){
			$("#selectedOrgan").hide();
			let date = new Date();
			let month = date.getMonth() + 1;
			let dayDate = date.getDate()-1;
			let now = date.getFullYear() + "-" + (month<10?('0'+month):month)+"-" +(dayDate<10?('0'+dayDate):dayDate);
			this.changenowdate(now);
			var urlobj  = this.$route.query;
			if(urlobj !=undefined){
				this.getUserInfo(urlobj);
				if(urlobj.nowdate != undefined  && urlobj.nowdate != null && urlobj.nowdate != "null" && urlobj.nowdate != ""){
					this.changenowdate(urlobj.nowdate);
				}
				if(urlobj.portaldwvalue != undefined  && urlobj.portaldwvalue != null && urlobj.portaldwvalue != "null" && urlobj.portaldwvalue != ""){
					if(urlobj.portaldwvalue == 10000){
						this.changedimswitchDW("wanyuan");
					}else{
						this.changedimswitchDW("yiyuan");
					}
				}else{
					this.changedimswitchDW("yiyuan");
				}
				
//				this.getUserInfo(urlobj.userid);
			}else{
				this.message = "该用户没有使用驾驶舱的权限";
			}
			// if(urlobj !=undefined){
			// 	let _path = this.usertype[urlobj.userid];
			// 	if(_path == undefined){
			// 		this.$route.router.go({
			// 			path:'/gwjt',
			// 			activeClass:'active'
			// 		})
			// 	}else{
			// 		this.$route.router.go({
			// 			path:_path,
			// 			activeClass:'active'
			// 		})
			// 	}
			// }else{
			// 	this.message = "该用户没有使用驾驶舱的权限"
			// }
			// this.getUserInfo("9");
		}
	}
</script>