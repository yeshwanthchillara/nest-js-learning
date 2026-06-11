import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, LoginUserDto } from '../dto/users.dto';
import { UserRoles } from '../types/user.enum';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const username = createUserDto.username.trim().toLowerCase();
    const email = createUserDto.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const saltRounds = 12;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: createUserDto?.role ?? UserRoles.USER,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      role: savedUser.role,
    };
  }

  async login(loginDto: LoginUserDto): Promise<{
    username: string;
    id: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const username = loginDto.username.trim().toLowerCase();
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload: Record<string, unknown> = {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      email: user.email,
    };
    const jwtSecret = authConfig().jwtSecret;
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT secret not configured');
    }

    const accessToken = sign(payload, jwtSecret, {
      expiresIn: '15m',
    });

    const refreshToken = sign({ username: user.username }, jwtSecret, {
      expiresIn: '12h',
    });

    return {
      id: user.id,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }
}
