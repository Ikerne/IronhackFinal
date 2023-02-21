<template>
     <button @click="showNewTask = true">Add a new Task +</button>
     <div class="sticky-container" v-if="showNewTask ">
  <div class="sticky-outer">
    <div class="sticky">
      <svg width="0" height="0">
        <defs>
          <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
            <path
              d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
              stroke-linejoin="round"
              stroke-linecap="square"
            />
          </clipPath>
        </defs>
      </svg>
      <div class="sticky-content blue-sticky">
      <div >
          <h1>Add a new Task</h1>
          <div v-if="showErrorMessage">
              <p class="error-text">{{ errorMessage }}</p>
          </div>
          <div>
              <div class="input-field">
                  <input type="text" placeholder="Add a Task Title - Listen to Kendrick Lamar" v-model="name">
              </div>
              <div class="input-field">
                  <input type="text" placeholder="Add a Task Description - Look up Kendrick Lamar's FEAR album on spotify and listen to the whole album." v-model="description" @keypress.enter="addTask">
              </div>
              <div class="dropdown-field"> 
                  <label for="taskPriority">Choose task priority:</label>
                  <select name="task-priority" id="task-priority" v-model="priority">
                      <option value="Urgent" >Urgent</option>
                      <option value="Normal" selected>Normal</option>
                      <option value="Low">Low</option>
                  </select>
              </div>
              <button @click="addTask" class="button">Add</button>
              <button @click="cancelAddTask">Cancel</button>
              <!-- <button @click="testFunction">test emit</button> -->
          </div>
        </div>
     </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   


// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// constant to show add new task 
const showNewTask = ref(false);

// var para guardar mi metodo nativo de VUE que es autimportado, es decir no tengo que referenciarlo en "ïmport" como hacemos con el ref en la linea 18, este metodo tienes este syntax de aca:^
const emit = defineEmits(["testEmit", "newTaskEmit"])

// test emit
const testFunction = () => {
    emit("testEmit", name.value)
}

// var para guardar el uso de la ta tienda de tarea en este archivo.
const taskStore = useTaskStore();

// variables for the values of the inputs/dropdown
const name = ref('');
const description = ref('');
const priority = ref('');
//method to clear fields of new task
const clearFields = () => {
  name.value = '';
  description.value = '';
  priority.value = '';
};

// method to clear inputs and close the new task form
const cancelAddTask = () => {
  clearFields();
  showNewTask.value = false;
};
// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0 || priority.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
    showErrorMessage.value = true;
    errorMessage.value = 'The task title,  description  or priority is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    const newTask = {
        title: name.value,
        description: description.value,
        task_priority: priority.value,
    }
    // console.log(newTask);
    emit("newTaskEmit", newTask);
    clearFields();
    // name.value = ""
    // description.value = ""
    // priority.value = ""

    // console.log(newTask);
}
 setTimeout(() => {
 showNewTask.value = false;
 }, 1);
};

</script>

<style></style>
  