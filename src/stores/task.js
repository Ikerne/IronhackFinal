import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // This store uses the Composition API
  const tasksArr = ref(null);
  // fetch tasks from supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false })
      .match({ user_id: useUserStore().user.id });
    tasksArr.value = tasks;
    // console.log(tasks);
    return tasksArr.value;
  };
  // add tasks to supabase
  const addTask = async (title, description, task_priority) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        task_priority: task_priority,
      },
    ]);
  };
  //toggle completed
  const toggleTask = async (isComplete, id) => {
    //check it works
    // console.log("????");
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: isComplete })
      .match({
        id: id,
      });

    // const {data, error} = await supabase.from("tasks")
    // .update({isComplete: isComplete}).match({id: id,});
  };

  // modify tasks from supabase
  const updateTask = async (title, description, task_priority, id) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ 
        title: title, 
        description: description, 
        task_priority: task_priority,
      })
      .match({
        id: id,
      });
  };

  // delete tasks from supabase
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };

  return { tasksArr, fetchTasks, addTask, deleteTask, toggleTask, updateTask };
});
