import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {RolesGuard} from "../auth/roles.guard";
import { Roles } from 'src/auth/roles-auth.decorators';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Creating a user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Receiving list of all users'})
    @ApiResponse({status: 200, type: [User]})
    //@UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Set a role'})
    @ApiResponse({status: 200})
    //@UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    //@UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }


}
