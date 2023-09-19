import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    releaseDate: Date;

    @ManyToOne(()=> User, (user) => user.reports)
    user: User;
}
