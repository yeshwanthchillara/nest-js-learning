import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

import * as path from 'path';

export class UpdateFilterTasksFunctionWithUserValidation1781204652482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = fs.readFileSync(
      path.join(__dirname, '../functions/filter_or_sort_tasks.sql'),
      'utf8',
    );

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // optional rollback
  }
}
