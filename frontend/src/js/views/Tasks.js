import React from 'react';
import { Link } from "react-router-dom";
import Pagiantion from '../components/Pagiantion';
import NewTaskModal from '../components/NewTaskModal';

 const Tasks = ({tasks,onTaskSubmit, isTaskCreateShowing,toggleTaskCreate,page,pages,setPage})=>{

    return (
        <>
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
            </li>
        </ul>
        <h1 className="text-center">Tasks</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Comment</th>
                    <th>Time spent (min.)</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {tasks.map(task=><tr key={task.id}><td>{task.title}</td><td>{task.comment}</td><td>{task.timeSpent}</td><td>{new Date(task.date).toISOString().split('T')[0]}</td></tr>)}
            </tbody>
        </table>
        <Pagiantion
            page={page}
            pages={pages}
            setPage={setPage}
        />
        <button className="btn btn-success" onClick={toggleTaskCreate}>Add Task</button>
        <NewTaskModal 
        isShowing={isTaskCreateShowing}
        hide={toggleTaskCreate}
        onSubmit={onTaskSubmit}
        />
        </>
    )
};
export default Tasks;
