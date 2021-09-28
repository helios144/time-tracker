import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    email:yup.string().required().email(),
    password:yup.string().required().min(5)
});

export default function Login({onSubmit}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
          resolver:yupResolver(schema)
      });

    return (
        <>
        <h1 className="text-center">Login</h1>
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text"  {...register('email')} placeholder="example@email.com"/>
                        <div className="invalid-feedback" style={{display:errors?.email?.message?'block':'none'}}>{errors?.email?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <input className="form-control" type="password" {...register('password')}/>
                        <div className="invalid-feedback" style={{display:errors?.password?.message?'block':'none'}}>{errors?.password?.message} </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <button className="btn btn-success " type="submit">Login</button>
                        </div>
                        <div className="col-6 text-right ">
                            <Link to={{pathname:"/register"}}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
