import request from 'supertest';
import App from '../app';
import DevelopersRoute from '../routes/developers.route';
import { CreateDeveloperDto } from '../dtos/developers.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('[POST] /developers', () => {
  it('response Create developer', async () => {
    const developerData: CreateDeveloperDto = {
      name: 'Albert',
      sex: 'M',
      age: 12,
      hobby: 'Play videogames',
      birthdate: new Date(),
    };

    const developersRoute = new DevelopersRoute();
    const developers = developersRoute.developersController.developerService.developers;

    developers.findUnique = jest.fn().mockReturnValue(null);
    developers.create = jest.fn().mockReturnValue({
      name: 'Albert',
      sex: 'M',
      age: 12,
      hobby: 'Play videogames',
      birthdate: new Date(),
    });

    const app = new App([developersRoute]);
    return request(app.getServer()).post(developersRoute.path).send(developerData).expect(201);
  });
});

describe('Testing Developers', () => {
  describe('[GET] /developers', () => {
    it('response findAll developers', async () => {
      const developersRoute = new DevelopersRoute();
      const developers = developersRoute.developersController.developerService.developers;

      developers.findMany = jest.fn().mockReturnValue([
        {
          name: 'Albert',
          sex: 'M',
          age: 12,
          hobby: 'Play videogames',
          birthdate: new Date(),
        },
        {
          name: 'Alex',
          sex: 'FEM',
          age: 21,
          hobby: 'Watch netflix',
          birthdate: new Date(),
        },
        {
          name: 'Chris',
          sex: 'M',
          age: 22,
          hobby: 'Play videogames',
          birthdate: new Date(),
        },
      ]);

      const app = new App([developersRoute]);
      return request(app.getServer()).get(`${developersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /developers/:id', () => {
    it('response findOne developer', async () => {
      const developerId = 'd8e7b4b4-1035-43f5-aa5a-8d5a7f2bfa99';

      const developersRoute = new DevelopersRoute();
      const developers = developersRoute.developersController.developerService.developers;

      developers.findUnique = jest.fn().mockReturnValue({
        id: developerId,
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: new Date(),
      });

      const app = new App([developersRoute]);
      return request(app.getServer()).get(`${developersRoute.path}/${developerId}`).expect(200);
    });
  });

  describe('[PUT] /developers/:id', () => {
    it('response Update developer', async () => {
      const developerId = 'd8e7b4b4-1035-43f5-aa5a-8d5a7f2bfa99';
      const developerData: CreateDeveloperDto = {
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: new Date(),
      };

      const developersRoute = new DevelopersRoute();
      const developers = developersRoute.developersController.developerService.developers;

      developers.findUnique = jest.fn().mockReturnValue({
        id: developerId,
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: new Date(),
      });
      developers.update = jest.fn().mockReturnValue({
        id: developerId,
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: new Date(),
      });

      const app = new App([developersRoute]);
      return request(app.getServer()).put(`${developersRoute.path}/${developerId}`).send(developerData).expect(200);
    });
  });

  describe('[DELETE] /developers/:id', () => {
    it('response Delete developer', async () => {
      const developerId = 'd8e7b4b4-1035-43f5-aa5a-8d5a7f2bfa99';
      // const developerData: CreateDeveloperDto = {
      //   name: 'Albert',
      //   sex: 'M',
      //   age: 12,
      //   hobby: 'Play videogames',
      //   birthdate: '10/10/2010',
      // };

      const developersRoute = new DevelopersRoute();
      const developers = developersRoute.developersController.developerService.developers;

      developers.findUnique = jest.fn().mockReturnValue({
        id: developerId,
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: '10/10/2010',
      });
      developers.delete = jest.fn().mockReturnValue({
        id: developerId,
        name: 'Albert',
        sex: 'M',
        age: 12,
        hobby: 'Play videogames',
        birthdate: '10/10/2010',
      });

      const app = new App([developersRoute]);
      return request(app.getServer()).delete(`${developersRoute.path}/${developerId}`).expect(200);
    });
  });
});
