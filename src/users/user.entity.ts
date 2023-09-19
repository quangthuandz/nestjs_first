import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "src/reports/report.entity";
import { Subject } from "src/subjects/subject.entity";
import { UserSubject } from "src/jointable/user-subject.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ default: 'hn' })
    address: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @ManyToMany(() => Subject, (subject) => subject.users, {
        cascade: true,
    })
    @JoinTable()
    subjects: Subject[]

    @OneToMany(() => UserSubject, userSubject => userSubject.user)
    public userSubject: UserSubject[] ; 

}