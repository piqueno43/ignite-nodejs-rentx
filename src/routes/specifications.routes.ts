// import { Router } from "express";
// import { SpecificationsRepository } from "modules/cars/repositories/SpecificationsRepository";
// // import { CreateSpecificationsService } from "modules/cars/services/CreateSpecificationsService";

// const specificationsRoutes = Router();

// const specificationsRepository = new SpecificationsRepository();

// specificationsRoutes.post("/", (request, response) => {
//   const { name, description } = request.body;
//   const createSpecificationsService = new CreateSpecificationsService(
//     specificationsRepository
//   );
//   createSpecificationsService.execute({ name, description });

//   return response.status(201).send();
// });

// specificationsRoutes.get("/", (request, response) => {
//   const all = specificationsRepository.list();
//   return response.status(201).json(all);
// });

// export { specificationsRoutes };
