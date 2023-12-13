import React, { useEffect } from "react";
import icon from './assits/icon.png';
import { useRef } from "react";
import { useValue } from "./todoContext";




function Todo() {

  const title = useRef();
  const { addData, isEdit,
    deleteHandler, completed,
    updateHandler, Todo } = useValue();

  useEffect(() => {
    title.current.value = isEdit.edit ? isEdit.task.title : "";
  }, [isEdit]);


  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List<img src={icon} /></h2>
        <form
          autoFocus
          onSubmit={(e) => {
            e.preventDefault();
            addData(title.current.value);
            title.current.value = "";
          }}
        >
          <div className="row">

            <input

              type="text"
              id="input-box"
              ref={title}
              placeholder="Add your task"
              required
              autoFocus
            />
            {isEdit.edit ? (<button type="button"
              onClick={() => {
                const task = isEdit.task;
                task.title = title.current.value;
                updateHandler(task, false);
              }} >Update</button>) : (
              <button type="submit">Add</button>
            )}


          </div>
        </form>

        <ul id="list">
          {Todo.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                data-id={task.id}
                className="custom-checkbox"
                // checked={task.completed}
                onChange={() => completed(task)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="edit"
                  data-id={task.id}
                  onClick={() => updateHandler(task, true)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  data-id={task.id}
                  onClick={() => deleteHandler(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>



      </div>




    </div>

  )

}

export default Todo;