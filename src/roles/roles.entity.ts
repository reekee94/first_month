import { UserEntity } from "src/users/user.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";

@Entity({ name: 'roles'})
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    description: string;

    @ManyToMany( () => UserEntity, user => user.roles)
    users: UserEntity[]

}