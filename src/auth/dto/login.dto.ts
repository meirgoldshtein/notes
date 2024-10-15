import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class Login{

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}