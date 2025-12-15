import GithubIcon from "~icons/mdi/github";
import TwitterIcon from "~icons/mdi/twitter";
import DiscordIcon from "~icons/mdi/discord";
import YoutubeIcon from "~icons/mdi/youtube";
import CoffeeIcon from "~icons/mdi/coffee";
import OsuIcon from "./components/icons/OsuIcon.svelte";

export type Status = "online" | "offline" | "dnd" | "idle";

export const projects = [
	{
		title: "HanamiBot",
		description: "A powerful Discord bot developed for osu!",
		github: "https://github.com/yorunoken/HanamiBot",
		website: "https://hanami.yorunoken.com",
		tags: ["Discord", "osu!", "TypeScript"]
	},
	{
		title: "YAUS",
		description: "Yet another URL shortener.",
		github: "https://github.com/yorunoken/YAUS",
		website: "https://short.yorunoken.com",
		tags: ["URL Shortener", "Web Service"]
	},
	{
		title: "osu!guessr",
		description: "A fast paced guessing game, made for osu! players, by an osu! player.",
		github: "https://github.com/yorunoken/osu-guessr",
		website: "https://osuguessr.com/",
		tags: ["osu!", "NextJS", "minigame"]
	}
];

export const socials = [
	{
		title: "GitHub",
		href: "https://github.com/yorunoken",
		icon: GithubIcon,
		hoverColor: "hover:bg-[#24292e]",
		hoverTextColor: "hover:text-white"
	},
	{
		title: "Twitter",
		href: "https://twitter.com/_yorunoken",
		icon: TwitterIcon,
		hoverColor: "hover:bg-[#1DA1F2]",
		hoverTextColor: "hover:text-white"
	},
	{
		title: "Discord",
		href: "https://discord.com/users/372343076578131968",
		icon: DiscordIcon,
		hoverColor: "hover:bg-[#5865F2]",
		hoverTextColor: "hover:text-white"
	},
	{
		title: "osu!",
		href: "https://osu.ppy.sh/u/17279598",
		icon: OsuIcon,
		hoverColor: "hover:bg-[#FF66AB]",
		hoverTextColor: "hover:text-white"
	},
	{
		title: "YouTube",
		href: "https://www.youtube.com/@yorunoken",
		icon: YoutubeIcon,
		hoverColor: "hover:bg-[#FF0000]",
		hoverTextColor: "hover:text-white"
	},
	{
		title: "Buy Me a Coffee",
		href: "https://buymeacoffee.com/yorunoken",
		icon: CoffeeIcon,
		hoverColor: "hover:bg-[#FFDD00]",
		hoverTextColor: "hover:text-black"
	}
];

export const statusColors = {
	online: "bg-green-500",
	offline: "bg-gray-500",
	dnd: "bg-red-500",
	idle: "bg-yellow-500"
};

export const statusLabels = {
	online: "Online",
	offline: "Offline",
	dnd: "Do Not Disturb",
	idle: "idle"
};
