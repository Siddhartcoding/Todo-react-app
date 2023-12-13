 import React from "react";
import TodoContext, { todoContext }  from "./todoContext";
import './App.css';
import Todo from "./Todo";

function App  (){

return (
  <TodoContext> 
  
  <Todo/>
   
  </TodoContext>
)

  }

  export default App;