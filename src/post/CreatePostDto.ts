import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
	@IsNotEmpty()
	header: string;

	text: string;
}
