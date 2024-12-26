<script setup>
    import { defineEmits, reactive } from 'vue';    

    const todoStatus = reactive({
        todo: "",
        inValid: null,
        errMsg: null
    });

    const emit = defineEmits(['create-todo']);
    const createTodo = ()=> {        
        todoStatus.inValid = null;
        if(todoStatus.todo !== "") {
            emit('create-todo', todoStatus.todo);     
            todoStatus.todo = "";            
            return;
        }        
        todoStatus.inValid = true;
        todoStatus.errMsg = "Todo value cannot be empty";
    }

    

</script>

<template>
    <main class="container">
        <div class="input-wrap" :class="{ 'input-err': todoStatus.inValid }">
            <input type="text" name="title" v-model="todoStatus.todo" />
            <button @click="createTodo()">Create</button>
        </div>
        <!-- <p>{{ todoStatus.todo }}</p> -->
        <!-- <span class="err-msg" v-show="todoStatus.inValid">{{ todoStatus.errMsg }}</span> -->

        <span class="err-msg" v-if="todoStatus.inValid">{{ todoStatus.errMsg }}</span>

    </main>
</template>


<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>