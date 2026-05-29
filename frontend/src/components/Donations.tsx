import { wallets } from "../lib/constants";

export default function Donations() {
    return (
        <section id="support" className="space-y-6">
            <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Support</h2>

            <div className="space-y-4">
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">If you find my open-source projects useful and would like to support my work, you can sponsor or buy me a coffee.</p>

                <div className="flex flex-wrap gap-3 pt-1">
                    {wallets.map((wallet) => (
                        <a
                            key={wallet.name}
                            href={wallet.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                        >
                            {wallet.name}
                            <span className="text-zinc-500 text-xs">↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
