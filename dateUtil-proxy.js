'use strict'

const { parseDate } = require('./parseDate.js');
const {
	weekDayChinese, weekDayEng, weekDayEngShort,
	monthEng, monthEngShort,
	tianGan, diZhi
} = require('./constants');

const Formatter = {
	yyyy: date => date.getFullYear(),
	yy:   date => String(date.getFullYear()).slice(2),

	mmmm: date => monthEng[date.getMonth()],
	mmm:  date => monthEngShort[date.getMonth()],
	mm:   date => String(date.getMonth() + 1).padStart(2, '0'),
	m:    date => date.getMonth() + 1,
	dd:   date => String(date.getDate()).padStart(2, '0'),
	d:    date => date.getDate(),

	W:    date => weekDayEng[date.getDay()],
	w:    date => weekDayEngShort[date.getDay()],
	'几': date => weekDayChinese[date.getDay()],

	// 24-hours format
	HH:   date => String(date.getHours()).padStart(2, '0'),
	H:    date => date.getHours(),
	// 12-hours format
	hh:   date => String( (date.getHours()+11) % 12 + 1 ).padStart(2, '0'),
	h:    date => ( (date.getHours()+11) % 12 + 1 ),

	MM:   date => String(date.getMinutes()).padStart(2, '0'),
	M:    date => date.getMinutes(),
	SS:   date => String(date.getSeconds()).padStart(2, '0'),
	S:    date => date.getSeconds(),
	LLL:  date => String(date.getMilliseconds()).padStart(3, '0'),

	T:    date => (date.getHours() < 12) ? 'AM' : 'PM',
	t:    date => (date.getHours() < 12) ? 'am' : 'pm',
	'上下午': date => {
		let hour = date.getHours()
		return (
			(hour <  5) ? '凌晨'
			: (hour <  8) ? '早上'
			: (hour < 12) ? '上午'
			: (hour < 13) ? '中午'
			: (hour < 19) ? '下午'
			:               '晚上'
		)
	},
	'时辰': date => diZhi[(date.getHours() + 1) % 12] + '时',
	'干支': date => {
		let offYear = (date.getFullYear() - 4) % 60 + 60;
		return tianGan[offYear % 10] + diZhi[offYear % 12]
	}
}

const REPLACE_PATTERN = /(yyyy|yy|mmmm|mmm|mm|m|dd|d|HH|H|hh|h|MM|M|SS|S|几|W|w|LLL|上下午|T|t|时辰|干支)/g;
// const REPLACE_PATTERN = new RegExp('(' + Object.keys(Formatter).join('|') + ')', 'g');

function formatDate(date, pattern) {
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

module.exports = { formatDate, parseDate };
