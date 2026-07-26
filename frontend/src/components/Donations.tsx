import { wallets } from "../lib/constants";

export default function Donations() {
    return (
        <section id="support" className="space-y-8">
            <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Support</h2>

            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
                If you find my open-source projects useful and would like to support my continuous development, consider supporting me through the links below.
            </p>

            <div className="flex flex-wrap gap-3">
                {wallets.map((wallet) => (
                    <a
                        key={wallet.name}
                        href={wallet.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    >
                        {wallet.name}
                        <span className="text-zinc-500 text-xs transition-colors duration-300 group-hover:text-zinc-300">↗</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
