import { projects } from "../lib/constants";

function GitHubIcon() {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
        </svg>
    );
}

function ExternalIcon() {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="space-y-10">
            <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Featured Projects</h2>
            <div className="space-y-12">
                {projects.map((project) => (
                    <div key={project.title} className="group md:grid md:grid-cols-4 md:gap-6 flex flex-col gap-2 border-l border-transparent pl-4 md:pl-0 md:border-l-0 transition-colors">
                        <div className="text-xs text-zinc-400 font-mono pt-1 w-full shrink-0 tracking-wider uppercase">{project.dates}</div>

                        <div className="md:col-span-3 space-y-3">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <h3 className="text-base font-semibold text-white tracking-tight">
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-300 hover:underline underline-offset-4 decoration-blue-500/40 transition-colors"
                                        >
                                            {project.title}
                                        </a>
                                    ) : (
                                        project.title
                                    )}
                                </h3>

                                <div className="flex items-center -mx-1.5">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center p-1.5 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                                            aria-label={`${project.title} live site`}
                                        >
                                            <ExternalIcon />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center p-1.5 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                                            aria-label={`${project.title} on GitHub`}
                                        >
                                            <GitHubIcon />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">{project.description}</p>

                            <div className="flex items-center flex-wrap gap-3 text-xs font-mono">
                                {project.users && (
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        {project.users.toLocaleString()}+ users
                                    </div>
                                )}
                                {project.usersPerMonth && (
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        {project.usersPerMonth.toLocaleString()}+ MAU
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-white/2 border border-white/5 text-[11px] font-mono rounded text-zinc-400 transition-all duration-300 hover:text-zinc-200 hover:border-white/10"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
