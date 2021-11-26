import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './roles.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        await this.roleRepository.save(role);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

}
