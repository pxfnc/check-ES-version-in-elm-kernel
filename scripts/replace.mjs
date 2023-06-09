#!/usr/bin/env node

// In elm, the optimization options allow you to change the code to be embedded
// in the js file. Specifically, you can embed code between `/**__PROD/` and
// `//*/` in production builds, and between `/**__PROD/` and `/*/` in debug builds.

import { globSync } from "glob";
import { readFile, writeFile } from "node:fs/promises";

const DEBUG_PATTERN = /\/\*\*__DEBUG\/([\s\S]+?)\/\/\*\//g;
const PROD_PATTERN = /\/\*\*__PROD\/([\s\S]+?)\/\/\*\//g;

for (const path of globSync("./packages/**/*.js")) {
  readFile(path, "utf8").then((file) => {
    console.log("process file: ", path);
    writeFile(
      path,
      file.replace(PROD_PATTERN, "$1").replace(DEBUG_PATTERN, ""),
      "utf8"
    );
  });
}
