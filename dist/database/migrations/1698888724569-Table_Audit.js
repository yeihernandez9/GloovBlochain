"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableAudit1698888724569 = void 0;
class TableAudit1698888724569 {
    constructor() {
        this.name = 'TableAudit1698888724569';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "public"."audit" ("id" SERIAL NOT NULL, "description" character varying(255), "method" character varying(255), "value" character varying(255), "is_done" boolean NOT NULL DEFAULT false, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0678de45c17f2454dd857441d59" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "public"."audit"`);
    }
}
exports.TableAudit1698888724569 = TableAudit1698888724569;
//# sourceMappingURL=1698888724569-Table_Audit.js.map