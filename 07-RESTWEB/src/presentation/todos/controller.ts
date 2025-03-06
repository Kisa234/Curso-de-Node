import { Request, Response } from 'express';

const todos =[
    {id:1,text: 'Buy Milk', created_at: new Date()},
    {id:2,text: 'Buy Bread', created_at: new Date()},
    {id:3,text: 'Buy Butter', created_at: new Date()},         
]


export class TodosController {
    
    // DI
    constructor() {
        
    }

    public getTodos = (req: Request , res: Response) => {
        try{
            if (todos.length === 0) {
                res.status(404).json({message: 'No todos found'});
            }
            res.json(todos);
        }catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    public getTodoById = (req: Request , res: Response) => {
        try{
            const id = +req.params.id;
            if (isNaN(id))  return res.status(400).json({message: 'Invalid ID'});
            

            const todo = todos.find(todo => todo.id === id);

            (todo)
            ? res.json(todo)
            : res.status(404).json({message: 'Todo not found'});

        }catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

}