<template>
	<div class="bzzlclass">
		<!--币种总览标题 -->
		<div class="bzzltitleclass">主要币种概览</div>
		<div class="tablediv">
			<table id="bzzlgrid" class="tableclass"></table>
		</div>
		<input type="button" value="导 出" class="headerBtn" @click="exportExcel()">
		<form id="expFormbz" method="post"></form>
	</div>
	
</template>
<style scoped>
	.bzzlclass{
		width: 461px;
		height: 240px;
	}


	.headerBtn {
    /* float: right; */
	    position: absolute;
	    top: 0px;
	    right: -25px;
	    min-width: 50px;
	    height: 22px;
	    color: #329f9b;
	    font-weight: bold;
	    width: 50px;
	    background-color: #B3F0E9;
	    border: solid 0px #A3C1C5;
	    text-align: center;
	    line-height: 18px;
	    margin: 4px 8px 4px 0;
	    cursor: pointer;
	    border-radius: 14px;
    }

    .headerBtn:hover {
        background-color: #DBE9ED;
    }

	.bzzltitleclass{
		font-family: "Microsoft YaHei";
		font-size: 16px;
		font-weight: bold;
		color: #00706b;
		width: 100%;
		text-align: left;
	}

	.tableclass{
		width: 480px;
    	height: 180px;
	}
	.tablediv{
		position: relative;
		top: 7px;
		width: 480px;
		height: 180px;
	}
</style>


<script>
	import {getServerURL,getCSRFToken,getnowpagestate,getjingwaizybzgldata,getdwstate,getDatestate,getorganidstate,getOrganName} from '../vuex/getters'
	import {changejwmapdatatype,changejwmapyhorbz,changejwmapyhorbzname} from '../vuex/actions'
	export default{
		data(){
			return{
				griddata:{},
				kongdata:{"total":6,"rows":[
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0},
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0},
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0},
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0},
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0},
					{"moneytype":"--","balancewb":0,"moneyrate":0,"balance":0}
				]}
			}
		},
		vuex:{
			actions:{
				changejwmapdatatype,
				changejwmapyhorbz,
				changejwmapyhorbzname
			},
			getters:{
				getnowpagestate,
				getjingwaizybzgldata,
				getdwstate,
				getServerURL,
				getCSRFToken,
				getDatestate,
				getorganidstate,
				getOrganName
			}
		},
		watch:{
			getjingwaizybzgldata:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changetabledata(val);
				}
			},
			getdwstate:function(val){
				if(this.getnowpagestate=="jw" ){
					this.changetabledata(this.getjingwaizybzgldata);
				}
			},
		},
		methods:{
			columnsstyle(value,row,index){
				return "color:#00706b;font-size:14px;font-family:'Microsoft YaHei';font-weight:bold;cursor:pointer";
			},
			columnsstylenum(value,row,index){
				return "color:#333333;font-size:16px;font-family:'Oswald Regular';cursor:pointer;font-weight:bold";
			},
			numformater(value,row,index){
				let rtval = 0;
				if(this.getdwstate == "wanyuan"){
					rtval = ((Number(value)/10000).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				}else{
					rtval =((Number(value)/100000000).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
				}

				return rtval;
			},
			makeGrid(){

				$('#bzzlgrid').datagrid({    
					data:this.kongdata, 
					autoRowHeight: false,
                    scrollbarSize:27, //17,
					width: 480,
					height: 180,   
					columns:[[    
						{field:'moneytype',title:'币种',width:110,sortable:false,styler:this.columnsstyle},    
						{field:'balancewb',title:'原币',width:130,sortable:false,align:'right',styler:this.columnsstylenum,formatter:this.numformater},    
						{field:'moneyrate',title:'汇率',width:80,sortable:false,align:'right',styler:this.columnsstylenum},
						{field:'balance',title:'折合人民币',width:130,sortable:false,align:'right',styler:this.columnsstylenum,formatter:this.numformater}  
					]]    
				});
				$('#bzzlgrid').datagrid({
					onClickRow: this.clicktable
				});
			},
			clicktable(rowIndex,rowData){
				this.changejwmapdatatype("bank");
				this.changejwmapyhorbz(rowData.moneytypeid);
				this.changejwmapyhorbzname(rowData.moneytype);
			},
			changetabledata(alldataarr){
				if(alldataarr != undefined  && alldataarr.length>0){
					this.griddata.total = alldataarr.length;
					this.griddata.rows = alldataarr;
				}else{
					this.griddata = this.kongdata;
				}
				$('#bzzlgrid').datagrid('loadData',this.griddata);

			},
			exportExcel() {
                var dataUrl = this.getServerURL + '/zjjk/export/jwbzMonitor';
                var paramObj = this.getParams();
                 paramObj.expType = "";
                var paramString = '';

                $.each(paramObj, function(key, value) {
                    var id = 'expForm_' + key;
                    $('#' + id).remove();
                    paramString +=  '<input type="hidden" name=' + key + ' id= "' + id + '" value= "' + value + '"></input>';
                });
                paramString += '<input type="hidden" name="CSRFToken" id="CSRFToken" value="' + this.getCSRFToken + '" />';
                $("#expFormbz").append(paramString);
                $("#expFormbz").attr("action", dataUrl);
                $("#expFormbz").submit();
            },
            getParams() {
                var param = {};
                param.rq = this.getDatestate;
				if (this.getorganidstate == "-3") {
					param.organid = "1";
					param.organName = "国家电网公司";
				} else {
					param.organid = this.getorganidstate;
					param.organName = this.getOrganName;
				}
                if(this.getdwstate == "wanyuan"){
                    param.unit = "10000";
                }else{
                    param.unit = "100000000";
                }
                param.timeText = param.rq;
                return param;
            }
		},
		ready(){
			this.makeGrid();
			// this.addCSS();
		}
	}
</script>