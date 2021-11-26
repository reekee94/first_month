import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: any,
        private roleService: RolesService) {
         
    }

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto)
            const role = await this.roleService.getRoleByValue('ADMIN')
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll( {include: {all: true}} )
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Role or User not found', HttpStatus.NOT_FOUND)

    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason
        await user.save()
        return user

    }
}