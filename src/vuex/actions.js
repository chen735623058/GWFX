function getdatabyurljsonp(url,Parameter,successfun,errorfun) {
  	var urlStr = url;
    $.ajax({
        async:true,
        // url: "http://localhost:8080/GWZJEQSERVER/"+urlStr+"?queryParams="+Parameter, //开发前后端分开
        url: "../../../GWZJEQSERVER/"+urlStr+"?queryParams="+Parameter, //生产环境前后端结合
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 50000,
        success: function (data) {
            successfun(data);
        },
        error: function () {
			errorfun();
        }
    });
};

//改变年月日和单位的显示和隐藏
export const changeshowhideflag = function({dispatch,state},showhidef){
	dispatch('CHANGESHOWHIDEFLAG',showhidef);
};

//改变铜钱选择器的显示和隐藏
export const changechoosershowhideflag = function({dispatch,state},showhidef){
	dispatch('CHANGECHOOSERSHOWHIDEFLAG',showhidef);
};

export const changezhezhaohide = function({dispatch,state},showhidef){
	dispatch('CHANGEZHEZHAOHIDE',showhidef);
};

//修改年月日的行为
export const changedimswitchNYR = function({dispatch,state},nyrstate){
	dispatch('CHANGENYRSTATE',nyrstate);
};

//修改亿元万元行为
export const changedimswitchDW = function({dispatch,state},dwstate){
	dispatch("CHANGEDWSTATE",dwstate);
};

//修改选中的组织机构
export const changeorganid = function({dispatch,state},organidstate){
	dispatch("CHANGEORGANID",organidstate);
};

//修改选中的组织机构名称
export const changeOrganName = function({dispatch,state},organName){
	dispatch("CHANGEORGANNAME",organName);
};

export const changenowdate = function({dispatch,state},datestate){
	dispatch('CHANGENOWDATE',datestate);
};
//修改境外地图的数据类型
export const changejwmapdatatype = function({dispatch,state},datestate){
	dispatch('CHANGEJWMAPDATATYPESTATE',datestate);
};
//境外地图进行地图数据筛选的条件
export const changejwmapyhorbz = function({dispatch,state},datestate){
	dispatch('CHANGEJWMAPYHORBZYPESTATE',datestate);
};
//境外地图进行地图数据筛选的条件名称
export const changejwmapyhorbzname = function({dispatch,state},datestate){
	dispatch('CHANGEJWMAPYHORBZYPENAMESTATE',datestate);
};

//点击查询按钮的行为
export const getDatabyDate = function({dispatch,state},datestate){
	if(state.userinfostate != null){
		if(datestate != null &&  datestate != "null"){
			dispatch('CHANGENOWDATE',datestate);
		}
		var o = new Object();
		o.rq = state.datestate;
		//o.rq = "2017-06-30";
	    //这里是判断如果主题是总部就穿根节点2如果是其他就传根节点1
	    if(state.choosershowhideflag){
	    	o.organid = state.organidstate; 
	    }else{
	    	if(state.nowpagestate == "zb"){
	    		o.organid = "2";
	    	}else{
	    		o.organid = "1";
	    	} 
	    }

	    if(state.nowpagestate == "jt"){
	    	getdatabyurljsonp("cab/getgwjtdataAction",JSON.stringify(o),function(jsonarr){
	    		dispatch({
	    			type: 'CHANGEPJZLDATE',
	    			gwjtpjzldata: jsonarr.pjzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEZHZLBYDATE',
	    			zhzldata: jsonarr.zhzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEPIEDATABYDATE',
	    			piedata: jsonarr.rzdataList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJYZDATABYDATE',
	    			zjyzList: jsonarr.zjyzList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJZLDATABYDATE',
	    			zjzlList: jsonarr.zjzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEMAPDATABYDATE',
	    			mapdataarr: jsonarr.gwjtmapList
	    		});
	    		dispatch('CHANGEZHEZHAOHIDE',true);
	    	},function(){
	    		console.log("error");
	    	});
	    }else if(state.nowpagestate == "ws"){
	    	getdatabyurljsonp("cab/getwsdataAction",JSON.stringify(o),function(jsonarr){
	    		dispatch({
	    			type: 'CHANGEPJZLDATE',
	    			gwjtpjzldata: jsonarr.pjzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEZHZLBYDATE',
	    			zhzldata: jsonarr.zhzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEPIEDATABYDATE',
	    			piedata: jsonarr.rzdataList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJFBDATABYDATE',
	    			zjfbList: jsonarr.zjfbList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJZLDATABYDATE',
	    			zjzlList: jsonarr.zjzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEMAPDATABYDATE',
	    			mapdataarr: jsonarr.gwjtmapList
	    		});
	    		dispatch('CHANGEZHEZHAOHIDE',true);
	    	},function(){
	    		console.log("error");
	    	});
	    }else if(state.nowpagestate == "cy"){
	    	getdatabyurljsonp("cab/getcydataAction",JSON.stringify(o),function(jsonarr){
	    		dispatch({
	    			type: 'CHANGEPJZLDATE',
	    			gwjtpjzldata: jsonarr.pjzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEZHZLBYDATE',
	    			zhzldata: jsonarr.zhzldatalist
	    		});
	    		dispatch({
	    			type: 'CHANGEPIEDATABYDATE',
	    			piedata: jsonarr.rzdataList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJFBDATABYDATE',
	    			zjfbList: jsonarr.zjfbList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJZLDATABYDATE',
	    			zjzlList: jsonarr.zjzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEMAPDATABYDATE',
	    			mapdataarr: jsonarr.chanyemapList
	    		});
	    		dispatch('CHANGEZHEZHAOHIDE',true);
	    	},function(){
	    		console.log("error");
	    	});
	    }else if(state.nowpagestate == "zb"){
	    	getdatabyurljsonp("cab/getzbdataAction",JSON.stringify(o),function(jsonarr){
	    		dispatch({
	    			type: 'CHANGEPIEDATABYDATE',
	    			piedata: jsonarr.rzdataList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJZLDATABYDATE',
	    			zjzlList: jsonarr.zjzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEMAPDATABYDATE',
	    			mapdataarr: jsonarr.chanyemapList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJYZDATABYDATE',
	    			zjyzList: jsonarr.zjyzList
	    		});
	    		dispatch({
	    			type: 'CHANGETYFZDATABYDATE',
	    			tyfzList: jsonarr.tyfzList,
	    			tyfztopfiveList:jsonarr.tyfztopfiveList
	    		});
	    		dispatch({
	    			type: 'CHANGETJTHDATABYDATE',
	    			tjthList: jsonarr.tjthList,
	    			tjthtopfiveList: jsonarr.tjthtopfiveList
	    		});
	    		dispatch('CHANGEZHEZHAOHIDE',true);
	    	},function(){
	    		console.log("error");
	    	});
	    }else if(state.nowpagestate == "jr"){
	    	getdatabyurljsonp("cab/getjrdataAction",JSON.stringify(o),function(jsonarr){
	    		setTimeout(() => { 
	    			dispatch('CHANGEZHEZHAOHIDE',true);
	    			dispatch({
	    				type: 'CHANGEZJFBDATABYDATE',
	    				zjfbList: jsonarr.zjfbList
	    			});
	    			dispatch({
	    				type: 'CHANGEZJZLDATABYDATE',
	    				zjzlList: jsonarr.zjzlList
	    			});
	    			dispatch({
	    				type: 'CHANGEZHZLBYDATE',
	    				zhzldata: jsonarr.zhzldatalist
	    			});
	    			dispatch({
	    				type: 'CHANGEZJYTBYDATE',
	    				zjytList: jsonarr.zjytList
	    			});
	    			dispatch({
	    				type: 'CHANGEJRDSDATA',
	    				jrdstList: jsonarr.jrdstList
	    			});
	    		}, 
	    		700);
	    		
	    	},function(){
	    		console.log("error");
	    	});
	    }else if(state.nowpagestate == "jw"){
	    	getdatabyurljsonp("cab/getjwdataAction",JSON.stringify(o),function(jsonarr){
	    		dispatch({
	    			type: 'CHANGEPIEDATABYDATE',
	    			piedata: jsonarr.rzdataList
	    		});
	    		dispatch({
	    			type: 'CHANGEZJZLDATABYDATE',
	    			zjzlList: jsonarr.zjzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWZHZLDATABYDATE',
	    			jwzhzlList: jsonarr.jwZhzlList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWZYBZGLDATABYDATE',
	    			jwzybzglList: jsonarr.jwzybzglList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWZJFBDATABYDATE',
	    			jwzjfbList: jsonarr.jwzjfbDtoList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWZJFBMXDATABYDATE',
	    			jwzjfbmxList: jsonarr.jwzjfbmxDtoList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWMAPDATABYDATE',
	    			jwmapDtoList: jsonarr.jwmapDtoList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWMAPBANKDATABYDATE',
	    			jwmapbankDtoList: jsonarr.jwmapbankDtoList
	    		});
	    		dispatch({
	    			type: 'CHANGEJWMAPMTYPEDATABYDATE',
	    			jwmapmtypeDtoList: jsonarr.jwmapmtypeDtoList
	    		});
	    		dispatch('CHANGEZHEZHAOHIDE',true);
	    	},function(){
	    		console.log("error");
	    	});
	    }
	}
};

//切换主题页面的行为
export const changePagebyChooer = function({dispatch,state},pageid){
	dispatch('CHANGEPAGEID',pageid);
};

//切换用户信息
export const changeuserinfo = function({dispatch,state},userinfoobj){
	dispatch('CHANGEUSERINFO',userinfoobj);
};

//获取token
export const changeCSRFToken = function({dispatch,state}){
	getdatabyurljsonp("cab/getCSRFToken","",function(data){
		dispatch('CHANGECSRF',data);
	},function(){
		console.log("error");
	});
};