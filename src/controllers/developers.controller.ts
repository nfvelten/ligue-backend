import { NextFunction, Request, Response } from 'express';
import { Developer } from '@prisma/client';
import { CreateDeveloperDto } from '@/dtos/developers.dto';
import { DeveloperService } from '@/services/developers.service';

class DevelopersController {
  public developerService = new DeveloperService();

  public getDevelopers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDevelopersData: Developer[] = await this.developerService.findAllDevelopers();

      res.status(200).json(findAllDevelopersData);
    } catch (error) {
      next(error);
    }
  };

  public filterDevelopers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filter = req.query;
      const filterDevelopers: Developer[] = await this.developerService.filterDevelopers(filter);
      res.status(200).json(filterDevelopers);
    } catch (error) {
      next(error);
    }
  };

  public getDeveloperById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const developerId = String(req.params.id);
      const findOneDeveloperData: Developer = await this.developerService.findDeveloperById(developerId);

      res.status(200).json(findOneDeveloperData);
    } catch (error) {
      next(error);
    }
  };

  public createDeveloper = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const developerData: CreateDeveloperDto = req.body;
      const createDeveloperData: Developer = await this.developerService.createDeveloper(developerData);

      res.status(201).json(createDeveloperData);
    } catch (error) {
      next(error);
    }
  };

  public updateDeveloper = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const developerId = String(req.params.id);
      const developerData: CreateDeveloperDto = req.body;
      const updateDeveloperData: Developer = await this.developerService.updateDeveloper(developerId, developerData);

      res.status(200).json(updateDeveloperData);
    } catch (error) {
      next(error);
    }
  };

  public deleteDeveloper = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const developerId = String(req.params.id);
      const deleteDeveloperData: Developer = await this.developerService.deleteDeveloper(developerId);

      res.status(200).json(deleteDeveloperData);
    } catch (error) {
      next(error);
    }
  };
}

export { DevelopersController };
