import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674209376105 implements MigrationInterface {
    name = 'sync1674209376105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "refreshToken" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "refreshToken"
            SET NOT NULL
        `);
    }

}
