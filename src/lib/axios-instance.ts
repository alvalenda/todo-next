import { Todo } from "@/types";
import api from "./axios";
import { createTodoAction } from "@/app/_actions";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get("/todo");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const postTodo = async (todo: Pick<Todo, "title">) => {
  try {
    const { data } = await api.post("/todo", todo);
    return data;

    // ! Não sei qual a melhor forma de implementar, se for utilizar serverAction utilize a linha abaixo
    // return = await createTodoAction(todo);
  } catch (error) {
    return error;
  }
};

export const handleTodoDone = async (
  done: boolean,
  todoId: string
): Promise<Todo> => {
  try {
    const response = await api.patch(`/todo/${todoId}/done`, { done });

    return response.data;
  } catch (error) {
    return {} as Todo;
  }
};

export const getTodo = async (todoId: string): Promise<Todo> => {
  try {
    const { data } = await api.get(`/todo/${todoId}`);
    return data;
  } catch (error) {
    return {} as Todo;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    await api.delete(`/todo/${todoId}`);
  } catch (error) {
    return {} as Todo;
  }
};
