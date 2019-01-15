<template>
    <div id="detailDialog_{{pageName}}" class="detailDialog">
        <div class="dialogOperate">
            <input type="button" value="导 出" class="headerBtn" @click="exportExcel('')">
            <div class="itemDiv">单位：<span id="unit_{{pageName}}"></span></div>
        </div>
        <div class="dialogContent">
            <table id="dg_{{pageName}}" class="dataGrid"></table>
        </div>
        <form id="expForm_{{pageName}}" method="post"></form>
    </div>
</template>
<style scoped>
    input {
        font-size: 12px;
        font-family: "Microsoft YaHei", "Arial";
    }

    .detailDialog {
        border: none;
    }

    .dialogOperate {
        position: absolute;
        left: 5px;
        right: 5px;
        height: 30px;
        background-color: #C2E4E6;
    }

    .dialogContent {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 56px;
        bottom: 5px;
    }

    .dataGrid {
        width: 100%;
        height: 100%;
    }

    .headerBtn {
        float: right;
        min-width: 50px;
        height: 22px;
        width: 50px;
        background-color: #F1FFFD;
        border: solid 1px #A3C1C5;
        text-align: center;
        line-height: 18px;
        margin: 4px 8px 4px 0;
        cursor: pointer;
        border-radius: 3px;
    }

    .headerBtn:hover {
        background-color: #DBE9ED;
    }

    .itemDiv {
        float: right;
        padding: 0 20px 0 0;
        line-height: 30px;
        color: #9C9E9E;
    }
</style>
<script>
    import {getServerURL,getCSRFToken,getdwstate,getDatestate,getorganidstate,getOrganName,getnowpagestate} from '../vuex/getters';
    export default{
        data(){
            return {
                gridType:""
            }
        },
        vuex:{
            actions:{
            },
            getters:{
                getServerURL,
                getCSRFToken,
                getdwstate,
                getDatestate,
                getorganidstate,
                getOrganName,
                getnowpagestate
            }
        },
        watch:{
        },
        methods:{
            openDialog(title) {
                this.unitText();
                $('#detailDialog_'+this.pageName).dialog({
                    title: title,
                    closable: true,
                    width: 800,
                    height: document.body.scrollHeight-300,
                    top: 150,
                    closed: false,
                    modal: true,
                    onClose: function() {
                        $(this).dialog('destroy');
                    }
                });
                this.initGrid("dg_"+this.pageName);
            },
            initGrid(tableID) {
                let pageName = this.pageName;
                let headerUrl = this.getServerURL + '/zjjk/gridHeader/' + pageName;
                let dataUrl = this.getServerURL + '/zjjk/gridData/' + pageName;
                let params = this.getParams();

                let gridParams = {};
                gridParams.pageName = pageName;
                gridParams.tableID = tableID;
                gridParams.headerUrl = headerUrl;
                gridParams.dataUrl = dataUrl;
                gridParams.params = params;
                gridParams.pageType = "default";
                this.makeGrid(gridParams);
            },
            getParams() {
                var param = {};
                param.rq = this.getDatestate;
                param.organid = this.getorganidstate;
                param.organName = this.getOrganName;
                if(this.getdwstate == "wanyuan"){
                    param.unit = "10000";
                }else{
                    param.unit = "100000000";
                }
                param.timeText = param.rq;
                param.gridType = this.gridType;
                return param;
            },
            makeGrid(gridParams) {
                var headers = {};
                headers['__RequestVerificationToken'] = this.getCSRFToken;
                $.ajax({
                    url: gridParams.headerUrl,
                    type: "POST",
                    dataType: "JSON",
                    headers: headers,
                    data: {
                        pageType: gridParams.pageType
                    },
                    success: (data) => {
                        this.columnsFormat(data.frozenColumns);
                        this.columnsFormat(data.columns);

                        $.ajaxSetup({
                            headers:{'__RequestVerificationToken':this.getCSRFToken}
                        });
                        gridParams.data = data;
                        this.gridType = data.gridType;
                        if($("#"+gridParams.tableID).data('datagrid')){
                            $("#"+gridParams.tableID).datagrid('reload', this.getParams());
                        }else {
                            if(data.gridType == 'dataGrid'){
                                this.makeDataGrid(gridParams);
                            }else if(data.gridType == 'treeGrid'){
                                this.makeTreeGrid(gridParams);
                            }
                        }
                    },
                    error: (XMLHttpRequest, textStatus, errorThrown) => {
                        $.messager.alert("提示", "加载表头失败！");
                    }
                });
            },
            columnsFormat(data) {
                if(!data) return;
                for(var i=0, j=data.length; i<j; i++){
                    $.each(data[i], (idx, item) => {
                        if (item.formatter == "cellTooltipFormat") {
                            item.formatter = this.cellTooltipFormat;
                        }
                    });
                }
            },
            cellTooltipFormat(val) {
                if (val == null || val == undefined) return "";
                return "<span title='" + val + "'>" + val + "</span>";
            },
            makeDataGrid(gridParams) {
                var data = gridParams.data;
                var viewHeight = data.columns.length*30 + 5;
                $("#"+gridParams.tableID).datagrid({
                    url: gridParams.dataUrl,
                    frozenColumns: data.frozenColumns,
                    columns: data.columns,
                    queryParams: gridParams.params,
                    fit: true,
                    fitColumns: data.fitColumns,
                    pagination: data.pagination,
                    pageSize: data.pageSize,
                    pageList: [20,50,100,200],
                    striped: true,
                    singleSelect: data.singleSelect,
                    rownumbers: true,
                    loadMsg: '数据加载中，请稍等...',
                    view: this.myView('dataGrid', viewHeight),
                    emptyMsg: '该时间段内无业务数据，请您尝试其他时间范围。',
                    showFooter: data.showFooter
                });
            },
            makeTreeGrid(gridParams) {
                var data = gridParams.data;
                var viewHeight = data.columns.length*30 + 5;
                $("#"+gridParams.tableID).treegrid({
                    url: gridParams.dataUrl,
                    idField: data.idField,
                    treeField: data.treeField,
                    frozenColumns: data.frozenColumns,
                    columns: data.columns,
                    queryParams: gridParams.params,
                    fit: true,
                    fitColumns: data.fitColumns,
                    striped: true,
                    singleSelect: data.singleSelect,
                    rownumbers: true,
                    loadMsg: '数据加载中，请稍等...',
                    view: this.myView('treeGrid', viewHeight),
                    emptyMsg: '该时间段内无业务数据，请您尝试其他时间范围。',
                    animate: true,
                    loadFilter: function(data){
                        var result = JSON.parse(JSON.stringify(data).replace(/parentId/g, "_parentId"));
                        return result;
                    }
                });
            },
            myView(gridType, topHeight) {
                if(!gridType) gridType = 'dataGrid';
                if(!topHeight) topHeight = 35;
                var viewStyle = {
                    position: 'relative',
                    left: 0,
                    top: topHeight,
                    marginLeft: 10,
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 14
                };
                if(gridType == 'dataGrid') {
                    return $.extend({},$.fn.datagrid.defaults.view,{
                        onAfterRender:function(target){
                            $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
                            var opts = $(target).datagrid('options');
                            var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
                            vc.children('div.datagrid-empty').remove();
                            if (!$(target).datagrid('getRows').length){
                                var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                                d.css(viewStyle);
                            }
                        }
                    });
                }else if(gridType == 'treeGrid') {
                    return $.extend({},$.fn.treegrid.defaults.view,{
                        onAfterRender:function(target){
                            $.fn.treegrid.defaults.view.onAfterRender.call(this,target);
                            var opts = $(target).treegrid('options');
                            var vc = $(target).treegrid('getPanel').children('div.datagrid-view');
                            vc.children('div.datagrid-empty').remove();
                            if (!$(target).treegrid('getData').length){
                                var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                                d.css(viewStyle);
                            }
                        }
                    });
                }
            },
            exportExcel(type) {
                var gridTotal = $('#dg_'+this.pageName).datagrid('getData').total;
                if(gridTotal){
                    var gridTotalInt = parseInt(gridTotal);
                    if(gridTotalInt > 50000){
                        $.messager.alert("提示", "数据量超过50000条，请重新设置筛选条件!");
                        return;
                    }
                }

                var dataUrl = this.getServerURL + '/zjjk/export/' + this.pageName;
                var paramObj = this.getParams();
                if(type) {
                    paramObj.expType = type;
                }else {
                    paramObj.expType = "";
                }
                var paramString = '';

                $.each(paramObj, function(key, value) {
                    var id = 'expForm_' + key;
                    $('#' + id).remove();
                    paramString += '<input type="hidden" name=' + key + ' id= "' + id + '" value= "' + value + '"></input>';
                });
                paramString += '<input type="hidden" name="CSRFToken" id="CSRFToken" value="' + this.getCSRFToken + '" />';
                $("#expForm_"+this.pageName).append(paramString);
                $("#expForm_"+this.pageName).attr("action", dataUrl);
                $('#expForm_'+this.pageName).submit();
            },
            unitText() {
                if(this.pageName == "zhzlDetail") {
                    $('#unit_'+this.pageName).html("个");
                }else if(this.getdwstate == "wanyuan"){
                    $('#unit_'+this.pageName).html("万元");
                }else{
                    $('#unit_'+this.pageName).html("亿元");
                }
            }
        },
        props:['pageName'],
        ready(){
        }
    }

</script>