import { Router } from 'express';
import CourseController from './controllers/CourseController';
import UserController from './controllers/UserController';
import verifyToken from './token';

const routes = Router();

const courseController = new CourseController();
const userController = new UserController();

routes.get('/courses', verifyToken, courseController.findAll);
routes.get('/courses/:id', verifyToken, courseController.findById);
routes.post('/courses', verifyToken, courseController.insert);
routes.put('/courses/:id', verifyToken, courseController.update);
routes.delete('/courses/:id', verifyToken, courseController.delete);
routes.post('/login', userController.login);
routes.post('/register', userController.register);

export default routes;