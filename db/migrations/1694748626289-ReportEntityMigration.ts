import { MigrationInterface, QueryRunner } from "typeorm";

export class ReportEntityMigration1694748626289 implements MigrationInterface {
    name = 'ReportEntityMigration1694748626289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`releaseDate\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``);
        await queryRunner.query(`DROP TABLE \`report\``);
    }

}
