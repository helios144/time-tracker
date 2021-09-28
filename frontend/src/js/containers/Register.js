import React from 'react';
import RegisterView from "../views/Register";
import { useHistory } from "react-router-dom";

export default function Register({login}) {
    const history = useHistory();
    
      const onSubmit = (data) =>{
        login(data.email,data.password).then(()=>{
            history.push("/login");
        }).catch(e=>{
            console.log(e);
        });
      };

    return (
        <RegisterView  onSubmit={onSubmit}/>
    )
}