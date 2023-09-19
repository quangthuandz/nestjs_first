import { MigrationInterface, QueryRunner } from "typeorm";

export class Refresh1695106291822 implements MigrationInterface {
    name = 'Refresh1695106291822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP FOREIGN KEY \`FK_3989a71c37a7a640b2f7b657adc\``);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP FOREIGN KEY \`FK_bc7c39de695d9a522028ef64bdb\``);
        await queryRunner.query(`DROP INDEX \`fk_user_subjects_user\` ON \`user_subjects_subject\``);
        await queryRunner.query(`CREATE TABLE \`user_subject\` (\`userSubjectId\` int NOT NULL AUTO_INCREMENT, \`score\` int NOT NULL, \`userId\` int NULL, \`subjectId\` int NULL, PRIMARY KEY (\`userSubjectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`userSubjectId\` \`userSubjectId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP COLUMN \`userSubjectId\``);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD PRIMARY KEY (\`userId\`, \`subjectId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`subjectId\` \`subjectId\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_4bd563d26472977cff0082067e\` ON \`user_subjects_subject\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5f6ad4fe37d091be3f9c4c2e04\` ON \`user_subjects_subject\` (\`subjectId\`)`);
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
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`subjectId\` \`subjectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD \`userSubjectId\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD PRIMARY KEY (\`userSubjectId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` CHANGE \`userSubjectId\` \`userSubjectId\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD \`score\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`user_subject\``);
        await queryRunner.query(`CREATE INDEX \`fk_user_subjects_user\` ON \`user_subjects_subject\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD CONSTRAINT \`FK_bc7c39de695d9a522028ef64bdb\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_subjects_subject\` ADD CONSTRAINT \`FK_3989a71c37a7a640b2f7b657adc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
