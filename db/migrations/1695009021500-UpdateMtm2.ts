import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMtm21695009021500 implements MigrationInterface {
    name = 'UpdateMtm21695009021500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subject\` CHANGE \`userSubject\` \`userSubjectId\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subject\` CHANGE \`userSubjectId\` \`userSubject\` int NOT NULL AUTO_INCREMENT`);
    }

}
