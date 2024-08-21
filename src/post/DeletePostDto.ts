import { IsInt, IsNotEmpty } from 'class-validator';

export class DeletePostDto {
	@IsNotEmpty()
	@IsInt()
	id: number;
}
