import { Request, Response } from 'express';
import { create } from 'domain';
import { text } from 'stream/consumers';

const todos =[
    {id:1,text: 'Buy Milk', completedAt: new Date()},
    {id:2,text: 'Buy Bread', completedAt: null},
    {id:3,text: 'Buy Butter', completedAt: new Date()},         
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

    public createTodo = (req: Request , res: Response) => {
        const {text} = req.body;
        if (!text) return res.status(400).json({message: 'Text is required'});
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }
        todos.push(newTodo);
        res.json(newTodo);
    }

    public updateTodo = (req: Request , res: Response) => {
        const id = +req.params.id;
        const {text, completedAt} = req.body;

        if (isNaN(+id)) return res.status(400).json({message: 'Invalid ID'});
        // if (!text) return res.status(400).json({message: 'Text is required'});
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({message: 'Todo not found'});
        
        todo.text = text || todo.text;

        (completedAt === null)
            ? todo.completedAt = null
            : todo.completedAt = new Date(); 

        res.json(todo);
    }

    public deleteTodo = (req: Request , res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({message:'Invalid ID'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({message: 'Todo not found'});

        todos.splice(todos.findIndex(todo => todo.id === id),1);
        
        res.json({message:`TODO with ID ${id} has been eliminated`});
    }


}