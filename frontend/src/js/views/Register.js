import React from 'react';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    email:yup.string().required().email(),
    password:yup.string().required().min(5),
    passwordRepeat:yup.string().required().min(5)
});

export default function Register({onSubmit}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
          resolver:yupResolver(schema)
      });

    return (
        <>
        <h1 className="text-center">Register</h1>
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text"  {...register('email')} placeholder="example@email.com"/>
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <input className="form-control" type="password" {...register('password')}/>
                        <div className="invalid-feedback">{errors?.password?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Repeat Password</label>
                        <input className="form-control" type="password" {...register('passwordRepeat')}/>
                        <div className="invalid-feedback">{errors?.passwordRepeat?.message}</div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <button className="btn btn-success " type="submit">Register</button>
                        </div>
                        <div className="col-6 text-right ">
                            <Link to={{pathname:"/login"}}>Login</Link>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
        </>
    )
}
