import React from 'react'
import LoginView from "../views/Login";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export default function Login({login}) {
    const history = useHistory();
   
      const onSubmit = (data) =>{
        login(data.email,data.password).then(()=>{
            history.push("/tasks");
        }).catch(e=>{
          NotificationManager.info(e.response.data.message, 'Error', 1000, null, true);
        });
      };

    return (
        <LoginView onSubmit={onSubmit}/>
    )
}
