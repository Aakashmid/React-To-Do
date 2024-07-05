import { useState, useEffect } from 'react'
import './App.css'
import { TaskList } from './componensts/TaskList'
import { AddTaskModel } from './componensts/AddTaskModel'

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : { items: [], Newtask: { desc: '', due_time: '', priority: 'low' } }
  })

  const [CompletedTasks, setCompletedTasks] = useState(() => {  // completed task is  array of id of task which is completed
    const savedTasks = localStorage.getItem('completedTasks');
    return savedTasks ? JSON.parse(savedTasks) : {}
  })

  const SetCompletedTask = (taskId) => {
    setCompletedTasks({ ...CompletedTasks, [taskId]: !CompletedTasks[taskId] }) // taskId is key and its value will be true or false 
  }

  const getCompletedTasks = () => {
    const Tasks = tasks.items.filter((value, id) => {
      return CompletedTasks[id]
    })
    return Tasks
  }


    getActiveTasks = () => {
      const Tasks = tasks.items.filter((value, id) => {
        return !CompletedTasks[id]  // using not operator 
      })
      return Tasks
    }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(CompletedTasks))
  }, [CompletedTasks])


  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false)

  // open addtask model
  const openTaskModel = () => {
    setIsTaskModelOpen(true)
  }

  // close Add task  model 
  const closeTaskModel = () => {
    setIsTaskModelOpen(false)
    setNewTask({ desc: '', due_time: '', priority: 'low' });   // set form empty when form desappear
  }

  // for adding task in items
  const AddTask = (e) => {
    e.preventDefault();
    if (tasks.Newtask.desc !== '' && tasks.Newtask.due_time !== '' && tasks.Newtask.priority !== '') {
      const newTaskItems = [...tasks.items, tasks.Newtask]
      setTasks({ items: newTaskItems, Newtask: { desc: '', due_time: '', priority: 'low' } });
      setIsTaskModelOpen(false);
    }
    else {
      setIsTaskModelOpen(true);
    }
  }

  // set value of new task
  const setNewTask = (taskDetails) => {
    setTasks(prevState => ({
      ...prevState, Newtask: taskDetails  //destructuring old data and then update property Newtask
    }))
  }

  // change nav-links status
  const [activeLinkIndex, setActiveLink] = useState(null);
  const handleActiveLink = (index) => {
    setActiveLink(index)
  }

  // to run a function only once when component mounts(rendered) first time we user useEffect 
  useEffect(() => {
    setActiveLink(1)
  }, [])



  // delete task by its id
  const DeletTask = (id) => {
    const oldItems = tasks.items
    const newItems = oldItems.filter((value, i) => {
      return id !== i
    })
    setTasks({ items: newItems, Newtask: tasks.Newtask })
  }
  return (
    <>
      <div className="xl:w-[70vw] lg:w-[80vw] mx-auto w-[95vw] rounded-xl bg-gradient-to-b from-blue-400 shadow-xl shadow-blue-800 via-blue-300 to-blue-200 lg:p-4 relative">
        <h1 className='text-white text-3xl font-bold  p-2'>React To-Do List </h1>
        <div className="nav-options mt-8">
          <ul className='flex space-x-2'>
            <li onClick={openTaskModel} className='grow-[2] bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 mr-6 cursor-pointer text-lg'>Add a new task</li>
            <li className={`${activeLinkIndex === 0 ? 'active bg-blue-500 text-white' : ' bg-white'} nav-link grow  hover:shadow-xl  font-semibold rounded-lg p-2 cursor-pointer text-lg `} onClick={() => handleActiveLink(0)} >All</li>
            <li className={`${activeLinkIndex === 1 ? 'active bg-blue-500 text-white' : ' bg-white'} nav-link grow  hover:shadow-xl  font-semibold rounded-lg p-2 cursor-pointer text-lg`} onClick={() => handleActiveLink(1)} >Active Tasks</li>
            <li className={`${activeLinkIndex === 2 ? 'active bg-blue-500 text-white' : ' bg-white'} nav-link grow  hover:shadow-xl  font-semibold rounded-lg p-2 cursor-pointer text-lg `} onClick={() => handleActiveLink(2)} >Completed</li>
          </ul>
        </div>

        {activeLinkIndex === 0 &&
          (<div className="tasks-container lg:p-3 p-2 mt-8 bg-white rounded-xl">
            <TaskList allTasks={tasks.items} removetask={DeletTask} SetCompletedTask={SetCompletedTask} completedTasks={CompletedTasks} />
          </div>)}

        {activeLinkIndex === 1 &&
          (<div className="tasks-container lg:p-3 p-2 mt-8 bg-white rounded-xl">
            <TaskList allTasks={getActiveTasks()} removetask={DeletTask} SetCompletedTask={SetCompletedTask} completedTasks={CompletedTasks} />
          </div>)}

        {activeLinkIndex === 2 &&
          (<div className="tasks-container lg:p-3 p-2 mt-8 bg-white rounded-xl">
            <TaskList allTasks={getCompletedTasks()} removetask={DeletTask} SetCompletedTask={SetCompletedTask} completedTasks={CompletedTasks} />
          </div>)}

        {isTaskModelOpen && < AddTaskModel newTask={tasks.Newtask} setNewTask={setNewTask} addTask={AddTask} close={closeTaskModel} />}
        {/* setNewTask={()=>{setNewTask}} */}
      </div>

    </>
  )
}

export default App
