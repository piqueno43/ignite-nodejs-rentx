import { request, response, Router } from "express";
import { CategoryRepository } from "repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();
categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoryRepository.list();

  return response.status(201).json(all);
});
export { categoriesRoutes };
