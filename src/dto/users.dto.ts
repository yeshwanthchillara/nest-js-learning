import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
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
  @IsString()
  email!: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserRoles, {
    message: 'Role must be either admin or user',
  })
  role?: UserRoles;
}
