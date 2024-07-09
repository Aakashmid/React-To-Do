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
    return savedTasks ? JSON.parse(savedTasks) :{}
  })

  const SetCompletedTask = (taskId) => {
    setCompletedTasks({ ...CompletedTasks, [taskId]: !CompletedTasks[taskId] }) // taskId is key and its value will be true or false 
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

  const AddTask2=(e)=>{
    e.preventDefault();
    if (tasks.Newtask.desc !== '' ) {
      const newTaskItems = [...tasks.items, tasks.Newtask]
      setTasks({ items: newTaskItems, Newtask: { desc: '', due_time: '', priority: 'low' } });
    }
  }
  // set value of new task
  const setNewTask = (taskDetails) => {
    setTasks(prevState => ({
      ...prevState, Newtask: taskDetails  //destructuring old data and then update property Newtask
    }))
  }

  // delete task by its id
  const DeletTask = (id) => {
    const oldItems = tasks.items
    const newItems = oldItems.filter((value, i) => {
      return id !== i
    })
    setTasks({ items: newItems, Newtask: tasks.Newtask })
    const newCompletedTasks=Object.keys(CompletedTasks).reduce((filteredObj,key)=>{
      if (id!=key) {
        filteredObj[key]=CompletedTasks[key];
      }
      return filteredObj;
    },{})
    setCompletedTasks(newCompletedTasks);
  }

  const handleChange=(e)=>{
    
    const {id,value}=e.target
    const task={...tasks.NewTask,[id]:value}
    setNewTask(task)
}
  return (
    <>
      <div className="mt-16 lg:mt-10 xl:w-[70vw] lg:w-[80vw] mx-auto w-[95vw] rounded-xl bg-gradient-to-b from-blue-400 shadow-xl shadow-blue-800 via-blue-300 to-blue-200 p-2 lg:p-4 relative">
        <h1 className='text-white text-3xl font-bold  p-2'>React To-Do List </h1>
        <div className="nav-options mt-8 lg:flex justify-center hidden">
          <p onClick={openTaskModel} className='w-fit  px-4  bg-white hover:bg-blue-500 hover:text-white  font-semibold rounded-lg p-2 mr-6 cursor-pointer text-lg'>Add a new task</p>
        </div>
        <form onSubmit={AddTask2} className="flex items-center p-1 bg-white rounded-lg lg:hidden mt-4">
          <input  id='desc' placeholder='Enter task here' type="text" className='flex-grow p-2 outline-none' value={tasks.Newtask.desc} onChange={handleChange} required />
          <button type='submit' className='py-2 px-3 rounded bg-gradient-to-r from-blue-500 to-blue-700 ' >Add</button>
        </form>


        <div className="tasks-container p-3 lg:p-4 lg:mt-8 mt-3 bg-white rounded-xl">
          <TaskList allTasks={tasks.items} removetask={DeletTask} SetCompletedTask={SetCompletedTask} completedTasks={CompletedTasks} />
        </div>


        {isTaskModelOpen && < AddTaskModel   newTask={tasks.Newtask} setNewTask={setNewTask} addTask={AddTask} close={closeTaskModel} />}
      </div>

    </>
  )
}

export default App
