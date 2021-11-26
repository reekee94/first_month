import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./roles.entity";
import { UserEntity } from "src/users/user.entity";

@Entity()
export class UserToRole {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public roleId!: number;

    @Column()
    public userId!: number;

    // @ManyToOne(() => RoleEntity, role => role.id)
    // public role!: RoleEntity;

    // @ManyToOne(() => UserEntity, user => user.id)
    // public user!: UserEntity;
}
