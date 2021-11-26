import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from "../users/users.model";
import {CreateUserDto} from "../users/dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from '../users/dto/ban-user.dto';
import { AddRoleDto } from '../users/dto/add-role.dto';
import { TestService2 } from './test2.service';

@Injectable()
export class TestService {

    constructor(private testService2: TestService2) {}

    async testMethod() {
        try {
           return "1"
        } catch (err) {
            console.log(err);
        }
    }

    async testParentMethod() {
        return this.testService2.testMethod2();
    }

    async sayHello () {
        return this.testService2.sayHello();
    }
}
