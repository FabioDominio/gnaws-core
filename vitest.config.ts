import {defineConfig} from "vitest/config";

export default defineConfig({
    "test": {
        "include": ["tests/**/*.test.ts"],
        "coverage": {
            "provider": "v8",
            "include": [
                "src/detection/**/*.ts",
                "src/graphBuilder.ts",
                "src/dnsPreCheck.ts",
                "src/exporters/**/*.ts",
                "src/providers/live/**/*.ts",
                "src/providers/cache/**/*.ts"
            ],
            "exclude": [
                "src/providers/live/liveServiceFactory.ts",
                "src/providers/cache/cacheServiceFactory.ts"
            ],
            "reporter": [
                "text",
                "lcov"
            ]
        }
    }
});
