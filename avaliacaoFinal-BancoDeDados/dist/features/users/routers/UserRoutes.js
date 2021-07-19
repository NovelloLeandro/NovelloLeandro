"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes {
    init() {
        const routes = express_1.Router();
        const controller = new UserController_1.default();
        routes.get('/user', controller.index);
        routes.get('/user/:uid', controller.show);
        routes.post('/user', controller.store);
        routes.put('/user/:uid', controller.update);
        routes.delete('/user/:uid', controller.delete);
        return routes;
    }
}
exports.default = UserRoutes;
;
