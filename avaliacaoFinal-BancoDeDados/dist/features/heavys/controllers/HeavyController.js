"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Heavys_1 = require("../../../core/data/database/entities/Heavys");
class HeavyController {
    async index(request, response) {
        try {
            const { uid } = request.params;
            const heavys = await Heavys_1.Heavys.find({ uid });
            return response.send(heavys);
        }
        catch (error) {
            console.log('error to acess users:', error);
        }
    }
    async show(request, response) {
        try {
            const { uid, heavyUID } = request.params;
            const heavys = await Heavys_1.Heavys.find({ uid, heavyUID });
            return response.send(heavys);
        }
        catch (error) {
            console.log('error to seek heavy', error);
        }
    }
    async store(request, response) {
        try {
            const { uid } = request.params;
            const { description, detalhamento } = request.body;
            const heavy = await new Heavys_1.Heavys(description, detalhamento, uid).save();
            return response.send(heavy);
        }
        catch (error) {
            console.log('error to save heavy', error);
        }
    }
    async update(request, response) {
        try {
            const { uid } = request.params;
            const { description, detalhamento } = request.body;
            const heavy = await Heavys_1.Heavys.findOne(uid);
            if (heavy) {
                heavy.description = description;
                heavy.detalhamento = detalhamento;
                heavy.save();
            }
            return response.json(heavy);
        }
        catch (error) {
            console.log('error to edit heavy:', error);
        }
    }
    async delete(request, response) {
        try {
            const { heavyUID } = request.params;
            await Heavys_1.Heavys.delete(heavyUID);
            return response.sendStatus(204);
        }
        catch (error) {
            console.log('error to delete heavy', error);
        }
    }
}
exports.default = HeavyController;
;
