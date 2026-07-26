import { socials } from "../lib/constants";

const skillCategories = [
    {
        name: "Languages",
        skills: ["TypeScript", "JavaScript", "Rust", "Java", "SQL"],
    },
    {
        name: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "HTML5 / CSS3"],
    },
    {
        name: "Backend & Dev",
        skills: ["Bun", "Node.js", "Axum", "MySQL", "Redis", "Docker"],
    },
];

function getIcon(label: string) {
    switch (label) {
        case "Email":
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            );
        case "GitHub":
            return (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                </svg>
            );
        case "LinkedIn":
            return (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                </svg>
            );
        case "CV / Resume":
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            );
        default:
            return null;
    }
}

export default function About() {
    const professionalSocials = socials.filter((s) => s.type === "professional");
    const communitySocials = socials.filter((s) => s.type === "community");

    return (
        <section id="about" aria-label="About me" className="space-y-8">
            <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">About Me</h2>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div className="leading-relaxed space-y-4 text-zinc-300 text-base">
                        <p>Hi everyone! I'm yorunoken, a full-stack engineer who builds and maintains high-impact open-source projects for my communities.</p>
                        <p>I like spending my free time listening to music, playing video games, and reading.</p>
                        <p>
                            I have type 1 diabetes. I have my own{" "}
                            <a
                                className="text-blue-300 hover:text-blue-200 transition-colors underline underline-offset-4 decoration-zinc-700"
                                href="https://nightscout.yorunoken.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                hosted instance of Nightscout
                            </a>{" "}
                            where I can easily follow my blood sugars.
                        </p>
                        <p className="text-zinc-400 font-medium">If you’re hiring or want to collaborate, the fastest way to reach me is email and Discord.</p>
                    </div>

                    <div className="space-y-5 pt-2">
                        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                            {professionalSocials.map((s) => {
                                const isCV = s.label === "CV / Resume";
                                return (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                                        rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                        download={isCV ? "Fatih_Fetvaci_CV.pdf" : undefined}
                                        className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                                            isCV
                                                ? "border-blue-500/20 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white"
                                                : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                        }`}
                                    >
                                        {getIcon(s.label)}
                                        {s.label}
                                    </a>
                                );
                            })}
                        </div>

                        <div className="border-t border-white/5 pt-4">
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">Community & Other Profiles</p>
                            <div className="flex flex-wrap gap-2">
                                {communitySocials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/2 px-2.5 py-1 text-xs font-mono text-zinc-400 transition-all hover:bg-white/5 hover:border-white/10 hover:text-zinc-200"
                                    >
                                        {s.label}
                                        <span aria-hidden="true" className="text-zinc-500 text-[10px]">↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="rounded-xl border border-white/5 bg-white/2 p-6 self-start space-y-6">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-4">Toolbox</p>
                        <div className="space-y-4">
                            {skillCategories.map((category) => (
                                <div key={category.name} className="space-y-2">
                                    <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">{category.name}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md border border-white/5 bg-white/2 px-2 py-1 text-xs font-mono text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
