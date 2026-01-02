<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { decode } from '$lib/codec';
	import { factorDescriptions, factorLabels, factors, norms } from '$lib/data';
	import { percentile } from '$lib/utils';

	import {
		parse as vbParse,
		object as vbObject,
		entriesFromList as vbEntriesFromList,
		number as vbNumber,
	} from 'valibot';

	const scoresValidate = vbObject(vbEntriesFromList(factors, vbNumber()));

	const scores = $derived.by(() => {
		if (!page.url.hash) return;
		const hash = page.url.hash.replace(/^#/, '');

		try {
			return decode(hash);
		} catch (error) {
			console.error(error);

			try {
				return vbParse(scoresValidate, JSON.parse(atob(hash)));
			} catch (error) {
				console.error(error);
				return false;
			}
		}
	});
</script>

<svelte:head>
	<title>Report / Big-Five Factor Markers</title>
</svelte:head>

{#if scores !== undefined && scores !== false}
	<div
		class="grid grid-cols-1 items-center gap-x-6 gap-y-4 lg:grid-cols-[min-content_1fr_min-content]"
	>
		{#each factors as factor, idx (factor)}
			{@const factorPercentile = percentile(
				scores[factor],
				norms[factor].mean,
				norms[factor].stddev,
			)}

			<div class="flex flex-col">
				<span class="font-semibold text-nowrap">{factorLabels[factor][0]}</span>
				<span class="text-foreground-3 text-sm text-nowrap">
					{factorLabels[factor].slice(1).join(', ')}
				</span>
			</div>

			<div class="bg-background-2 relative h-5 w-full" aria-hidden="true">
				<div
					class="absolute top-0 bottom-0 -my-0.5 -ml-0.5"
					style={`width: ${factorPercentile * 100}%;`}
				>
					<div
						class="h-full w-0"
						style={`background-color: var(--c-extra-${idx}); animation: 0.5s ease-out ${idx * 0.2}s both ltr;`}
					></div>
				</div>
				<div class="bg-foreground/20 absolute top-0 bottom-0 left-1/2 -my-0.5 w-0.5"></div>

				{#if idx === 0}
					<span class="text-foreground/20 absolute top-0 left-1/2 -mt-5 text-[10px] font-medium"
						>Mean</span
					>
				{/if}
			</div>

			<span class="text-foreground-2 text-sm text-nowrap">
				{(factorPercentile * 100).toFixed(1)}% ({scores[factor]})
			</span>

			<p class="text-foreground-2 text-sm leading-relaxed text-pretty not-last:mb-4 lg:col-span-3">
				{factorDescriptions[factor]}
			</p>
		{/each}
	</div>

	<p class="text-foreground-3 mt-4 self-end text-end text-sm text-balance">
		Result percentages are relative to the general population; the raw score is directly derived
		from your responses.
	</p>

	<p class="mt-8 text-pretty">
		The URL of this report page is shareable! It contains the results of your test without saving
		any data to servers. <span class="text-primary break-all select-all">{page.url}</span>
	</p>

	<a class="text-primary underline-offset-4 hover:underline" href={resolve('/')}>← Home</a>
{:else if scores === false}
	<span>Invalid data provided in URL!</span>
	<a class="text-primary underline-offset-4 hover:underline" href={resolve('/')}>← Home</a>
{/if}
