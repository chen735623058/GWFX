//获取年月日的状态
export function getNyrstate(state){
	return state.storenyrstate;
}

//获取当前所选时间
export function getDatestate(state){
	return state.datestate;
}

//获取计量单位状态
export function getdwstate(state){
	return state.nowdwstate;
}

//获取当前展示的主题页状态
export function getnowpagestate(state){
	return state.nowpagestate;
}

//获取目前选择的组织机构ID
export function getorganidstate(state){
	return state.organidstate;
}

//获取目前选择的组织机构名称
export function getOrganName(state) {
	return state.organName;
}

//获取服务器URL
export function getServerURL(state){
	return state.thisserverurl;
}

export function getzhezhaohidestate(state){
	return state.zhezhaohidestate;
}

//获取用户信息
export function getuserinfostate(state){
	return state.userinfostate;
}

//获取选择器显示隐藏标识
export function getshowhideflag(state){
	return state.showhideflag;
}

//获取主题选择器是否展示
export function getchoosershowhideflag(state){
	return state.choosershowhideflag;
}

//获取国网集团账户总览数据
export function getgwjtzhzldata(state){
	return state.gwjtzhzldata;
}

//获取国网集团票据总览数据
export function getgwjtpjzldata(state){
	return state.gwjtpjzldata;
}

//获取国网集团资金运作数据
export function getgwzjzjyzdata(state){
	return state.gwzjzjyzdata;
}

//获取国网集团地图数据
export function getgwjtmapdata(state){
	return state.gwzjmapdata;
}

//获取国网集团资金总览数据
export function getgwzjzjzldata(state){
	return state.gwzjzjzldata;
}

//获取国网集团饼图数据
export function getgwjtpiedata(state){
	return state.gwzjpiedata;
}

//获取网省账户总览数据
export function getwangshengzhzldata(state){
	return state.wangshengzhzldata;
}

//获取网省集团票据总览数据
export function getwangshengpjzldata(state){
	return state.wangshengpjzldata;
}

//获取网省集团资金分布
export function getwangshengzjfbdata(state){
	return state.wangshengzjfbdata;
}

//获取网省集团地图数据
export function getwangshengmapdata(state){
	return state.wangshengmapdata;
}

//获取网省集团资金总览数据
export function getwangshengzjzldata(state){
	return state.wangshengzjzldata;
}

//获取网省集团饼图数据
export function getwangshengpiedata(state){
	return state.wangshengpiedata;
}

//获取产业单位账户总览数据
export function getchanyezhzldata(state){
	return state.chanyezhzldata;
}

//获取产业单位票据总览数据
export function getchanyepjzldata(state){
	return state.chanyepjzldata;
}

//获取产业单位资金分布
export function getchanyezjfbdata(state){
	return state.chanyezjfbdata;
}

//获取产业单位地图数据
export function getchanyemapdata(state){
	return state.chanyegmapdata;
}

//获取产业单位资金总览数据
export function getchanyezjzldata(state){
	return state.chanyezjzldata;
}

//获取产业单位饼图数据
export function getchanyepiedata(state){
	return state.chanyepiedata;
}

//获取总部单位地图数据
export function getzongbumapdata(state){
	return state.zongbumapdata;
}

//获取总部单位资金总览数据
export function getzongbuzjzldata(state){
	return state.zongbuzjzldata;
}

//获取总部单位饼图数据
export function getzongbupiedata(state){
	return state.zongbupiedata;
}

//获取总部单位资金运作数据
export function getzongbuzjyzdata(state){
	return state.zongbuzjyzdata;
}

//获取总部单位统一发债数据
export function getzongbutyfzdata(state){
	return state.zongbutyfzdata;
}

//获取总部单位统借统还数据
export function getzongbutjthdata(state){
	return state.zongbutjthdata;
}

//获取总部单位统一发债前五数据
export function getzongbutyfztopfivedata(state){
	return state.zongbutyfztopfivedata;
}

//获取总部单位统借统还前五数据
export function getzongbutjthtopfivedata(state){
	return state.zongbutjthtopfivedata;
}

//获取金融单位资金总览数据
export function getjinrongzjzldata(state){
	return state.jinrongzjzldata;
}

//获取金融单位账户总览数据
export function getjinrongzhzldata(state){
	return state.jinrongzhzldata;
}

//获取金融单位资金分布
export function getjinrongzjfbdata(state){
	return state.jinrongzjfbdata;
}

//获取金融单位资金用途
export function getjinrongzjytdata(state){
	return state.jinrongzjytdata;
}

//获取金融大厦的组织机构
export function getjinrongdsstate(state){
	return state.jinrongdsstate;
}

//获取弹出框表格表头数据
export function getCSRFToken(state) {
	return state.token;
}

//获取境外的资金总览数据
export function getjingwaizjzldata(state){
	return state.jingwaizjzldata;
}
//获取境外融资的数据
export function getjingwaipiedata(state){
	return state.jingwaipiedata;
}
//获取境外账户总览数据
export function getjingwaizhzldata(state){
	return state.jingwaizhzldata;
}

//获取境外主要币种概览
export function getjingwaizybzgldata(state){
	return state.jingwaizybzgldata;
}

//获取境外资金分布
export function getjingwaizjfbdata(state){
	return state.jingwaizjfbdata;
}

//获取境外资金分布明细
export function getjingwaizjfbmxdata(state){
	return state.jingwaizjfbmxdata;
}
//获取境外地图全部的数据
export function getjingwaimapdata(state){
	return state.jingwaimapdata;
}
//获取境外地图银行分类的数据
export function getjingwaimapbankdata(state){
	return state.jingwaimapbankdata;
}
//获取境外地图币种分类的数据
export function getjingwaimapmtypedata(state){
	return state.jingwaimapmtypedata;
}
//境外判断地图上目前显示的是那类数据
export function getjwmapdatatype(state){
	return state.jwmapdatatype;
}

//用于做地图数据筛选的ID
export function getjwchangeyhorbzid(state){
	return state.jwchangeyhorbzid;
}
//用于做地图数据筛选的NAME
export function getjwchangeyhorbzname(state){
	return state.jwchangeyhorbzname;
}

