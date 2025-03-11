import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
    exectute(id:number): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    exectute(id:number): Promise<TodoEntity> {
        return this.repository.getById(id);
    }


}