"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HeavyController_1 = __importDefault(require("../controllers/HeavyController"));
class HeavyRoutes {
    init() {
        const routes = express_1.Router();
        const controller = new HeavyController_1.default();
        routes.get('/user/:uid/heavy', controller.index);
        routes.get('/user/:uid/heavy/:heavyUID', controller.show);
        routes.post('/user/:uid/heavy', controller.store);
        routes.put('/user/:uid/heavy/:heavyUID', controller.update);
        routes.delete('/user/:uid/heavy/:heavyUID', controller.delete);
        return routes;
    }
}
exports.default = HeavyRoutes;
;
