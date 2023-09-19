import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressMigration1694689234770 implements MigrationInterface {
    name = 'AddAddressMigration1694689234770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NOT NULL DEFAULT 'hn'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
    }

}
