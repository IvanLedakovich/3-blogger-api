import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';

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
			entities: [User],
			synchronize: true
		}),
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: 'secret',
			signOptions: { expiresIn: '30d' }
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
