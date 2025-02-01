import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

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

    @Column({
        length:20
    })
    birthdate:string

    @Column("integer")
    nDni:number

    @OneToOne(()=>Credential)
    @JoinColumn()
    credential:Credential

    @OneToMany(()=>Appointment,(appointment=>appointment.user))
    appointments:Appointment[]

    @Column({ type: 'varchar', nullable: true })
    profilePicture: string | null;
}