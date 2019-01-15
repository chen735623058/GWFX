<template>
    <div>
       <div class="echarts" id="gwjtmapid"></div>
       <div id="wsdwdiv" style="position: absolute;top: 32px;">
           <select name="dept" id="wsdwxz" data-placeholder="选择单位" style="width:200px;" class="dept_select"></select>
       </div>
       <div class="rtsx"><input type="text" name="" width="127px" id="rtsxchooser"></div> 
    </div>
  
</template>
<style scoped>
     @import '../libs/easyui/themes/default/easyuigwjt.css';
     @import '../libs/easyui/themes/icon.css';
     @import "../libs/chosen/css/chosen.css";
    .echarts {
        width: 600px;
        height: 500px;
    }
    .rtsx{
        position: absolute;
        z-index: 1000;
        top: 373px;
        left: 24px;
    }
    .dispalynono{
        display: none;
    }
</style>
<script>
    import echarts from 'echarts'
    import china from '../libs/china2'
    import dwchosen from '../libs/chosen/js/chosen.jquery'
    import {getgwjtmapdata,getwangshengmapdata,getNyrstate,getdwstate,getnowpagestate,getorganidstate} from '../vuex/getters'
    import {changeorganid,changeOrganName} from '../vuex/actions'
    export default{
        data(){
            return {
                mygwjtmapchart:null,
                dwarr:[],
                gwjtmapoption : {
                    title: {
                        show: false,
                    },
                    tooltip: {
                        show: false,
                    },
                    visualMap: {
                        left: 'left',
                        top: 'bottom',  
                        orient:'horizontal',       
                        calculable: true,
                        min:0,
                        max:1000,
                        itemWidth:4,
                        itemHeight:125,
                        inRange: {
                            color: ['#80e0d0','#009c84']
                        },
                        padding: [
                        5,  // 上
                        10, // 右
                        70,  // 下
                        0, // 左
                        ]
                    },
                    toolbox: {
                        show: false,
                    },
                    series: [
                    
                    ]
                },
                gwjtmapseries : {
                    name: '资金存量',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    zoom:1.25,
                    selectedMode : false,
                    itemStyle: {
                        normal: {
                            borderColor: '#dddddd',
                            areaColor: '#dddddd',
                        },
                        emphasis: {
                            borderColor: '#dddddd',
                            areaColor: '#dddddd',
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            textStyle:{
                                color:"#333333"
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle:{
                                color:"#333333"
                            }
                        }
                    },
                    data: []
                },
                gwjtmapdata:[],
                nowmapdatazb:"1001",
                areafororganid:{},
                nowareaname:""
            }
        },
        vuex:{
            getters:{
                getgwjtmapdata,
                getgwjtmapnyr:getNyrstate,
                getdwstate,
                getnowpagestate,
                getorganidstate,
                getwangshengmapdata
            },
            actions:{
                changeorganid,
                changeOrganName
            }
        },
        watch:{
            getgwjtmapdata:function(val){
                if(this.getnowpagestate=="jt" && this.mypagestate == "jt"){
                    this.changeoptionbydata(val);
                    this.getMapbyoption();
                }
            },
            getwangshengmapdata:function(val){
                if(this.getnowpagestate=="ws" && this.mypagestate=="ws"){
                    this.changeoptionbydata(val);
                    this.getMapbyoption();
                    this.dwarr = val;
                    this.refureshdwchosen();
                    if(this.nowareaname !=""){
                        this.changechosedchoose(this.areafororganid[this.nowareaname]+"_"+this.nowareaname);
                    }
                }
            },
            nowmapdatazb:function(val){
                if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"){
                    if(this.mypagestate == "jt"){
                        this.changeoptionbydata(this.getgwjtmapdata);
                    }else if(this.mypagestate == "ws"){
                        this.changeoptionbydata(this.getwangshengmapdata); 
                    }
                    this.getMapbyoption();
                }
            },
            getgwjtmapnyr:function(val){
                  if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"){
                    if(this.mypagestate == "jt"){
                        this.changeoptionbydata(this.getgwjtmapdata);
                    }else if(this.mypagestate == "ws"){
                        this.changeoptionbydata(this.getwangshengmapdata); 
                    }
                    this.getMapbyoption();
                  }
            },
            getdwstate:function(val){
                if(this.getnowpagestate=="jt" || this.getnowpagestate=="ws"){
                    if(this.mypagestate == "jt"){
                        this.changeoptionbydata(this.getgwjtmapdata);
                    }else if(this.mypagestate == "ws"){
                        this.changeoptionbydata(this.getwangshengmapdata); 
                    }
                    this.getMapbyoption();
                }
            },
            getorganidstate:function(val){
                //这边的作用是判断如果是网省就要点击网省后清空地图选择状态
              if(this.getnowpagestate=="ws" && this.mypagestate == "ws" && val == "0"){
                 if(this.mygwjtmapchart != null && this.mygwjtmapchart != undefined){
                     this.mygwjtmapchart.dispatchAction({
                        type: 'mapUnSelect',
                        name: this.nowareaname
                    });
                     this.nowareaname = "";
                 } 
              }
            } 
        },
        methods: {
            changeoptionbydata(objdata){
                this.gwjtmapdata = [];
                this.areafororganid = {};
                var maxnum = 0;
                for(let i=0;i<objdata.length;i++){
                    if(objdata[i].zbid === this.nowmapdatazb){
                        var _gwjtmapdataitem = {};
                        _gwjtmapdataitem.name = objdata[i].area;
                        if(this.getdwstate == "wanyuan"){
                            _gwjtmapdataitem.value = Number(objdata[i].valuew);
                        }else{
                            _gwjtmapdataitem.value = Number(objdata[i].valuey);
                        }
                        if(maxnum<_gwjtmapdataitem.value ){
                            maxnum = _gwjtmapdataitem.value;
                        }
                        this.gwjtmapdata.push(_gwjtmapdataitem);
                        this.areafororganid[objdata[i].area] = objdata[i].organid;
                    }
                }
                this.gwjtmapseries.selectedMode = "single"; //this.mapselect
                this.gwjtmapseries.itemStyle.emphasis.areaColor = this.myareacolor;
                this.gwjtmapseries.data = this.gwjtmapdata;
                this.gwjtmapoption.series = [this.gwjtmapseries];
                this.gwjtmapoption.visualMap.max = maxnum;
            },
            getMapbyoption(){
                if(document.getElementById('gwjtmapid')!=null){
                    document.getElementById('gwjtmapid').innerHTML="";
                    if(this.mygwjtmapchart != null && this.mygwjtmapchart != undefined){
                     this.mygwjtmapchart.clear();
                    }  
                    this.mygwjtmapchart = echarts.init(document.getElementById('gwjtmapid'));
                    this.mygwjtmapchart.setOption(this.gwjtmapoption);
                    var _self = this;
                    this.mygwjtmapchart.on("mapselectchanged", function (param){

                        if(_self.mapselect == "single"){
                           if(_self.areafororganid[param.name] != undefined && _self.areafororganid[param.name] != ""){
                               let organId = _self.areafororganid[param.name];
                               let organName = "";
                               let len = _self.dwarr.length;
                               for(let i=0;i<len;i++){
                                   if(_self.dwarr[i].zbid == _self.nowmapdatazb && _self.dwarr[i].organid == organId){
                                       organName = _self.dwarr[i].organshortname;
                                   }
                               }
                               _self.changeorganid(organId);
                               _self.changeOrganName(organName);
                               _self.nowareaname = param.name;
                               _self.changechosedchoose(organId+"_"+organName+"_"+param.name);
                          }
                        }else{
                            let _noworganid = _self.areafororganid[param.name];
                            for(let i=0;i<_self.getgwjtmapdata.length;i++){
                                if(_self.getgwjtmapdata[i].organid == _noworganid && _self.getgwjtmapdata[i].zbid == _self.nowmapdatazb){
                                    if(_self.getgwjtmapdata[i].url != "" && _self.getgwjtmapdata[i].url.length>0){
                                         _self.open_window(_self.getgwjtmapdata[i].url);
                                    }
                                }
                            }
                        }
                    });
                    this.mygwjtmapchart.dispatchAction({
                        type: 'mapSelect',
                        name: this.nowareaname
                    });
                }
            },
            changemapdata(){
                 if(this.mypagestate == "jt"){
                     this.changeoptionbydata(this.getgwjtmapdata);
                 }else if(this.mypagestate == "ws"){
                     this.changeoptionbydata(this.getwangshengmapdata);
                 }
                this.getMapbyoption();
            },
            //改变指标选择器使用的方法
            changezbchooser(){
                var _self = this;
                $('#rtsxchooser').empty();
                $('#rtsxchooser').combobox({
                    data:[{label:'资金存量',value:"1001","selected":true},{label:'融资总额',value:"1002"},{label:'账户数量',value:"1003"},{label:'应付票据总额',value:"1004"},{label:'应收票据总额',value:"1005"}],
                    valueField:'value',
                    textField:'label',
                    width:127,
                    panelHeight:100,
                    editable:false,
                    onSelect:function(rec){
                        _self.nowmapdatazb = rec.value;
                    }
                });
            },
           //刷新单位选择控件
            refureshdwchosen(){
                let len = this.dwarr.length;
                $("#wsdwxz").empty();
                let dwchosenhtml = '<option value="-1"></option>';
                for(let i=0;i<len;i++){
                    if(this.dwarr[i].zbid == this.nowmapdatazb){
                        let organName = this.dwarr[i].organshortname;
                        dwchosenhtml  += '<option value="'+this.dwarr[i].organid+'_'+organName+'_'+this.dwarr[i].area+'">'+organName+'</option>'
                    }
                }
                var _self = this;
                $("#wsdwxz").html(dwchosenhtml);
                $('#wsdwxz').on('change', function(e, params) {
                    _self.chosendwchange(params);
                });

                $('.dept_select').chosen({
                    no_results_text: "没有找到这个名字的单位", 
                    placeholder_text : "请选择单位", 
                    search_contains: true,
                    disable_search_threshold: 5,
                    allow_single_deselect:true
                });
                $("#wsdwxz").trigger('chosen:updated');
            },
            //选择器选择后触发的方法
            chosendwchange(paramsvalue){
                if(paramsvalue.selected!=null && paramsvalue.selected !=undefined){
                    var _paramsvalue = paramsvalue.selected.split("_");
                    if(_paramsvalue)
                    this.changeorganid(_paramsvalue[0]);
                    this.changeOrganName(_paramsvalue[1]);
                    this.nowareaname = _paramsvalue[2];
                    this.changemapdata();
                }

            },
            //改变选择器中的选中单位
            changechosedchoose(optionvalue){
                $("#wsdwxz option[selected='selected']").attr('selected',false);
                $("#wsdwxz option[value='"+optionvalue+"']").attr("selected",true);
                $("#wsdwxz").trigger('chosen:updated');
            },
            open_window(opensrc)
            {
                var width = window.screen.availWidth-10;
                var height = window.screen.availHeight-30;
                var borderWidth = 5*2;
                var bottomHeight = 99;
                var nowTop=0,nowLeft=0;
                if(screen.height > (height+bottomHeight)){
                    var nowHeight = (screen.height-height)/2;
                    nowTop = nowHeight-(nowHeight/10*7);
                }
                if(screen.width > (width+borderWidth)){
                    nowLeft = (screen.width-width)/2;
                }
                var szFeatures = "top="+nowTop+"," ;
                szFeatures +="left="+nowLeft+"," ;
                szFeatures +="width="+width+"," ;
                szFeatures +="height="+height+"," ;
                szFeatures +="directories=no," ;
                szFeatures +="status=no," ;
                szFeatures +="menubar=no," ;
                if (height <= 600 ) szFeatures +="scrollbars=yes," ;
                else szFeatures +="scrollbars=no," ;
                szFeatures +="resizable=yes" ;
                window.open(opensrc, "", szFeatures);
            }
        },
        props:["mapselect","myareacolor","mypagestate"],
        ready(){
            if(this.mypagestate == "jt"){
                $("#wsdwdiv").addClass("dispalynono");
            }
            this.changemapdata();
            this.changezbchooser();
        }
    }
</script>