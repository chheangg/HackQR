import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsEnum, IsAlpha } from "class-validator";

export enum Permissions {
    ADMIN = "ADMIN",
    ORGANIZER = "ORGANIZER",
}

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
        message: "password too weak",
    })
    password: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @IsAlpha()
    firstName: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @IsAlpha()
    lastName: string;

    @IsNotEmpty()
    @IsEnum(Permissions, { each: true })
    role: Permissions[]
}