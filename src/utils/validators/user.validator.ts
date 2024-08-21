import { validate } from 'class-validator';
import { User } from 'src/user/user.entity';

export async function validateUser(user: User): Promise<string[]> {
	const errors = await validate(user);
	return errors.map((error) => Object.values(error.constraints || {})).flat();
}
