import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
	@IsNotEmpty()
	@IsInt()
	id: number;

	@IsNotEmpty()
	header: string;

	text: string;
}
