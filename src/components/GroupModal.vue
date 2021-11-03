<template>
  <b-modal
    hide-footer
    ref="group-modal"
    :id="id"
    title="Создать/Добавить в группу"
  >
    <b-popover target="group-item" triggers="hover" placement="top">
      Нажми, чтобы установить группу
    </b-popover>
    <div v-if="todoGroupList.length > 0" class="d-block text-center">
      <p>Действующие группы задач</p>
      <b-list-group class="d-block mb-5">
        <b-list-group-item
          id="group-item"
          class="group-item mt-3"
          v-for="group in todoGroupList"
          :key="group.id + group.title"
          :style="'border: 2px solid' + group.color"
          @click="setGroup(group.id)"
          button
        >
          {{ group.title }}
        </b-list-group-item>
      </b-list-group>
    </div>
    <p class="text-center" v-else>Групп пока нет, но вы можете создать новую</p>
    <div class="d-block text-center">
      <b-form @submit="addGroup">
        <b-form-group id="title-modal-group">
          <b-form-input
            id="title-input-modal"
            type="text"
            placeholder="Название группы (пример: Домашние дела)"
            required
            v-model="title"
            style="max-width: 50%; margin: 0 auto"
          />
          <b-form-input
            id="color-input-modal"
            type="color"
            required
            style="max-width: 50%; margin: 20px auto 0"
            v-model="color"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">Создать группу</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script lang="ts">
import store from "@/store/index";
import Vue from "vue";
import Component from "vue-class-component";

const Props = Vue.extend({
  props: {
    id: String,
  },
});
@Component
export default class GroupModal extends Props {
  todoGroupList = store.state.todoGroupList;
  title = "";
  color = "";

  addGroup(event: Event): Promise<void> {
    event.preventDefault();

    return store.dispatch("addGroup", {
      id: store.state.todoGroupList.length,
      title: this.title,
      color: this.color,
    });
  }

  setGroup(id: number): Vue | Element {
    const group = store.state.todoGroupList[id];

    this.$emit("setGroup", group);
    return this.$refs["group-modal"].hide();
  }
}
</script>

<style scoped>
.group-item {
  cursor: pointer;
}
</style>
