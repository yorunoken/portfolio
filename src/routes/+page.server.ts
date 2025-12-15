import { type Status } from "$lib/data";

export async function load({ fetch, cookies }) {
	const res = await fetch("/status");
	const data = (await res.json()) as { indicator: Status; status: string };

	const savedWeather = cookies.get("weather");
	const validOptions = ["snow", "rain", "leaves"];
	const weather = validOptions.includes(savedWeather || "") ? savedWeather : "snow";

	return { ...data, initialWeather: weather };
}
