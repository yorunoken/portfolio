<script lang="ts">
	import Snowflakes from "./snowflakes.svelte";
	import Rain from "./rain.svelte";
	import Leaves from "./leaves.svelte";

	const WEATHER_OPTIONS = ["snow", "rain", "leaves"] as const;
	const BACKGROUND_IMAGES = {
		snow: "https://yorunoken.s-ul.eu/ixnhcPA8",
		rain: "https://yorunoken.s-ul.eu/yyCyDMUB",
		leaves: "https://yorunoken.s-ul.eu/XYdxk4kI"
	} as const;
	const WEATHER_ICONS = { snow: "❄️", rain: "🌧️", leaves: "🍂" } as const;
	type Weathers = (typeof WEATHER_OPTIONS)[number];

	let props = $props();
	let weatherEffect = $state<Weathers>((props.initialWeather as Weathers) || "snow");

	const effects = {
		snow: Snowflakes,
		rain: Rain,
		leaves: Leaves
	};

	let CurrentEffect = $derived(effects[weatherEffect]);

	function selectWeather(weather: Weathers) {
		if (weather === weatherEffect) {
			return;
		}

		weatherEffect = weather;
		document.cookie = `weather=${weather}; path=/; max-age=31536000; SameSite=Lax`;
	}
</script>

<div
	class="fixed inset-0 h-full w-full bg-cover bg-center bg-no-repeat blur-[5px] brightness-50 transition-opacity duration-700"
	class:opacity-100={weatherEffect === "snow"}
	class:opacity-0={weatherEffect !== "snow"}
	style="background-image: url('{BACKGROUND_IMAGES.snow}'); will-change: opacity;"
></div>
<div
	class="fixed inset-0 h-full w-full bg-cover bg-center bg-no-repeat blur-[5px] brightness-50 transition-opacity duration-700"
	class:opacity-100={weatherEffect === "rain"}
	class:opacity-0={weatherEffect !== "rain"}
	style="background-image: url('{BACKGROUND_IMAGES.rain}'); will-change: opacity;"
></div>
<div
	class="fixed inset-0 h-full w-full bg-cover bg-center bg-no-repeat blur-[5px] brightness-50 transition-opacity duration-700"
	class:opacity-100={weatherEffect === "leaves"}
	class:opacity-0={weatherEffect !== "leaves"}
	style="background-image: url('{BACKGROUND_IMAGES.leaves}'); will-change: opacity;"
></div>

{#if CurrentEffect}
	<CurrentEffect />
{/if}

<div
	class="fixed top-3 right-3 z-20 flex gap-1.5 rounded-lg border border-gray-800 bg-gray-900/90 p-1.5 shadow-lg sm:top-4 sm:right-4 sm:gap-2 sm:p-2"
>
	{#each WEATHER_OPTIONS as weather}
		<button
			onclick={() => selectWeather(weather)}
			class={`rounded px-2 py-1.5 text-base transition-all sm:px-3 sm:py-2 sm:text-lg ${
				weatherEffect === weather
					? "bg-blue-600 text-white shadow-md"
					: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
			}`}
			title={weather}
			aria-label={`Switch to ${weather} effect`}
		>
			{WEATHER_ICONS[weather]}
		</button>
	{/each}
</div>
