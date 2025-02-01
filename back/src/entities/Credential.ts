import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Credential{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:20
    })
    username:string

    @Column({
        length:20
    })
    password:string
}