import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show an user.', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await showProfile.execute({
      user_id: id,
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to show an non existent user.', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
