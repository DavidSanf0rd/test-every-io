import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSeederFlag1637006333752 implements MigrationInterface {
    name = 'AddSeederFlag1637006333752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seeder" ("id" SERIAL NOT NULL, "has_already_executed" boolean NOT NULL, CONSTRAINT "PK_7d4f5f29c8387f8f02a38b0eb1b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "seeder"`);
    }

}
