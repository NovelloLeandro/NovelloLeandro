import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableHeavys1625944873021 implements MigrationInterface {
             
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'heavys',
            columns: [
                {
                    name: 'uid',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                },
                {
                    name: 'detailing',
                    type: 'varchar',
                    length: '50',
                    isNullable: false
                },
                {
                    name: 'uid_user', 
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false
                }
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['uid_user'], 
                    referencedColumnNames: ['uid'],
                    referencedTableName: 'users'
                })
            ]
        })); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('heavys', true, true, true);
    }
}

