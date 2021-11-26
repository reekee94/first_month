import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "src/users/user.entity";
import { UserToRole } from "src/roles/user-roles.entity";


@Entity({name: 'posts'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @ManyToOne(() => UserEntity, user => user.posts)
    userId: number;

    @Column({ type: "bytea", "nullable": true })
    imageData: Buffer
}