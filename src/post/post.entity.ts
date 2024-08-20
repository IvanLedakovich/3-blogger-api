import { IsInt } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	header: string;

	@Column()
	text: string;

	@Column()
	authorId: number;
}
