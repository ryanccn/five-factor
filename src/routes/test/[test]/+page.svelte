<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	import Choice from './Choice.svelte';

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

	let forceActive = $state(Array.from<boolean>({ length: 5 }).fill(false));

	const keydownListener = (ev: KeyboardEvent) => {
		if (ev.isComposing) return;

		// eslint-disable-next-line unicorn/prefer-switch
		if (ev.key === '1') forceActive[0] = true;
		else if (ev.key === '2') forceActive[1] = true;
		else if (ev.key === '3') forceActive[2] = true;
		else if (ev.key === '4') forceActive[3] = true;
		else if (ev.key === '5') forceActive[4] = true;
	};

	const keyupListener = (ev: KeyboardEvent) => {
		if (ev.isComposing) return;

		// eslint-disable-next-line unicorn/prefer-switch
		if (ev.key === '1') respond(1);
		else if (ev.key === '2') respond(2);
		else if (ev.key === '3') respond(3);
		else if (ev.key === '4') respond(4);
		else if (ev.key === '5') respond(5);

		forceActive.fill(false);
	};

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

<svelte:window onkeydown={keydownListener} onkeyup={keyupListener} />

{#if shuffledMarkers !== undefined && shuffledMarkers.at(-1) !== undefined}
	<p>
		{data.markers.length - shuffledMarkers.length + 1}<span class="text-foreground-3"
			>/{data.markers.length}</span
		>
	</p>
	<p class="text-pretty">{shuffledMarkers.at(-1)!.text}</p>

	<div class="mt-8 flex w-full shrink-0 flex-col gap-2 lg:flex-row">
		<Choice
			label="Strongly disagree"
			shortcut="1"
			forceActive={forceActive[0]}
			onclick={() => respond(1)}
		/>
		<Choice label="Disagree" shortcut="2" forceActive={forceActive[1]} onclick={() => respond(2)} />
		<Choice label="Neutral" shortcut="3" forceActive={forceActive[2]} onclick={() => respond(3)} />
		<Choice label="Agree" shortcut="4" forceActive={forceActive[3]} onclick={() => respond(4)} />
		<Choice
			label="Strongly agree"
			shortcut="5"
			forceActive={forceActive[4]}
			onclick={() => respond(5)}
		/>
	</div>
{/if}
