import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Post } from './post/post.entity';
import { CreateUserDto } from './user/createUserDto';
import { User } from './user/user.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(Post) private readonly postRepository: Repository<Post>
	) {}

	async getAllPosts(): Promise<Post[]> {
		return this.postRepository.find({ where: [null] });
	}

	async getPostById(condition: any): Promise<Post> {
		return this.postRepository.findOne({ where: [condition] });
	}

	async createPost(data: any): Promise<Post> {
		return this.postRepository.save(data);
	}

	async updatePost(data: any) {
		this.postRepository.save(data);
	}

	async deletePost(data: any) {
		this.postRepository.delete(data);
	}
}
