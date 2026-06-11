import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from '../types/user.enum';

export class UserDto {
  @IsUUID('4', {
    message: 'Invalid UUID format',
  })
  id!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class CreateUserDto {
  @IsString({
    message: 'Username must be a string',
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  @MinLength(6, {
    message: 'Username must be at least 6 characters',
  })
  @MaxLength(20, {
    message: 'Username cannot exceed 20 characters',
  })
  username!: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email!: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Invalid Password format',
  })
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserRoles, {
    message: 'Role must be either admin or user',
  })
  role?: UserRoles;
}

export class LoginUserDto {
  @IsString({
    message: 'Username must be a string',
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  @MinLength(6, {
    message: 'Username must be at least 6 characters',
  })
  @MaxLength(20, {
    message: 'Username cannot exceed 20 characters',
  })
  username!: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Invalid Password format',
  })
  password!: string;
}
