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
    setTodoList(state: any, list: Array<TodoInterface>): Array<TodoInterface> {
      return (state.todoList = list);
    },
    setTodoGroupList(
      state: any,
      list: Array<GroupInterface>
    ): Array<GroupInterface> {
      return (state.todoGroupList = list);
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
    setTodoList(context, list: Array<TodoInterface>): void {
      return context.commit("setTodoList", list);
    },
    setTodoGroupList(context, list: Array<GroupInterface>): void {
      return context.commit("setTodoGroupList", list);
    },
  },
  getters: {
    todoListByGroup: (state) => {
      return state.todoList.filter((el: { group: GroupInterface }) => {
        return Object.keys(el.group).length !== 0;
      });
    },
    togoListWithoutGroup: (state) => {
      if (state.todoList) {
        return state.todoList.filter((el: { group: GroupInterface }) => {
          return Object.keys(el.group).length === 0;
        });
      }
    },
  },
  modules: {},
});
