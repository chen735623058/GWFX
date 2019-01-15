<template>
	<div>
		<div class="nyrswitch" v-bind:class="{ 'class-a': isnian }" @click="choosenyr('isnian')" ><span class="nyrwitchspan">年</span></div>
		<div class="nyrswitch" v-bind:class="{ 'class-a': isyue }" @click="choosenyr('isyue')" ><span class="nyrwitchspan">月</span></div>
		<div class="nyrswitch" v-bind:class="{ 'class-a': isri }" @click="choosenyr('isri')" ><span class="nyrwitchspan">日</span></div>
		<p style="top: 20px;position: relative;">
			<input id="jldwcheck" type="checkbox" name="check-1" value="4" class="lcs_check" autocomplete="off" />
		</p>
        <hr class="switchhr"/>
	</div>
   
</template>
<style scoped>
    @import "../libs/dimswitch/lc_switch.css";
    .nyrswitch{
        width: 40px;
	    height: 25px;
	    border: 1px solid #F6AA00;
	    background: #ffeeb2;
	    float: left;
	    margin-left: 2px;
	    cursor: pointer;
        color: #461E00;
    }

    .switchhr{
        border: 0px;
        border-bottom: 1px dashed #F6AA00;
		position: relative;
		width: 100%;
		top: 6px;
    }
    .nyrwitchspan{
        width: 40px;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        font-family: "Microsoft yahei";
        font-weight: bold;
        color: #461E00;
    }
    .class-a{
		border: 1px solid #F6AA00;
		background: #F6AA00;
    }
</style>
<script>
    import lcswitch from "../libs/dimswitch/js/lc_switch"
    import {changedimswitchNYR,changedimswitchDW} from "../vuex/actions"
    import {getNyrstate,getdwstate} from "../vuex/getters"
    export default{
        data(){
            return{
            	isnian: true,
            	isyue: false,
            	isri: false,
            }
        },
        methods:{
            choosenyr(nyrflag){
                this.changedimswitchNYR(nyrflag);
            	this.isnian = false;
            	this.isyue = false;
            	this.isri = false;
                this[nyrflag] = true;
            }
        },
        vuex:{
            actions:{
                changedimswitchNYR,
                changedimswitchDW
            },
            getters:{
                getNyrstatevaule:getNyrstate,
                getdwstate
            }
        },
        watch:{
            getdwstate:function(val){
                if(val == "wanyuan"){
                    $('#jldwcheck').lcs_off();
                }else{
                    $('#jldwcheck').lcs_on();
                }
            }
        },
        ready(){
            $('input').lc_switch("亿元", "万元");
            var _self = this;
            if(this.getdwstate == "wanyuan"){
                $('#jldwcheck').lcs_off();
            }else{
                $('#jldwcheck').lcs_on();
            }
            $('p').delegate('.lcs_check', 'lcs-statuschange', function() {
                var status = ($(this).is(':checked')) ? 'yiyuan' : 'wanyuan';
                // console.log('field changed status: '+ status );
               _self.changedimswitchDW(status);   
            });
            this.choosenyr(this.getNyrstatevaule);
        }
    }
</script>