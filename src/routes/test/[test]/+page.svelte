<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	import { encode } from '$lib/codec';
	import { shuffle } from '$lib/utils';
	import type { Marker, Factor } from '$lib/data';

	let { data }: PageProps = $props();

	let scores = $state<Record<Factor, number>>({
		ext: 0,
		agr: 0,
		csn: 0,
		est: 0,
		opn: 0,
	});

	let shuffledMarkers = $state<Marker[] | undefined>();

	$effect(() => {
		shuffledMarkers = shuffle(data.markers);
	});

	const respond = (r: 1 | 2 | 3 | 4 | 5) => {
		const currentMarker = shuffledMarkers?.at(-1);
		if (shuffledMarkers === undefined || currentMarker === undefined) return;

		scores[currentMarker.factor] +=
			(currentMarker.negative ? 6 - r : r) * (50 / data.markers.length);

		shuffledMarkers.pop();

		if (shuffledMarkers.length === 0) {
			void goto(`/report#${encode(scores)}`);
		}
	};
</script>

<svelte:head>
	<title>Test / Big-Five Factor Markers</title>
</svelte:head>

{#if shuffledMarkers !== undefined && shuffledMarkers.at(-1) !== undefined}
	<p>
		{data.markers.length - shuffledMarkers.length + 1}<span class="text-foreground-3"
			>/{data.markers.length}</span
		>
	</p>
	<p class="text-pretty">{shuffledMarkers.at(-1)!.text}</p>

	<div class="mt-8 flex w-full shrink-0 flex-col gap-2 lg:flex-row">
		<button
			class="bg-background-2 hover:bg-primary hover:text-background active:text-background active:bg-primary-2 w-full px-8 py-4 text-sm hover:cursor-pointer"
			onclick={() => respond(5)}>Strongly agree</button
		>
		<button
			class="bg-background-2 hover:bg-primary hover:text-background active:text-background active:bg-primary-2 w-full px-8 py-4 text-sm hover:cursor-pointer"
			onclick={() => respond(4)}>Agree</button
		>
		<button
			class="bg-background-2 hover:bg-primary hover:text-background active:text-background active:bg-primary-2 w-full px-8 py-4 text-sm hover:cursor-pointer"
			onclick={() => respond(3)}>Neutral</button
		>
		<button
			class="bg-background-2 hover:bg-primary hover:text-background w-full px-8 py-4 text-sm hover:cursor-pointer"
			onclick={() => respond(2)}>Disagree</button
		>
		<button
			class="bg-background-2 hover:bg-primary hover:text-background w-full px-8 py-4 text-sm hover:cursor-pointer"
			onclick={() => respond(1)}>Strongly disagree</button
		>
	</div>
{/if}
