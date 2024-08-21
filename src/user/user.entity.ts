import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@IsEmail()
	@IsNotEmpty()
	@IsNumber()
	email: string;

	@Column()
	password: string;
}
