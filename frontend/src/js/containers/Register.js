import React from 'react';
import RegisterView from "../views/Register";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export default function Register({login}) {
    const history = useHistory();
    
      const onSubmit = (data) =>{
        login(data.email,data.password).then(()=>{
            history.push("/login");
        }).catch(e=>{
          NotificationManager.info(e.response.data.message, 'Error', 1000, null, true);
        });
      };

    return (
        <RegisterView  onSubmit={onSubmit}/>
    )
}