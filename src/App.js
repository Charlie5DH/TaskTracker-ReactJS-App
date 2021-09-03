import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

// the server is running under localhost:5000 and now contains the tasks
// we have to fetch the apps from the database
// the static data was here in an array format but was moved to the db.json file

function App() {
  //we want the button add to be a toggle option, therefore we will capture its behaviour
  // in here using another hook. This event will be catched in the Header
  // so the display of the form is going to depend of the state of showAddTask

  const [showAddTask, setShowAddTask] = useState(false);

  // this will be globals. In this case we are not using a back end so the data is static
  const [tasks, setTasks] = useState([]);

  //Toggle reminder
  const toggleReminder = async (id) => {
    
    const taskToToggle = await fetchTask(id) // get the task, put it into variable
    //update task with event with the same propierties of taskToToggle and reverse of task.reminder
    
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder} 
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', //since is an update
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = res.json()

    setTasks(
      // loop through the tasks and take the task with the id
      // ...task means leave everything the same but change reminder to the negative value
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    //console.log("Reminder", id);
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch ("http://localhost:5000/tasks", {
      method:'POST',
      headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
    
  //creating an id for the task
    //const id = Math.floor(Math.random() * 10000) + 1;
    // creating the new task with the id
    //const newTask = { id, ...task };
    // add the task to the list of tasks
    //setTasks([...tasks, newTask]);
    //console.log(task);
  };

  // this is the function to retrieve the data directly from the server
  // fetch the data from the back end to set a default view

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []); // dependency array

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
    //console.log(data);
  };

    // Fetch tasks
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
  
      return data;
      //console.log(data);
    };

  //delete task from server.
  const deleteTask = async (id) => {
    //We just need a simple delete request
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //const deleteTask = (id) => {
  // from task, filter task.id that is not equal to id
  // filter where task.id is not equal to the id
  // im using the reactHook (useState), to get the setter (setTasks)
  // to set a state to the reactive data (tasks)
  // then, the state of tasks will change for the rest of the components with the state
  // i have assigned
  //setTasks(tasks.filter((task) => task.id !== id));
  //console.log('delete task ', id) //print the task
  //};

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <h3>No Tasks to Show</h3>
      )}
    </div>
  );
  // if tasks tasks.length > 0 -> show the tasks; else-> show an <h3>
}

export default App;
