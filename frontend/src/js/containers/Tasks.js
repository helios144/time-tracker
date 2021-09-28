import React,{useState,useEffect,useCallback} from 'react';
import TasksView from '../views/Tasks';
import { NotificationManager } from "react-notifications";
import useModal from "../hooks/useModal";


export default function Tasks({createTask,getTasks}) {
const [page, setPage] = useState(1);
const [pages, setPages] = useState(1);
const [tasks, setTasks] = useState([]);
const { isShowing:isTaskCreateShowing, toggle:toggleTaskCreate } = useModal();

const loadTasks = useCallback((page)=>{
    getTasks(page).then(res=>{
        setTasks(res?.data?.tasks??[]);
        setPages(res?.data?.pagination?.pages??1);
    }).catch(e=>{
        NotificationManager.info(e.message, 'Error', 1000, null, true);
      });
},[getTasks,setTasks]);

useEffect(() => {
    loadTasks(page);
}, [loadTasks,page]);

const onTaskSubmit = (data) =>{
    createTask(data).then(()=>{
        loadTasks(page);
        if(isTaskCreateShowing)toggleTaskCreate();
  }).catch(e=>{
    NotificationManager.info(e.message, 'Error', 1000, null, true);
  });
};
    return (
        <TasksView 
            tasks={tasks} 
            onTaskSubmit={onTaskSubmit} 
            isTaskCreateShowing={isTaskCreateShowing} 
            toggleTaskCreate={toggleTaskCreate} 
            page={page} 
            pages={pages}
            setPage={setPage}/>
    )
}
