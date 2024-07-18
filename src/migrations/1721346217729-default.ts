import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721346217729 implements MigrationInterface {
    name = 'Default1721346217729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" SERIAL NOT NULL, "nome_completo" text NOT NULL, "cpf" text NOT NULL, "numero_carteirinha" text NOT NULL, CONSTRAINT "UQ_d6737b831d4e311678dfce056b6" UNIQUE ("cpf"), CONSTRAINT "UQ_c01a0528f046f619a29cdbf3bb5" UNIQUE ("numero_carteirinha"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medico_especialidades" ("especialidade_id" integer NOT NULL, "medico_id" integer NOT NULL, CONSTRAINT "PK_44294d72101623ab96a9ada6d7b" PRIMARY KEY ("especialidade_id", "medico_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ffb3ae59d99c3bd4fc141b206" ON "medico_especialidades" ("especialidade_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_61e3481a47d1785f1bd4a19f7d" ON "medico_especialidades" ("medico_id") `);
        await queryRunner.query(`ALTER TABLE "agendamentos" ALTER COLUMN "id_paciente" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_c5bd7a27a546af30cd566d48b51" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medico_especialidades" ADD CONSTRAINT "FK_1ffb3ae59d99c3bd4fc141b2069" FOREIGN KEY ("especialidade_id") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "medico_especialidades" ADD CONSTRAINT "FK_61e3481a47d1785f1bd4a19f7df" FOREIGN KEY ("medico_id") REFERENCES "especialidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medico_especialidades" DROP CONSTRAINT "FK_61e3481a47d1785f1bd4a19f7df"`);
        await queryRunner.query(`ALTER TABLE "medico_especialidades" DROP CONSTRAINT "FK_1ffb3ae59d99c3bd4fc141b2069"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_c5bd7a27a546af30cd566d48b51"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ALTER COLUMN "id_paciente" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61e3481a47d1785f1bd4a19f7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ffb3ae59d99c3bd4fc141b206"`);
        await queryRunner.query(`DROP TABLE "medico_especialidades"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
    }

}
