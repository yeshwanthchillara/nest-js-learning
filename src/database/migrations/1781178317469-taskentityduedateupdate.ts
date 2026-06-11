import { MigrationInterface, QueryRunner } from "typeorm";

export class Taskentityduedateupdate1781178317469 implements MigrationInterface {
    name = 'Taskentityduedateupdate1781178317469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "dueDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "dueDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "dueDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "dueDate" SET NOT NULL`);
    }

}
