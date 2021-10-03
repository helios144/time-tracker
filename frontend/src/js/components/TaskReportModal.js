import React from "react";
import ReactDOM from "react-dom";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';


const schema = yup.object().shape({
    dateFrom:yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr),
    dateTill:yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr)
});

const TaskReportModal = ({
  fileTypes,
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
                        <label htmlFor="date">Date from(optional)</label>
                        <input className="form-control"  type="text" {...register('dateFrom')} placegolder="YYYY-MM-DD"/>
                        <div className="invalid-feedback" style={{display:errors?.dateFrom?.message?'block':'none'}}>{errors?.dateFrom?.message}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="date">Date till(optional)</label>
                        <input className="form-control"  type="text" {...register('dateTill')} placegolder="YYYY-MM-DD"/>
                        <div className="invalid-feedback" style={{display:errors?.dateTill?.message?'block':'none'}}>{errors?.dateTill?.message}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select className="custom-select custom-select-sm" {...register('type')}>
                          {fileTypes.map(t=><option key={t.type} value={t.type}>{t.label}</option>)}
                        </select>
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
export default TaskReportModal;
