import { PrismaClient, Developer } from '@prisma/client';
import { CreateDeveloperDto } from '@/dtos/developers.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DeveloperService {
  public developers = new PrismaClient().developer;

  public async findAllDevelopers(): Promise<Developer[]> {
    const allDevelopers: Developer[] = await this.developers.findMany();
    return allDevelopers;
  }

  public async filterDevelopers(filter): Promise<Developer[]> {
    console.log(filter.skip);
    const filteredUsers: Developer[] = await this.developers.findMany({ where: filter });
    return filteredUsers;
  }

  public async findDeveloperById(developerId: string): Promise<Developer> {
    if (isEmpty(developerId)) throw new HttpException(400, 'wrong id');

    const findDeveloper: Developer = await this.developers.findUnique({ where: { id: developerId } });
    if (!findDeveloper) throw new HttpException(409, 'developer not found');

    return findDeveloper;
  }

  public async createDeveloper(developerData: CreateDeveloperDto): Promise<Developer> {
    if (isEmpty(developerData)) throw new HttpException(400, "You're not developerData");

    const createDeveloperData: Developer = await this.developers.create({ data: { ...developerData } });
    return createDeveloperData;
  }

  public async updateDeveloper(developerId: string, developerData: CreateDeveloperDto): Promise<Developer> {
    if (isEmpty(developerData)) throw new HttpException(400, "You're not developerData");

    const findDeveloper: Developer = await this.developers.findUnique({ where: { id: developerId } });
    if (!findDeveloper) throw new HttpException(409, "You're not developer");

    const updateDeveloperData = await this.developers.update({ where: { id: developerId }, data: { ...developerData } });
    return updateDeveloperData;
  }

  public async deleteDeveloper(developerId: string): Promise<Developer> {
    if (isEmpty(developerId)) throw new HttpException(400, "You're not developerId");

    const findDeveloper: Developer = await this.developers.findUnique({ where: { id: developerId } });
    if (!findDeveloper) throw new HttpException(409, "You're not developer");

    const deleteDeveloperData = await this.developers.delete({ where: { id: developerId } });
    return deleteDeveloperData;
  }
}

export { DeveloperService };
