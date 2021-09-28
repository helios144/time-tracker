import React from 'react'
import LoginView from "../views/Login";
import { useHistory } from "react-router-dom";

export default function Login({login}) {
    const history = useHistory();
   
      const onSubmit = (data) =>{
        login(data.email,data.password).then(()=>{
            history.push("/tasks");
        }).catch(e=>{
            console.log(e);
        });
      };

    return (
        <LoginView onSubmit={onSubmit}/>
    )
}
