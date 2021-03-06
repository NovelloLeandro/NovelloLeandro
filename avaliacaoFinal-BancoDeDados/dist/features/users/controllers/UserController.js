"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../core/data/database/entities/User"); // aqui precisava serem importadas essas duas entities
const Heavys_1 = require("../../../core/data/database/entities/Heavys");
class UserController {
    async index(request, response) {
        try {
            const users = await User_1.User.find();
            if (!users) {
                return await response.status(400).json({
                    mensagem: "Ainda não foi criado nenhum usuário."
                });
            }
            return response.json(users);
        }
        catch (error) {
            console.log('ERRO AO ACESSAR USUARIOS:', error);
        }
    }
    async show(request, response) {
        try {
            const { userUID } = request.params;
            const user = await User_1.User.findOne(userUID);
            return response.json(user);
        }
        catch (error) {
            console.log('ERRO AO PROCURAR POR USER', error);
        }
    }
    async store(request, response) {
        try {
            const { login, password } = request.body;
            const user = await new User_1.User(login, password).save();
            return response.json(user);
        }
        catch (error) {
            console.log('ERRO AO SALVAR USUARIO:', error);
        }
    }
    async update(request, response) {
        try {
            const { userUID } = request.params;
            const { login, password } = request.body;
            const user = await User_1.User.findOne(userUID);
            if (user) {
                user.login = login;
                user.password = password;
                user.save();
            }
            return response.send(user);
        }
        catch (error) {
            console.log('ERRO AO ATUALIZAR USUARIO', error);
        }
    }
    async delete(request, response) {
        try {
            const { uid } = request.params;
            await Heavys_1.Heavys.delete({ uid: uid });
            await User_1.User.delete(uid);
            return response.sendStatus(204);
        }
        catch (error) {
            console.log('ERRO AO DELETAR USUARIO', error);
        }
    }
}
exports.default = UserController;
