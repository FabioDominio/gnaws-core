/**
 * Back-compat barrel. The descriptor table was refactored into per-service
 * groups under `./descriptors/` (mirroring the per-service structure of
 * `graphBuilder.ts`). This module re-exports the aggregate and shared types so
 * existing imports (`./resourceDescriptors.js`) keep working.
 *
 * Prefer importing from `./descriptors/index.js` directly in new code — and a
 * single service group (e.g. `ec2Descriptors`) when you only need one service.
 */
export * from "./descriptors/index.js";
