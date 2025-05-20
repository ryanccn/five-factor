import { config } from '@ryanccn/eslint-config';

export default config({
	ignores: ['**/.svelte-kit', 'build'],
	globals: ['browser'],
	svelte: true,
	rules: {
		'svelte/prefer-writable-derived': 'off',
	},
});
