<svelte:head>
	<title>Big-Five Factor Markers</title>
</svelte:head>

<p class="text-pretty">
	Welcome to the <span class="font-semibold">Big-Five Factor Markers</span> personality test!
</p>
<p class="text-foreground-2 text-pretty">
	This test measures five major personality traits: <span class="text-extra-0">Extraversion</span>,
	<span class="text-extra-1">Agreeableness</span>,
	<span class="text-extra-2">Conscientiousness</span>,
	<span class="text-extra-3">Emotional Stability</span>, and
	<span class="text-extra-4">Intellect</span>. It does not store any of the data that you submit;
	your responses are processed on-device and never get sent to any servers.
</p>

<p class="text-primary text-sm">
	The results of this test do not represent professional psychiatric or psychological advice. If you
	need such advice, seek out a mental health professional.
</p>

<div class="my-8 flex flex-row flex-wrap gap-6">
	<div class="flex flex-col items-start gap-y-2">
		<a href="/test/50" class="bg-primary text-background hover:bg-primary-2 px-4 py-2">Start</a>
		<span class="text-primary-2 text-xs">50 questions</span>
	</div>
	<div class="flex flex-col items-start gap-y-2">
		<a href="/test/100" class="bg-background-2 hover:bg-background-3 px-4 py-2">Start extended</a>
		<span class="text-foreground-2 text-xs">100 questions, more accurate</span>
	</div>
</div>

<p class="text-foreground-3 mt-8 text-sm leading-relaxed text-pretty">
	Based on the <a
		class="text-foreground-2 underline-offset-4 hover:underline"
		href="https://ipip.ori.org/newBigFive5broadKey.htm">50-item and 100-item IPIP representations</a
	>
	of Goldberg's (1992) Big-Five Factor Markers. General population statistics were calculated from the
	IPIP-FFM-data-8Nov2018 dataset published by the
	<a
		class="text-foreground-2 underline-offset-4 hover:underline"
		href="https://openpsychometrics.org/">Open-Source Psychometrics Project</a
	>. Factor descriptions are from
	<a
		href="https://doi.org/10.1177/0146167202289008"
		class="text-foreground-2 underline-offset-4 hover:underline"
		>Roccas, S., Sagiv, L., Schwartz, S.H., & Knafo, A. (2002). The Big Five Personality Factors and
		Personal Values. <em>Personality and Social Psychology Bulletin</em>, 28, 789 - 801</a
	>. Thank you to these wonderful resources for making this project possible!
</p>

<p class="text-foreground-3 text-sm leading-relaxed text-pretty">
	Crafted by <a
		href="https://ryanccn.dev/"
		class="text-foreground-2 underline-offset-4 hover:underline">Ryan Cao</a
	>.
</p>
