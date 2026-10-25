import { createRequire } from "node:module";
import { mkdir, copyFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
await mkdir("dist", { recursive: true });
await esbuild.build({ entryPoints: ["src/main.jsx"], bundle: true, outfile: "dist/lab.js", loader: { ".js": "jsx" }, platform: "browser", target: "es2020", minify: true, legalComments: "eof", define: { "process.env.NODE_ENV": JSON.stringify("production"), "process.env.PUBLIC_URL": JSON.stringify(".") }, nodePaths: (process.env.NODE_PATH || "").split(process.platform === "win32" ? ";" : ":").filter(Boolean) });
await copyFile("index.html", "dist/index.html");
console.log("Built standalone static lab in dist/");
