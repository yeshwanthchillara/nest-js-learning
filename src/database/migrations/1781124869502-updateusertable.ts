import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateusertable1781124869502 implements MigrationInterface {
    name = 'Updateusertable1781124869502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TYPE "public"."task_priority_enum" RENAME TO "task_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('low', 'medium', 'high', 'critical')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "public"."task_priority_enum" USING "priority"::"text"::"public"."task_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."task_priority_enum" RENAME TO "task_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('low', 'medium', 'high', 'critical')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "public"."task_priority_enum" USING "priority"::"text"::"public"."task_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum_old" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "public"."task_priority_enum_old" USING "priority"::"text"::"public"."task_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."task_priority_enum_old" RENAME TO "task_priority_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum_old" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "public"."task_priority_enum_old" USING "priority"::"text"::"public"."task_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."task_priority_enum_old" RENAME TO "task_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
