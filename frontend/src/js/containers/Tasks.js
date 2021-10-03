import React,{useState,useEffect,useCallback} from 'react';
import TasksView from '../views/Tasks';
import { NotificationManager } from "react-notifications";
import useModal from "../hooks/useModal";


export default function Tasks({createTask,getTasks,getPeriodReport}) {
const [page, setPage] = useState(1);
const [pages, setPages] = useState(1);
const [tasks, setTasks] = useState([]);
const { isShowing:isTaskCreateShowing, toggle:toggleTaskCreate } = useModal();
const { isShowing:isTaskReportShowing, toggle:toggleTaskReport } = useModal();

const fileTypes = [
    {
      type:'csv',
      label:'CSV'
    },
    {
      type:'pdf',
      label:'PDF'
    },
    {
      type:'xlsx',
      label:'Excel'
    }
  ];

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

const getTasksPeriodReport = (data)=>{
  let type = data.type?data.type:'csv';
    getPeriodReport(type,data.dateFrom?data.dateFrom.toISOString().split('T')[0]:'',data.dateTill?data.dateTill.toISOString().split('T')[0]:'').then(data=>{
      if(isTaskReportShowing) toggleTaskReport();
        let mimeType = {
          csv:"application/csv",
          pdf:"application/pdf",
          xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        const url = window.URL.createObjectURL(new Blob([data.data],{type:mimeType[type]}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', data.request.getResponseHeader('Content-Disposition').split("filename=")[1].replaceAll('"',''));
        document.body.appendChild(link);
        link.click();
        link.remove();
    }).catch(e=>{
        NotificationManager.info(e.response?.data?e.response.data.message:e.message, 'Error', 1000, null, true);
      });
}
    return (
        <TasksView 
            tasks={tasks} 
            onTaskSubmit={onTaskSubmit} 
            isTaskCreateShowing={isTaskCreateShowing} 
            toggleTaskCreate={toggleTaskCreate}
            isTaskReportShowing={isTaskReportShowing} 
            toggleTaskReport={toggleTaskReport}
            page={page} 
            pages={pages}
            setPage={setPage}
            getTasksPeriodReport={getTasksPeriodReport}
            fileTypes={fileTypes}
            />
    )
}
