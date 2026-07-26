// Writes .br and .gz siblings for every compressible file in dist/, so the Rust
// server can serve them directly instead of compressing on every request.
// Build-time cost is paid once, at max quality; runtime cost is zero.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { brotliCompress, gzip, constants } from "node:zlib";
import { promisify } from "node:util";

const br = promisify(brotliCompress);
const gz = promisify(gzip);

const COMPRESSIBLE = new Set([".js", ".css", ".html", ".svg", ".json", ".xml", ".txt", ".map"]);
const MIN_BYTES = 1024;

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(path);
        else yield path;
    }
}

const dist = new URL("../dist/", import.meta.url).pathname;
let saved = 0;
let count = 0;

for await (const path of walk(dist)) {
    if (!COMPRESSIBLE.has(extname(path))) continue;
    if ((await stat(path)).size < MIN_BYTES) continue;

    const raw = await readFile(path);

    const [brotli, gzipped] = await Promise.all([
        br(raw, {
            params: {
                [constants.BROTLI_PARAM_QUALITY]: 11,
                [constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
            },
        }),
        gz(raw, { level: 9 }),
    ]);

    // Only keep them if they actually win; a .br larger than the original would
    // make the server serve more bytes than doing nothing.
    if (brotli.length < raw.length) {
        await writeFile(`${path}.br`, brotli);
        saved += raw.length - brotli.length;
        count++;
    }
    if (gzipped.length < raw.length) {
        await writeFile(`${path}.gz`, gzipped);
    }
}

console.log(`compressed ${count} file(s), saving ${(saved / 1024).toFixed(1)} KiB over the wire`);
