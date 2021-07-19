import express from 'express';
import cors from 'cors';
import Database from '../data/connections/Database';
import UserRoutes from '../../features/users/routers/UserRoutes';
import HeavyRoutes from '../../features/heavys/routers/HeavyRoutes';

export default class App {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    public async init() {
        this.config();
        this.middlewares();
        this.routes();
        await this.database();
    }

    private async database() {
        await new Database().openConnection();
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    }

    private middlewares() {

    }

    private routes() {
        const userRoutes = new UserRoutes().init();
        const heavyRoutes = new HeavyRoutes().init();

        this.#express.use(userRoutes);
        this.#express.use(heavyRoutes);
        this.#express.use(express.static('public'))
    }

    public start(port: any) {
        this.#express.listen(port, () => {
            console.log('API rodando...');
        });
    }
};