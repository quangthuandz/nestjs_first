import { MigrationInterface, QueryRunner } from "typeorm";

export class NextMigration1694689003151 implements MigrationInterface {
    name = 'NextMigration1694689003151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    }

}
