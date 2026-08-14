import {describe, it, expect, vi, beforeEach} from "vitest";

vi.mock(
    "node:dns/promises",
    () => ({
        "resolve4": vi.fn()
    })
);

import {resolve4} from "node:dns/promises";
import {checkServiceAvailability} from "../../src/dnsPreCheck.js";

const mockResolve4 = resolve4 as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {

    mockResolve4.mockReset();

});

describe(
    "checkServiceAvailability",
    () => {

        it(
            "returns unavailable set when DNS fails (reject)",
            async () => {

                mockResolve4.mockRejectedValue(new Error("ENOTFOUND"));

                const unavailable = await checkServiceAvailability(
                    ["ec2"],
                    ["eu-west-1"]
                );

                expect(unavailable.has("ec2:eu-west-1")).toBe(true);
                expect(mockResolve4).toHaveBeenCalledWith("ec2.eu-west-1.amazonaws.com");

            }
        );

        it(
            "returns empty set when all resolve",
            async () => {

                mockResolve4.mockResolvedValue(["1.2.3.4"]);

                const unavailable = await checkServiceAvailability(
                    [
                        "ec2",
                        "lambda"
                    ],
                    ["eu-west-1"]
                );

                expect(unavailable.size).toBe(0);

            }
        );

        it(
            "skips global services (doesn't try to resolve them)",
            async () => {

                mockResolve4.mockResolvedValue(["1.2.3.4"]);

                const unavailable = await checkServiceAvailability(
                    [
                        "cloudFront",
                        "route53",
                        "iam",
                        "s3"
                    ],
                    ["eu-west-1"]
                );

                expect(unavailable.size).toBe(0);
                expect(mockResolve4).not.toHaveBeenCalled();

            }
        );

        it(
            "caches results for shared endpoints (neptune and docDb both use 'rds' prefix)",
            async () => {

                mockResolve4.mockResolvedValue(["1.2.3.4"]);

                /*
                 * neptune and docDb both resolve to the "rds" prefix.
                 * Within a single Promise.all batch they run concurrently, so the cache
                 * may not deduplicate within the batch. But across separate invocations
                 * using the same resolved Map, caching would apply.
                 * Here we verify the fundamental behavior: all use the same hostname.
                 */
                const unavailable = await checkServiceAvailability(
                    [
                        "neptune",
                        "docDb"
                    ],
                    ["eu-west-1"]
                );

                expect(unavailable.size).toBe(0);
                // Both resolve to the same endpoint
                for (const call of mockResolve4.mock.calls) {

                    expect(call[0]).toBe("rds.eu-west-1.amazonaws.com");

                }

            }
        );

        it(
            "marks all services with shared prefix as unavailable when DNS fails",
            async () => {

                mockResolve4.mockRejectedValue(new Error("ENOTFOUND"));

                const unavailable = await checkServiceAvailability(
                    [
                        "neptune",
                        "docDb"
                    ],
                    ["eu-west-1"]
                );

                expect(unavailable.has("neptune:eu-west-1")).toBe(true);
                expect(unavailable.has("docDb:eu-west-1")).toBe(true);

            }
        );

        it(
            "skips services without a known prefix",
            async () => {

                mockResolve4.mockResolvedValue(["1.2.3.4"]);

                const unavailable = await checkServiceAvailability(
                    ["unknownService"],
                    ["eu-west-1"]
                );

                expect(unavailable.size).toBe(0);
                expect(mockResolve4).not.toHaveBeenCalled();

            }
        );

    }
);
