export default function Footer() {
    return (
        <footer id="footer" className="pt-12 border-t border-white/5 text-zinc-500 text-sm">
            <p className="font-mono text-xs">© {new Date().getFullYear()} | Made with love.</p>
        </footer>
    );
}
