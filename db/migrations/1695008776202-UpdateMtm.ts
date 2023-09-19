import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMtm1695008776202 implements MigrationInterface {
    name = 'UpdateMtm1695008776202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`postId\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` CHANGE \`postToCategoryId\` \`postToCategoryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`postToCategoryId\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`userSubject\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`score\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP COLUMN \`userSubject\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`postToCategoryId\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD PRIMARY KEY (\`postToCategoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` CHANGE \`postToCategoryId\` \`postToCategoryId\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`postId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`order\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD \`categoryId\` int NOT NULL`);
    }

}
