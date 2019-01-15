<template>
<!-- 需求修改了这个模块组件暂时作废 -->
	<div class="chanyegaugeclass">
		<div class="zhzltitle">票据总览</div>
		<hr class="zhzlhr">
		<hr class="zhzlhrright">
		<div id="yspjgauge" class="yspjgaugeclass">
			<canvas width=250 height=140 id="canvas-preview"></canvas>
			<div class="ysvalueclass">
				<div class="yslabel">应收</div>
				<div class="ysjevalue">{{ysjeval}}</div>
				<div class="ysjedw">(金额)</div>
				<div class="ysslvalue">{{ysslval}}</div>
				<div class="yssldw">(数量)</div>
				<hr class="yshrtop">
				<hr class="yshrup">
				<hr class="yshrdown">
			</div>
		</div>

		<div id="yfpjgauge" class="yfpjgaugeclass">
			<canvas width=250 height=140 id="yf-canvas-preview"></canvas>
			<div class="ysvalueclass">
				<div class="yslabel">应收</div>
				<div class="ysjevalue">{{ysjeval}}</div>
				<div class="ysjedw">(金额)</div>
				<div class="ysslvalue">{{ysslval}}</div>
				<div class="yssldw">(数量)</div>
				<hr class="yshrtop">
				<hr class="yshrup">
				<hr class="yshrdown">
			</div>
		</div>
	</div>
</template>
<style scoped>
	.zhzltitle{
		font-family: "microsoft yahei";
		font-size: 20px;
		font-weight: bold;
		color: #00706b;
		width: 800px;
		text-align: center;
	}
	.zhzlhr{
		border: 1px dashed #62bfb5;
		position: absolute;
		width: 345px;
		top: 5px;
	}

	.zhzlhrright{
		border: 1px dashed #62bfb5;
		position: absolute;
		width: 339px;
		top: 5px;
		left: 456px;
	}
	.chanyegaugeclass{
		width: 800px;
		height: 270px;
	}
	.yspjgaugeclass{
		width: 250px;
		height: 245px;
		position: absolute;
		left: 100px;
	}

	.ysvalueclass{
		width: 250px;
		height: 103px;
		position: absolute;
		top: 130px;
	}

	.yshrtop{
		border: 1px dashed #62bfb5;
		position: absolute;
		width: 250px;
		top: 10px;
	}

	.yshrup{
		border: 1px dashed #62bfb5;
		position: absolute;
		width: 250px;
		top: 50px;
	}

	.yshrdown{
		border: 1px dashed #62bfb5;
		position: absolute;
		width: 250px;
		top: 92px;
	}

	.yslabel{
		position: absolute;
		font-size: 18px;
		font-family: "Microsoft yahei";
		color: #00706b;
		width: 37px;
		height: 30px;
		top: 30px;
	}
	.ysslvalue{
		position: absolute;
		font-size: 20px;
		font-family: "Oswald medium";
		color: #00706b;
		width: 164px;
		height: 30px;
		top:  75px;
		left: 30px;
		text-align: right;
	}
	.ysjevalue{
		position: absolute;
		font-size: 20px;
		font-family: "Oswald medium";
		color: #00706b;
		width: 164px;
		height: 30px;
		top: 30px;
		left: 30px;
		text-align: right;
	}
	.ysjedw{
		position: absolute;
		font-size: 18px;
		font-family: "Microsoft yahei";
		color: #00706b;
		width: 50px;
		height: 30px;
		top: 30px;
		left: 201px;
	}

	.yssldw{
		position: absolute;
		font-size: 18px;
		font-family: "Microsoft yahei";
		color: #00706b;
		width: 50px;
		height: 30px;
		top: 75px;
		left: 201px;
	}

	.yfpjgaugeclass{
		width: 250px;
		height: 245px;
		position: absolute;
		left: 465px;
	}

</style>
<script>
	import gauge from "../libs/gauge"
	export default{
		data(){
			return{
				gaugeoption:{
					lines: 12, // The number of lines to draw
					angle: 0, // The length of each line
					lineWidth: 0.44, // The line thickness
					pointer: {
						length: 0.8, // The radius of the inner circle
						strokeWidth: 0.045, // The rotation offset
						color: '#000000' // Fill color
					},
					limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
					colorStart: '#62bfb5',   // Colors
					colormiddle:"#009C84",
					colorStop: '#00706B',    // just experiment with them
					strokeColor: '#DFDFD7'   // to see which ones work best for you
				},
				yfgaugeoption:{
					lines: 12, // The number of lines to draw
					angle: 0, // The length of each line
					lineWidth: 0.44, // The line thickness
					pointer: {
						length: 0.8, // The radius of the inner circle
						strokeWidth: 0.045, // The rotation offset
						color: '#000000' // Fill color
					},
					limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
					colorStart: '#FFC257',   // Colors
					colormiddle:"#F6AA00",
					colorStop: '#c6002f',    // just experiment with them
					strokeColor: '#DFDFD7'   // to see which ones work best for you
				},
				ysjeval:4000,
				ysslval:301,
				yfjeval:2000,
				yfslval:201
			}
		},
		methods:{

		},
		ready(){
			var ysGauge = new Gauge(document.getElementById("canvas-preview"));
			ysGauge.maxValue = 1300;
			ysGauge.set(1244);
			ysGauge.setOptions(this.gaugeoption);
			ysGauge.animationSpeed = 32;

			var yfGauge = new Gauge(document.getElementById("yf-canvas-preview"));
			yfGauge.maxValue = 1300;
			yfGauge.set(1244);
			yfGauge.setOptions(this.yfgaugeoption);
			yfGauge.animationSpeed = 32;

			// var target = document.getElementById('foo'); // your canvas element
			// var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
			// gauge.maxValue = 3000; // set max gauge value
			// gauge.animationSpeed = 32; // set animation speed (32 is default value)
			// gauge.set(1250); // set actual value
		}
	}
</script>