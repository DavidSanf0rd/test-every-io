import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTaksStatus1636845594484 implements MigrationInterface {
    name = 'AddTaksStatus1636845594484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "current_status" TO "statusId"`);
        await queryRunner.query(`CREATE TABLE "task_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_default" boolean NOT NULL, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "statusId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "task_status"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "statusId" TO "current_status"`);
    }

}
