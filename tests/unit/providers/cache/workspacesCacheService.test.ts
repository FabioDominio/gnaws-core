import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {WorkspacesCacheService} from "../../../../src/providers/cache/workspacesCacheService.js";

let tmpDir: string;
beforeEach(() => {

    tmpDir = mkdtempSync(join(
        tmpdir(),
        "gnaws-test-"
    ));

});
afterEach(() => {

    rmSync(
        tmpDir,
        {"recursive": true}
    );

});

describe(
    "WorkspacesCacheService",
    () => {

        it(
            "getWorkspaces reads workspaces_workspaces.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "workspaces_workspaces.json"
                    ),
                    JSON.stringify([{"WorkspaceId": "ws-1"}])
                );
                const service = new WorkspacesCacheService(tmpDir);
                expect(await service.getWorkspaces()).toEqual([{"WorkspaceId": "ws-1"}]);

            }
        );

        it(
            "getWorkspaces returns empty for missing file",
            async () => {

                const service = new WorkspacesCacheService(tmpDir);
                expect(await service.getWorkspaces()).toEqual([]);

            }
        );

        it(
            "getDirectories reads workspaces_directories.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "workspaces_directories.json"
                    ),
                    JSON.stringify([{"DirectoryId": "d-1"}])
                );
                const service = new WorkspacesCacheService(tmpDir);
                expect(await service.getDirectories()).toEqual([{"DirectoryId": "d-1"}]);

            }
        );

        it(
            "getDirectories returns empty for missing file",
            async () => {

                const service = new WorkspacesCacheService(tmpDir);
                expect(await service.getDirectories()).toEqual([]);

            }
        );

    }
);
