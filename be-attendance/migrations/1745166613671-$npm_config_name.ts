import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1745166613671 implements MigrationInterface {
    name = ' $npmConfigName1745166613671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("employee_id" SERIAL NOT NULL, "employee_code" character varying NOT NULL, "employee_name" character varying NOT NULL, CONSTRAINT "UQ_56162b5f24af743a154680684f5" UNIQUE ("employee_code"), CONSTRAINT "PK_c9a09b8e6588fb4d3c9051c8937" PRIMARY KEY ("employee_id"))`);
        await queryRunner.query(`CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "attendance_date" date NOT NULL, "attendance_type" "public"."attendances_attendance_type_enum" NOT NULL, "attendance_time" TIME NOT NULL, "employee_id" integer, "outlet_id" integer, CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "outlets" ("outlet_id" SERIAL NOT NULL, "outlet_code" character varying NOT NULL, "outlet_name" character varying NOT NULL, CONSTRAINT "UQ_b3dc9ca1f459505130ddbcab22e" UNIQUE ("outlet_code"), CONSTRAINT "PK_49cc5c13c3f3c1a12052d13b261" PRIMARY KEY ("outlet_id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_43dca8b4751d7449a38b583991c" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_55ef9ce79c6e7cf79ed4735992f" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("outlet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_55ef9ce79c6e7cf79ed4735992f"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_43dca8b4751d7449a38b583991c"`);
        await queryRunner.query(`DROP TABLE "outlets"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
