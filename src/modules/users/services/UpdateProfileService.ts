import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse && emailAlreadyInUse.id !== user.id)
      throw new AppError('Email already in use.');

    Object.assign(user, {
      name,
      email,
    });

    if (password && !old_password)
      throw new AppError('Old password must be informed.');

    if (old_password) {
      const oldPasswordMatchs = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordMatchs) throw new AppError("Old password doesn't match.");
    }

    if (password)
      user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}
