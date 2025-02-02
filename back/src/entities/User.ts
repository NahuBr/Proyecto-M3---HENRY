import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"

@Entity({
    name:"users"
})
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:100
    })
    name:string

    @Column({
        length:100
    })
    email:string

    @OneToOne(()=>Credential)
    @JoinColumn()
    credential:Credential

    @Column()
    points:number

    @Column()
    admin:boolean
}