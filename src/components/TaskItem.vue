<!--HTML-->
<template>
  <div class=" task-wrapper">
    <div class="task-sticky-container ">
      <div class="task-sticky-outer sticky-outer">
        <div class="task-sticky sticky">
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
          <div class="sticky-content1 task-sticky-content" :class="{'pink-sticky': props.task.task_priority === 'Backlog / Pink', 'orange-sticky': props.task.task_priority === 'To do / Orange', 'yellow-sticky': props.task.task_priority === 'Doing / Yellow'}"> 
              <h3 :class="{completed: isComplete}">{{task.title}}</h3>
              <p :class="{completed: isComplete}">{{ task.description }}</p>
              <!-- <div class="priority-text">
              <p :class="{completed: isComplete}">{{ task.task_priority }}</p>
            </div> -->
              <!-- <p :class="{completed: isComplete}">Task Priority: {{ task.task_priority }}</p> -->
              <div class="task-button-box">
                <button @click="deleteTask">Delete</button>
                <button @click="completeTask">Complete</button>
                <!-- <button @click="testFunction">test emit</button> -->
                <button @click="showUpdateForm = true">Modify</button>
              </div>
              <div v-if="showUpdateForm">
                  <div v-if="showErrorMessage">
                      <p class="error-text">{{ errorMessage }}</p>
                  </div>
                  <div class="input-field">
                      <input type="text" placeholder="Change Task Title" v-model="newName">
                  </div>
                  <div class="input-field">
                      <input type="text" placeholder="Change Task Description" v-model="newDescription" @keypress.enter="updateTask">
                  </div>
                  <div class="dropdown-field"> 
                      <label for="taskPriority">Task State/Color:</label>
                      <select name="task-priority" id="task-priority" v-model="newPriority"  @keypress.enter="updateTask">
                          <option value="Backlog / Pink" >Backlog / Pink</option>
                          <option value="To do / Orange">To do / Orange</option>
                          <option value="Doing / Yellow">Doing / Yellow</option>
                      </select>
                  </div>
                  <button @click="updateTask" class="button">Modify</button>
                  <button @click="cancelModifyTask">Cancel</button>   
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';

const taskStore = useTaskStore();
const isComplete = ref(props.task.is_complete);
const showUpdateForm = ref(false);
const props = defineProps({
    task: Object,
});
// Variables to show if there id no information in the inputs when modifying a task 
const errorMessage = ref(null);
const showErrorMessage = ref(false);
// Variables for the input values 
const newName = ref('');
const newDescription = ref('');
const newPriority = ref('');

//method to clear fields of modify task
const clearFields = () => {
  newName.value = '';
  newDescription.value = '';
  newPriority.value = '';
};

// method to clear inputs and close the new task form
const cancelModifyTask = () => {
  clearFields();
  showUpdateForm.value = false;
};
// Emit
const emit = defineEmits(["deleteEmit", "testEmit", "updateEmit"])

// const testFunction = () => {
//     emit("testEmit", )
// }

// delete task
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    // console.log("test");
    alert(`Your task ${props.task.title} was deleted`)
    emit("deleteEmit")
};
// complete task
const completeTask = () => {
    //When called it should modify the style of h3 & p.
    isComplete.value = !isComplete.value;
    //it communicates to supabase, to set the state of the task as completed/not completed
    taskStore.toggleTask(isComplete.value, props.task.id);
};



//update task
const updateTask = () => {
    if(newName.value.length === 0 || newDescription.value.length === 0 || newPriority.value.length === 0 ){
    showErrorMessage.value = true;
    errorMessage.value = 'The task title,  description  or priority is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    const newUpdate = {
        title: newName.value,
        description: newDescription.value,
        task_priority: newPriority.value,
        id: props.task.id,
        
    }
    emit("updateEmit", newUpdate);
    clearFields();
    // console.log("¨test update");

}
setTimeout(() => {
 showUpdateForm.value = false;
}, 5000);
};
</script>
<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
