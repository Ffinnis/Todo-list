<template>
  <b-list-group>
    <b-list-group-item
      v-for="todo in listFromProps"
      :key="todo.id + todo.title.replace(/\s/g, '')"
      class="row mt-4"
      :class="todo.completed ? 'todo-item--completed' : ''"
      style="display: flex !important; align-items: center"
      :style="'border: 2px solid' + todo.color"
      :disabled="todo.completed"
    >
      <div class="col item-title row justify-content-center">
        {{ todo.title }}
      </div>
      <div class="col item-description">
        {{ todo.description }}
      </div>
      <div class="col">
        <b-popover
          triggers="hover"
          placement="bottom"
          :target="todo.id + todo.title.replace(/\s/g, '')"
        >
          Приоритетность задачи: Красный - самая важная, Желтый - средняя
          важность, <br />
          голубой - не важно.
        </b-popover>
        <b-icon
          icon="exclamation-circle-fill"
          :id="todo.id + todo.title.replace(/\s/g, '')"
          :variant="
            todo.priority === 0
              ? 'primary'
              : todo.priority === 1
              ? 'warning'
              : 'danger'
          "
        />
      </div>
      <div class="col">
        <b-button @click="completeTodo(todo.id)" variant="success">
          Выполнено
        </b-button>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Component from "vue-class-component";

const Props = Vue.extend({
  props: {
    list: Array,
  },
});
@Component
export default class TodoTemplateList extends Props {
  listFromProps = this.list;
  completeTodo(id: number): void {
    store.dispatch("completeTodo", id);
    return localStorage.setItem(
      "todoList",
      JSON.stringify(store.state.todoList)
    );
  }
}
</script>

<style lang="scss" scoped>
.item-title {
  font-weight: 600;
}
.item-description {
  text-overflow: ellipsis;
  max-width: 274px;
  white-space: nowrap;
  overflow: hidden;
}
.todo-item--completed {
  border: 2px solid #727272 !important;
  opacity: 0.4;
  &::before {
    position: absolute;
    content: "";
    background: #000;
    height: 3px;
    width: 110%;
    left: -5%;
    z-index: 2;
  }
}
</style>
