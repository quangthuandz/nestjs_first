import { UserSubject } from "src/jointable/user-subject.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, (user) => user.subjects, {
        
    })
    users: User[]

    @OneToMany(() => UserSubject, userSubject => userSubject.subject)
    public userSubject: UserSubject[];
}
