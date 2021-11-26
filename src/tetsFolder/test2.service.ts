import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from "../users/users.model";
import {CreateUserDto} from "../users/dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from '../users/dto/ban-user.dto';
import { AddRoleDto } from '../users/dto/add-role.dto';

@Injectable()
export class TestService2 {
    title = 'Trying something new'
    constructor() {}

    async testMethod2() {
        try {
           return "2"
        } catch (err) {
            console.log(err);
        }
    }

    async sayHello() {
        return 'HELLO from TestService2'
    }


}