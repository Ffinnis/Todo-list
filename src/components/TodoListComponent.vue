<template>
  <div>
    <div
      class="todo-group-wrapper mb-4"
      v-for="group in todoGroupList"
      :key="group.id + group.title.replace(/\s/g, '')"
    >
      <b-button
        v-b-toggle="group.id + group.title.replace(/\s/g, '')"
        style="width: 100%"
        :style="'background:' + group.color"
        >{{ group.title }}</b-button
      >
      <b-collapse :id="group.id + group.title.replace(/\s/g, '')">
        <TodoTemplateList :list="sortedListGroup(group.id)" />
      </b-collapse>
    </div>
    <div class="mt-5">
      <TodoTemplateList :list="togoListWithoutGroup" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/index";
import Component from "vue-class-component";
import TodoTemplateList from "@/components/Templates/TodoTemplateList.vue";
import { GroupInterface } from "@/interfaces/groupInterface";
import { TodoInterface } from "@/interfaces/todoInterface";
@Component({
  components: {
    TodoTemplateList,
  },
})
export default class TodoListComponent extends Vue {
  todoGroupList: Array<GroupInterface> = store.state.todoGroupList;
  completeTodo(id: number): Promise<void> {
    return store.dispatch("completeTodo", id);
  }

  sortedListGroup(id: number): any[] {
    const notSorted = Object.values(
      this.todoListByGroup.reduce((acc: any, item) => {
        acc[item.group.id] = [...(acc[item.group.id] || []), item];
        return acc;
      }, {})
    );
    return notSorted
      .map((arr) => arr.filter((item) => item.group.id === id))
      .find((el) => el.length > 0);
  }

  get todoList(): Array<TodoInterface> {
    return store.state.todoList.slice().reverse();
  }
  get todoListByGroup(): Array<TodoInterface> {
    return store.getters.todoListByGroup;
  }
  get togoListWithoutGroup(): Array<TodoInterface> | null {
    if (store.getters.togoListWithoutGroup) {
      return store.getters.togoListWithoutGroup.slice().reverse();
    }
    return null;
  }
}
</script>
