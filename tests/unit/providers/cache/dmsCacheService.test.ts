import {mkdtempSync, writeFileSync, rmSync} from "fs";
import {join} from "path";
import {tmpdir} from "os";
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {DmsCacheService} from "../../../../src/providers/cache/dmsCacheService.js";

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
    "DmsCacheService",
    () => {

        it(
            "getReplicationInstances reads dms_replication_instances.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dms_replication_instances.json"
                    ),
                    JSON.stringify([{"ReplicationInstanceIdentifier": "ri1"}])
                );
                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationInstances()).toEqual([{"ReplicationInstanceIdentifier": "ri1"}]);

            }
        );

        it(
            "getReplicationInstances returns empty for missing file",
            async () => {

                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationInstances()).toEqual([]);

            }
        );

        it(
            "getReplicationSubnetGroups reads dms_replication_subnet_groups.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dms_replication_subnet_groups.json"
                    ),
                    JSON.stringify([{"ReplicationSubnetGroupIdentifier": "sg1"}])
                );
                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationSubnetGroups()).toEqual([{"ReplicationSubnetGroupIdentifier": "sg1"}]);

            }
        );

        it(
            "getReplicationSubnetGroups returns empty for missing file",
            async () => {

                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationSubnetGroups()).toEqual([]);

            }
        );

        it(
            "getEndpoints reads dms_endpoints.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dms_endpoints.json"
                    ),
                    JSON.stringify([{"EndpointIdentifier": "ep1"}])
                );
                const service = new DmsCacheService(tmpDir);
                expect(await service.getEndpoints()).toEqual([{"EndpointIdentifier": "ep1"}]);

            }
        );

        it(
            "getEndpoints returns empty for missing file",
            async () => {

                const service = new DmsCacheService(tmpDir);
                expect(await service.getEndpoints()).toEqual([]);

            }
        );

        it(
            "getReplicationTasks reads dms_replication_tasks.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dms_replication_tasks.json"
                    ),
                    JSON.stringify([{"ReplicationTaskIdentifier": "task1"}])
                );
                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationTasks()).toEqual([{"ReplicationTaskIdentifier": "task1"}]);

            }
        );

        it(
            "getReplicationTasks returns empty for missing file",
            async () => {

                const service = new DmsCacheService(tmpDir);
                expect(await service.getReplicationTasks()).toEqual([]);

            }
        );

        it(
            "getConnections reads dms_connections.json",
            async () => {

                writeFileSync(
                    join(
                        tmpDir,
                        "dms_connections.json"
                    ),
                    JSON.stringify([{"ReplicationInstanceIdentifier": "ri1"}])
                );
                const service = new DmsCacheService(tmpDir);
                expect(await service.getConnections()).toEqual([{"ReplicationInstanceIdentifier": "ri1"}]);

            }
        );

        it(
            "getConnections returns empty for missing file",
            async () => {

                const service = new DmsCacheService(tmpDir);
                expect(await service.getConnections()).toEqual([]);

            }
        );

    }
);
