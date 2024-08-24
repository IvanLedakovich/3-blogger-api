import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

describe('AppController', () => {
	let appController: AppController;
	let spyService: UserService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, UserService]
		}).compile();

		appController = app.get<AppController>(AppController);
		spyService = app.get<UserService>(UserService);
	});

	describe('createUser', () => {
		it('should call createUser', async () => {
			const email = 'unitTest@gmail.com';
			const password = 'unitTest';
			appController.register({
				email: email,
				password: password
			});

			expect(spyService.createUser).toHaveBeenCalled();
		});
	});

	// describe('getGPA', () => {
	// 	it('should retrieve getGPA for a student', async () => {
	// 		const firstName = 'Joe';
	// 		const secondName = 'Foo';
	// 		expect(spyService.getGpa(firstName, secondName)).toBe(4.5);
	// 	});
	// });
});
