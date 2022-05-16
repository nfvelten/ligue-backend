import { App } from '@/app';
import { IndexRoute } from '@routes/index.route';
import { DevelopersRoute } from '@/routes/developers.route';
import { validateEnv } from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new DevelopersRoute()]);

app.listen();
