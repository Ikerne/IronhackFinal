<!--HTML-->
<template>
  <div class="wrapper">
    <Nav />
TASK MANAGER WORK IN PROGRESS
   <!-- <div class="content">
      <h3>Your account:</h3>
      <router-link to="/account">Account</router-link>
    </div>
    <NewTask  @new-task-emit="addTaskSupabase" />
    <h1>Tasks:</h1> -->
    <div class="task-container">
    <TaskItem @delete-emit="deleteTask" @update-emit="addUpdateTaskSupabase" v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</div>
  <!-- <p v-for="task in taskStore.tasksArr" :key="task.id">{{ task }}</p> -->
</template>
<!--JS-->
<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

const taskStore = useTaskStore();

// Variable to save tasks in supabase
const tasks = ref([]);

// Function to connect to store and get tasks from supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks()
};
getTasks();

onUpdated(()=> {
  getTasks()
 });

 //testing emit with diego, to test add @test-emit="miCoolFunction" to <NewTask ...> in template & uncomment line 15 in newTask.vue => <!-- <button @click="testFunction">test emit</button> -->
// const miCoolFunction = (miInfoRecibidaEjemplo) => {
//   alert(`Hola ${miInfoRecibidaEjemplo}`);
//  };
// deletetask constant for deleteEmit
const deleteTask = ()=>{
  
// console.log("testinggg");
}

const updateTask = ()=>{
  
  // console.log("testing modify");
  }
// function to send tasks to supabase
const addTaskSupabase = (newTask) => {
  alert(`Your task called: ${newTask.title} described as: 
 ${newTask.description} has been added successfully `);
 // Variables to save key + value of the emit object, to according to the function logic, connect with the store task.js under the name addTaskSupabase.
 let newTaskTitle = newTask.title;
 let newTaskDescription = newTask.description;
 let newTaskPriority = newTask.task_priority;
 taskStore.addTask(newTaskTitle, newTaskDescription, newTaskPriority)
//  getTasks();
//  console.log("click");
};
// function to send updated task to supabase
const addUpdateTaskSupabase = (newUpdate) => {
  console.log(newUpdate);
  alert(`${newUpdate.title} ${newUpdate.description} ${newUpdate.task_priority}`);
  taskStore.updateTask(newUpdate.title, newUpdate.description, newUpdate.task_priority, newUpdate.id )
  
};
</script>
<!--CSS-->
<style></style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
