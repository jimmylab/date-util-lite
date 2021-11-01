function parseDate(input) {
	if (input instanceof Date) {
		return input;
	}
	if (('string' === typeof input && input.length) || 'number' === typeof input) {
		input = new Date(input);
		if ( Number.isNaN(input.valueOf()) ) {
			throw Error('Invalid Date')
		}
		return input;
	}
	return null;
}

exports.parseDate = parseDate;
