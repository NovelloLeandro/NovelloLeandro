import { Request, Response } from 'express';
import { User } from '../../../core/data/database/entities/User'; 
import { Heavys } from '../../../core/data/database/entities/Heavys';

export default class UserController {
    
    public async index(request: Request, response: Response) {
        try {
            const users = await User.find();

            if (!users) {
                return await response.status(400).json({
                    mensagem: "Ainda não foi criado nenhum usuário."
                });
            }        

            return response.json(users);
        } catch (error) {
            console.log('ERRO AO ACESSAR USUARIOS:', error);
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { uidUsers } = request.params;
            const user = await User.findOne(uidUsers);

            return response.json(user);
        } catch (error) {
            console.log('ERRO AO PROCURAR POR USER', error);
        }
    }

    public async store(request: Request, response: Response) {
        try {
            const { login, password } = request.body;
            
            const user = await new User(login, password).save();

            return response.json(user);
        } catch (error) {
            console.log('ERRO AO SALVAR USUARIO:', error);
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const { uidUsers } = request.params;
            const { login, password } = request.body;
            
            const user = await User.findOne(uidUsers);

            if (user) {
                user.login = login;
                user.password = password;
                user.save();
            }

            return response.send(user);
        } catch (error) {
            console.log('ERRO AO ATUALIZAR USUARIO', error);
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            const { uidUsers } = request.params;

            await Heavys.delete({uidUsers: uidUsers});
            await User.delete(uidUsers);

            return response.sendStatus(204);
        } catch (error) {
            console.log('ERRO AO DELETAR USUARIO', error);
        }
    }
}

function uid(uid: any) {
    throw new Error('Function not implemented.');
}
