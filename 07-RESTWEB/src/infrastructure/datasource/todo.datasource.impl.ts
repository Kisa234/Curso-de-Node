import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource{

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(todo);
        
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }
    async getById(id: number): Promise<TodoEntity> {
        const todos = await prisma.todo.findFirst({where: {id: id}});
        if (!todos) throw Error(`Todo with id ${id} not found`);
        return TodoEntity.fromObject(todos);

    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.getById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: todo.id},
            data: updateTodoDto!.values
        });
        return TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await this.getById(id);
        const deletedTodo = await prisma.todo.delete({
            where: { id: id}
        });
        return TodoEntity.fromObject(deletedTodo);
    }

}