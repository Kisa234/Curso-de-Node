import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRespositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';

export class TodoRoutes{

    static get routes():Router{
        const router = Router();

        const datasource = new TodoDatasourceImpl();
        const todorepository = new TodoRespositoryImpl(datasource);
        const todosController = new TodosController(todorepository);

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id',todosController.deleteTodo);


        return router;
    }


}