'use strict'

const { formatDate, parseDate } = require('./dateUtil');
// const { formatDate, parseDate } = require('./dateUtil-proxy');
const assert = require('assert/strict');

const datePatterns = [
	'yyyy年mm月dd日(星期几) HH:MM:SS.LLL',
	'd/m/yy T h:M:S w (W)',
	'mmm(mmmm) d, yyyy T h:M:S W',
	'公元yyyy年m月d日 上下午hh:M:S',
	'干支年阳历m月d日 (周几) 时辰'
];

const standardAnswer = {
	date: new Date('2021-10-01 13:04:56.123 GMT+8'),
	answers: [
		'2021年10月01日(星期五) 13:04:56.123',
		'1/10/21 PM 1:4:56 Fri (Friday)',
		'Sep(September) 1, 2021 PM 1:4:56 Friday',
		'公元2021年10月1日 下午01:4:56',
		'辛丑年阳历10月1日 (周五) 未时',
	]
}

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
			let ms = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
			let dateStr = `${y}-${m}-${d} ${H}:${M}:${S}.${ms}`;
			let date = /*(Math.random() >= 0.5) ? dateStr: */new Date(dateStr);
			let pattern = datePatterns[Math.floor(Math.random() * patternLen)]
			randomDates[i] = {pattern, date};
		}
		return randomDates;
	}

	console.log('Starting benchmark...')

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

function test({date, answers}) {
	for (let i=0, N=datePatterns.length; i<N; i++) {
		let question = datePatterns[i];
		assert.strictEqual(
			formatDate(date, question), answers[i]
		)
	}
	console.log('Test passed!')
}

test(standardAnswer);

benchmark()
