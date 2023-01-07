import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673075035242 implements MigrationInterface {
    name = 'sync1673075035242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isActivated"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isActivated" DROP DEFAULT
        `);
    }

}
