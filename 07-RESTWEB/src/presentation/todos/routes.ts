import { Router } from "express";
import { TodosController } from "./controller";
import { get } from 'env-var';

export class TodoRoutes{

    static get routes():Router{
        const router = Router();
        const todosController = new TodosController();

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        



        return router;
    }


}