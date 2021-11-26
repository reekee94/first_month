import {ApiProperty} from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Unique Email'})
    @IsString({message: 'Needs ro be string'})
    @IsEmail({}, {message: 'Bad email'})
    readonly email: string;

    @ApiProperty({example: '123456', description: 'Password'})
    @IsString({message: 'Needs to be a string'})
    @Length(4, 16, {message: 'min 4, max 16 symbols'})
    readonly password: string;
}