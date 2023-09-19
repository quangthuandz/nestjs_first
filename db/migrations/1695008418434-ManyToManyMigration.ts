import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToManyMigration1695008418434 implements MigrationInterface {
    name = 'ManyToManyMigration1695008418434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_subject\` (\`postToCategoryId\` int NOT NULL AUTO_INCREMENT, \`postId\` int NOT NULL, \`categoryId\` int NOT NULL, \`order\` int NOT NULL, \`userId\` int NULL, \`subjectId\` int NULL, PRIMARY KEY (\`postToCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_subjects_subject\` (\`userId\` int NOT NULL, \`subjectId\` int NOT NULL, INDEX \`IDX_4bd563d26472977cff0082067e\` (\`userId\`), INDEX \`IDX_5f6ad4fe37d091be3f9c4c2e04\` (\`subjectId\`), PRIMARY KEY (\`userId\`, \`subjectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD CONSTRAINT \`FK_3989a71c37a7a640b2f7b657adc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_subject\` ADD CONSTRAINT \`FK_bc7c39de695d9a522028ef64bdb\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD CONSTRAINT \`FK_4bd563d26472977cff0082067e6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD CONSTRAINT \`FK_5f6ad4fe37d091be3f9c4c2e04a\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP FOREIGN KEY \`FK_5f6ad4fe37d091be3f9c4c2e04a\``);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP FOREIGN KEY \`FK_4bd563d26472977cff0082067e6\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP FOREIGN KEY \`FK_bc7c39de695d9a522028ef64bdb\``);
        await queryRunner.query(`ALTER TABLE \`user_subject\` DROP FOREIGN KEY \`FK_3989a71c37a7a640b2f7b657adc\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f6ad4fe37d091be3f9c4c2e04\` ON \`user_subjects_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_4bd563d26472977cff0082067e\` ON \`user_subjects_subject\``);
        await queryRunner.query(`DROP TABLE \`user_subjects_subject\``);
        await queryRunner.query(`DROP TABLE \`subject\``);
        await queryRunner.query(`DROP TABLE \`user_subject\``);
    }

}
