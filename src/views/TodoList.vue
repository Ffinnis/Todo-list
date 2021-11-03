<template>
  <div class="home">
    <TodoListComponent />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoListComponent from "@/components/TodoListComponent.vue";

export default Vue.extend({
  name: "TodoList",
  components: { TodoListComponent },
});
</script>
