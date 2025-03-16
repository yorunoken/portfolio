import { serve } from "bun";
import { readFile } from "fs/promises";
import { join } from "path";

const PORT = 3000;
const PAGES_DIR = "./pages";
const NIGHTSCOUT_URL = "http://128.140.36.100";

const MIME_TYPES: { [key: string]: string } = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
};

function getMimeType(filePath: string): string {
    const ext = filePath.substring(filePath.lastIndexOf("."));
    return MIME_TYPES[ext] || "text/plain";
}

async function getLastGlucose() {
    try {
        const res = await fetch(`${NIGHTSCOUT_URL}/api/v1/slice/entries/dateString/sgv/.*/.*?count=5`, {
            headers: {
                "User-Agent": "Sibionics Nightscout Uploader",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching glucose data:", error);
        throw error;
    }
}

const server = serve({
    port: PORT,
    async fetch(req) {
        let url = new URL(req.url);

        if (url.pathname === "/api/getLastGlucose") {
            try {
                const data = await getLastGlucose();
                return new Response(JSON.stringify(data), {
                    headers: {
                        "User-Agent": "Yorunoken website",
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: "Failed to fetch glucose data" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        let filePath = join(PAGES_DIR, url.pathname === "/" ? "index.html" : url.pathname);

        try {
            const file = await readFile(filePath, "utf8");
            return new Response(file, {
                headers: { "Content-Type": getMimeType(filePath) },
            });
        } catch (error) {
            return new Response("404 Not Found", { status: 404 });
        }
    },
});

console.log(`Server running on http://localhost:${PORT}`);
