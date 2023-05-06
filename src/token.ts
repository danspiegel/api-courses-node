import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ status: 401, message: 'Token não fornecido' });
    }

    jwt.verify(token, 'secretKey', (err, decoded: any) => {
        if (err) {
            return response.status(401).json({ status: 401, message: 'Token inválido.' });
        }

        request.userId = decoded.userId;
        next();
    });
};

export default verifyToken;