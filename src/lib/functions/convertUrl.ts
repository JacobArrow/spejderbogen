const rules = {
	å: 'aa',
	ø: 'oe',
	æ: 'ae',
	'-': ' ',
	' ': '-'
};

function swap(obj) {
	const ret = {};
	Object.keys(obj).forEach((key) => {
		ret[obj[key]] = key;
	});
	return ret;
}

export const encode = (string: string) => {
	string = string.toLowerCase();
	for (const key in rules) {
		string = string?.split(key).join(rules[key]);
	}
	return encodeURIComponent(string);
};

export const decode = (string: string) => {
	const r = swap(rules);
	for (const key in r) {
		string = string?.split(key).join(r[key]);
	}
	return decodeURIComponent(string);
};
