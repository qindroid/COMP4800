import React from 'react'

const CreateCashflow = ({ onChangeForm, createCashflow }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 mrgnbtm">
          <h2>Create new Cashflow</h2>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Type</label>
                <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="type" id="type" aria-describedby="emailHelp" placeholder="Cashflow Type" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputPassword1">Amount</label>
                <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="amount" id="amount" placeholder="Amount" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="description" id="description" aria-describedby="emailHelp" placeholder="Description" />
              </div>
            </div>
            <button type="button" onClick={(e) => createCashflow()} className="btn btn-danger">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCashflow