import { BaseEntity, Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Heavys } from "./Heavys";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    @PrimaryColumn()
    uid?: string;

    @Column()
    login!: string;

    @Column()
    password!: string;
    
    @Column({ name: 'created_at' })
    createdAt?: Date;

    @Column({ name: 'updated_at' })
    updatedAt?: Date;

    @OneToMany(type => Heavys, heavys => heavys.user)
    heavys?: Heavys[];

    constructor(login: string, password: string, uid?: string, createdAt?: Date, updatedAt?: Date) {
        super();
            this.login = login;
            this.password = password;
            this.uid = uid;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }

    @BeforeInsert()
    private beforeInsert() {
        this.uid = this.uid ? this.uid : uuid();
        this.createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this.updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}


