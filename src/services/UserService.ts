import * as bcrypt from 'bcrypt';  
import * as jwt from "jsonwebtoken"
import { User } from '../models/User';

export class UserService {

    async login(username: string, password: string): Promise<string> {
        const user = await User.findOne({ username });
                
        if (!user) {
            throw new Error("Ocorreu um erro interno: Usuário não encontrado.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
                
        if (!isPasswordValid) {
            throw new Error("Ocorreu um erro interno: Senha inválida.");
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey');

        return token;
    }

    async register(username: string, password: string): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });
            await user.save();
        } catch(error) {
            throw new Error("Ocorreu um erro interno: Falha ao criar usuário. " + error.message);
        }
    }

}