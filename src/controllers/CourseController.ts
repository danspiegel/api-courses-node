import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';
import { CourseInterface } from '../interfaces/CourseInterface';

export default class CourseController {

    async findAll(request: Request, response: Response) {
        const service = new CourseService();
        const courses = await service.findAll();
        return response.status(200).json(courses);
    }

    async findById(request: Request, response: Response) {
        const service = new CourseService();
        const { id } = request.params;
        const course = await service.findById(parseInt(id));
        return response.status(200).json(course);
    }

    async insert(request: Request, response: Response) {
        const service = new CourseService();
        const { name, price, category } = request.body;
        const course = await service.insert({ name, price, category } as CourseInterface);
        return response.status(201).json({ status: 201, message: "Curso inserido com sucesso.", course:  course });
    }

    async update(request: Request, response: Response) {
        const service = new CourseService();
        const { id } = request.params;
        const { name, price, category } = request.body;
        const course = await service.update(parseInt(id), { name, price, category } as CourseInterface);
        return response.status(200).json({ status: 200, message: "Curso atualizado com sucesso.", course:  course });
    }

    async delete(request: Request, response: Response) {
        const service = new CourseService();
        const { id } = request.params;
        await service.delete(parseInt(id));
        return response.status(200).json({ status: 200, message: "Curso excluído com sucesso."});
    }

}