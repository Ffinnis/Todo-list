<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Задачи</router-link> |
      <router-link to="/create">Создать задачу</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "./store/index";
export default Vue.extend({
  name: "App",
  created(): void {
    store.dispatch("setTodoList", JSON.parse(localStorage.getItem("todoList")));
    store.dispatch(
      "setTodoGroupList",
      JSON.parse(localStorage.getItem("todoGroupList"))
    );
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
