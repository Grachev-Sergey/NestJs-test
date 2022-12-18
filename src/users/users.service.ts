import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from 'src/db/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserEmailDto } from './dto/updateUserEmai.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;
    // const checkUniq = await this.userRepository.findOneBy({ email });
    // if (checkUniq) {
    //   throw customError(StatusCodes.BAD_REQUEST, errorsMessage.EMAIL_USED);
    // }
    const user = new User();
    user.email = email;
    user.password = password;
    user.password = bcrypt.hashSync(password, 5);
    await this.userRepository.save(user);
    // const token = generateToken(user.id);
    delete user.password;
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    // if (!user) {
    //   throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    // }

    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.remove(user);
  }

  async updateUserEmail(dto: updateUserEmailDto): Promise<User> {
    const { newEmail, id } = dto;
    const user = await this.userRepository.findOneBy({ id });

    // if (!user) {
    //   throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    // }

    user.email = newEmail;
    await this.userRepository.save(user);
    return user;
  }
}
