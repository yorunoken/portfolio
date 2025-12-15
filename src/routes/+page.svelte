<script lang="ts">
	import GithubIcon from "~icons/mdi/github";
	import LinkIcon from "~icons/mdi/external-link";
	import { resolve } from "$app/paths";
	import { projects, socials, statusColors } from "$lib/data";
	import Effects from "$lib/components/effects/index.svelte";

	let { data } = $props();
</script>

<Effects initialWeather={data.initialWeather} />
<main class="flex min-h-screen items-center justify-center p-4 sm:p-6">
	<div
		class="z-10 w-full max-w-4xl rounded-lg border border-gray-800 bg-[#0a0a0a]/90 p-5 text-white shadow-xl sm:p-6 md:p-8 lg:p-12"
	>
		<div class="flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
			<div class="w-full flex-1">
				<div
					class="mb-6 flex flex-col items-center px-4 text-center lg:flex-row lg:justify-between lg:px-0 lg:text-left"
				>
					<div class="order-2 mb-4 flex flex-col items-center lg:order-1 lg:mb-0 lg:items-start">
						<div class="mb-2">
							<h1 class="mb-1 text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">yorunoken</h1>
							<a
								href="mailto:me@yorunoken.com"
								class="text-sm break-all text-gray-500 hover:underline"
							>
								me@yorunoken.com
							</a>
						</div>
						<div class="flex flex-col gap-1 text-sm text-gray-500 sm:text-base lg:text-lg">
							<p>full-stack developer</p>
							<p>insulin junkie</p>
							<p>weeb</p>
						</div>
					</div>

					<div class="group/status relative order-1 mb-5 lg:order-2 lg:mb-0">
						<img
							src="/profile-pic"
							alt="profile"
							class="h-24 w-24 rounded-full border-2 border-gray-800 object-cover shadow-lg sm:h-28 sm:w-28 lg:h-48 lg:w-48 xl:h-56 xl:w-56"
						/>
						<div
							class={`${statusColors[data.indicator]} absolute right-1 bottom-1 h-5 w-5 rounded-full border-3 border-[#0a0a0a] sm:h-6 sm:w-6 lg:right-2 lg:bottom-2 lg:h-12 lg:w-12 lg:border-6`}
						></div>
						{#if data.status}
							<div
								class="absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg border border-gray-700 bg-[#0a0a0a]/95 px-3 py-1.5 shadow-lg"
							>
								<div
									class="max-w-37.5 overflow-hidden transition-all duration-400 group-hover/status:max-w-200 sm:max-w-50"
								>
									<span class="inline-block text-xs whitespace-nowrap text-gray-300 sm:text-sm"
										>{data.status}</span
									>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="mb-6">
					<h2 class="mb-3 text-center text-xl font-semibold text-gray-200 sm:text-2xl lg:text-left">
						About Me
					</h2>
					<p class="text-center text-sm leading-relaxed text-gray-400 sm:text-base lg:text-left">
						i love listening to music, playing games, and programing random stuff i find
						interesting.
					</p>
					<p class="text-center text-sm leading-relaxed text-gray-400 sm:text-base lg:text-left">
						i like collecting plushies, figurines and keychains of anime/japanese characters i like
						=)
					</p>
					<p class="text-center text-sm leading-relaxed text-gray-400 sm:text-base lg:text-left">
						i have type 1 diabetes. you can follow my blood sugar graph from my
						<a
							class="text-blue-400 underline"
							href="https://nightscout.yorunoken.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							nightscout instance
						</a>.
					</p>
					<p class="text-center text-sm leading-relaxed text-gray-400 sm:text-base lg:text-left">
						trying to navigate through life and complicated feelings.
					</p>
				</div>

				<div class="border-t border-gray-800 pt-6 pb-6">
					<div class="mb-4 flex items-center justify-center gap-2 lg:justify-start">
						<h2 class="text-xl font-semibold text-gray-200 sm:text-2xl">Projects</h2>
						<a
							href="https://github.com/yorunoken?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm text-gray-500 hover:underline"
						>
							more
						</a>
					</div>

					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
						{#each projects as project (project.title)}
							<div
								class="group rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-700"
							>
								<div class="mb-2 flex items-start justify-between">
									<h3 class="text-base font-semibold text-white sm:text-lg">{project.title}</h3>
									<div class="flex shrink-0 gap-2">
										{#if project.github}
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												class="text-gray-500 transition-colors hover:text-white"
												title="GitHub"
											>
												<GithubIcon />
											</a>
										{/if}
										{#if project.website}
											<a
												href={project.website}
												target="_blank"
												rel="noopener noreferrer"
												class="text-gray-500 transition-colors hover:text-blue-400"
												title="Visit Website"
											>
												<LinkIcon />
											</a>
										{/if}
									</div>
								</div>
								<p class="mb-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
									{project.description}
								</p>
								<div class="flex flex-wrap gap-1.5 sm:gap-2">
									{#each project.tags as tag}
										<span
											class="rounded border border-gray-700 bg-gray-900 px-2 py-0.5 text-xs text-gray-300 sm:py-1"
										>
											{tag}
										</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="border-t border-gray-800 pt-6">
					<h2 class="mb-4 text-center text-xl font-semibold text-gray-200 sm:text-2xl lg:text-left">
						Socials
					</h2>
					<div class="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
						{#each socials as social}
							{@const Icon = social.icon}

							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class={`rounded-lg bg-gray-800 p-2.5 text-gray-400 sm:p-3 ${social.hoverColor} ${social.hoverColor} ${social.hoverTextColor} group transition-all duration-300`}
								title={social.title}
							>
								<Icon class="h-5 w-5 sm:h-6 sm:w-6" />
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
