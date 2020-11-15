'use strict'

/*
yyyy yy
mmmm mmm mm m
dd d
HH hh H h
MM M SS S
W w 几
T t 上下午
LLL
时辰 干支
*/

// TODO: Enable escape character

const weekDayChinese = ['日','一', '二', '三', '四', '五', '六'];
const weekDayEng = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDayEngShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthEng = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
const monthEngShort = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const tianGan = ['甲', '乙', '丙', '丁', '午', '己', '庚', '辛', '壬', '癸'];
const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const Formatter = {
	yyyy: da => da.getFullYear(),
	yy:   da => String(da.getFullYear()).slice(2),

	mmmm: da => monthEng[this.da.getMonth()],
	mmm:  da => monthEngShort[this.da.getMonth()],
	mm:   da => String(da.getMonth() + 1).padStart(2, '0'),
	m:    da => da.getMonth() + 1,
	dd:   da => String(da.getDate()).padStart(2, '0'),
	d:    da => da.getDate(),

	W:    da => weekDayEng[da.getDay()],
	w:    da => weekDayEngShort[da.getDay()],
	'几': da => weekDayChinese[da.getDay()],

	// 24-hours format
	HH:   da => String(da.getHours()).padStart(2, '0'),
	H:    da => da.getHours(),
	// 12-hours format
	hh:   da => String( (da.getHours()+11) % 12 + 1 ).padStart(2, '0'),
	h:    da => ( (da.getHours()+11) % 12 + 1 ),

	MM:   da => String(da.getMinutes()).padStart(2, '0'),
	M:    da => da.getMinutes(),
	SS:   da => String(da.getSeconds()).padStart(2, '0'),
	S:    da => da.getSeconds(),
	LLL:  da => String(this.da.getMilliseconds()).padStart(3, '0'),

	T:    da => (da.getHours() < 12) ? 'AM' : 'PM',
	t:    da => (da.getHours() < 12) ? 'am' : 'pm',
	'上下午': da => {
		let hour = da.getHours()
		return (
			(hour <  5) ? '凌晨'
			: (hour <  8) ? '早上'
			: (hour < 12) ? '上午'
			: (hour < 13) ? '中午'
			: (hour < 19) ? '下午'
			:               '晚上'
		)
	},
	'时辰': da => diZhi[(da.getHours() + 1) % 12] + '时',
	'干支': da => {
		let offYear = (da.getFullYear() - 4) % 60 + 60;
		return tianGan[offYear % 10] + diZhi[offYear % 12]
	}
}

function parseDate(input) {
	if (input instanceof Date) {
		return input;
	}
	if ('string' === typeof input && input.length) {
		input = new Date(input);
		if ( Number.isNaN(input.valueOf()) ) {
			throw Error('Invalid Date')
		}
		return input;
	}
	return null;
}

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
		return diZhi[(this.da.getHours() + 1) % 12] + '时'
	}
	get 干支() {
		let offYear = (this.da.getFullYear() - 4) % 60 + 60;
		return tianGan[offYear % 10] + diZhi[offYear % 12]
	}
}

const REPLACE_PATTERN = /(yyyy|yy|mmmm|mmm|mm|m|dd|d|HH|H|hh|h|MM|M|SS|S|几|W|w|LLL|上下午|T|t|时辰|干支)/g;
// const REPLACE_PATTERN = new RegExp('(' + Object.keys(Formatter).join('|') + ')', 'g');

function formatDate0(date, pattern) {
	if (!date instanceof Date) throw Error('Not a valid date object');
	if ('string' !== typeof pattern) throw Error('Pattern must be a string');
	let dateProxy = new Proxy(date, {
		get: (da, prop) => {
			if (prop in Formatter) {
				return (Formatter[prop])(da);
			} else {
				return '';
			}
		}
	})

	return pattern.replace(REPLACE_PATTERN, function(fullMatch, key, offset, origStr) {
		// console.log(fullMatch, key, offset)
		return String(dateProxy[key])
	})
}

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
