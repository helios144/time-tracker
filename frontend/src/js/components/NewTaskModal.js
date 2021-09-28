import React from "react";
import ReactDOM from "react-dom";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';


const schema = yup.object().shape({
    title:yup.string().required(),
    comment:yup.string().required(),
    timeSpent:yup.number().required().positive().integer(),
    date:yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr)
});

const NewTaskModal = ({
  isShowing,
  hide,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
      resolver:yupResolver(schema)
  });

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-backdrop show" />
          <div className="modal-wrapper " aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal modal-input fade show" id="helpModal" tabIndex={-1} aria-hidden="false" style={{ display: "block" }}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add new task</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-body text-center">
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input className="form-control" type="text" {...register('title')} />
                        <div className="invalid-feedback" style={{display:errors?.title?.message?'block':'none'}}>{errors?.title?.message}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <input className="form-control" type="text" {...register('comment')} />
                        <div className="invalid-feedback" style={{display:errors?.comment?.message?'block':'none'}}>{errors?.comment?.message}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="time-spent">Time spent(min.)</label>
                        <input className="form-control" type="text" {...register('timeSpent')} />
                        <div className="invalid-feedback" style={{display:errors?.timeSpent?.message?'block':'none'}}>{errors?.timeSpent?.message}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="date">Date(optional)</label>
                        <input className="form-control"  type="text" {...register('date')} />
                        <div className="invalid-feedback" style={{display:errors?.date?.message?'block':'none'}}>{errors?.date?.message}</div>
                      </div>
                    </div>
                    <div className="modal-footer dialog-modal-footer text-center">
                      <button  type="submit" className="btn btn-success btn-rec">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};
export default NewTaskModal;
