import React from "react";
import { FaTimes } from "react-icons/fa"; // importing fontawesome

// The fontAwesome (FaTimes) imported is an X mark that is going to be linked to
// an action or event that is going to be in the App.js.
// Then the event is going to be passed as a prop (onDelete). In this case
// the prop is a function, therefore we can pass a prop (task.id)

const Task = ({ task, onDelete, onToggle }) => {
  return (
    // class is goin to be task if reminder is set to false
    // class reminder inheriths from task
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          // in here we call the function onDelete with the prop task.id
          // here is where the id is established for the onDelete
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
