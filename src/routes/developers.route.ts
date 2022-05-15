import { Router } from 'express';
import { CreateDeveloperDto } from '@/dtos/developers.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { DevelopersController } from '@/controllers/developers.controller';

class DevelopersRoute implements Routes {
  public path = '/developers';
  public router = Router();
  public developersController = new DevelopersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.developersController.getDevelopers);
    this.router.get(`${this.path}/filter?`, this.developersController.filterDevelopers);
    this.router.get(`${this.path}/:id`, this.developersController.getDeveloperById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDeveloperDto, 'body'), this.developersController.createDeveloper);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateDeveloperDto, 'body', true), this.developersController.updateDeveloper);
    this.router.delete(`${this.path}/:id`, this.developersController.deleteDeveloper);
  }
}

export { DevelopersRoute };
