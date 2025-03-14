import { Request, Response } from 'express';
import { CreateTodoDto } from '../../domain/dtos/index';
import { UpdateTodoDto } from '../../domain/dtos/index';
import {CreateTodo, GetTodo, GetTodos, DeleteTodo,  UpdateTodo, TodoRepository } from '../../domain';

const todos =[
    {id:1,text: 'Buy Milk', completedAt: new Date()},
    {id:2,text: 'Buy Bread', completedAt: null},
    {id:3,text: 'Buy Butter', completedAt: new Date()},         
]


export class TodosController {
    
    // DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getTodos =  (req: Request , res: Response) => {
        new GetTodos(this.todoRepository)
            .exectute()
            .then(todos => res.json(todos))
            .catch(error => res.status(404).json({error}));
    }

    public getTodoById = (req: Request , res: Response) => {
        new GetTodo(this.todoRepository)
            .exectute(+req.params.id)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json({error}));

    }

    public createTodo = async (req: Request , res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error) return res.status(400).json({error});
        
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));

    }

    public updateTodo = async(req: Request , res: Response) => {
        const id = +req.params.id;
        const [error,updateTodoDto] = UpdateTodoDto.update({...req.body,id})
        if (error) return res.status(400).json({error});    
        
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));
    }

    public deleteTodo = async (req: Request , res: Response) => {
        const id = +req.params.id;
        
        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));
    }
}