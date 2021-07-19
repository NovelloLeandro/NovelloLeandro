import { Router } from "express";
import HeavyController from '../controllers/HeavyController';

export default class HeavyRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new HeavyController();

        routes.get('/user/:heavyUID/heavy', controller.index);
        routes.get('/user/:heavyUID/heavy/:heavyUID', controller.show);
        routes.post('/user/:heavyUID/heavy', controller.store);
        routes.put('/user/:heavyUID/heavy/:heavyUID', controller.update);
        routes.delete('/user/:heavyUID/heavy/:heavyUID', controller.delete);

        return routes;
    }     
};