import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const withTimeTracker = (Component) => (props) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const history = useHistory();
    const login = async (username, password)=>{
        return Axios.post(`${process.env.REACT_APP_TIME_TRACKER_API_URL}/login`,
                            {username:username,password:password}
                            ).then(res=>{
            localStorage.setItem('jwtToken', res.data.token);
            setToken(res.data.token);
            return res;
        });
    }

    const logout = ()=>{
        localStorage.removeItem('jwtToken');
        setToken(null);
    };
    
    const register = async (username, password)=>{
        return Axios.post(`${process.env.REACT_APP_TIME_TRACKER_API_URL}/user/register`,
                            {username:username,password:password});
    };

    const getTasks = async (page = 1)=>{
        return Axios.get(`${process.env.REACT_APP_TIME_TRACKER_API_URL}/tasks?page=${page}`,{ headers: {'Authorization': 'Bearer '+token}})
        .catch(e=>{
            if(e.response.status ===401){
                setToken(null);
                history.push('/login');
            }else{
                throw e;
            }
        });
    };

    const createTask = (task)=>{
        let formData = new FormData();
        formData.append("title", task?.title??'');
        formData.append("comment", task?.comment??'');
        formData.append("timeSpent", task?.timeSpent??'');
        formData.append("date", task?.date?task?.date.toISOString().split('T')[0]:'');
        return Axios.post(`${process.env.REACT_APP_TIME_TRACKER_API_URL}/tasks`,formData,{ headers: {'Authorization': 'Bearer '+token}})
        .catch(e=>{
            if(e.response.status ===401){
                setToken(null);
                history.push('/login');
            }else{
                throw e;
            }
        });
    };

    const getPeriodReport = (dateFrom,dateTill,format)=>{

    };

    return <Component {...props} login = {login} register = {register} getTasks = {getTasks} createTask = {createTask} getPeriodReport = {getPeriodReport} logout={logout} token={token} />;
};

export default withTimeTracker;