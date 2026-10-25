import http from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
const root = resolve("dist");
const port = Number(process.env.PORT || 4400);
http.createServer(async (req, res) => {
  try {
    const p = resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (p !== root && !p.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
    const file = p === root || req.url.endsWith("/") ? resolve(p, "index.html") : p;
    const data = await readFile(file);
    res.setHeader("Content-Type", file.endsWith(".js") ? "text/javascript; charset=utf-8" : "text/html; charset=utf-8");
    res.end(data);
  } catch { res.writeHead(404); res.end("Not found"); }
}).listen(port, "127.0.0.1", () => console.log(`Lab: http://127.0.0.1:${port}`));
