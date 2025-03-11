import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCase {
    exectute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    exectute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }


}