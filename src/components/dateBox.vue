<template>
	<div class="laydate-box" v-show="isShowDatePicker">
		<div class="laydate-top" :class="theme">
			<div class="laydate-ym">
				<div @click="onClick_dateSelect('Year')" class="laydate-year">
					<i class="prev triangle year-prev" @click.stop="onClick_prevBtn('year')">
					</i>
					<span class="laydate-date-year">{{date.year}}年 </span>
					<i class="next triangle year-next" @click.stop="onClick_nextBtn('year')">
					</i>
				</div>
				<div class="laydate-sety" v-show="pops.isShowYear">
					<div class="laydate-hmsno iscroll-ref">
						<p v-for="yearNo in yearList" @click.stop="onClick_detailDate('year',yearNo)"
						   class="year-num" :class="date.year==yearNo? theme:''">{{yearNo}}年</p>
					</div>
				</div>
			</div>
			<div class="laydate-ym">
				<div @click="onClick_dateSelect('Month')" class="laydate-month">
					<i class="prev triangle year-prev" @click.stop="onClick_prevBtn('month')">
					</i>
					<span class="laydate-date-month">{{date.month}}月</span>
					<i class="next triangle year-next" @click.stop="onClick_nextBtn('month')">
					</i>
				</div>
			</div>
		</div>
		<div class="laydate-setm" v-show="pops.isShowMonth">
			<ul class="ymdropul ">
				<li v-for="n in 12" :class="[date.month==n? theme:'',checkMonthDisable(n)?'date-disabled':'']"
					@click.stop="onClick_detailDate('month',n)"
					class="month-num">{{n|addZero}}月
				</li>
			</ul>
		</div>
		<table class="laydate-table">
			<thead>
			<tr>
				<th>日</th>
				<th>一</th>
				<th>二</th>
				<th>三</th>
				<th>四</th>
				<th>五</th>
				<th>六</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="n in weekNum">
				<td v-for="item in dateList.list.slice((n-1)*7,n*7)"
					:class="[date.day==item[2] && (item[1] + 1) == date.month? theme :'', checkDisable(item)?'date-disabled':'cursor','']"
					@click.stop="onClick_dayDate(item)">{{item[2]}}
				</td>
			</tr>
			</tbody>
		</table>
		<div v-if="type==='hour'" class="laydate-bottom">
			<div class="bot-flex">
				<ul class="laydate-hms">
					<li @click.stop="onClick_dateSelect('Hour')"><em>{{date.hour}}</em> <i>:</i></li>
					<li @click.stop="onClick_dateSelect('Minute')"><em>{{date.minute}}</em><i>:</i></li>
					<li @click.stop="onClick_dateSelect('Second')"><em>{{date.second}}</em></li>

				</ul>
			</div>
			<div class="bot-flex laydate-btn">
				<span @click.stop="onClick_okBtn" :class="theme">确认</span>
				<span @click.stop="onClick_todayBtn" :class="theme">今天</span>
				<span @click.stop="onClick_clearBtn" :class="theme">清空</span>
			</div>
		</div>
		<div class="laydate-prop-hms laydate-props">
			<div class="laydate-propcon" v-if="pops.isShowHour">
				<div class="laydate-hms-title">小时
					<div class="laydate-hms-close" @click.stop="onClick_dateSelect('Hour')">×</div>
				</div>
				<div class="laydate-hmsnox clear" :class="weekNum==6?'diff-length':''">
					<p class="hour-num" v-for="n in 24" @click.stop="onClick_detailDate('hour',(n-1))"
					   :class="n-1==date.hour? theme:''">{{n-1
						|addZero}}</p>
				</div>
			</div>
			<div class="laydate-propcon" v-if="pops.isShowMinute">
				<div class="laydate-hms-title">分钟
					<div class="laydate-hms-close" @click="onClick_dateSelect('Minute')">×</div>
				</div>
				<div class="laydate-hmsnox clear" :class="weekNum==6?'diff-length':''">
					<p v-for="n in 60" @click="onClick_detailDate('minute',(n-1))"
					   :class="n-1==date.minute? theme:''">{{n-1|addZero}}</p>
				</div>
			</div>
			<div class="laydate-propcon" v-if="pops.isShowSecond">
				<div class="laydate-hms-title">秒数
					<div class="laydate-hms-close" @click="onClick_dateSelect('Second')">×</div>
				</div>
				<div class="laydate-hmsnox clear" :class="weekNum==6?'diff-length':''">
					<p v-for="n in 60"
					   @click="onClick_detailDate('second',(n-1))" :class="n-1==date.second? theme:''">
						{{n-1|addZero}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import * as util from '../js/func'
	import g from '../global';
	var _showList = ["Year", "Month", 'Hour', 'Minute', 'Second'];
	var _startYear, _endYear, _endMonth;
	const prefixCls = 'c-date';
	export default {
		name: "c-date",
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				pops: {},
				date: {},
				currMonth: 0,
				yearList: []
			}
		},
		filters: {
			addZero: (data)=>
			{
				return data < 10 ? "0" + data : data;
			}
		},
		props: {
			isShowDatePicker: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ['date', 'hour'])
				},
				default: 'date'
			},
			startTime: {
				type: Number,
				default: 1330000000000
			},
			endTime: {
				type: Number,
				default: 9999999999999
			},
			theme: {
				type: String,
				default: 'color-pinky'
			}

		},
		watch: {
			isShowDatePicker($val)
			{
				trace("isShowDatePicker", this.isShowDatePicker)
			}
		},
		computed: {
			weekNum()
			{
				if (this.dateList.list)
				{
					return this.dateList.list.length / 7;
				}
			},
			dateList()
			{
				return g.timeTool.getMonthByOffset(this.currMonth);
			}
		},
		methods: {
			init(){
				_startYear = parseInt(g.timeTool.getDateArray(this.startTime)[0]);
				_endYear = parseInt(g.timeTool.getDateArray(this.endTime)[0]);
				_endMonth = parseInt(g.timeTool.getDateArray(this.endTime)[1]);
				for (var i = _startYear; i <= _endYear; i++)
				{
					this.yearList.push(i);
				}
				this.initPops();
				this.onClick_clearBtn();
			},
			initPops()
			{
				this.pops = {
					isShowYear: false,
					isShowMonth: false,
					isShowHour: false,
					isShowMinute: false,
					isShowSecond: false
				}
			},
			onClick_dateSelect($type)
			{
				if ($type)
				{
					if (this.pops["isShow" + $type] == true)
					{
						this.pops["isShow" + $type] = false;
					}
					else
					{
						this.pops["isShow" + $type] = true
					}
					var copyShows = _showList.concat();
					var index = copyShows.indexOf($type);
					copyShows.splice(index, 1);
					for (var showItem of copyShows)
					{
						this.pops["isShow" + showItem] = false;
					}
				}
			},
			onClick_detailDate($type, $num)
			{
				if ($type)
				{
					var type = $type.substr(0, 1).toUpperCase() + $type.substr(1);
					this.onClick_dateSelect(type);
					this.chooseDate($type, $num);
				}
			},
			chooseDate($type, $num)
			{
				this.date[$type] = this.addZero($num);
				if ($type == "month")
				{
					var nowMonth = new Date().getMonth() + 1;
					var monthNum = this.checkValid("month", $num);
					if (monthNum)
					{
						this.currMonth = int($num - nowMonth);
					}
					else
					{
						this.currMonth = 0;
						this.date.month = this.addZero(nowMonth);
					}
				}
			},
			onClick_dayDate($item)
			{
				this.date.day = this.addZero($item[2]);
				if (this.type === 'date')
				{
					this.onClick_okBtn();
				}
			},
			onClick_clearBtn()
			{
				this.date = {
					year: '',
					month: '',
					day: '',
					hour: '00',
					minute: '00',
					second: '00'
				};
				var date = new Date();
				this.date.year = date.getFullYear();
				this.date.month = this.addZero(date.getMonth() + 1);
				this.date.day = this.addZero(date.getDate());
				this.initPops();
				this.$forceUpdate();
			},
			onClick_todayBtn()
			{
				var now = Date.now();
				var dateArr = g.timeTool.getFullDateArray(now, true);
				this.date = {
					year: dateArr[0],
					month: dateArr[1],
					day: dateArr[2],
					hour: dateArr[3],
					minute: dateArr[4],
					second: dateArr[5]
				};
				this.onClick_okBtn();
			},
			onClick_okBtn()
			{
				this.initPops();
				var timeStamp = this.getTimeStamp();
				this.$emit('input', false);
				this.$emit('change', timeStamp);
			},
			onClick_prevBtn($type)
			{
				if ($type == "year")
				{
					var year = int(this.date.year);
					year--;
					var newYear = this.checkValid("year", year);
					if (newYear)
					{
						this.chooseDate($type, newYear);
					}
				}
				else
				{
					var month = int(this.date.month);
					month--;
					var newMonth = this.checkValid("month", month);
					if (newMonth)
					{
						this.chooseDate($type, newMonth);
					}
				}
			},
			onClick_nextBtn($type)
			{
				if ($type == "year")
				{
					var year = int(this.date.year);
					year++;
					var newYear = this.checkValid("year", year);
					if (newYear)
					{
						this.chooseDate($type, newYear);
					}
				}
				else
				{
					var month = int(this.date.month);
					month++;
					var newMonth = this.checkValid("month", month);
					if (newMonth)
					{
						this.chooseDate($type, newMonth);
					}
				}
			},
			checkDisable(item)
			{

				if ((this.endTime + '').length === 10)
				{
					this.endTime = this.endTime * 1000;
				}
				if ((this.startTime + '').length === 10)
				{
					this.endTime = this.endTime * 1000;
				}
				return this.dateToTime(item) > this.endTime || this.dateToTime(item) < this.startTime || ( (item[1] + 1) !=
						this.date.month);

			},
			checkMonthDisable(n)
			{
				return false;
//				return g.timeTool.getDateArray(this.endTime)[2] >= n;
			},
			checkToday(item)
			{
				return this.dateList.nowYear == item[0] && this.dateList.nowDate == item[2] && this.dateList.nowMonth == item[1];
			},
			dateToTime($date)
			{
				return new Date($date[0], $date[1], $date[2]).getTime();
			},
			addZero($num)
			{
				return int($num) > 9 ? $num : "0" + $num;
			},
			getTimeStamp()
			{
				var date = {};
				var arr = [];
				for (var key in this.date)
				{
					date[key] = int(this.date[key])
				}
				var dateStamp = int(new Date(date.year, (date.month - 1), date.day).getTime() / 1000);
				var stamp = dateStamp + date.hour * 60 * 60 + date.minute * 60 + date.second;
				return stamp;
			},
			checkValid($type, $num)
			{
				if ($type == "year")
				{
					if ($num <= _endYear && $num >= _startYear)
					{
						return $num
					}
					return false;
				}
				else
				{
					if (this.date.year > _endYear)
					{
						return false;
					}
					else if (this.date.year == _endYear)
					{
						if ($num > _endMonth)
						{
							return false;
						}
						else
						{
							return $num;
						}
					}
					else
					{
						if ($num <= 12 && $num > 0)
						{
							return $num;
						}
					}
				}
			}
		}
	}
</script>
<style lang="sass" type="text/css" rel="stylesheet/scss" scoped>
	.clear {
		&:before {
			display: table;
			content: " ";
		}
		&:after {
			display: table;
			content: " ";
			clear: both;
		}
	}

	.laydate-box {
		z-index: 89;
		position: absolute;
		display: block;
		right: 0;
		top: 100%;
		width: 298px;
		font-family: 'microsoft yahei', Verdana, "u5faeu8f6fu96c5u9ed1", "\5B8B\4F53", Arial;
		background-color: #ffffff;
		font-size: 14px;
		cursor: default;
		margin: 0;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
		border: 1px solid #cccccc;
		.laydate-top {
			width: 100%;
			height: 40px;
			text-align: center;
			.laydate-ym {
				float: left;
				position: relative;
				height: 40px;
				line-height: 40px;
				width: 50%;
				span {
					width: 70%;
					padding: 0;
					float: left;
					text-align: center;
					text-overflow: ellipsis;
					display: block;
					color: #ffffff;

				}
				.next, .prev {
					width: 15%;
					height: 40px;
					line-height: 45px;
					float: left;
					display: block;
					text-align: center;
				}
				.prev {
					&:before {
						width: 0;
						height: 0;
						display: inline-block;
						border-width: 7px;
						border-style: dashed;
						border-color: transparent;
						overflow: hidden;
						border-right-style: solid;
						border-right-color: #ffffff;
						content: "";
						margin: 0 9px 0 0;
					}
				}
				.next {
					&:before {
						width: 0;
						height: 0;
						display: inline-block;
						border-width: 7px;
						border-style: dashed;
						border-color: transparent;
						overflow: hidden;
						border-left-style: solid;
						border-left-color: #ffffff;
						content: "";
						margin: 0 0 0 6px;
					}
				}
				.laydate-sety {
					position: absolute;
					z-index: 999;
					top: 40px;
					left: 22%;
					padding-bottom: 9px;
					background-color: #ffffff;
					bottom: 0;
				}
			}
		}
	}

	.laydate-setm {
		width: 100%;
		position: absolute;
		left: 0;
		top: 40px;
		bottom: 0;
		background-color: #ffffff;
		z-index: 50;
		.ymdropul {
			width: 100%;
			overflow: hidden;
		}

	}

	.laydate-table {
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		border-spacing: 0;
		margin-bottom: 5px;
		thead {
			tr {
				background-color: #f5f5f5;
				th {
					height: 32px;
					font-weight: normal;
					line-height: 32px;
					text-align: center;
					position: relative;
					overflow: hidden;
				}
			}
		}
		tbody {
			tr {
				td {
					height: 32px;
					line-height: 32px;
					text-align: center;
					position: relative;
					overflow: hidden;
					cursor: pointer;
				}

				.date-disabled {
					pointer-events: none;
					color: #dddddd;
					cursor: default;
				}
			}
		}
	}

	.laydate-bottom {
		position: relative;
		overflow: hidden;
		padding: 10px 3px 5px 5px;
		background-color: #f5f5f5;
		em {
			margin: 0;
			padding: 0;
			font-style: normal;
		}
		.bot-flex {
			width: 50%;
			float: left;
			display: inline-block;
			margin: 0;
			padding-top: 3px;
			overflow: hidden;
			li {
				width: 33.33%;
				float: left;
				text-align: center;
				em {
					width: 70%;
					float: left;
					padding: 0;
					border: none;
					text-align: center;
					font-weight: normal;
					display: block;
					height: 26px;
					line-height: 26px;
				}
				i {
					width: 30%;
					float: left;
					height: 26px;
					line-height: 24px;
					font-style: normal;
					display: block;
					text-align: center;
				}
			}
			.laydate-hms {
				border: 1px #dddddd solid;
				background-color: #ffffff;
				margin: 0px 5% 3px 0;
				padding: 0 0 0 8px;
				display: block;
				overflow: hidden;
			}
		}
		.laydate-btn {
			text-align: center;
			font-size: 12px;
			span {
				width: 31%;
				float: right;
				margin: 0 1.1%;
				display: block;
				cursor: pointer;
				height: 28px;
				line-height: 28px;
				border-radius: 5px;
				text-align: center;
				-webkit-transition: all .3s ease;
				-moz-transition: all .3s ease;
				-ms-transition: all .3s ease;
				-o-transition: all .3s ease;
				transition: all .3s ease;
				&:hover {
					opacity: 0.9;
					filter:alpha(opacity=90);

				}
			}
		}

	}

	.laydate-time {
		position: absolute;
		bottom: 35px;
		padding-bottom: 9px;
		left: 35px;
		border: 1px solid #d2d2d2;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
		background-color: #ffffff;
		color: #666666;
		.laydate-hsmtes {
			height: 30px;
			line-height: 30px;
			position: relative;
			//padding-left: 14px;
			background-color: #f5f5f5;
			text-align: center;
			span {
				width: 25px;
				height: 25px;
				line-height: 20px;
				text-align: center;
				position: absolute;
				top: 50%;
				right: 0px;
				margin-top: -11px;
				z-index: 150;
				font-size: 22px;
			}
		}
	}

	.laydate-prop-hms {
		width: 100%;
	}

	.laydate-props {
		position: absolute;
		left: 0;
		top: 40px;
	}

	.laydate-propcon {
		width: 100%;
		padding-bottom: 0px;
		background-color: #ffffff;
		overflow: hidden;
		min-height: 190px;
	}

	.laydate-hms-title {
		width: 100%;
		height: 30px;
		line-height: 30px;
		background-color: #f5f5f5;
		color: #000000;
		border-bottom: 1px solid #dddddd;
		position: relative;
		overflow: hidden;
		text-align: center;
		font-size: 15px;
	}

	.laydate-hms-close {
		width: 30px;
		height: 30px;
		line-height: 26px;
		text-align: center;
		position: absolute;
		cursor: pointer;
		top: 50%;
		right: 4px;
		margin-top: -15px;
		z-index: 150;
		font-size: 24px;
	}

	.laydate-propstext {
		width: 86px;
		float: left;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-left: 10px;
		z-index: 99;

	}

	.laydate-hmsno {
		width: 85px;
		max-height: 126px;
		float: left;
		overflow-y: auto;
		background-color: #ffffff;
		z-index: 99;
		color: #000000;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, .6);
		span {
			width: 100%;
			float: left;
			text-align: center;
			height: 28px;
			line-height: 28px;
		}
		.year-num {
			height: 40px;
			line-height: 40px;
			cursor: pointer;
			-webkit-transition: background-color .3s ease;
			-moz-transition: background-color .3s ease;
			-ms-transition: background-color .3s ease;
			-o-transition: background-color .3s ease;
			transition: background-color .3s ease;
			&:hover {
				background-color: #ecf4fb;
			}
			&.color-primary {
				background-color: #01aaef;
			}
			&.btn-success {
				background-color: #5cb85c;
			}
			&.color-pinky {
				background: #ed5564;
				color: #ffffff;
			}
		}
	}

	.laydate-hmsnox {
		&.diff-length {
			min-height: 182px;
		}
		p {
			height: 25px;
			line-height: 25px;
			text-align: center;
			position: relative;
			overflow: hidden;
			width: 27px;
			float: left;
			-webkit-transition: background-color .3s ease;
			-moz-transition: background-color .3s ease;
			-ms-transition: background-color .3s ease;
			-o-transition: background-color .3s ease;
			transition: background-color .3s ease;
			cursor: pointer;
			&:hover {
				background-color: #ecf4fb;
			}
			&.color-primary {
				background-color: #01aaef;
				color: #ffffff;
			}
			&.btn-success {
				background-color: #5cb85c;
			}
			&.color-pinky {
				background: #ed5564;
				color: #ffffff;
			}

		}
		.hour-num {
			width: 37px;
		}
	}

	.month-num {
		cursor: pointer;
		width: 33.3%;
		float: left;
		text-align: center;
		height: 48px;
		line-height: 48px;
		-webkit-transition: background-color .3s ease;
		-moz-transition: background-color .3s ease;
		-ms-transition: background-color .3s ease;
		-o-transition: background-color .3s ease;
		transition: background-color .3s ease;
		&:hover {
			background-color: #ecf4fb;
		}
		&.color-primary {
			background-color: #01aaef;
			color: #ffffff;
		}
		&.btn-success {
			background-color: #5cb85c;
		}
		&.color-pinky {
			background: #ed5564;
			color: #ffffff;
		}
	}

	.cursor {
		-webkit-transition: background-color .3s ease;
		-moz-transition: background-color .3s ease;
		-ms-transition: background-color .3s ease;
		-o-transition: background-color .3s ease;
		transition: background-color .3s ease;
		&:hover {
			background-color: #ecf4fb;
		}
		&.color-primary {
			background-color: #01aaef;
			color: #ffffff;
		}
		&.color-pinky {
			background: #ed5564;
			color: #ffffff;
		}
		&.btn-success {
			background-color: #5cb85c;
		}
	}

	.color-primary {
		background-color: #01aaef;
		color: #ffffff;
	}

	.color-pinky {
		background: #ed5564;
		color: #ffffff;
	}

	.btn-success {
		background-color: #5cb85c;
		color: #ffffff;
	}


</style>
