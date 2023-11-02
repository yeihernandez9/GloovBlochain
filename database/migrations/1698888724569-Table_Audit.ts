import { MigrationInterface, QueryRunner } from "typeorm";

export class TableAudit1698888724569 implements MigrationInterface {
    name = 'TableAudit1698888724569'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE "public"."audit" ("id" SERIAL NOT NULL, "description" character varying(255), "method" character varying(255), "value" character varying(255), "is_done" boolean NOT NULL DEFAULT false, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0678de45c17f2454dd857441d59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE "public"."audit"`);
    }

}
