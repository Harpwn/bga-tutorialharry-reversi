const esbuild = require("esbuild");
const { execSync } = require("child_process");
const path = require("path");

async function build() {
  const tempBundle = path.join(__dirname, "dist/index.js");
  const tempEs5 = path.join(__dirname, "dist/index.es5.js");
  const finalOutput = path.join(__dirname, "digideviltutorialreversi.js");

  // Step 1: esbuild bundle (no minify here)
  await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: tempBundle,
    platform: "browser",
    target: ["esnext"],  // leave modern, Babel will handle ES5
    format: "iife",
    banner: { js: `define(["dojo","dojo/_base/declare","ebg/core/gamegui","ebg/counter","ebg/stock"], function(dojo, declare, GameGui) {` },
    footer: { js: `return declare("bgagame.digideviltutorialreversi", ebg.core.gamegui, new DigidevilTutorialReversi()); });` }
  });
  console.log("✅ esbuild bundle complete");

  // Step 2: Babel transpile to ES5
  execSync(`npx babel ${tempBundle} --out-file ${tempEs5}`, { stdio: "inherit" });
  console.log("✅ Babel ES5 transpile complete");

  // Step 3: Terser minify with reserved globals
  execSync(`npx terser ${tempEs5} --compress toplevel,drop_console=true,sequences=false --mangle --output ${finalOutput}`, { stdio: "inherit" });
  console.log("✅ Pre-minified ES5 AMD bundle ready for BGA upload");
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});