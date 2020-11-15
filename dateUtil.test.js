'use strict'

const { formatDate, parseDate } = require('./dateUtil');

const datePatterns = [
	'd/m/yy T h:M:S w W',
	'mmm(mmmm) d, yyyy T h:M:S w W',
	'yyyy年mm月dd日(星期几) 上下午HH:MM:SS',
	'公元yyyy年m月d日 上下午hh:M:S',
	'干支年阳历m月d日 (周几) 时辰'
];

function benchmark() {
	let patternLen = datePatterns.length

	function generateDate(N) {
		let randomDates = new Array(N)
		for(let i=0; i<N; i++) {
			let y = String(Math.floor(Math.random() * 1100) + 1000).padStart(4, '0')
			let m = Math.floor(Math.random() * 12) + 1
			let d = Math.floor(Math.random() * 31) + 1
			let H = Math.floor(Math.random() * 24)
			let M = Math.floor(Math.random() * 60)
			let S = Math.floor(Math.random() * 60)
			let dateStr = `${y}-${m}-${d} ${H}:${M}:${S}`;
			let date = /*(Math.random() >= 0.5) ? dateStr: */new Date(dateStr);
			let pattern = datePatterns[Math.floor(Math.random() * patternLen)]
			randomDates[i] = {pattern, date};
		}
		return randomDates;
	}

	const ROUNDS = 8;
	const LENGTH = 1048576;
	for (let j = 0; j < ROUNDS; j++) {
		let randomDates = generateDate(LENGTH);
		console.time('bench')
		for (let i = 0, N = randomDates.length; i < N; i++) {
			let obj = randomDates.pop();
			let {pattern, date} = obj;
			let formatted = formatDate(date, pattern);
			formatted;
			// console.log(formatted)
			// if (formatted.search(/NaN|undefined/) !== -1) {
			// 	console.log(dateStr)
			// 	console.log(date)
			// 	console.log(formatted)
			// }
		}
		console.timeEnd('bench')
	}
	console.log('ops:', ROUNDS * LENGTH)
}

benchmark()
