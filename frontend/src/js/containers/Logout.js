import React,{useEffect} from 'react'
import { Redirect } from "react-router-dom";

export default function Logout({logout}) {
   
    useEffect(() => {
        logout();
    }, [logout])

    return (
        <Redirect to="/login" />
    )
}
