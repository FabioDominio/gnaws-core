import {defineConfig} from "tsdown";

export default defineConfig({
    "entry": ["src/index.ts"],
    "format": ["esm"],
    "dts": true,
    "deps": {
        "neverBundle": [
            /^@aws-sdk\//,
            /^graphology/,
            /^node:/
        ]
    },
    "outDir": "dist",
    "clean": true
});
