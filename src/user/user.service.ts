import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createUserDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	) {}
	async createUser(data: CreateUserDto): Promise<User> {
		// return {
		// 	email: data.email,
		// 	password: data.password,
		// 	id: 0
		// };
		return this.userRepository.save(data);
	}

	async findOne(condition: any): Promise<User> {
		return this.userRepository.findOne({ where: [condition] });
	}
}
