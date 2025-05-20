import { markers100, markers50 } from '$lib/data';
import { error } from '@sveltejs/kit';

import type { PageServerLoad, EntryGenerator } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		markers: params.test === '100' ? markers100 : params.test === '50' ? markers50 : error(404),
	};
};

export const entries: EntryGenerator = () => {
	return [{ test: '100' }, { test: '50' }];
};

export const prerender = true;
