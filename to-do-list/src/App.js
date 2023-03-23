import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateTaskForm from './components/UpdateTaskForm.jsx';
import ToDoList from './components/ToDoList.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {
  //To-do tasks State
  const [toDo,setToDo] = useState([
  ]);

  //Temporary state that will hold new tasks
  const[newTask,setNewTask]=useState('');
  //hold the updated data
  const[updateData,setUpdateData]=useState('');

  //Add tasks to do 
  const addTask = () =>{
      if(newTask){
        let num = toDo.length + 1;  //number will be incremented for the next id
        let newEntry = {id: num, title:newTask, status: false};  //setting the new entry
        setToDo([...toDo, newEntry])  //this will replace the above toDo entry which is entered manually
        setNewTask(''); //clear the textbox entry 
      }
  }

  //Delete task
  const deleteTask = (id) =>{
      let newTasks = toDo.filter(task =>task.id !==id);  //filter those task with the id
      setToDo(newTasks); //update the list 
  }

  //mark task as completed or not
  const markCompleted = (id) =>{
      let newTask = toDo.map(task =>{
        if(task.id === id){
          return({...task, status: !task.status})  //if it is true then false and vice versa
        }
        return task;
      }) 
      setToDo(newTask);
  }

  //cancel update
  const cancelUpdate = (id) =>{
      setUpdateData('');
  }

  //change task for update
  const changeTask = (e) =>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status? true: false
    }
    setUpdateData(newEntry);
  }

  //update task
  const updateTask =() =>{
      let filterRecords = [...toDo].filter(task => task.id !== updateData.id); //three dots means original to do list from the list we need to filter the records
      let updatedObject = [...filterRecords,updateData]; //include filter records as well as updated data
      setToDo(updatedObject);
      setUpdateData('');
  }
  return (
    <div className="conatiner App">
      <br/><br/>
      <h2> To Do List</h2>
      <br/><br/>
      {updateData && updateData ? (
          <UpdateTaskForm 
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}/>
    ) : 
    (
      <AddTaskForm 
      newTask= {newTask}
      setNewTask= {setNewTask}
      addTask= {addTask}/>
    )
    }
    

     
       {/*Display to do's*/}

       {toDo && toDo.length ?  '':'No Tasks....'}
       <ToDoList 
       toDo={toDo}
       markCompleted={markCompleted}  
       setUpdateData={setUpdateData}
       deleteTask={deleteTask}
       />
    </div>
  );
}

export default App;
