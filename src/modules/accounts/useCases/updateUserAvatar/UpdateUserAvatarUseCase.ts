// Adicionar coluna avatar na tabela de users tabela
// Configuração upload multer
// Refatorar usuario com coluna avatar
// criar regra de negocio do upload

import { inject, injectable } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
