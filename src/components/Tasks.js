import Task from "./Task";

// im passing tasks as a props to the Tasks components and then looping
// through the list of tasks, and passing every task to another component named
// Task. This allows us to define different props for every task.

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    // map through a list
    <>
      {tasks.map((task) => (
        // since the array has a key element (id) we pass the id as a prop
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
