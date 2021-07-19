import { Request, Response } from 'express';
// import { User } from '../../../core/data/database/entities/User';
import { Heavys } from '../../../core/data/database/entities/Heavys';

export default class HeavyController {
    public async index(request: Request, response: Response) {
        try {
            const { uidUsers } = request.params;

            const heavys = await Heavys.find({uidUsers});
 
            return response.send(heavys);
        } catch (error) {
            console.log('error to acess users:', error);
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const { uidUsers, heavyUID } = request.params;

            const heavys = await Heavys.find({uidUsers, heavyUID});
 
            return response.send(heavys);
        } catch (error) {
            console.log('error to seek heavy', error)
        }
    }

    public async store(request: Request, response: Response) {
        try {
            const { uidUsers } = request.params;

            const { description, detailing } = request.body;

            const heavy = await new Heavys(description, detailing, uidUsers).save();

            return response.send(heavy);
        } catch (error) {
            console.log('error to save heavy', error);
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const { uid } = request.params;
            const { description, detailing } = request.body;
            const heavy = await Heavys.findOne(uid);

            if (heavy) {
                heavy.description = description;
                heavy.detailing = detailing;
                heavy.save();
            }

            return response.json(heavy);
        } catch (error) {
            console.log('error to edit heavy:', error)
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            const { heavyUID } = request.params;

            await Heavys.delete(heavyUID);

            return response.sendStatus(204);
        } catch (error) {
            console.log('error to delete heavy', error);
        }
    }
};