import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { UserService } from './user/user.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: '3-blogger-api',
			entities: [User, Post],
			synchronize: true
		}),
		TypeOrmModule.forFeature([User]),
		TypeOrmModule.forFeature([Post]),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: process.env.JWT_EXPIRY_TERM }
		})
	],
	controllers: [AppController],
	providers: [AppService, UserService]
})
export class AppModule {}
