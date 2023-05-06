import { CourseInterface } from "../interfaces/CourseInterface";
import { Course } from "../models/Course";


export class CourseService {

    async findAll(): Promise<any[]> {
        const courses = await Course.find({}, [], {sort: {code: 1}});

        if (courses.length === 0) {
            throw new Error("Nenhum registro encontrado.");
        }

        return courses;
    }

    async findById(id: number): Promise<any> {
        const course = await Course.findOne({ code: id });

        if (!course) {
            throw new Error("Ocorreu um erro interno: Não foi localizado o curso com código " + id);
        }

        return course;
    }

    async insert(newCourse: CourseInterface): Promise<any> {
        const courseMax = await Course.findOne({}, 'code -_id').sort({ code: -1 });

        if (!courseMax) {
            newCourse.code = 1;
        } else {
            newCourse.code = courseMax.code + 1;
        }
    
        const course = await Course.create(newCourse);
        return course;
    }

    async update(id: number, course: CourseInterface): Promise<CourseInterface> {
        const current = await this.findById(id);

        const newCourse = {} as CourseInterface;

        if (course.name) newCourse.name = course.name;

        if (course.price) newCourse.price = course.price;

        if (course.category) newCourse.category = course.category;

        await Course.findByIdAndUpdate(current._id, newCourse);

        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const course = await this.findById(id);

        await Course.findByIdAndDelete(course._id);
    }

}