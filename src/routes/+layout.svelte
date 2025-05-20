<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="grid min-h-screen min-w-screen place-content-center">
	<div class="flex w-[min(50rem,100vw)] flex-col gap-y-4 px-12 py-24">
		{@render children()}
	</div>
</div>
