import { useState } from 'react'
import './App.css'
import { TaskList } from './componensts/TaskList'
import { AddTaskModel } from './componensts/AddTaskModel'

function App() {
  const [formInvalid,setforminvalid]= useState(false)

  const [tasks, setTasks] = useState({items:[],Newtask:{desc:'',due_time:'',priority:'low'}}) 
  const [isTaskModelOpen,setIsTaskModelOpen]=useState(false)

  // open addtask model
  const openTaskModel=()=>{
    setIsTaskModelOpen(true)
  }

  // close Add task  model 
  const closeTaskModel=()=>{
    setforminvalid(false)
    setIsTaskModelOpen(false)
  }

  // for adding task in items
  const AddTask=(e)=>{
    e.preventDefault();
    if (tasks.Newtask.desc !=='' && tasks.Newtask.due_time !=='' && tasks.Newtask.priority !=='') { 
      const newTaskItems=[...tasks.items,tasks.Newtask]
      setTasks({items:newTaskItems,Newtask:{desc:'',due_time:'',priority:'low'}});
      setforminvalid(false);  // for showing error if any field is empty
      setIsTaskModelOpen(false);
    }
    else{
      setIsTaskModelOpen(true);
      setforminvalid(true);
    }
  }

  // set value of new task
  const setNewTask=(taskDetails)=>{
   setTasks(prevState=>({
    ...prevState,Newtask:taskDetails  //destructuring old data and then update property Newtask
   }))
  }
  return (
    <>
      <div className="xl:w-[70vw] lg:w-[80vw] mx-auto w-[95vw] rounded-xl bg-gradient-to-b from-blue-400 shadow-xl shadow-blue-800 via-blue-300 to-blue-200 lg:p-4 relative">
        <h1 className='text-white text-3xl font-bold  p-2'>React To-Do List </h1>
        <div className="nav-options mt-8">
          <ul className='flex space-x-2'>
            <li onClick={openTaskModel} className='grow-[2] bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 mr-6 cursor-pointer text-lg'>Add a new task</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>All</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>Tasks</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>Completed</li>
          </ul>
        </div>

        <div className="tasks-container lg:p-3 p-2 mt-8 bg-white rounded-xl">
          <TaskList allTasks={tasks.items} />
        </div>

        {isTaskModelOpen && < AddTaskModel newTask={tasks.Newtask} setNewTask={setNewTask} addTask={AddTask}  close={closeTaskModel} formInvalid={formInvalid}/>}
        {/* setNewTask={()=>{setNewTask}} */}
      </div>
     
    </>
  )
}

export default App
