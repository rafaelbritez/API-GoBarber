import { Router } from 'express'; // this tool from express is used to separate code from our application into routes
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import authMidlewares from './app/middlewares/auth';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // rota do tipo post (criar) para users
routes.post('/sessions', SessionController.store); // Rotas de criação de usuario não passaram pelo nosso authmidleware pois é uma função usada depois da criação

routes.use(authMidlewares); // Agora todas as rotas declaradas abaixo precisara fazer autenticação de middlewares

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index); // Rota de prestadores de serviços

routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);

routes.post('/appointments', AppointmentController.store);

routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);

routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
