'use strict'

// TODO: Enable escape character
// TODO: 农历计算，参考标准GB/T 33661-2017
// TODO: 自定义callback

const { parseDate } = require('./parseDate.js');
const {
	weekDayChinese, weekDayEng, weekDayEngShort,
	monthEng, monthEngShort,
	tianGan, diZhi
} = require('./constants');

class DateExtend {
	constructor(dateObj) {
		this.da = dateObj;
	}
	get yyyy() {
		return String(this.da.getFullYear())
	}
	get yy() {
		return String(this.da.getFullYear()).slice(2)
	}
	get mmmm() {
		return monthEng[this.da.getMonth()]
	}
	get mmm() {
		return monthEngShort[this.da.getMonth()]
	}
	get mm() {
		return String(this.da.getMonth() + 1).padStart(2, '0')
	}
	get m() {
		return String(this.da.getMonth() + 1)
	}
	get dd() {
		return String(this.da.getDate()).padStart(2, '0')
	}
	get d() {
		return String(this.da.getDate())
	}
	get W() {
		return weekDayEng[this.da.getDay()]
	}
	get w() {
		return weekDayEngShort[this.da.getDay()]
	}
	get 几() {
		return weekDayChinese[this.da.getDay()]
	}
	// 24-hours format
	get HH() {
		return String(this.da.getHours()).padStart(2, '0')
	}
	get H() {
		return String(this.da.getHours())
	}
	// 12-hours format
	get hh() {
		return String( (this.da.getHours()+11) % 12 + 1 ).padStart(2, '0')
	}
	get h() {
		return String( (this.da.getHours()+11) % 12 + 1 )
	}
	get MM() {
		return String(this.da.getMinutes()).padStart(2, '0')
	}
	get M() {
		return String(this.da.getMinutes())
	}
	get SS() {
		return String(this.da.getSeconds()).padStart(2, '0')
	}
	get S() {
		return String(this.da.getSeconds())
	}
	get LLL() {
		return String(this.da.getMilliseconds()).padStart(3, '0')
	}
	get T() {
		return (this.da.getHours() < 12) ? 'AM' : 'PM'
	}
	get t() {
		return (this.da.getHours() < 12) ? 'am' : 'pm'
	}
	get 上下午() {
		let hour = this.da.getHours()
		return (
			(hour <  5) ? '凌晨'
			: (hour <  8) ? '早上'
			: (hour < 12) ? '上午'
			: (hour < 13) ? '中午'
			: (hour < 19) ? '下午'
			:               '晚上'
		)
	}
	get 时辰() {
		return diZhi[((1 + this.da.getHours()) >> 1) % 12] + '时'
	}
	get 干支() {
		let offYear = (this.da.getFullYear() - 4) % 60 + 60;
		return tianGan[offYear % 10] + diZhi[offYear % 12]
	}
}

const REPLACE_PATTERN = /(yyyy|yy|mmmm|mmm|mm|m|dd|d|HH|H|hh|h|MM|M|SS|S|几|W|w|LLL|上下午|T|t|时辰|干支)/g;

function formatDate(date, pattern) {
	date = parseDate(date);
	if (date === null) return '';
	date = new DateExtend(date);
	if ('string' !== typeof pattern) throw Error('Pattern must be a string');

	return pattern.replace(REPLACE_PATTERN, function(fullMatch, key, offset, origStr) {
		// console.log(fullMatch, key, offset, date[key])
		return date[key] || ''
	})
}

module.exports = { formatDate, parseDate };
