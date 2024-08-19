import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Put,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private jwtService: JwtService
	) {}

	@Post('register')
	async register(
		@Body('email') email: string,
		@Body('password') password: string
	) {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await this.appService.createUser({
			email,
			password: hashedPassword
		});

		delete user.password;

		return user;
	}

	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string,
		@Res({ passthrough: true }) response: Response
	) {
		const user = await this.appService.findOne({ email: email });

		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new BadRequestException('Invalid credentials');
		}

		const jwt = await this.jwtService.signAsync({ id: user.id });

		response.cookie('jwt', jwt, { httpOnly: true });

		return {
			message: 'success'
		};
	}

	@Get('user')
	async user(@Req() request: Request) {
		try {
			const cookie = request.cookies['jwt'];

			const data = await this.jwtService.verifyAsync(cookie);

			if (!data) {
				throw new UnauthorizedException();
			}

			const user = await this.appService.findOne({ id: data['id'] });

			const { password, ...result } = user;

			return result;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt');

		return {
			message: 'success'
		};
	}

	@Get('posts')
	async getPosts(@Req() request: Request) {
		try {
			const posts = await this.appService.getAllPosts();

			return posts;
		} catch (e) {
			throw new BadRequestException();
		}
	}

	@Post('posts/create')
	async createPost(
		@Req() request: Request,
		@Body('header') header: string,
		@Body('text') text: string
	) {
		try {
			const cookie = request.cookies['jwt'];

			const data = await this.jwtService.verifyAsync(cookie);

			const user = await this.appService.findOne({ id: data['id'] });

			const post = await this.appService.createPost({
				header,
				text,
				authorId: user.id
			});

			return post;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	@Put('posts/update')
	async updatePost(
		@Req() request: Request,
		@Body('id') id: number,
		@Body('header') header: string,
		@Body('text') text: string
	) {
		try {
			const cookie = request.cookies['jwt'];

			const data = await this.jwtService.verifyAsync(cookie);

			const user = await this.appService.findOne({ id: data['id'] });

			const post = await this.appService.getPostById({ id: id });

			if (!post) {
				throw new BadRequestException();
			}

			if (post.authorId != user.id) {
				throw new UnauthorizedException();
			}

			const updatedPost = await this.appService.updatePost({
				id,
				header,
				text,
				authorId: user.id
			});

			return updatedPost;
		} catch (e) {
			return {
				message: e.message
			};
		}
	}

	@Delete('posts/delete')
	async deletePost(@Req() request: Request, @Body('id') id: number) {
		try {
			const cookie = request.cookies['jwt'];

			const data = await this.jwtService.verifyAsync(cookie);

			const user = await this.appService.findOne({ id: data['id'] });

			const post = await this.appService.getPostById({ id: id });

			if (post.authorId != user.id) {
				throw new UnauthorizedException();
			}

			await this.appService.deletePost(post.id);

			return {
				message: 'post is deleted'
			};
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
