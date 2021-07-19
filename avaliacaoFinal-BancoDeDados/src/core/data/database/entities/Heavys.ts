import { BaseEntity, Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity({name: 'heavys' })
export class Heavys extends BaseEntity {

    @PrimaryColumn({name: 'uid'})
    heavyUID?: string; 

    @Column()
    description: string;

    @Column()
    detailing: string;

    @Column({name: 'uid_user'})
    uidUsers: string;

    @Column({name: 'created_at'})
    createdAt?: Date;
    
    @Column({name: 'updated_at'})
    updatedAt?: Date;

    @ManyToOne(type => User, user => user.heavys)
    @JoinColumn({name: 'uid_user', referencedColumnName:'uid'}) 
    user?: User; 
    
   constructor(description: string, detailing: string, uidUsers: string, heavyUID?: string, createdAt?: Date, updatedAt?: Date) {
        super(); 
        this.description = description;
        this.detailing = detailing;
        this.uidUsers = uidUsers;
        this.heavyUID = heavyUID;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    } 

    @BeforeInsert()
    private beforeInsert() {
        this.heavyUID = this.heavyUID ? this.heavyUID : uuid();
        this. createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this. updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}
