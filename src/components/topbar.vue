<template>
	<div class="topbarclass">
		时间选择 :
		<div class="tjsj_div"><input type="text" id="tjsj" name="tjsj" class="tjsj_input" > </div>
		<div class="cxbuttonclass" @click='getdatebydate()' ></div>
	</div>
</template>
<style>
	.topbarclass{
		width: 100%;
		height: 25px;
		border: 1px solid #E9E9E9;
		line-height: 24px;
		padding-left: 55px;
		color: #333333;
		font-size: 12px;
		background-color: #fdfdfd;
		font-family: "Microsoft YaHei";
		z-index: 100;
		position: fixed;
	}

	.tjsj_div{
		border: 0px;
		position: absolute;
		top: -1px;
		left: 118px;
	}

	.tjsj_input{
		color: #28615B;
		font-size: 14px;
		font-weight: bold;
		font-family: Arial;
		display: inline-block;
		width: 100px;
		height: 18px;
		line-height: 21px;
		border: 1px solid #60cfbd;
		background-color: #f1fffd;
		background-image: url('../static/calendar.png');
		background-repeat: no-repeat;
		background-position: 100%;
		padding-left: 3px;
		border-radius: 3px;
		font-weight: normal;
		cursor: pointer;
	}
	.tjsj_input:hover{

		background-color: rgb(192,243,236);
	}

	.cxbuttonclass{
		background-image: url("../static/cxbutton.png");
		width: 50px;
		height: 22px;
		position: absolute;
		top: 1px;
		left: 232px;
		cursor: pointer;
	}

	.cxbuttonclass:hover{
		background-image: url("../static/cxbuttonover.png");
	}
</style>

<script>
import {WdatePicker} from '../libs/datepicker/WdatePicker'
import {getDatabyDate} from '../vuex/actions'
import {getDatestate} from '../vuex/getters'
	export  default{
		data(){
			return{

			}
		},
		methods:{
           getdatebydate(){
               this.getDatabyDate($('#tjsj').val())
            }
		},
		vuex:{
			actions:{
				getDatabyDate
			},
			getters:{
				getDatestate
			}
		},
		watch:{
			getDatestate:function(val){
				$("#tjsj").val(val);
			}
		},
		ready(){
			  // 开始时间和截止时间默认设置为当前日期
			  let date = new Date();
			  let month = date.getMonth() + 1;
			  let dayDate = date.getDate()-1;
			  let now = date.getFullYear() + "-" + (month<10?('0'+month):month)+"-" +(dayDate<10?('0'+dayDate):dayDate);
			  this.getDatabyDate(now);
			  $("#tjsj").val(now);
			  $("#tjsj").click(function() {
			  	WdatePicker();
			  });
		}
	}
</script>