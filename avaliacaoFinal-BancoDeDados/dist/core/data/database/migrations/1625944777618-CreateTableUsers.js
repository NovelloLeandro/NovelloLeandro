"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1625944777618 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1625944777618 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'uid',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'login',
                    type: 'varchar',
                    length: '100',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '100',
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
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users', true, true, true);
    }
}
exports.CreateTableUsers1625944777618 = CreateTableUsers1625944777618;
