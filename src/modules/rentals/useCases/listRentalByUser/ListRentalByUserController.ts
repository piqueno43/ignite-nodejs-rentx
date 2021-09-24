import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const rentalByUser = await listRentalByUserUseCase.execute(id);

    return response.json(rentalByUser);
  }
}

export { ListRentalByUserController };
