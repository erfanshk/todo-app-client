import BaseApi from "../../../utils/api";
import { Todo, TodoStatus, TodoStatusEnum } from "./todo.slice";

export interface TodosResponse {
  data: Todo[];
}

export interface TodosStoreRequest {
  title: string;
  description: string;
}
export interface TodosStoreResponse {
    data: Todo;
  }
  
export interface TodosUpdateRequest {
  id: number;
  title: string;
  description: string;
  status: TodoStatusEnum;
}

export interface TodosDeleteRequest {
  id: number;
}
export interface TodosDeletResponse {
  id: number;
}
export interface TodosShowRequest {
  id: number;
}
export interface TodosShowResponse {
  data: Todo;
}

const TodoApi = {
  index: async (offset:number) => (await BaseApi.get<TodosResponse>("todos"+(offset ? `?offset=${offset}` : ''))).data,
  show: async (data: TodosShowRequest) =>
    (await BaseApi.get<TodosShowResponse>(`todos/${data.id}`)).data,
  store: async (data: TodosStoreRequest) =>
    (await BaseApi.post<TodosStoreResponse>("todos", data)).data,
  update: async (data: TodosUpdateRequest) =>
    (await BaseApi.patch<TodosStoreResponse>(`todos/${data.id}`, data)).data,
  delete: async (data: TodosDeleteRequest) =>
    (await BaseApi.delete<any>(`todos/${data.id}`)).data,
};

export default TodoApi;
