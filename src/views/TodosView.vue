<script setup>

    import TodoCreator from '@/components/TodoCreator.vue';
    import TodoItems from '@/components/TodoItems.vue';
    import { Icon } from '@iconify/vue';
    import { uid } from 'uid';
    import { ref, watch, computed } from 'vue';
    import draggable from 'vuedraggable'

    const todoList = ref([]);

    watch(todoList, ()=>{
      setTodosInLocalStorage();
    },{deep: true});

    // Display message when all todos completed
    const allTodoCompleted = computed( ()=>{
      return todoList.value.every( (todo)=> todo.isCompleted )
    });


    const setTodosInLocalStorage = ()=> {
      localStorage.setItem('todoList', JSON.stringify(todoList.value));
    }

    const fetchTodosFromLocalStorage = ()=> {
      const savedTodo = JSON.parse(localStorage.getItem('todoList'));
      if(savedTodo) {
        todoList.value = savedTodo;
      }
    }

    fetchTodosFromLocalStorage();

    const createTodo = (todo)=> {
        todoList.value.push({
            id: uid(),
            todo,
            isCompleted: false,
            isEditing: false
        });
    }
    const toggleTodoComplete = (index)=> {
      todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
    }
    const deleteTodo = (todo)=> {
      todoList.value = todoList.value.filter( (todofilter)=> todofilter.id != todo.id);
    }
    const toggleTodoEditing = (index)=> {
      todoList.value[index].isEditing = !todoList.value[index].isEditing;
    }

    const updateTodo = (value, index)=> {
      todoList.value[index].todo = value;
    }

    

</script>


<template>
    <main>
        <h4>Create Todo</h4>
        <TodoCreator @create-todo="createTodo"/>


        <draggable 
          v-model="todoList" 
          tag="ul" class="todo-list" v-if="todoList.length > 0"
          :animation="300" 
          @start="drag=true" 
          @end="drag=false"
          item-key="id"
          >
          <template #item="{ element, index }">
            <TodoItems 
              :todo="element" 
              :index="index" 
              @toggle-complete="toggleTodoComplete" 
              @enable-editing="toggleTodoEditing" 
              @update-todo="updateTodo"
              @delete-todo="deleteTodo"
            />
          </template>
        </draggable>

        
        <p v-else class="todos-msg">
            <Icon icon="noto-v1:sad-but-relieved-face" />
            <span>You have no todo's to complete! Add one!</span>
        </p>   
        
        <p v-if="allTodoCompleted && todoList.length > 0" class="todos-msg">
          <Icon icon="noto-v1:party-popper" />
          <span>You have completed all your todos!</span>
        </p>


        
        
    </main>
</template>


<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>