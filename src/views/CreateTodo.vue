<template>
  <div class="create-todo">
    <b-modal ref="success_modal" hide-footer>
      <template #modal-title> Вы успешно создали новую задачу </template>
      <b-link class="mt-3" to="/" block>Перейти к списку задач</b-link>
    </b-modal>
    <GroupModal id="group-modal" v-on:setGroup="setGroup($event)" />
    <b-form @submit="createTodo">
      <b-form-group
        id="title-group"
        label="Название задачи"
        label-for="title-input"
      >
        <b-form-input
          v-model="title"
          id="title-input"
          type="text"
          placeholder="Сходить покушать"
          required
        />
      </b-form-group>
      <b-form-group
        class="mt-4"
        id="description-group"
        label="Описание задачи"
        label-for="description-input"
      >
        <b-form-textarea
          id="description-input"
          placeholder="Напишите что хотите"
          rows="3"
          max-rows="6"
          v-model="description"
        />
      </b-form-group>
      <div class="row mt-5">
        <b-form-group
          id="color-group"
          label="Цвет для задачи"
          label-for="color-input"
          class="col-md-6"
        >
          <b-form-input
            id="color-input"
            type="color"
            required
            v-model="color"
          />
        </b-form-group>
        <b-form-group
          id="priority-group"
          label="Приоритет"
          class="col-md-6"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            id="radio-slots"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="radio-options-slots"
            button-variant="outline-primary"
            buttons
            required
            v-model="priority"
          />
        </b-form-group>
      </div>
      <div class="row mt-3" style="justify-content: space-around">
        <b-button class="col-sm-3" type="submit" variant="primary">
          Создать задачу
        </b-button>
        <b-button
          v-b-modal="'group-modal'"
          variant="outline-success"
          class="col-sm-3"
        >
          Добавить в группу
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GroupModal from "@/components/GroupModal.vue";
import { GroupInterface } from "@/interfaces/groupInterface";
export default Vue.extend({
  name: "CreateTodo",
  components: { GroupModal },
  data() {
    return {
      options: [
        { text: "Не важно", value: "0" },
        { text: "Средняя важность", value: "1" },
        { text: "Очень важно", value: "2" },
      ],
      title: "",
      description: "",
      color: "",
      priority: null,
      group: {},
    };
  },
  methods: {
    createTodo(event: Event) {
      event.preventDefault();

      const todo = {
        id: this.$store.state.todoList.length,
        title: this.title,
        description: this.description,
        color: this.color,
        priority: Number(this.priority),
        completed: false,
        group: this.group,
      };

      this.$store.dispatch("addTodoToList", todo);
      if (this.$refs["success_modal"]) {
        this.$refs["success_modal"].show();
      }
    },
    setGroup(event: GroupInterface) {
      this.group = event;
    },
  },
});
</script>

<style lang="scss" scoped></style>
