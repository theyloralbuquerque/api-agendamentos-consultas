import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721273658862 implements MigrationInterface {
    name = 'Default1721273658862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "especialidades" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "codigo" integer NOT NULL, "status" text NOT NULL, CONSTRAINT "UQ_8755068bb3ceef258018e80021d" UNIQUE ("codigo"), CONSTRAINT "PK_73c2740deb4cbe08c28ac487705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" SERIAL NOT NULL, "data_agenda" date NOT NULL, "hora" text NOT NULL, "id_paciente" integer NOT NULL, "id_medico" integer, "id_especialidade" integer, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicos" ("id" SERIAL NOT NULL, "nome_completo" text NOT NULL, "uf" text NOT NULL, "numero_crm" integer NOT NULL, CONSTRAINT "UQ_d3ad6e2537b8011bbbd898a02e6" UNIQUE ("numero_crm"), CONSTRAINT "PK_f16d578e9fd6df731d5e8551725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_d0ffd928fc79616875dd748011e" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_08fd3837adfecaace338dadc82b" FOREIGN KEY ("id_especialidade") REFERENCES "especialidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_08fd3837adfecaace338dadc82b"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_d0ffd928fc79616875dd748011e"`);
        await queryRunner.query(`DROP TABLE "medicos"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "especialidades"`);
    }

}
