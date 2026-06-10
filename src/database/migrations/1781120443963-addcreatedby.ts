import { MigrationInterface, QueryRunner } from "typeorm";

export class Addcreatedby1781120443963 implements MigrationInterface {
    name = 'Addcreatedby1781120443963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "createdBy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdBy"`);
    }

}
