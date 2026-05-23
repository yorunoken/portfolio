import About from "./components/About";
import Projects from "./components/Projects";
import Donations from "./components/Donations";
import ResolvingTitle from "./components/ResolvingTitle";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

export default function App() {
    if (window.location.pathname !== "/") {
        return (
            <main className="min-h-screen w-full bg-[#111] text-zinc-100 p-6 md:p-10 font-sans antialiased selection:bg-blue-500/30">
                <div className="max-w-4xl mx-auto space-y-18">
                    <NotFound />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#111] text-zinc-100 p-6 md:p-10 font-sans antialiased selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto space-y-18">
                <header className="space-y-6 mt-6 md:mt-12">
                    <div className="space-y-3">
                        <ResolvingTitle text="yorunoken" className="text-4xl font-bold tracking-tight text-white mb-2" />
                        <p className="text-lg text-zinc-400 font-mono">Software Engineer & Full Stack Developer</p>
                    </div>
                </header>

                <About />

                <Projects />

                <Donations />

                <Footer />
            </div>
        </main>
    );
}
