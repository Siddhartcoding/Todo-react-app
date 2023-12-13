import { createContext , useContext, useState } from "react";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addTaskHandler, deleteTask
,fetchTodo,updateTask } from "./api/index.js";

const todoContext = createContext();

export function  useValue(){
    const value = useContext(todoContext);
    return value;
}


function TodoContext ({children}){
  const [Todo, setTodo] = useState ([]);
  const [isEdit, setisEdit] = useState ({
    edit:false,
    task:{},
  });
  const userId = 1;

  // adding a functionality of competing a task
  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
    // setting up notification
     toast.success( "Task Completed Succesfully");
  }
   // setting up function for updating the task
  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task,
      });
      return;
    }
    toast.info("In Progress");
    const data = await updateTask(task);
    if (data.success) {
      toast.success("Task updated succesfully");
    } else {
       toast.error("Error while updating");
     }
     setisEdit({
      edit: false,
      task: {},
     });
    } 
// setting up functions for deleting a particular task

    async function deleteHandler(id) {
    toast.info ("In progress");
      const result = await deleteTask(id);
      if (result.success) {
        const todo = Todo.filter((data) => {
          return data.id !== id;
        });
        setTodo(todo);
        toast.success("Task deleted succesfully")
      } else {
        toast.error("Error while deleting");
      }
    }   
  //adding functionalty for adding a new todo task   
  async function addData(title) {
    try {
      toast.info("In progress"); // You might want to use 'info' instead of 'error' for in-progress messages.
  
      const data = await addTaskHandler(title, userId);
  
      if (data.success) {
        toast.success("Task added successfully");
        setTodo([data.data, ...Todo]);
      } else {
        toast.error("Error while adding task");
      }
    } catch (error) {
      toast.error("Error while adding task");
      
    }
  }
    useEffect(() => {
      async function post() {
       
        const data = await fetchTodo();
        if (data.success) {
         
          setTodo(data.data);
        } 
      }
  
      post();
    }, []);
  

    return(
        <todoContext.Provider 
        value={{addData,isEdit,updateHandler,
          deleteHandler,completed,
          updateHandler,Todo
         }}>
          <ToastContainer />
            {children}
        </todoContext.Provider>
    )
}
export {todoContext};
export default TodoContext;