import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Does',
      email: 'johndoe@example2.com',
    });

    expect(updatedUser.name).toBe('John Does');
    expect(updatedUser.email).toBe('johndoe@example2.com');
  });

  it("should not be able to update the profile if user doesn't exist.", async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existent-user',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile and keep the same email.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Does',
      email: 'johndoe@example.com',
    });

    expect(updatedUser.name).toBe('John Does');
  });

  it('should not be able to update the profile with an email in use.', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'correct_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Does',
      email: 'johndoe@example.com',
      old_password: 'correct_password',
      password: 'new_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('should not be able to update the password without old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'correct_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Does',
        email: 'johndoe@example.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'correct_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Does',
        email: 'johndoe@example.com',
        old_password: 'incorrect_password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
