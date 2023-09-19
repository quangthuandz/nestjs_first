
import { Subject } from "src/subjects/subject.entity" 
import { User } from "src/users/user.entity"
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserSubject {
    
    @PrimaryGeneratedColumn()
    public userSubjectId: number;

    @ManyToOne(() => User, (user) => user.userSubject,{
        cascade: true,
    })
    public user: User

    @ManyToOne(() => Subject, (subject) => subject.userSubject,{
        cascade: true,
    })
    public subject: Subject

    @Column()
    score: number;
    userSubject: Promise<User>;
}