import { useState } from 'react'
import './App.css'
import { TaskList } from './componensts/TaskList'
import { AddTaskModel } from './componensts/AddTaskModel'

function App() {
  const [tasks, setTasks] = useState({items:[],Newtask:{desc:'',due_time:'',priority:''}}) 
  const [isTaskModelOpen,setIsTaskModelOpen]=useState(false)

  const openTaskModel=()=>{
    setIsTaskModelOpen(true)
  }
  const closeTaskModel=()=>{
    setIsTaskModelOpen(false)
  }

  const AddTask=()=>{
    const newTasksItems=[...tasks.items,tasks.Newtask];
    setTasks({items:newTasksItems,Newtask:{desc:'',due_time:'',priority:''}})
  }
  return (
    <>
      <div className="xl:w-[70vw] lg:w-[80vw] mx-auto w-[95vw] rounded-xl bg-blue-300 lg:p-4 relative">
        <h1 className='text-white text-3xl font-bold  p-2'>React To-Do List </h1>
        <div className="nav-options mt-8">
          <ul className='flex space-x-2'>
            <li onClick={openTaskModel} className='grow-[2] bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 mr-6 cursor-pointer text-lg'>Add a new task</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>All</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>Tasks</li>
            <li className='grow bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 cursor-pointer text-lg'>Completed</li>
          </ul>
        </div>
        <div className="task-container lg:p-3 p-2 mt-8 bg-white rounded-xl">
          <TaskList/>
        </div>

        {isTaskModelOpen && < AddTaskModel newTask={tasks.Newtask} addTask={AddTask} close={closeTaskModel}/>}
      </div>
     
    </>
  )
}

export default App
