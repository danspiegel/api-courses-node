import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.log(error);

    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ status: 400, message: 'Validation fails', errors });
    } else if (error.message.indexOf("Ocorreu um erro interno:") != -1) {
        return response.status(400).json({ status: 400, message: error.message });
    } else if (error.message.indexOf("Nenhum registro encontrado.") != -1) {
        return response.status(200).json({ status: 200, message: error.message });
    }

    return response.status(500).json({ status: 500, message: 'Internal Server Error' });
}

export default errorHandler;