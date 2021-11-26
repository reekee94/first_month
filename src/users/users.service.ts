import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { InjectModel } from '@nestjs/sequelize';
//import { User } from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private roleService: RolesService){}

    async createUser(dto: CreateUserDto) {
        try { 
            const role = await this.roleService.getRoleByValue('MODERATOR')
            const newUser = await this.userRepository.create(dto)
            newUser.roles = [role]
            await this.userRepository.save(newUser)

            return newUser;
        } catch (err) {
            console.log(err);
        }
    }

    async updateUser(dto: CreateUserDto) {
        try {
            const {email} = dto
            const user = await this.getUserByEmail(email)
            if(!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            }
            const editedUser = await this.userRepository.update(dto, {email})
            return editedUser
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.find()
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({email})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.getUserByEmail(dto.userEmail);
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            user.roles = [...user.roles, role]
            await this.userRepository.save(user)
            return `User added role "${dto.value}"`
        }
        throw new HttpException('Role or User not found', HttpStatus.NOT_FOUND)

    }

    async ban(dto: BanUserDto) {
        const user = await this.getUserByEmail(dto.userEmail);
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return await this.userRepository.save({...user, banned: true, banReason: dto.banReason})
    }
}
