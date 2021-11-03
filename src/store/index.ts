import Vue from "vue";
import Vuex from "vuex";
import { TodoInterface } from "@/interfaces/todoInterface";
import { GroupInterface } from "@/interfaces/groupInterface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [],
    todoGroupList: [],
  },
  mutations: {
    addTodoToList(state: any, todo: TodoInterface): void {
      return state.todoList.push(todo);
    },
    completeTodo(state: any, id: number): boolean {
      return (state.todoList[id].completed = true);
    },
    addGroup(state: any, group: GroupInterface): void {
      return state.todoGroupList.push(group);
    },
  },
  actions: {
    addTodoToList(context, todo: TodoInterface): void {
      return context.commit("addTodoToList", todo);
    },
    completeTodo(context, id: number): void {
      return context.commit("completeTodo", id);
    },
    addGroup(context, group: GroupInterface): void {
      return context.commit("addGroup", group);
    },
  },
  modules: {},
});
