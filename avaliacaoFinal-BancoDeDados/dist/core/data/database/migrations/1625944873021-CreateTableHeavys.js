"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableHeavys1625944873021 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableHeavys1625944873021 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: 'detalhamento',
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
                new typeorm_1.TableForeignKey({
                    columnNames: ['uid_user'],
                    referencedColumnNames: ['uid'],
                    referencedTableName: 'users'
                })
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('heavys', true, true, true);
    }
}
exports.CreateTableHeavys1625944873021 = CreateTableHeavys1625944873021;
