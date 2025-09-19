const esbuild = require("esbuild");
const { execSync } = require("child_process");
const path = require("path");

async function build() {
  const tempBundle = path.join(__dirname, "dist/index.js");
  const tempEs5 = path.join(__dirname, "dist/index.es5.js");
  const finalOutput = path.join(__dirname, "digideviltutorialreversi.js");

  // Step 1: esbuild bundle (no minify yet)
  await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: tempBundle,
    platform: "browser",
    target: ["esnext"],
    format: "iife",
    globalName: "Game",
    banner: { js: `define(["dojo","dojo/_base/declare","ebg/core/gamegui","ebg/counter","ebg/stock"], function(dojo, declare, GameGui) {` },
    footer: { js: `return declare("bgagame.digideviltutorialreversi", ebg.core.gamegui, new Game.DigidevilTutorialReversi()); });` }
  });

  console.log("✅ esbuild bundle complete");

  // Step 2: Babel ES5 transpile
  execSync(`npx babel ${tempBundle} --out-file ${tempEs5}`, { stdio: "inherit" });
  console.log("✅ Babel ES5 transpile complete");

  // Step 3: Terser minify
  execSync(`npx terser ${tempEs5} -c -m -o ${finalOutput}`, { stdio: "inherit" });
  console.log("✅ Final minified ES5 AMD bundle ready at dist/index.js");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});