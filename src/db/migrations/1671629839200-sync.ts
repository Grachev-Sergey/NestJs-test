import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1671629839200 implements MigrationInterface {
    name = 'sync1671629839200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "name" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "name"
        `);
    }

}
