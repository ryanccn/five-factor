import { factors, type Factor } from './data';

const alphabet =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-!?()[]{}@*/&%`^+=';
const reverseAlphabet = Object.fromEntries([...alphabet].entries().map(([i, ch]) => [ch, i]));

export const encode = (data: Record<Factor, number>): string => {
	let str = '1:';

	for (const f of factors) {
		if (data[f] < 10 || data[f] > 50) throw new Error('invalid data');
		str += alphabet[data[f] * 2 - 20];
	}

	return str;
};

export const decode = (str: string): Record<Factor, number> => {
	if (str.length <= 0) throw new Error('invalid string');

	if (str.startsWith('1:')) {
		str = str.slice(2);

		if (str.length < factors.length || str.length > factors.length * 2)
			throw new Error('invalid string format');

		const data: Record<Factor, number> = {
			ext: 0,
			agr: 0,
			csn: 0,
			est: 0,
			opn: 0,
		};

		let f = 0;
		for (let i = 0; i < str.length; i++, f++) {
			const part = str[i];

			const n = reverseAlphabet[part] / 2 + 10;
			if (Number.isNaN(n)) throw new Error('invalid number in string');

			data[factors[f]] = n;
		}

		return data;
	}

	throw new Error('invalid string format');
};
