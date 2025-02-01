import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Status } from "../dto/statusDto"
import { User } from "./User"

@Entity()
export class Appointment{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:100
    })
    date:string

    @Column({
        length:100
    })
    time:string

    @ManyToOne(()=>User,(user=>user.appointments))
    user:User
    @Column()
    status:Status
}