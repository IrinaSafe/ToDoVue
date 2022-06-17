<template>
    <div class="modal-block" :class="isOpen ? true : 'modal-block--hidden'">
      <button class="close-button" @click="closeModalWindow">
        <svg class="close-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" fill="currentColor" />
        </svg>
      </button>
      <form action="#" method="post">
        <div class="modal-window">
            <label class="modal-window__label">
                <p class="modal-window__label-title">Введите заголовок</p>
                <input 
                    class="modal-window__input" 
                    type="text" 
                    name="title"
                    v-model='formData.title'
                >
            </label>
           
            <label class="modal-window__label">
                <p class="modal-window__label-title">Выберите дату</p>

                <input 
                    class="modal-window__input" 
                    type="date" 
                    name="date"
                    v-model="formData.date"
                >
            </label>

            <label class="modal-window__label">
                <p class="modal-window__label-title">Выберите категорию</p>

                <select 
                    class="modal-window__input" 
                    size="1" 
                    name="types"
                    v-model="formData.type"
                >
                    <option v-for="type in TYPES" :key="type.id">{{ type }}</option>
                </select>
            </label>

            <p class="modal-window__label-title">Дополнительные комментарии</p>

            <textarea class="modal-window__input" name="description" v-model="formData.body"></textarea>

            <button type="button" class="modal-window__button" @click="sendData" :disabled="isDisable">Добавить</button>
        </div>
      </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { TYPES, formDataDefault } from '@/constans.js';

export default {
    name: 'ModalWindow',
    data() {
        return {
            formData: formDataDefault,
            TYPES,
            formDataDefault,
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        isDisable() {
            return this.formData.title == '' || this.formData.date == '' || this.formData.type == '' ? true : false;
        },
    },
    methods: {
        closeModalWindow() {
            this.$emit('closeModalWindow');
        },
        ...mapActions(["SEND_DATA"]),
        sendData() {
            this.SEND_DATA({
                title: `${this.formData.type} – ${this.formData.date.split('-').reverse().join('-')} – ${this.formData.title}`,
                body: this.formData.body,
            });

            for (let key in this.formData) {
                this.formData[key] = '';
            }

            // this.formData = Object.assign({}, this.formDataDefault);
            this.$emit('closeModalWindow')
        },
    }
};

</script>

<style scoped>
.modal-block {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 3000px rgb(219 219 219 / 19%);
  backdrop-filter: blur(40px);
}

.modal-block--hidden {
  display: none;
}

.modal-window {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 20%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 600px;
  background-color: #fcfcee;
  width: 100%;
  border-radius: 20px;
  padding: 40px;
}

.modal-window__label {
    width: 100%;
    margin-bottom: 20px;
}

.modal-window__label-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px;
}

.modal-window__input {
  padding: 10px 0 10px 10px;
  border-radius: 10px;
  border: 1px solid #bbedb4;
  background-color: #e2f7df;
  width: 100%;
}

.modal-window__input:focus {
  border: 1px solid #03c03c;
}

.modal-window__input:focus-visible {
  outline: 1px solid #03c03c;
}

.modal-window__button {
  max-width: 250px;
  width: 100%;
  padding: 12px 20px;
  background-color: transparent;
  border: 1px solid #4cbb17;
  border-radius: 5px;
  color: #4cbb17;
  font-size: 14px;
  font-weight: 500;
  margin: 40px auto 0;
  text-transform: uppercase;
  cursor: pointer;
}

.modal-window__button:active {
  opacity: 0.3;
}

.modal-window__button:disabled {
    opacity: 0.7;
    cursor: default;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  outline: none;
  background-color: #b1e697;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.close-button:active {
  opacity: 0.3;
}

.close-button__icon {
  width: 30px;
  height: 30px;
  color: #333;
}

</style>
