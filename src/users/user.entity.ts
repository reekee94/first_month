
import { RoleEntity } from 'src/roles/roles.entity';
import {
        Column,
        Entity,
        PrimaryGeneratedColumn,
        OneToMany,
        ManyToMany,
        JoinTable,
        CreateDateColumn,
        DeleteDateColumn,
        UpdateDateColumn
    } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength,
    Validate,
  } from 'class-validator';
import { PostEntity } from 'src/posts/posts.entity';

@Entity({ name: 'users' })
export class UserEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column({ unique: true, nullable: false })
    email: string;

    @ApiProperty({ example: 'test1@example.com' })
    @Column({ nullable: false })
    password?: string;

    @Column({ default: false })
    banned?: boolean;

    @Column({ nullable: true })
    banReason: string;

    // @Column()
    // birthDate: string

    @ManyToMany( () => RoleEntity, role => role.users, {eager: true, cascade: true})
    //@JoinTable()
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
          name: 'userId',
          referencedColumnName: 'id'
        },
        inverseJoinColumn: {
          name: 'roleId',
          referencedColumnName: 'id' }  
    })
    roles: RoleEntity[];

    @OneToMany( () => PostEntity, post => post.userId)
    posts: PostEntity[];

    @CreateDateColumn({nullable: true})
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

}