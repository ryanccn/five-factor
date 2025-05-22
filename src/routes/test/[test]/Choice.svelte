<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const {
		label,
		shortcut,
		forceActive = false,
		...restProps
	}: {
		label: string;
		shortcut: string;
		forceActive?: boolean;
	} & HTMLButtonAttributes = $props();
</script>

<button
	class={[
		'group bg-background-2 hover:bg-primary hover:text-background active:text-background active:bg-primary-2 relative w-full px-8 py-4 text-sm hover:cursor-pointer',
		forceActive ? 'text-background bg-primary' : null,
	]}
	{...restProps}
>
	<span>{label}</span>
	<span
		class={[
			'text-foreground-3 group-hover:text-background group-active:text-background absolute top-0 left-0 m-1.5 text-[10px]',
			forceActive ? '!text-background' : null,
		]}>{shortcut}</span
	>
</button>
