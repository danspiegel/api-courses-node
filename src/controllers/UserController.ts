import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export default class UserController {

    async login(request: Request, response: Response) {
        const { username, password } = request.body;
        const userService = new UserService();
        const token = await userService.login(username, password);
        return response.status(200).json({ status: 200, message: 'Login realizado com sucesso', token: token });
    }

    async register(request: Request, response: Response) {
        const { username, password } = request.body;
        const userService = new UserService();
        await userService.register(username, password);
        response.status(201).json({ status: 201, message: 'Usuário criado com sucesso.' });
    }
}