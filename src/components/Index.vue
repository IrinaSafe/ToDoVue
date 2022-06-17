<template>
  <main class="content">
    <section class="section">
      <ul class="list">
        <li 
          v-for= "todo in filteredTodos"
          :key="todo.id"
          class="list__item"
        >
          <h2 class="list__item-title">{{ todo.title }}</h2>

          <p class="list__item-description" v-if="todo.body">{{ todo.body }}</p>
        </li>
      </ul>

      <button class="add-button" type="button" @click="openModal">
        <svg class="add-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256C432 269.3 421.3 280 408 280h-160v160c0 13.25-10.75 24.01-24 24.01S200 453.3 200 440v-160h-160c-13.25 0-24-10.74-24-23.99C16 242.8 26.75 232 40 232h160v-160c0-13.25 10.75-23.99 24-23.99S248 58.75 248 72v160h160C421.3 232 432 242.8 432 256z" fill="currentColor" />
        </svg>
      </button>
    </section>

    <ModalWindow :isOpen="isOpen" @closeModalWindow="closeModalWindow" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ModalWindow from './ModalWindow.vue'

export default {
  name: 'Index',
  data() {
    return {
      isOpen: false,
    }
  },
  components: {
    ModalWindow,
  },
  computed: {
    ...mapGetters(["filteredTodos"]),
  },
  methods: {
    ...mapActions(["GET_TODOS_FROM_API", "OPEN_MODAL_WINDOW"]),
    openModal() {
      this.isOpen = true;
    },
    closeModalWindow() {
      this.isOpen = false;
    }
  },
  mounted() {
    this.GET_TODOS_FROM_API();
  },
}
</script>

<style scoped>

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin: 0 0 40px 0;
  padding: 0;
}

.list__item {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #d0f0c0;
  padding: 20px;
  min-height: 160px;
}

.list__item-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 10px 20px;
  margin: 0;
  text-align: left;
}

.list__item-description {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  padding: 20px;
  border-top: 1px solid #999;
  margin: 0;
}

.add-button {
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50%;
  min-width: 50px;
  min-height: 50px;
  background-color: #b1e697;
  border: none;
  margin: 0 auto;
  cursor: pointer;
}

.add-button:active {
  opacity: 0.3;
}

.add-button__icon {
  color: #333;
  width: 30px;
  height: 30px;
}

</style>
