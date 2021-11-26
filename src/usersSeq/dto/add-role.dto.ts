import { IsString, IsNumber } from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Needs to be a string'})
    readonly value: string;

    @IsString({message: 'Needs to be a string'})
    readonly userId: number;
}