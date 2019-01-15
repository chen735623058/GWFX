import Vue from 'vue'
import Vuex from 'vuex'

//告诉vue使用vuex
Vue.use(Vuex);

//创建一个对象用来保存应用启动时的初识状态
const state = {
  // thisserverurl:"http://localhost:8080/GWZJEQSERVER",
  thisserverurl:"../../../GWZJEQSERVER",
  showhideflag:true,
  choosershowhideflag:true,//用这个参数区分是集团用户还是其他用户
  zhezhaohidestate:true,
  storecount:0,
  storenyrstate:"isri",
  datestate:"2016-09-18",
  nowpagestate:"jt",
  nowdwstate:"yiyuan",
  organidstate:"1",
  organName:"",
  userinfostate:null,
  gwzjmapdata:[],
  gwzjzjzldata:[],
  gwzjpiedata:[],
  gwjtzhzldata:[],
  gwjtpjzldata:[],
  gwzjzjyzdata:[],
  wangshengmapdata:[],
  wangshengzjzldata:[],
  wangshengpiedata:[],
  wangshengzhzldata:[],
  wangshengpjzldata:[],
  wangshengzjfbdata:[],
  chanyegmapdata:[],
  chanyezjzldata:[],
  chanyepiedata:[],
  chanyezhzldata:[],
  chanyepjzldata:[],
  chanyezjfbdata:[],
  zongbupiedata:[],
  zongbuzjzldata:[],
  zongbumapdata:[],
  zongbuzjyzdata:[],
  zongbutyfzdata:[],
  zongbutjthdata:[],
  zongbutyfztopfivedata:[],
  zongbutjthtopfivedata:[],
  jinrongzjfbdata:[],
  jinrongzjytdata:[],
  jinrongzjzldata:[],
  jinrongzhzldata:[],
  jinrongdsstate:[],
  jingwaizjzldata:[],
  jingwaipiedata:[],
  jingwaizhzldata:[],
  jingwaizybzgldata:[],
  jingwaizjfbdata:[],
  jingwaizjfbmxdata:[],
  jingwaimapdata:[],
  jingwaimapbankdata:[],
  jwmapdatatype:"all",//境外目前显示的是那类属性 all全部 bank银行 mtype币种
  jwchangeyhorbzid:"",
  jwchangeyhorbzname:"",
  jingwaimapmtypedata:"",
  token:""
};
//创建一个对象存储一系列我们接下来要写的mutations对象
const mutations = {
  //修改了年月日
  CHANGENYRSTATE(state,nyrstate){
    state.storenyrstate = nyrstate;
  },
  //修改了用户信息
  CHANGEUSERINFO(state,userinfoobj){
    state.userinfostate = userinfoobj;
  },
  //修改首页选择器显示状态
  CHANGESHOWHIDEFLAG(state,showhidef){
    state.showhideflag = showhidef;
  },

  CHANGEZHEZHAOHIDE(state,showhidef){
    state.zhezhaohidestate = showhidef;
  },

  CHANGECHOOSERSHOWHIDEFLAG(state,showhidef){
    state.choosershowhideflag = showhidef;
  },
  //修改了当前日期
  CHANGENOWDATE(state,datestate){
    state.datestate = datestate;
    document.cookie = 'startDateFromProject='+datestate+';path=/Portal3.1';
    document.cookie = 'dateControlTypeFromProject=2;path=/Portal3.1';
  },
  //修改了当前主题页
  CHANGEPAGEID(state,pagenamestate){
    state.nowpagestate = pagenamestate;
  },
  //修改了计量单位
  CHANGEDWSTATE(state,dwstate){
    state.nowdwstate = dwstate;
    if(state.nowdwstate == "wanyuan"){
       document.cookie = 'unitNameFromProject='+encodeURI("万元")+';path=/Portal3.1';
       document.cookie = 'unitValFromProject=10000;path=/Portal3.1';
    }else{
       document.cookie = 'unitNameFromProject='+encodeURI("亿元")+';path=/Portal3.1';
       document.cookie = 'unitValFromProject=100000000;path=/Portal3.1';
    }
  },

  //修改了组织机构
  CHANGEORGANID(state,organidstate){
    state.organidstate = organidstate;
    var forportalorgid = organidstate;
    if(forportalorgid == "0"||forportalorgid == "-1"||forportalorgid == "-2"||forportalorgid == "-3"){
      forportalorgid = "1";
    }
    document.cookie = 'selectedOrganIdFromProject='+forportalorgid+';path=/Portal3.1';
  },

  //修改组织机构名称
  CHANGEORGANNAME(state,organName) {
    state.organName = organName;
  },

  //修改了国网集团地图数据
  CHANGEMAPDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwzjmapdata = dataobj.mapdataarr;
    }else if(state.nowpagestate === "ws"){
        state.wangshengmapdata = dataobj.mapdataarr;
    }else if(state.nowpagestate == "cy"){
        state.chanyegmapdata = dataobj.mapdataarr;
    }else if(state.nowpagestate == "zb"){
        state.zongbumapdata = dataobj.mapdataarr;
    }     
  },
  //修改了资金总览数据
  CHANGEZJZLDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwzjzjzldata = dataobj.zjzlList;
    }else if(state.nowpagestate === "ws"){
        state.wangshengzjzldata = dataobj.zjzlList;
    }else if(state.nowpagestate == "cy"){
        state.chanyezjzldata = dataobj.zjzlList;
    }else if(state.nowpagestate == "zb"){
        state.zongbuzjzldata = dataobj.zjzlList;
    }else if(state.nowpagestate == "jr"){
        state.jinrongzjzldata = dataobj.zjzlList;
    }else if(state.nowpagestate = "jw"){
        state.jingwaizjzldata = dataobj.zjzlList;
    }        
  },

  //修改了资金运作的数据
  CHANGEZJYZDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwzjzjyzdata = dataobj.zjyzList;
    }else if(state.nowpagestate === "zb"){
        state.zongbuzjyzdata = dataobj.zjyzList;
    }    
  },

  //修改了饼图数据
  CHANGEPIEDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwzjpiedata = dataobj.piedata;
    }else if(state.nowpagestate === "ws"){
        state.wangshengpiedata = dataobj.piedata;
    }else if(state.nowpagestate == "cy"){
        state.chanyepiedata = dataobj.piedata;
    }else if(state.nowpagestate == "zb"){
        state.zongbupiedata = dataobj.piedata;
    }else if(state.nowpagestate == "jw"){
        state.jingwaipiedata = dataobj.piedata;
    }      
  },

  //修改了账户总览数据
  CHANGEZHZLBYDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwjtzhzldata = dataobj.zhzldata;
    }else if(state.nowpagestate === "ws"){
        state.wangshengzhzldata = dataobj.zhzldata;
    }else if(state.nowpagestate == "cy"){
        state.chanyezhzldata = dataobj.zhzldata;
    }else if(state.nowpagestate == "jr"){
        state.jinrongzhzldata = dataobj.zhzldata;
    }      
  },

  //查询票据总览信息
  CHANGEPJZLDATE(state,dataobj){
    if(state.nowpagestate === "jt"){
        state.gwjtpjzldata = dataobj.gwjtpjzldata;
    }else if(state.nowpagestate === "ws"){
        state.wangshengpjzldata = dataobj.gwjtpjzldata;
    }else if(state.nowpagestate == "cy"){
        state.chanyepjzldata = dataobj.gwjtpjzldata;
    }     
  },

    //修改了资金分布的数据
  CHANGEZJFBDATABYDATE(state,dataobj){
    if(state.nowpagestate === "ws"){
      state.wangshengzjfbdata = dataobj.zjfbList;
    }
    else if(state.nowpagestate == "cy"){
        state.chanyezjfbdata = dataobj.zjfbList;
    } 
    else if(state.nowpagestate == "jr"){
        state.jinrongzjfbdata = dataobj.zjfbList;
    } 
  },

  //修改统一发债数据
  CHANGETYFZDATABYDATE(state,dataobj){
    if(state.nowpagestate === "zb"){
      state.zongbutyfzdata = dataobj.tyfzList;
      state.zongbutyfztopfivedata = dataobj.tyfztopfiveList;
    }
  },

  //修改统借统还数据
  CHANGETJTHDATABYDATE(state,dataobj){
    if(state.nowpagestate === "zb"){
      state.zongbutjthdata = dataobj.tjthList;
      state.zongbutjthtopfivedata = dataobj.tjthtopfiveList;
    }
  },

  //获取资金用途
  CHANGEZJYTBYDATE(state,dataobj){
    if(state.nowpagestate === "jr"){
      state.jinrongzjytdata = dataobj.zjytList;
    }
  },

  CHANGEJRDSDATA(state,dataobj){
    if(state.nowpagestate === "jr"){
      state.jinrongdsstate = dataobj.jrdstList;
    }
  },

  CHANGECSRF(state,token) {
    state.token = token;
  },
  //获取境外账户总览
  CHANGEJWZHZLDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
      state.jingwaizhzldata = dataobj.jwzhzlList;
    }
  },
  //获取主要币种概览
  CHANGEJWZYBZGLDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
       state.jingwaizybzgldata = dataobj.jwzybzglList;
    }
  },
  //获取境外资金分布数据
  CHANGEJWZJFBDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
       state.jingwaizjfbdata = dataobj.jwzjfbList;
    }
  },
   //获取境外资金分布明细数据
  CHANGEJWZJFBMXDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
       state.jingwaizjfbmxdata = dataobj.jwzjfbmxList;
    }
  },
  //获取境外地图（全部）数据
  CHANGEJWMAPDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
       state.jingwaimapdata = dataobj.jwmapDtoList;
    }
  },
  //获取境外地图（银行）数据
  CHANGEJWMAPBANKDATABYDATE(state,dataobj){
    if(state.nowpagestate === "jw"){
       state.jingwaimapbankdata = dataobj.jwmapbankDtoList;
    }
  },
  //境外地图数据类型
  CHANGEJWMAPDATATYPESTATE(state,dwstate){
    state.jwmapdatatype = dwstate;
  },
  //境外地图筛选过滤的id
  CHANGEJWMAPYHORBZYPESTATE(state,dwstate){
    state.jwchangeyhorbzid = dwstate;
  },
  //境外地图筛选过滤的名称
  CHANGEJWMAPYHORBZYPENAMESTATE(state,dwstate){
    state.jwchangeyhorbzname = dwstate;
  },
  CHANGEJWMAPMTYPEDATABYDATE(state,dataobj){
     if(state.nowpagestate === "jw"){
       state.jingwaimapmtypedata = dataobj.jwmapmtypeDtoList;
    }
  },
};
//整合发布变量
export default new Vuex.Store({
  state,
  mutations
})